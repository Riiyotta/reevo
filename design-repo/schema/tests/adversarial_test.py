#!/usr/bin/env python3
"""Adversarial test suite for schema/semantic_validate.py (BUILD-GUIDE 2.8, MASTER-GUIDE 3.3/3.22/3.23).

Self-contained: stdlib + jsonschema. The validator and repo data are located relative to this file.
Prints a PASS/FAIL line per case and a summary; exit 1 if any case fails.

Case kinds
  control   must produce 0 errors
  mutation  must be REJECTED (>=1 error) AND the expected rule id must appear (errors, or warnings
            for warn-severity rules)
  flip      a real named exception: a specific rule id must NOT fire / the page must pass
  robust    malformed input must yield errors, never raise
Every id in validator.RULE_IDS must be exercised by a mutation or listed in NOT_EXERCISED.
"""
import copy
import json
import os
import shutil
import sys
import tempfile
import time

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(REPO, "schema"))
import semantic_validate as V  # noqa: E402

T0 = time.time()


def J(*p):
    with open(os.path.join(REPO, *p), encoding="utf-8") as f:
        return json.load(f)


EXAMPLE = J("schema", "example.pagespec.json")
SCHEMA = J("schema", "pagespec.schema.json")
TEMPLATES = J("templates", "templates.json")
ROUTES = J("templates", "routes.json")["routes"]
GRAPH = J("compatibility", "graph.json")
ASSETS = J("assets", "asset-roles.json")
DEFS = SCHEMA["definitions"]
BRANCH = {}
for _a in DEFS["node"]["allOf"]:
    BRANCH[_a["if"]["properties"]["section"]["const"]] = _a["then"]

# rules that cannot be triggered by any input the suite can construct; each needs a reason
NOT_EXERCISED = {}

RESULTS = []          # (kind, name, ok, detail)
EXERCISED = {}        # rule id -> [case names]


def record(kind, name, ok, detail=""):
    RESULTS.append((kind, name, ok, detail))
    print(f"{'PASS' if ok else 'FAIL'}  [{kind}] {name}" + (f"  -- {detail}" if detail and not ok else ""))


def has(msgs, rid):
    return any(m.startswith(rid + ":") for m in msgs)


def ids_in(msgs):
    return sorted({m.split(":")[0] for m in msgs})


def safe_validate(spec, **kw):
    try:
        return V.validate(spec, **kw)
    except Exception as e:  # a validator crash is a defect, surfaced as a failed case
        return [f"CRASH: {type(e).__name__}: {e}"], []


def control(name, errs, warns=()):
    record("control", name, not errs, f"{len(errs)} error(s): {errs[:4]}")


def mutation(name, expect, errs, warns=(), where="errors"):
    """expect: rule id (or list of ids) that must appear in errs (or warns when where='warnings')."""
    expect = [expect] if isinstance(expect, str) else list(expect)
    pool = errs if where == "errors" else warns
    if where == "errors" and not errs:
        record("mutation", name, False, f"NOT REJECTED (0 errors); expected {expect}")
        return
    missing = [e for e in expect if not has(pool, e)]
    if missing:
        record("mutation", name, False, f"expected {missing} in {where}; got errors={ids_in(errs)} warnings={ids_in(warns)}")
        return
    for e in expect:
        EXERCISED.setdefault(e, []).append(name)
    record("mutation", name, True)


def flip(name, errs, warns=(), absent=(), clean=False):
    """Named-exception proof: listed rule ids must be absent from errors AND warnings."""
    bad = [r for r in absent if has(errs, r) or has(warns, r)]
    if clean and errs:
        bad.append(f"errors={errs[:3]}")
    record("flip", name, not bad, f"unexpected: {bad}")


# ------------------------------------------------------------------ minimal-spec synthesis
def resolve(s):
    while isinstance(s, dict) and "$ref" in s:
        cur = SCHEMA
        for part in s["$ref"][2:].split("/"):
            cur = cur[part]
        s = cur
    return s


def gen(s, key=""):
    """Smallest instance of a schema fragment: required properties only, first enum value,
    minLength/minItems honoured. Generic: no per-section code."""
    if "$ref" in s:
        r = s["$ref"]
        if r.endswith("routeOrUrl"):
            return "/x"
        if r.startswith("#/definitions/assetRef."):
            role = r.split("assetRef.")[1]
            pol = ASSETS["roles"].get(role, {}).get("generationPolicy")
            return {"assetRole": role, "ref": "x-embed-slot:demo" if pol == "must-not-reuse-live-endpoint" else "assets/x.png"}
        return gen(resolve(s), key)
    if "const" in s:
        return s["const"]
    if "enum" in s:
        return s["enum"][0]
    for k in ("oneOf", "anyOf"):
        if k in s:
            return gen(s[k][0], key)
    t = s.get("type")
    if t == "object" or "properties" in s:
        out = {}
        props = s.get("properties", {})
        for k in s.get("required", []):
            out[k] = gen(props.get(k, {"type": "string"}), k)
        return out
    if t == "array":
        item = s.get("items", {"type": "string"})
        return [gen(item, key) for _ in range(max(1, s.get("minItems", 0)))]
    if t == "string":
        v = "Word"
        if s.get("minLength", 0) > len(v):
            v = "w" * s["minLength"]
        return v
    if t == "integer":
        return int(s.get("minimum", 0))
    if t == "number":
        return s.get("minimum", 0)
    if t == "boolean":
        return False
    return "Word"


def route_for(tid):
    for r in ROUTES:
        if r["template"] == tid and r["path"] != "*":
            return r["path"].replace(":", "") if ":" in r["path"] else r["path"]
    return "/x"


def synth_node(sec):
    br = BRANCH[sec]
    p = br["properties"]
    content = gen(p["content"])
    node = {"section": sec, "content": content,
            "motion": {"pattern": p["motion"]["properties"]["pattern"]["enum"][0], "reducedMotionFallback": "none-needed"}}
    forbids = any(n.get("required") == ["variant"] for n in [br.get("not", {})])
    if "variant" in p and not forbids:
        if isinstance(content, dict) and "variant" in content:
            node["variant"] = content["variant"]
        # else leave the optional node-level variant off
    return node


def synth_spec(t, extra=None):
    nodes = [synth_node(n["section"]) for n in t["nodes"] if n.get("required")]
    return {"pageSpecVersion": "1.0.0", "route": route_for(t["id"]), "template": t["id"],
            "title": f"Synth {t['id']}", "nodes": nodes}


def D(x):
    return copy.deepcopy(x)


def node_of(spec, section):
    return next(n for n in spec["nodes"] if n["section"] == section)


def V_(spec, **kw):
    return safe_validate(spec, **kw)


# ================================================================== CONTROLS
def run_controls():
    control("example.pagespec.json unmutated", *V_(D(EXAMPLE)))
    for t in TEMPLATES["templates"]:
        spec = synth_spec(t)
        e, w = V_(spec)
        control(f"synth minimal PageSpec: template {t['id']}", e, w)
    for t in TEMPLATES["templates"]:
        for k, ins in enumerate(t["instances"]):
            e, w = V.validate_sequence(ins["sequence"], t["id"], ins["routes"])
            control(f"real instance {t['id']}#{k} {ins['routes']} (validate_sequence)", e, w)



# ================================================================== SCHEMA-LAYER MUTATIONS
def run_schema_mutations():
    def m(name, expect, mut, base=None, **kw):
        s = D(base or EXAMPLE)
        mut(s)
        e, w = V_(s, **kw)
        mutation(name, expect, e, w)

    m("schema: wrong template enum value", "SCHEMA", lambda s: s.update(template="not-a-template"))
    m("schema: unknown section id (also no contract)", ["SCHEMA", "UNKNOWN_SECTION"],
      lambda s: s["nodes"][1].update(section="hero.does-not-exist"))
    m("schema: missing required content field (hero headline)", "SCHEMA",
      lambda s: node_of(s, "hero.marketing-video")["content"].pop("headline"))
    m("schema: unknown key inside a node", "SCHEMA", lambda s: s["nodes"][1].update(bogus=1))
    m("schema: unknown key inside content", "SCHEMA",
      lambda s: node_of(s, "hero.marketing-video")["content"].update(bogus="x"))
    m("schema: missing reducedMotionFallback", ["SCHEMA", "MOTION_NO_FALLBACK"],
      lambda s: node_of(s, "shell.navbar")["motion"].pop("reducedMotionFallback"))
    m("schema: reducedMotionFallback invalid value", "SCHEMA",
      lambda s: node_of(s, "shell.navbar")["motion"].update(reducedMotionFallback="sometimes"))
    m("schema: invented motion field", "SCHEMA",
      lambda s: node_of(s, "shell.navbar")["motion"].update(wobbleFactor=3))
    m("schema: motion.pattern outside section's allowed set", ["SCHEMA", "MOTION_PATTERN_NOT_ALLOWED"],
      lambda s: node_of(s, "shell.navbar")["motion"].update(pattern="marquee"))
    m("schema: bad variant value", "SCHEMA", lambda s: node_of(s, "shell.navbar").update(variant="not-a-variant"))
    m("schema: variant on a section that has none (footer)", "SCHEMA",
      lambda s: node_of(s, "shell.footer").update(variant="anything"))
    m("schema: invented assetRole", ["SCHEMA", "ASSET_ROLE_UNKNOWN"],
      lambda s: node_of(s, "shell.navbar")["content"]["wordmark"].update(assetRole="hologram"))
    m("schema: valid role on the wrong field (brand-mark field given customer-logo)", ["SCHEMA", "ASSET_ROLE_MISMATCH"],
      lambda s: node_of(s, "shell.navbar")["content"]["wordmark"].update(assetRole="customer-logo"))
    m("schema: motion missing entirely", ["SCHEMA", "MOTION_MISSING"],
      lambda s: node_of(s, "shell.navbar").pop("motion"))
    m("schema: MOTION_MISSING reached past schema (skipSchema)", "MOTION_MISSING",
      lambda s: node_of(s, "shell.navbar").pop("motion"), skipSchema=True)
    m("schema: additionalMotion entry without reducedMotionFallback", "MOTION_NO_FALLBACK",
      lambda s: node_of(s, "shell.navbar")["motion"].update(
          additionalMotion=[{"context": "menu", "pattern": "popover-fade-scale"}]))
    m("schema: extra top-level key", "SCHEMA", lambda s: s.update(extra=1))

    # ASSET_REF_URL is warn-severity: an https URL in a non-embed role is flagged, not rejected
    s = D(EXAMPLE)
    node_of(s, "social-proof.logo-marquee")["content"]["logos"][0]["file"]["ref"] = "https://cdn.example.com/x.svg"
    e, w = V_(s)
    mutation("assets: customer-logo ref that is a URL (warning)", "ASSET_REF_URL", e, w, where="warnings")


# ================================================================== STRUCTURAL MUTATIONS
def run_structural_mutations():
    def m(name, expect, mut, base=None, **kw):
        s = D(base or EXAMPLE)
        mut(s)
        e, w = V_(s, **kw)
        mutation(name, expect, e, w)

    def dup(section, at=None):
        def f(s):
            n = D(node_of(s, section))
            i = s["nodes"].index(node_of(s, section)) + 1 if at is None else at
            s["nodes"].insert(i, n)
        return f

    m("structural: duplicate hero (one-per-page)", ["ONE_HERO", "TEMPLATE_MAX_COUNT"], dup("hero.marketing-video"))
    m("structural: duplicate navbar", ["SHELL_ONE_PER_PAGE", "TEMPLATE_MAX_COUNT"],
      lambda s: s["nodes"].insert(1, D(s["nodes"][0])))
    m("structural: duplicate footer", "SHELL_ONE_PER_PAGE", lambda s: s["nodes"].append(D(s["nodes"][-1])))
    m("structural: duplicate cta-band (ONE_PER_PAGE_SECTIONS + contract cap)",
      ["ONE_PER_PAGE_SECTIONS", "TEMPLATE_MAX_COUNT"], dup("conversion.cta-band"))
    m("structural: duplicate logo-marquee", "ONE_PER_PAGE_SECTIONS", dup("social-proof.logo-marquee"))
    m("structural: removed mandatory section (logo-marquee)", "TEMPLATE_MISSING_REQUIRED",
      lambda s: s["nodes"].remove(node_of(s, "social-proof.logo-marquee")))
    m("structural: removed mandatory hero", ["TEMPLATE_MISSING_REQUIRED", "ONE_HERO"],
      lambda s: s["nodes"].remove(node_of(s, "hero.marketing-video")))

    def swap(a, b):
        def f(s):
            i, j = s["nodes"].index(node_of(s, a)), s["nodes"].index(node_of(s, b))
            s["nodes"][i], s["nodes"][j] = s["nodes"][j], s["nodes"][i]
        return f
    m("structural: reordered fixed-position sections (dark-problem <-> solution-rows)", "TEMPLATE_ORDER",
      swap("content.dark-problem", "content.solution-rows"))

    def shell_not_first(s):
        n = s["nodes"].pop(0)
        s["nodes"].insert(2, n)
    m("structural: shell.navbar not first", ["SHELL_FIRST_LAST", "TEMPLATE_ORDER"], shell_not_first)

    def shell_not_last(s):
        n = s["nodes"].pop()
        s["nodes"].insert(len(s["nodes"]) - 2, n)
    m("structural: shell.footer not last", ["SHELL_FIRST_LAST", "TEMPLATE_ORDER"], shell_not_last)

    pricing = next(t for t in TEMPLATES["templates"] if t["id"] == "pricing")
    home_with_pricing_nodes = synth_spec(pricing)
    home_with_pricing_nodes.update(template="home", route="/", title="home w/ pricing nodes")
    e, w = V_(home_with_pricing_nodes)
    mutation("structural: template 'home' declared with pricing's nodes", ["TEMPLATE_EXTRA_SECTION", "TEMPLATE_MISSING_REQUIRED"], e, w)

    m("structural: route not belonging to template (/pricing on home)", "ROUTE_TEMPLATE_MISMATCH",
      lambda s: s.update(route="/pricing"))
    m("structural: unknown template with schema skipped", "ROUTE_UNKNOWN_TEMPLATE",
      lambda s: s.update(template="nope"), skipSchema=True)
    m("structural: no template declared with schema skipped", "ROUTE_UNKNOWN_TEMPLATE",
      lambda s: s.pop("template"), skipSchema=True)
    m("structural: extra section the template does not list (faq on home)", "TEMPLATE_EXTRA_SECTION",
      lambda s: s["nodes"].insert(-2, {**D(node_of(synth_spec(pricing), "content.faq-accordion"))}))

    apps = next(t for t in TEMPLATES["templates"] if t["id"] == "apps-mobile")
    sp = synth_spec(apps)
    acc = node_of(sp, "interactive.accordion-showcase")
    i = sp["nodes"].index(acc)
    sp["nodes"][i:i + 1] = [D(acc) for _ in range(4)]
    e, w = V_(sp)
    mutation("structural: 4 accordions on apps-mobile (template maxCount 3)", ["TEMPLATE_MAX_COUNT", "ACCORDION_SHOWCASE_MAX_3", "CONTRACT_MAX_PER_PAGE"], e, w)

    sp = synth_spec(pricing)
    j = next(k for k, n in enumerate(sp["nodes"]) if n["section"] == "content.faq-accordion")
    sp["nodes"].insert(j, D(sp["nodes"][j]))
    e, w = V_(sp)
    mutation("structural: faq twice on pricing (contract onePerPage)", ["CONTRACT_MAX_PER_PAGE", "TEMPLATE_MAX_COUNT"], e, w)

    # real-instance deviation is a soft signal: minimal product-detail on /products/find lacks the instance's optional nodes
    pd = next(t for t in TEMPLATES["templates"] if t["id"] == "product-detail")
    sp = synth_spec(pd)
    sp["route"] = "/products/find"
    e, w = V_(sp)
    mutation("structural: minimal product-detail on /products/find deviates from real instance (warning)",
             "INSTANCE_DEVIATION", e, w, where="warnings")


# ================================================================== RUNTIME MUTATIONS
def run_runtime_mutations():
    def m(name, expect, mut, base=None, where="errors", **kw):
        s = D(base or EXAMPLE)
        mut(s)
        e, w = V_(s, **kw)
        mutation(name, expect, e, w, where=where)

    m("runtime: maxWords overflow (hero headline)", "MAXWORDS",
      lambda s: node_of(s, "hero.marketing-video")["content"].update(headline=" ".join(["word"] * 60)))
    m("runtime: maxWords overflow inside a nested list item (platform-columns item label)", "MAXWORDS",
      lambda s: node_of(s, "content.platform-columns")["content"]["columns"][0]["items"][0].update(label=" ".join(["w"] * 40)))
    m("runtime: maxWords counts words after stripping inline HTML", "MAXWORDS",
      lambda s: node_of(s, "hero.marketing-video")["content"].update(headline="<b>" + " ".join(["word"] * 60) + "</b>"))

    blog = next(t for t in TEMPLATES["templates"] if t["id"] == "blog-post")
    base = synth_spec(blog)
    body = lambda s: node_of(s, "content.post-article")["content"]
    faq = {"block": "faq-accordion", "questions": [{"question": "Q", "answer": "A"}]}
    p = {"block": "p", "text": "Paragraph."}

    m("runtime: faq-accordion block not last in post body", "POST_BODY_FAQ_NOT_LAST",
      lambda s: body(s).update(body=[p, D(faq), D(p)]), base=base)
    m("runtime: body block not in allowedBlocks", "POST_BODY_BLOCK_NOT_ALLOWED",
      lambda s: body(s).update(body=[p, {"block": "video", "text": "x"}]), base=base)
    m("runtime: duplicate h2 anchor ids (warning)", "POST_BODY_DUPLICATE_H2",
      lambda s: body(s).update(body=[{"block": "h2", "text": "Same Heading"}, p, {"block": "h2", "text": "Same heading!"}]),
      base=base, where="warnings")

    # VARIANT_MISMATCH, both forms (platform-columns declares content.variant)
    pc = node_of(EXAMPLE, "content.platform-columns")
    other = next(v for v in BRANCH["content.platform-columns"]["properties"]["variant"]["enum"] if v != pc["variant"])

    def both_differ(s):
        n = node_of(s, "content.platform-columns")
        n["variant"] = other
    m("runtime: VARIANT_MISMATCH both present but different", "VARIANT_MISMATCH", both_differ)

    def node_omitted(s):
        n = node_of(s, "content.platform-columns")
        n.pop("variant")
    m("runtime: VARIANT_MISMATCH content.variant set, node variant omitted", "VARIANT_MISMATCH", node_omitted)

    # flip side: they agree -> not flagged
    e, w = V_(D(EXAMPLE))
    flip("runtime: matching node/content variant is not flagged", e, w, absent=["VARIANT_MISMATCH"], clean=True)


# ================================================================== GRAPH RULES (all 17) + NAMED-EXCEPTION FLIPS
def base_secs(tid):
    t = next(t for t in TEMPLATES["templates"] if t["id"] == tid)
    return [n["section"] for n in t["nodes"] if n.get("required")]


def S(items):
    """['a.b', ('c.d', {'tone': 'dark'})] -> [{'section':..}, ..]"""
    out = []
    for it in items:
        out.append({"section": it} if isinstance(it, str) else {"section": it[0], **it[1]})
    return out


def seq_case(name, expect, tid, items, routes=None, where="errors"):
    e, w = V.validate_sequence(S(items), tid, routes or [])
    mutation(name, expect, e, w, where=where)


def insert_after(secs, anchor, *new):
    i = secs.index(anchor) + 1
    return secs[:i] + list(new) + secs[i:]


def run_graph_cases():
    rule_ids = [r["id"] for r in GRAPH["rules"]]
    sev = {r["id"]: r["severity"] for r in GRAPH["rules"]}
    home = base_secs("home")

    # sanity: every base sequence used below is itself clean, so a failure is caused by the mutation
    for tid in ("home", "pricing", "company-startups", "company-about", "company-careers", "apps-mobile",
                "product-detail", "product-tour", "integrations"):
        e, w = V.validate_sequence(S(base_secs(tid)), tid, [route_for(tid)])
        record("control", f"graph base sequence clean: {tid}", not e, str(e[:3]))

    # ---- ONE_HERO
    seq_case("graph ONE_HERO: two heroes on home", "ONE_HERO", "home", insert_after(home, "hero.marketing-video", "hero.title-cta"))
    seq_case("graph ONE_HERO: no hero on a non-exempt template (home)", "ONE_HERO", "home", [s for s in home if not s.startswith("hero.")])
    for ex in next(r for r in GRAPH["rules"] if r["id"] == "ONE_HERO")["exceptions"]:
        tid = ex["template"]
        e, w = V.validate_sequence(S(base_secs(tid)), tid, [route_for(tid)])
        flip(f"graph ONE_HERO exception: heroless {tid} is NOT rejected", e, w, absent=["ONE_HERO"], clean=True)
    # the exception is per-template: a heroless pricing page is still rejected
    seq_case("graph ONE_HERO: exception does not leak (heroless pricing)", "ONE_HERO", "pricing",
             [s for s in base_secs("pricing") if not s.startswith("hero.")])

    # ---- shell
    seq_case("graph SHELL_ONE_PER_PAGE: two navbars", "SHELL_ONE_PER_PAGE", "home", ["shell.navbar"] + home)
    seq_case("graph SHELL_ONE_PER_PAGE: no footer", "SHELL_ONE_PER_PAGE", "home", home[:-1])
    seq_case("graph SHELL_FIRST_LAST: navbar not first", "SHELL_FIRST_LAST", "home", [home[1], home[0]] + home[2:])
    seq_case("graph SHELL_FIRST_LAST: footer not last", "SHELL_FIRST_LAST", "home", home[:-2] + [home[-1], home[-2]])
    seq_case("graph SHELL_FIRST_LAST: empty page", "SHELL_FIRST_LAST", "home", [])

    # ---- HERO_FOLLOWS_NAV
    seq_case("graph HERO_FOLLOWS_NAV: marquee between navbar and hero", "HERO_FOLLOWS_NAV", "home",
             ["shell.navbar", "social-proof.logo-marquee", "hero.marketing-video"] + home[3:])

    # ---- MUST_IMMEDIATELY_FOLLOW (b must directly follow a)
    pr = base_secs("pricing")
    seq_case("graph MUST_IMMEDIATELY_FOLLOW: faq wedged between pricing-plans and plan-compare-table",
             "MUST_IMMEDIATELY_FOLLOW", "pricing", insert_after(pr, "content.pricing-plans", "content.faq-accordion"))
    ca = base_secs("company-about")
    seq_case("graph MUST_IMMEDIATELY_FOLLOW: lead-statement not directly after eyebrow banner", "MUST_IMMEDIATELY_FOLLOW",
             "company-about", insert_after(ca, "hero.eyebrow-title-banner", "interactive.scroll-story"))

    # ---- MUST_BE_IMMEDIATELY_FOLLOWED_BY
    st = base_secs("company-startups")
    seq_case("graph MUST_BE_IMMEDIATELY_FOLLOWED_BY: hero.title-cta not followed by collage",
             "MUST_BE_IMMEDIATELY_FOLLOWED_BY", "company-startups", insert_after(st, "hero.title-cta", "content.platform-columns"))
    nl = base_secs("newsletter")
    seq_case("graph MUST_BE_IMMEDIATELY_FOLLOWED_BY: hero.form-split not followed by cta-band",
             "MUST_BE_IMMEDIATELY_FOLLOWED_BY", "newsletter", [s for s in nl if s != "conversion.cta-band"])

    # ---- CTA_BAND_BEFORE_FOOTER (+ exception flip)
    seq_case("graph CTA_BAND_BEFORE_FOOTER: section between cta-band and footer", "CTA_BAND_BEFORE_FOOTER", "home",
             insert_after(home, "conversion.cta-band", "social-proof.testimonial"))
    seq_case("graph CTA_BAND_BEFORE_FOOTER: footnote strip on a non-exempt template", "CTA_BAND_BEFORE_FOOTER", "home",
             insert_after(home, "conversion.cta-band", "content.footnote-attribution"))
    seq_case("graph CTA_BAND_BEFORE_FOOTER: two cta-bands", "CTA_BAND_BEFORE_FOOTER", "home",
             insert_after(home, "conversion.cta-band", "conversion.cta-band"))
    e, w = V.validate_sequence(S(base_secs("integrations")), "integrations", ["/integrations"])
    flip("graph CTA_BAND_BEFORE_FOOTER exception: integrations footnote strip between cta and footer is NOT rejected",
         e, w, absent=["CTA_BAND_BEFORE_FOOTER"], clean=True)

    # ---- PRODUCT_FEATURES_FOLLOWED_BY_DARK
    pd = base_secs("product-detail")
    acc = "interactive.accordion-showcase"
    def pd_with(tone):
        return [(s, {"tone": tone}) if s == acc else s for s in pd]
    seq_case("graph PRODUCT_FEATURES_FOLLOWED_BY_DARK: following accordion tone=white", "PRODUCT_FEATURES_FOLLOWED_BY_DARK",
             "product-detail", pd_with("white"), ["/products/find"])
    seq_case("graph PRODUCT_FEATURES_FOLLOWED_BY_DARK: features followed by faq", "PRODUCT_FEATURES_FOLLOWED_BY_DARK",
             "product-detail", [s for s in pd if s != acc], ["/products/find"])
    e, w = V.validate_sequence(S(pd_with("dark")), "product-detail", ["/products/find"])
    flip("graph PRODUCT_FEATURES_FOLLOWED_BY_DARK: dark accordion after features is accepted", e, w,
         absent=["PRODUCT_FEATURES_FOLLOWED_BY_DARK"], clean=True)

    # ---- STRADDLE_FOLLOWED_BY_WHITE
    seq_case("graph STRADDLE_FOLLOWED_BY_WHITE: collage followed by dark section", "STRADDLE_FOLLOWED_BY_WHITE",
             "company-startups", [(s, {"tone": "dark"}) if s == "content.platform-columns" else s for s in st])
    seq_case("graph STRADDLE_FOLLOWED_BY_WHITE: hero.product followed by non-white", "STRADDLE_FOLLOWED_BY_WHITE",
             "product-detail", [(s, {"tone": "dark"}) if s == "content.product-features" else s for s in pd], ["/products/find"])

    # ---- accordions
    am = base_secs("apps-mobile")
    def am_with(flips):
        i = am.index(acc)
        return am[:i] + [(acc, {"flip": f}) for f in flips] + am[i + 1:]
    seq_case("graph ACCORDION_SHOWCASE_MAX_3: 4 accordions", "ACCORDION_SHOWCASE_MAX_3", "apps-mobile",
             am_with([False, True, False, True]), ["/apps/mobile"])
    seq_case("graph ACCORDION_ADJACENT_ALTERNATE: adjacent accordions share a side", "ACCORDION_ADJACENT_ALTERNATE",
             "apps-mobile", am_with([False, False]), ["/apps/mobile"])
    e, w = V.validate_sequence(S(am_with([False, True, False])), "apps-mobile", ["/apps/mobile"])
    flip("graph apps-mobile exception: 3 adjacent alternating accordions are NOT rejected", e, w,
         absent=["NO_ADJACENT_SAME_SECTION", "NO_ADJACENT_SAME_CATEGORY", "ACCORDION_SHOWCASE_MAX_3", "ACCORDION_ADJACENT_ALTERNATE"], clean=True)

    # ---- NO_ADJACENT_SAME_SECTION (+ instanceRoutes-scoped exception)
    cc = base_secs("company-careers")
    seq_case("graph NO_ADJACENT_SAME_SECTION: principle-rows twice in a row", "NO_ADJACENT_SAME_SECTION", "company-careers",
             [s for s in cc if s != "social-proof.logo-grid"], ["/careers"])
    two_acc = insert_after(pd, acc, (acc, {"flip": True}))
    two_acc = [(s, {"flip": False, "tone": "dark"}) if s == acc else s for s in two_acc[:5]] + two_acc[5:]
    two_acc = S(two_acc)
    e, w = V.validate_sequence(two_acc, "product-detail", ["/products/foundation"])
    flip("graph product-detail exception: adjacent accordions on /products/foundation are NOT rejected", e, w,
         absent=["NO_ADJACENT_SAME_SECTION", "NO_ADJACENT_SAME_CATEGORY"], clean=True)
    e, w = V.validate_sequence(two_acc, "product-detail", ["/products/find"])
    mutation("graph NO_ADJACENT_SAME_SECTION: same adjacent accordions on /products/find (exception is route-scoped)",
             "NO_ADJACENT_SAME_SECTION", e, w)
    mutation("graph NO_ADJACENT_SAME_CATEGORY: same adjacent accordions on /products/find warn (exception is route-scoped)",
             "NO_ADJACENT_SAME_CATEGORY", e, w, where="warnings")

    # ---- NO_ADJACENT_SAME_CATEGORY (warn)
    seq_case("graph NO_ADJACENT_SAME_CATEGORY: two social-proof sections adjacent (warning)", "NO_ADJACENT_SAME_CATEGORY",
             "home", insert_after(home, "social-proof.logo-marquee", "social-proof.customer-video-cards"), where="warnings")
    e, w = V.validate_sequence(S(insert_after(home, "hero.marketing-video", "content.lead-statement", "content.dark-problem")), "home")
    flip("graph NO_ADJACENT_SAME_CATEGORY: adjacent content-category sections are exempt", e, w,
         absent=["NO_ADJACENT_SAME_CATEGORY"])

    # ---- ONE_PER_PAGE_SECTIONS
    seq_case("graph ONE_PER_PAGE_SECTIONS: faq-accordion twice", "ONE_PER_PAGE_SECTIONS", "pricing",
             insert_after(pr, "content.faq-accordion", "content.plan-compare-table", "content.faq-accordion"))

    # ---- NO_CONSECUTIVE_SCROLL_STAGES
    seq_case("graph NO_CONSECUTIVE_SCROLL_STAGES: two scroll-stories back to back", "NO_CONSECUTIVE_SCROLL_STAGES",
             "company-about", insert_after(ca, "interactive.scroll-story", "interactive.scroll-story"))
    seq_case("graph NO_CONSECUTIVE_SCROLL_STAGES: two scroll-stories separated (max 1/page)", "NO_CONSECUTIVE_SCROLL_STAGES",
             "company-about", insert_after(ca, "content.team-cards", "interactive.scroll-story"))

    # ---- MOTION_BUDGET (warn)
    seq_case("graph MOTION_BUDGET: 5 ambient-motion sections (warning)", "MOTION_BUDGET", "home",
             insert_after(home, "interactive.ask-reevo-carousel", "interactive.scroll-story", "hero.mobile-app", "interactive.accordion-showcase"),
             where="warnings")
    e, w = V.validate_sequence(S(home), "home")
    flip("graph MOTION_BUDGET: the real home page is within budget", e, w, absent=["MOTION_BUDGET"])

    # ---- FAQ_FOLLOWED_BY_CTA (warn) + exception
    seq_case("graph FAQ_FOLLOWED_BY_CTA: faq followed by footer on pricing (warning)", "FAQ_FOLLOWED_BY_CTA", "pricing",
             [s for s in pr if s != "conversion.cta-band"], where="warnings")
    e, w = V.validate_sequence(S(base_secs("product-tour")), "product-tour", ["/product-tour"])
    flip("graph FAQ_FOLLOWED_BY_CTA exception: product-tour ends on its FAQ without a warning", e, w,
         absent=["FAQ_FOLLOWED_BY_CTA"], clean=True)

    # ---- full-page path: tone derived from content (accordion theme) reaches the graph rule via validate()
    pdt = next(t for t in TEMPLATES["templates"] if t["id"] == "product-detail")
    sp = synth_spec(pdt)
    node_of(sp, acc)["content"]["theme"] = "light"
    e, w = V_(sp)
    mutation("graph via validate(): content.theme=light accordion after product-features", "PRODUCT_FEATURES_FOLLOWED_BY_DARK", e, w)

    # every rule in graph.json is covered by a mutation of the right severity
    for rid in rule_ids:
        got = EXERCISED.get(rid)
        record("graph-coverage", f"graph rule {rid} ({sev[rid]}) has a triggering mutation", bool(got), "no mutation triggers it")


# ================================================================== ASSET ROLES (MASTER-GUIDE 3.23) + SCRATCH-COPY REPO MUTATIONS
def scratch_copy():
    root = tempfile.mkdtemp(prefix="reevo-adv-")  # honours TMPDIR; the real repo is never written to
    dst = os.path.join(root, "design-repo")
    shutil.copytree(REPO, dst, ignore=shutil.ignore_patterns("__pycache__", "*.pyc"))
    return root, dst


def fresh(dst):
    V.Repo._cache.pop(os.path.abspath(dst), None)


def edit_json(path, fn):
    with open(path, encoding="utf-8") as f:
        d = json.load(f)
    fn(d)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(d, f, indent=2)


def run_asset_cases():
    real_assets_path = os.path.join(REPO, "assets", "asset-roles.json")
    with open(real_assets_path, "rb") as f:
        before = f.read()

    # real repo, untouched: no drift
    e, w = V_(D(EXAMPLE))
    flip("assets: untouched real repo does not fire PINNED_ROLE_DRIFT", e, w, absent=["PINNED_ROLE_DRIFT"], clean=True)

    enum = ASSETS["generationPolicyEnum"]
    enum = list(enum.keys()) if isinstance(enum, dict) else list(enum)
    pinned = {r: p for r, p in ASSETS["pinnedRoles"].items() if not r.startswith("$")}
    record("control", f"assets: pinnedRoles has entries and the policy enum has >=2 values ({len(pinned)} pinned)",
           len(pinned) > 0 and len(enum) >= 2)

    root, dst = scratch_copy()
    try:
        ap = os.path.join(dst, "assets", "asset-roles.json")
        e, w = V_(D(EXAMPLE), repo_root=dst)
        flip("assets: scratch copy, untouched, does not fire PINNED_ROLE_DRIFT", e, w, absent=["PINNED_ROLE_DRIFT"], clean=True)
        pristine = open(ap, encoding="utf-8").read()

        for role, pin in pinned.items():
            want = pin["generationPolicy"]
            for new in [v for v in enum if v != want][:2]:  # two different-but-valid values per role
                open(ap, "w", encoding="utf-8").write(pristine)
                edit_json(ap, lambda d, role=role, new=new: d["roles"][role].update(generationPolicy=new))
                fresh(dst)
                e, w = V_(D(EXAMPLE), repo_root=dst)
                ok = any(m.startswith("PINNED_ROLE_DRIFT:") and f"'{role}'" in m for m in e)
                name = f"assets: pinned role '{role}' policy {want} -> {new} (valid enum value) fires PINNED_ROLE_DRIFT"
                if ok:
                    mutation(name, "PINNED_ROLE_DRIFT", e, w)
                else:
                    record("mutation", name, False, f"NOT REJECTED for role {role}; errors={ids_in(e)}")

        # pinned role removed from roles entirely
        open(ap, "w", encoding="utf-8").write(pristine)
        edit_json(ap, lambda d: d["roles"].pop(next(iter(pinned))))
        fresh(dst)
        e, w = V_(D(EXAMPLE), repo_root=dst)
        mutation("assets: pinned role deleted from roles fires PINNED_ROLE_DRIFT", "PINNED_ROLE_DRIFT", e, w)
        open(ap, "w", encoding="utf-8").write(pristine)

        # unpinned role changing policy is NOT drift
        unpinned = next(r for r in ASSETS["roles"] if r not in pinned)
        cur = ASSETS["roles"][unpinned]["generationPolicy"]
        edit_json(ap, lambda d: d["roles"][unpinned].update(generationPolicy=next(v for v in enum if v != cur)))
        fresh(dst)
        e, w = V_(D(EXAMPLE), repo_root=dst)
        flip(f"assets: changing unpinned role '{unpinned}' policy is not PINNED_ROLE_DRIFT", e, w, absent=["PINNED_ROLE_DRIFT"])
        open(ap, "w", encoding="utf-8").write(pristine)

        # graph.json naming a check that has no implementation
        gp = os.path.join(dst, "compatibility", "graph.json")
        edit_json(gp, lambda d: d["rules"][0]["enforcedBy"].update(check="check_that_does_not_exist"))
        fresh(dst)
        e, w = V_(D(EXAMPLE), repo_root=dst)
        mutation("repo: graph rule naming an unimplemented check (scratch copy) fires GRAPH_UNIMPLEMENTED", "GRAPH_UNIMPLEMENTED", e, w)
    finally:
        shutil.rmtree(root, ignore_errors=True)

    with open(real_assets_path, "rb") as f:
        record("control", "assets: real repo asset-roles.json unchanged by the suite", f.read() == before)

    # third-party-embed: live URL rejected, placeholder accepted
    tour = next(t for t in TEMPLATES["templates"] if t["id"] == "product-tour")
    base = synth_spec(tour)
    def setref(v):
        s = D(base)
        node_of(s, "content.tour-demo")["content"]["demoDesktop"]["ref"] = v
        return s
    for bad in ("https://app.example.com/demo/123", "http://demo.example.com/x", "//demo.example.com/x", "x-embed-slot:", "demo-frame"):
        e, w = V_(setref(bad))
        mutation(f"assets: third-party-embed ref {bad!r} rejected", "LIVE_ENDPOINT_REF", e, w)
    e, w = V_(setref("x-embed-slot:tour-desktop"))
    flip("assets: third-party-embed ref 'x-embed-slot:tour-desktop' is accepted", e, w, absent=["LIVE_ENDPOINT_REF"], clean=True)
    sp = D(base)
    node_of(sp, "content.tour-demo")["content"]["demoDesktop"]["assetRole"] = "customer-logo"
    e, w = V_(sp)
    mutation("assets: third-party-embed field given a non-embed role", ["ASSET_ROLE_MISMATCH", "SCHEMA"], e, w)


# ================================================================== VALIDATOR ROBUSTNESS
def run_robustness():
    def rb(name, spec, expect=None, **kw):
        try:
            e, w = V.validate(spec, **kw)
        except Exception as ex:
            record("robust", name, False, f"RAISED {type(ex).__name__}: {ex}")
            return
        # skipSchema=True is the semantic-only mode: a schema-only defect is legitimately invisible there,
        # so for those inputs the requirement is only "does not raise"
        need_errors = not (kw.get("skipSchema") and expect is None)
        ok = (bool(e) or not need_errors) and (expect is None or has(e, expect))
        if ok and expect:
            EXERCISED.setdefault(expect, []).append(name)
        record("robust", name, ok, f"errors={ids_in(e)}" if not ok else "")

    good_node = lambda: D(EXAMPLE["nodes"][0])
    for skip in (False, True):
        tag = " (skipSchema)" if skip else ""
        rb("empty spec {}" + tag, {}, None, skipSchema=skip)
        rb("spec is None" + tag, None, "SPEC_SHAPE", skipSchema=skip)
        rb("spec is a list" + tag, [], "SPEC_SHAPE", skipSchema=skip)
        rb("spec is a string" + tag, "hello", "SPEC_SHAPE", skipSchema=skip)
        rb("nodes is a string" + tag, {**D(EXAMPLE), "nodes": "nope"}, "SPEC_SHAPE", skipSchema=skip)
        rb("nodes is a dict" + tag, {**D(EXAMPLE), "nodes": {"a": 1}}, "SPEC_SHAPE", skipSchema=skip)
        rb("nodes is None" + tag, {**D(EXAMPLE), "nodes": None}, "SPEC_SHAPE", skipSchema=skip)
        rb("nodes is empty list" + tag, {**D(EXAMPLE), "nodes": []}, None, skipSchema=skip)
        rb("nodes contains None/int/str/list" + tag, {**D(EXAMPLE), "nodes": [None, 1, "x", []]}, None, skipSchema=skip)
        rb("node without section" + tag, {**D(EXAMPLE), "nodes": [{"content": {}}]}, None, skipSchema=skip)
        rb("node section is not a string" + tag, {**D(EXAMPLE), "nodes": [{"section": 5, "content": {}, "motion": {}}]}, None, skipSchema=skip)

        for label, val in (("null", None), ("string", "x"), ("list", [1, None]), ("int", 3)):
            s = D(EXAMPLE)
            s["nodes"][1]["content"] = val
            rb(f"content is {label}" + tag, s, None, skipSchema=skip)
        s = D(EXAMPLE); s["nodes"][1]["motion"] = None
        rb("motion is null" + tag, s, None, skipSchema=skip)
        s = D(EXAMPLE); s["nodes"][1]["motion"] = {"pattern": None, "additionalMotion": "x"}
        rb("motion has null pattern / non-list additionalMotion" + tag, s, None, skipSchema=skip)
        s = D(EXAMPLE); s["nodes"][1]["variant"] = None
        rb("node variant is null" + tag, s, None, skipSchema=skip)
        s = D(EXAMPLE); s["route"] = 5; s["template"] = ["home"]
        rb("route int / template list" + tag, s, None, skipSchema=skip)
        s = D(EXAMPLE); node_of(s, "shell.navbar")["content"]["wordmark"] = None
        rb("asset field is null" + tag, s, None, skipSchema=skip)
        s = D(EXAMPLE); node_of(s, "shell.navbar")["content"]["wordmark"] = {"assetRole": ["x"], "ref": 3}
        rb("assetRole is a list / ref is an int" + tag, s, None, skipSchema=skip)
        blog = next(t for t in TEMPLATES["templates"] if t["id"] == "blog-post")
        s = synth_spec(blog); node_of(s, "content.post-article")["content"]["body"] = [None, "x", {"block": 5}, {"block": "h2", "text": 7}]
        rb("post body blocks malformed" + tag, s, None, skipSchema=skip)

    # validate_sequence must not raise on odd sequences either
    try:
        V.validate_sequence([], "home")
        V.validate_sequence(S(["shell.navbar"]), "no-such-template")
        ok = True
    except Exception as ex:
        ok = False
    record("robust", "validate_sequence on empty sequence / unknown template does not raise", ok)


# ================================================================== RULE_IDS COVERAGE + SUMMARY
def coverage_report():
    print("\n---- RULE_IDS coverage ----")
    missing = []
    for rid in V.RULE_IDS:
        cases = EXERCISED.get(rid)
        if cases:
            print(f"  {rid:38s} exercised by {len(cases)} case(s), e.g. {cases[0]}")
        elif rid in NOT_EXERCISED:
            print(f"  {rid:38s} NOT_EXERCISED: {NOT_EXERCISED[rid]}")
        else:
            print(f"  {rid:38s} *** neither exercised nor listed in NOT_EXERCISED ***")
            missing.append(rid)
    stale = [r for r in NOT_EXERCISED if r in EXERCISED]
    if stale:
        print(f"  note: NOT_EXERCISED entries that are in fact exercised (remove them): {stale}")
    record("coverage", f"every RULE_IDS id ({len(V.RULE_IDS)}) is exercised or explicitly listed", not missing,
           f"unaccounted: {missing}")
    unknown = [r for r in EXERCISED if r not in V.RULE_IDS]
    record("coverage", "every expected rule id used by a mutation exists in RULE_IDS", not unknown, f"unknown: {unknown}")
    graph_ids = [r["id"] for r in GRAPH["rules"]]
    record("coverage", f"RULE_IDS contains all {len(graph_ids)} graph.json rule ids",
           all(g in V.RULE_IDS for g in graph_ids), "")


def main():
    run_controls()
    run_schema_mutations()
    run_structural_mutations()
    run_runtime_mutations()
    run_graph_cases()
    run_asset_cases()
    run_robustness()
    coverage_report()
    by = {}
    for k, _, ok, _ in RESULTS:
        c = by.setdefault(k, [0, 0])
        c[0 if ok else 1] += 1
    failed = [r for r in RESULTS if not r[2]]
    print("\n==== SUMMARY ====")
    for k, (p, f) in by.items():
        print(f"  {k:15s} pass={p:3d} fail={f:3d}")
    print(f"  total cases: {len(RESULTS)}  passed: {len(RESULTS) - len(failed)}  failed: {len(failed)}  "
          f"({time.time() - T0:.1f}s)")
    for k, n, _, d in failed:
        print(f"  FAILED [{k}] {n}: {d}")
    print("RESULT:", "FAIL" if failed else "PASS")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
