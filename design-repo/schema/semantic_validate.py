#!/usr/bin/env python3
"""Semantic validator for Reevo PageSpecs (everything JSON Schema cannot express).

Usage:   python3 schema/semantic_validate.py <pagespec.json> [--json]
Exit:    1 when any error is reported, 0 otherwise (warnings never fail).
API:     validate(spec, repo_root=None, skipSchema=False) -> (errors, warnings)
         validate_sequence(seq, template_id, routes=None, repo_root=None) -> (errors, warnings)
Every message starts with a stable rule id followed by ": " (see RULE_IDS).

Layers, in order:
  1. SCHEMA      Draft7 validation against schema/pagespec.schema.json
  2. ROUTE_*     route belongs to the declared template (templates/routes.json)
  3. TEMPLATE_*  nodes[] cross-referenced against THAT template's node list (templates/templates.json)
  4. graph rules every rule in compatibility/graph.json, ported from compatibility/verify_rules.py;
                 severity and named exceptions are read from the graph at runtime
  5. per node    MAXWORDS, MOTION_*, VARIANT_MISMATCH, ASSET_*, LIVE_ENDPOINT_REF, POST_BODY_*
  6. repo        PINNED_ROLE_DRIFT (asset-roles.json pinned values)
Stdlib + jsonschema only. The repo root is derived from this file's location, never hardcoded.
"""
import copy
import html
import json
import os
import re
import sys

import jsonschema

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INF = float("inf")

# Ids owned by this module (graph rule ids are appended below from graph.json at import time).
STRUCTURAL_RULE_IDS = [
    "SCHEMA",
    "SPEC_SHAPE",
    "ROUTE_TEMPLATE_MISMATCH",
    "ROUTE_UNKNOWN_TEMPLATE",
    "TEMPLATE_MISSING_REQUIRED",
    "TEMPLATE_EXTRA_SECTION",
    "TEMPLATE_MAX_COUNT",
    "TEMPLATE_ORDER",
    "INSTANCE_DEVIATION",
    "CONTRACT_MAX_PER_PAGE",
    "GRAPH_UNIMPLEMENTED",
    "MAXWORDS",
    "MOTION_MISSING",
    "MOTION_NO_FALLBACK",
    "MOTION_PATTERN_NOT_ALLOWED",
    "VARIANT_MISMATCH",
    "ASSET_ROLE_UNKNOWN",
    "ASSET_ROLE_MISMATCH",
    "ASSET_REF_URL",
    "PINNED_ROLE_DRIFT",
    "LIVE_ENDPOINT_REF",
    "POST_BODY_FAQ_NOT_LAST",
    "POST_BODY_BLOCK_NOT_ALLOWED",
    "POST_BODY_DUPLICATE_H2",
    "UNKNOWN_SECTION",
]


def _load(*parts):
    with open(os.path.join(*parts), encoding="utf-8") as f:
        return json.load(f)


def _graph_rule_ids(root=REPO_ROOT):
    try:
        return [r["id"] for r in _load(root, "compatibility", "graph.json")["rules"]]
    except (OSError, ValueError, KeyError):
        return []


RULE_IDS = STRUCTURAL_RULE_IDS + [i for i in _graph_rule_ids() if i not in STRUCTURAL_RULE_IDS]


# --------------------------------------------------------------------------- repo data
class Repo:
    """Everything the validator reads from the design-repo, loaded once per root."""

    _cache = {}

    @classmethod
    def get(cls, root=None):
        root = os.path.abspath(root or REPO_ROOT)
        if root not in cls._cache:
            cls._cache[root] = cls(root)
        return cls._cache[root]

    def __init__(self, root):
        self.root = root
        self.schema = _load(root, "schema", "pagespec.schema.json")
        self.templates_doc = _load(root, "templates", "templates.json")
        self.templates = {t["id"]: t for t in self.templates_doc["templates"]}
        self.routes = _load(root, "templates", "routes.json")["routes"]
        self.graph = _load(root, "compatibility", "graph.json")
        self.rules = self.graph["rules"]
        self.assets = _load(root, "assets", "asset-roles.json")
        self.sections = {}
        sec_dir = os.path.join(root, "sections")
        for fn in sorted(os.listdir(sec_dir)):
            if fn.endswith(".json"):
                d = _load(sec_dir, fn)
                self.sections[d["id"]] = d
        self.validator = jsonschema.Draft7Validator(self.schema)
        # per-section `then` branch of the schema's node allOf, keyed by section id
        self.node_branch = {}
        for a in self.schema["definitions"]["node"].get("allOf", []):
            try:
                self.node_branch[a["if"]["properties"]["section"]["const"]] = a["then"]
            except KeyError:
                pass


def cat(section):
    return section.split(".")[0]


# --------------------------------------------------------------------------- routes
def _norm_route(r):
    r = r.split("#")[0].split("?")[0]
    if len(r) > 1 and r.endswith("/"):
        r = r.rstrip("/") or "/"
    return r


def route_matches(pattern, route):
    """`:param` matches exactly one non-empty segment; `*` is the catch-all (see resolve_route)."""
    pattern, route = _norm_route(pattern), _norm_route(route)
    if pattern == route:
        return True
    if pattern == "*" or route == "*":
        return False
    ps, rs = pattern.strip("/").split("/"), route.strip("/").split("/")
    if len(ps) != len(rs):
        return False
    return all((p.startswith(":") and r != "") or p == r for p, r in zip(ps, rs))


def resolve_route(route, repo):
    """Return the routes.json entries that serve `route`: literal/param matches win; otherwise the
    `*` catch-all (src/App.jsx:102 renders <Home/> for every unmatched URL)."""
    hits = [r for r in repo.routes if r["path"] != "*" and route_matches(r["path"], route)]
    if hits:
        # literal beats param
        lit = [r for r in hits if ":" not in r["path"]]
        return lit or hits
    return [r for r in repo.routes if r["path"] == "*"]


# --------------------------------------------------------------------------- template cross-reference
def _bounds(n):
    lo = 1 if n.get("required") else 0
    if n.get("repeatable"):
        hi = n.get("maxCount") or INF
    else:
        hi = 1
    return lo, hi


def template_items(t):
    """Template nodes -> ordered items: ('node', n) or ('pool', [n..]) for a run of one `group`."""
    items, nodes, i = [], t["nodes"], 0
    while i < len(nodes):
        g = nodes[i].get("group")
        if g:
            pool = []
            while i < len(nodes) and nodes[i].get("group") == g:
                pool.append(nodes[i])
                i += 1
            items.append(("pool", pool))
        else:
            items.append(("node", nodes[i]))
            i += 1
    return items


def _template_counts(t):
    lo, hi = {}, {}
    for n in t["nodes"]:
        a, b = _bounds(n)
        lo[n["section"]] = lo.get(n["section"], 0) + a
        hi[n["section"]] = hi.get(n["section"], 0) + b
    return lo, hi


def _pool_ok(pool, secs):
    lo, hi = {}, {}
    for n in pool:
        a, b = _bounds(n)
        lo[n["section"]] = lo.get(n["section"], 0) + a
        hi[n["section"]] = hi.get(n["section"], 0) + b
    if any(s not in lo for s in secs):
        return False
    return all(lo[s] <= secs.count(s) <= hi[s] for s in lo)


def _successors(items, idx, pos, secs):
    """Yield (idx', pos') reachable by consuming item idx starting at pos."""
    kind, it = items[idx]
    if kind == "node":
        lo, hi = _bounds(it)
        k = 0
        while True:
            if k >= lo:
                yield idx + 1, pos + k
            if k >= hi or pos + k >= len(secs) or secs[pos + k] != it["section"]:
                return
            k += 1
    else:
        pool_secs = {n["section"] for n in it}
        j = pos
        while True:
            if _pool_ok(it, secs[pos:j]):
                yield idx + 1, j
            if j >= len(secs) or secs[j] not in pool_secs:
                return
            j += 1


def match_template(t, secs):
    """(matched: bool, stuck_at: int, expected: set) -- full-sequence match plus, on failure, the
    furthest position any partial match reached and what the template allowed there."""
    items = template_items(t)
    seen, stack, best, exp = set(), [(0, 0)], -1, set()
    while stack:
        st = stack.pop()
        if st in seen:
            continue
        seen.add(st)
        idx, pos = st
        if idx == len(items):
            if pos == len(secs):
                return True, pos, set()
            continue
        if pos > best:
            best, exp = pos, set()
        if pos == best:
            kind, it = items[idx]
            exp |= {it["section"]} if kind == "node" else {n["section"] for n in it}
        stack.extend(_successors(items, idx, pos, secs))
    return False, max(best, 0), exp


def check_template(secs, template_id, repo):
    """The cross-reference: nodes[] against the DECLARED template's real node list."""
    t = repo.templates.get(template_id)
    if t is None:
        return [f"ROUTE_UNKNOWN_TEMPLATE: template '{template_id}' is not in templates/templates.json"]
    errs = []
    lo, hi = _template_counts(t)
    for s in sorted(set(secs) - set(lo)):
        errs.append(f"TEMPLATE_EXTRA_SECTION: '{s}' is not in template '{template_id}' (template sections: {', '.join(dict.fromkeys(n['section'] for n in t['nodes']))})")
    counted = False
    for s in lo:
        c = secs.count(s)
        if c < lo[s]:
            errs.append(f"TEMPLATE_MISSING_REQUIRED: template '{template_id}' requires {lo[s]} x '{s}', page has {c}")
            counted = True
        elif c > hi[s]:
            errs.append(f"TEMPLATE_MAX_COUNT: '{s}' appears {c} times, template '{template_id}' allows at most {hi[s]}")
            counted = True
    if not errs and not counted:
        ok, at, exp = match_template(t, secs)
        if not ok:
            got = secs[at] if at < len(secs) else "end of page"
            errs.append(f"TEMPLATE_ORDER: node {at} is '{got}' but template '{template_id}' expects one of {sorted(exp)} there")
    return errs


# --------------------------------------------------------------------------- graph rules
# One-to-one ports of compatibility/verify_rules.py `check_*` (same names, same params from graph.json).
# A "seq" is a list of dicts {section, tone?, flip?, variant?}; tone/flip None = unknown = skipped.
# Only change vs the reference: index guards where the reference would raise IndexError at page end.
def ids(seq):
    return [x["section"] for x in seq]


def check_one_hero(seq, tid, p):
    n = sum(1 for s in ids(seq) if cat(s) == p["category"])
    if n > p["max"]:
        return [f"{n} heroes"]
    if n == 0:
        return ["no hero (allowed only for a named heroless template)"]
    return []


def check_shell_one_per_page(seq, tid, p):
    return [f"{s} x{ids(seq).count(s)}" for s in p["sections"] if ids(seq).count(s) != 1]


def check_shell_first_last(seq, tid, p):
    s, v = ids(seq), []
    if not s:
        return ["empty page"]
    if s[0] != p["first"]:
        v.append(f"first is {s[0]}")
    if s[-1] != p["last"]:
        v.append(f"last is {s[-1]}")
    return v


def check_hero_follows_nav(seq, tid, p):
    s = ids(seq)
    return [f"{x} preceded by {s[i-1] if i else None}" for i, x in enumerate(s)
            if cat(x) == p["category"] and (i == 0 or s[i - 1] not in p["allowedPredecessors"])]


def check_must_immediately_follow(seq, tid, p):
    s, v = ids(seq), []
    for a, b in p["pairs"]:  # b must be immediately preceded by a
        for i, x in enumerate(s):
            if x == b and (i == 0 or s[i - 1] != a):
                v.append(f"{b} not directly after {a}")
    return v


def check_must_be_followed_by(seq, tid, p):
    s, v = ids(seq), []
    for a, b in p["pairs"]:
        for i, x in enumerate(s):
            if x == a and (i + 1 >= len(s) or s[i + 1] != b):
                v.append(f"{a} not directly followed by {b}")
    return v


def check_cta_before_footer(seq, tid, p):
    s, v = ids(seq), []
    n = s.count(p["section"])
    if n > p["max"]:
        v.append(f"{n} cta bands")
    for i, x in enumerate(s):
        if x == p["section"]:
            j = i + 1
            while j < len(s) and s[j] in p["allowedBetween"]:
                j += 1
            # reference semantics kept verbatim: `j != i + 1` makes allowedBetween inert, so a page
            # with the footnote strip only passes through the named exception (integrations).
            if j >= len(s) or s[j] != p["followedBy"] or j != i + 1:
                v.append(f"cta followed by {s[i+1] if i + 1 < len(s) else 'nothing'}")
    return v


def check_product_features_then_dark(seq, tid, p):
    v = []
    for i, x in enumerate(seq):
        if x["section"] == p["section"]:
            nxt = seq[i + 1] if i + 1 < len(seq) else None
            if nxt is None or nxt["section"] not in p["nextMayBe"]:
                v.append(f"next is {nxt and nxt['section']}")
            elif nxt.get("tone") is not None and nxt["tone"] != "dark":
                v.append(f"next {nxt['section']} tone {nxt['tone']}")
    return v


def check_straddle_then_white(seq, tid, p):
    v = []
    for i, x in enumerate(seq):
        if x["section"] in p["sections"]:
            nxt = seq[i + 1] if i + 1 < len(seq) else None
            if nxt is None:
                v.append("nothing follows")
                continue
            if nxt.get("tone") is not None and nxt["tone"] != "white":
                v.append(f"{x['section']} followed by {nxt['section']} tone {nxt['tone']}")
    return v


def check_accordion_max(seq, tid, p):
    n = ids(seq).count(p["section"])
    return [f"{n} accordions"] if n > p["max"] else []


def check_accordion_alternate(seq, tid, p):
    v = []
    for a, b in zip(seq, seq[1:]):
        if a["section"] == b["section"] == p["section"] and a.get("flip") is not None and a["flip"] == b.get("flip"):
            v.append("adjacent accordions share a side")
    return v


def check_no_adjacent_same_section(seq, tid, p):
    return [f"{a} twice in a row" for a, b in zip(ids(seq), ids(seq)[1:]) if a == b]


def check_no_adjacent_same_category(seq, tid, p):
    return [f"{a} next to {b}" for a, b in zip(ids(seq), ids(seq)[1:])
            if cat(a) == cat(b) and cat(a) not in p["exemptCategories"]]


def check_one_per_page(seq, tid, p):
    s, v = ids(seq), []
    for x in p["sections"]:
        if s.count(x) > 1:
            v.append(f"{x} x{s.count(x)}")
    return v


def check_no_consecutive_scroll_stages(seq, tid, p):
    s, v = ids(seq), []
    if sum(1 for x in s if x in p["stageSections"]) > p["maxPerPage"]:
        v.append("too many scroll stages")
    v += [f"{a},{b} consecutive" for a, b in zip(s, s[1:]) if a in p["stageSections"] and b in p["stageSections"]]
    return v


def check_motion_budget(seq, tid, p):
    n = sum(1 for x in ids(seq) if x in p["ambientSections"])
    return [f"{n} ambient-motion sections > {p['maxAmbient']}"] if n > p["maxAmbient"] else []


def check_faq_followed_by_cta(seq, tid, p):
    s = ids(seq)
    return [f"faq followed by {s[i+1] if i + 1 < len(s) else 'nothing'}" for i, x in enumerate(s)
            if x == p["section"] and (i + 1 >= len(s) or s[i + 1] != p["followedBy"])]


CHECKS = {f.__name__: f for f in [
    check_one_hero, check_shell_one_per_page, check_shell_first_last, check_hero_follows_nav,
    check_must_immediately_follow, check_must_be_followed_by, check_cta_before_footer,
    check_product_features_then_dark, check_straddle_then_white, check_accordion_max,
    check_accordion_alternate, check_no_adjacent_same_section, check_no_adjacent_same_category,
    check_one_per_page, check_no_consecutive_scroll_stages, check_motion_budget, check_faq_followed_by_cta]}


def run_graph(seq, template_id, routes, repo):
    """Apply every graph.json rule. Exceptions are read from the rule: an exception covers the whole
    rule for its template, and (when it has `instanceRoutes`) only for those routes."""
    errors, warnings = [], []
    for r in repo.rules:
        fn = CHECKS.get(r["enforcedBy"]["check"])
        if fn is None:
            errors.append(f"GRAPH_UNIMPLEMENTED: {r['id']} names check '{r['enforcedBy']['check']}' with no implementation")
            continue
        covered = False
        for e in r.get("exceptions", []):
            if e["template"] != template_id:
                continue
            ir = e.get("instanceRoutes")
            if ir is None or any(route_matches(pat, rt) for pat in ir for rt in (routes or [])):
                covered = True
        if covered:
            continue
        for m in fn(seq, template_id, r["params"]):
            (errors if r["severity"] == "error" else warnings).append(f"{r['id']}: {m}")
    return errors, warnings


# --------------------------------------------------------------------------- tone / flip for a PageSpec
# A PageSpec has no tone field. Order of precedence: (1) derived from the node's own content where the
# contract makes it explicit, (2) the real per-route instance in templates.json when the page's section
# sequence equals that instance's, (3) unknown (None -> the tone rules skip, as in verify_rules.py).
def content_tone(section, content):
    c = content if isinstance(content, dict) else {}
    if section == "interactive.accordion-showcase" and c.get("theme") in ("dark", "light"):
        return "dark" if c["theme"] == "dark" else "white"
    if section == "content.product-cards" and isinstance(c.get("dark"), bool):
        return "dark" if c["dark"] else "tinted"
    if section == "media.photo-pattern-collage" and c.get("bandColor") in ("white", "gray-10"):
        return "white" if c["bandColor"] == "white" else "dark"
    return None


def content_flip(section, content):
    c = content if isinstance(content, dict) else {}
    if section == "interactive.accordion-showcase" and c.get("imageSide") in ("left", "right"):
        return c["imageSide"] == "left"
    return None


def matching_instance(tid, secs, routes, repo):
    t = repo.templates.get(tid)
    if not t:
        return None
    cands = [i for i in t["instances"] if ids(i["sequence"]) == secs]
    for i in cands:
        if any(route_matches(ir, rt) for ir in i["routes"] for rt in (routes or [])):
            return i
    return cands[0] if cands else None


# --------------------------------------------------------------------------- content walk (maxWords, asset roles)
_TAG = re.compile(r"<[^>]*>")


def count_words(s):
    """Strip inline HTML tags, unescape entities, count whitespace-separated tokens."""
    return len(html.unescape(_TAG.sub("", s)).split())


def _resolve_ref(root, ref):
    cur = root
    for part in ref[2:].split("/"):
        cur = cur[part.replace("~1", "/").replace("~0", "~")]
    return cur


def _pick(root, branches, inst):
    defs = {"definitions": root.get("definitions", {})}
    valid = [b for b in branches if jsonschema.Draft7Validator({**b, **defs}).is_valid(inst)]
    if valid:
        return valid
    if isinstance(inst, dict):  # discriminator fallback for an invalid instance: match every const
        def consts(b):
            return {k: v["const"] for k, v in (b.get("properties") or {}).items() if isinstance(v, dict) and "const" in v}
        return [b for b in branches if consts(b) and all(inst.get(k) == v for k, v in consts(b).items())]
    return []


def walk_schema(root, sch, inst, path, out):
    """Walk an instance alongside the schema fragment that describes it, collecting x-maxWords
    overruns and (declared role, actual role) pairs at every assetRef $ref."""
    if not isinstance(sch, dict):
        return
    if "$ref" in sch:
        m = re.fullmatch(r"#/definitions/assetRef\.([\w-]+)", sch["$ref"])
        if m:
            if isinstance(inst, dict):
                out["roles"].append((path, m.group(1), inst.get("assetRole")))
            return
        sch = _resolve_ref(root, sch["$ref"])
    if "x-maxWords" in sch and isinstance(inst, str):
        n = count_words(inst)
        if n > sch["x-maxWords"]:
            out["words"].append((path, n, sch["x-maxWords"]))
    for sub in sch.get("allOf", []):
        walk_schema(root, sub, inst, path, out)
    for key in ("oneOf", "anyOf"):
        if key in sch:
            for b in _pick(root, sch[key], inst):
                walk_schema(root, b, inst, path, out)
    if isinstance(inst, dict) and isinstance(sch.get("properties"), dict):
        for k, sub in sch["properties"].items():
            if k in inst:
                walk_schema(root, sub, inst[k], f"{path}.{k}" if path else k, out)
    if isinstance(inst, list) and isinstance(sch.get("items"), dict):
        for i, x in enumerate(inst):
            walk_schema(root, sch["items"], x, f"{path}[{i}]", out)


def find_asset_refs(x, path=""):
    if isinstance(x, dict):
        if "assetRole" in x:
            yield path, x
        for k, v in x.items():
            yield from find_asset_refs(v, f"{path}.{k}" if path else k)
    elif isinstance(x, list):
        for i, v in enumerate(x):
            yield from find_asset_refs(v, f"{path}[{i}]")


EMBED_PLACEHOLDER = re.compile(r"^x-embed-slot:[A-Za-z0-9._-]+$")
URLISH = re.compile(r"^(?:[a-z][a-z0-9+.-]*:)?//", re.I)


def check_assets(node, i, out, repo):
    sec, errors, warnings = node["section"], out["errors"], out["warnings"]
    roles = repo.assets["roles"]
    live_roles = {r for r, d in roles.items() if d.get("generationPolicy") == "must-not-reuse-live-endpoint"}
    for path, ref in find_asset_refs(node.get("content")):
        role = ref.get("assetRole")
        where = f"{sec}.content.{path} (node {i})"
        if not isinstance(role, str) or role not in roles:
            errors.append(f"ASSET_ROLE_UNKNOWN: {where}: assetRole {role!r} is not in assets/asset-roles.json")
            continue
        val = ref.get("ref")
        if role in live_roles:
            if not (isinstance(val, str) and EMBED_PLACEHOLDER.match(val)):
                errors.append(f"LIVE_ENDPOINT_REF: {where}: '{role}' ref must be a placeholder 'x-embed-slot:<name>', got {val!r}")
        elif isinstance(val, str) and URLISH.match(val):
            warnings.append(f"ASSET_REF_URL: {where}: '{role}' ref looks like a URL ({val}); refs should be repo paths")


def check_pinned_roles(repo):
    errs, roles = [], repo.assets["roles"]
    for role, pin in repo.assets.get("pinnedRoles", {}).items():
        if role.startswith("$"):
            continue
        want = pin.get("generationPolicy")
        have = roles.get(role, {}).get("generationPolicy")
        if role not in roles:
            errs.append(f"PINNED_ROLE_DRIFT: pinned role '{role}' is missing from asset-roles.json roles")
        elif have != want:
            errs.append(f"PINNED_ROLE_DRIFT: role '{role}' generationPolicy is '{have}', pinned to '{want}'")
    return errs


# --------------------------------------------------------------------------- per-node checks
def check_motion(node, i, contract, errors):
    sec, m = node["section"], node.get("motion")
    if not isinstance(m, dict):
        errors.append(f"MOTION_MISSING: {sec} (node {i}) has no motion object")
        return
    allowed = set()
    cm = contract.get("motion") or {}
    if cm.get("pattern"):
        allowed.add(cm["pattern"])
    for a in contract.get("additionalMotion") or []:
        allowed.add(a.get("pattern"))
    entries = [("motion", m)] + [(f"additionalMotion[{k}]", a) for k, a in enumerate(m.get("additionalMotion") or [])]
    for label, e in entries:
        if not isinstance(e, dict):
            continue
        if not e.get("reducedMotionFallback"):
            errors.append(f"MOTION_NO_FALLBACK: {sec}.{label} (node {i}) has no reducedMotionFallback")
        if allowed and e.get("pattern") not in allowed:
            errors.append(f"MOTION_PATTERN_NOT_ALLOWED: {sec}.{label} (node {i}) pattern '{e.get('pattern')}' not in {sorted(allowed)}")


def check_variant_agreement(node, i, contract, errors, repo):
    """A contract that declares a content field named `variant` (platform-columns, testimonial, and also
    lead-statement, principle-rows, logo-grid) duplicates the node-level `variant`: the two must agree."""
    if "variant" not in contract["content"]["fields"]:
        return
    c = node.get("content") if isinstance(node.get("content"), dict) else {}
    # The node-level variant is schema-optional, so the schema alone can't force the pair to agree. Once
    # content.variant is set, the node must carry the same variant: both-present-and-different, or
    # content-only, is a mismatch.
    if "variant" in c and c["variant"] != node.get("variant"):
        errors.append(f"VARIANT_MISMATCH: {node['section']} (node {i}) node variant {node.get('variant')!r} != content.variant {c.get('variant')!r}")


def _slug(t):
    return re.sub(r"\s+", "-", re.sub(r"[^\w\s-]", "", t.lower()).strip())


def check_block_lists(node, i, contract, errors, warnings):
    """Fields with a closed `allowedBlocks` list (post-article body): closed set, onlyLast, unique h2 ids."""
    c = node.get("content") if isinstance(node.get("content"), dict) else {}
    for fname, f in contract["content"]["fields"].items():
        if "allowedBlocks" not in f or not isinstance(c.get(fname), list):
            continue
        allowed = {b["block"]: b for b in f["allowedBlocks"]}
        blocks, last = c[fname], len(c[fname]) - 1
        slugs = {}
        for k, b in enumerate(blocks):
            name = b.get("block") if isinstance(b, dict) else None
            if name not in allowed:
                errors.append(f"POST_BODY_BLOCK_NOT_ALLOWED: {node['section']}.{fname}[{k}] block {name!r} not in {sorted(allowed)}")
                continue
            if allowed[name].get("onlyLast") and k != last:
                errors.append(f"POST_BODY_FAQ_NOT_LAST: {node['section']}.{fname}[{k}] '{name}' must be the last block (found at {k} of {last})")
            if allowed[name].get("toc") and isinstance(b.get("text"), str):
                slugs.setdefault(_slug(b["text"]), []).append(k)
        for s, ks in slugs.items():
            if len(ks) > 1:
                warnings.append(f"POST_BODY_DUPLICATE_H2: {node['section']}.{fname} h2 blocks {ks} share the anchor id '{s}'")


def check_node(node, i, repo, out):
    sec = node["section"]
    contract = repo.sections.get(sec)
    if contract is None:
        out["errors"].append(f"UNKNOWN_SECTION: node {i} section '{sec}' has no contract in sections/")
        return
    branch = repo.node_branch.get(sec)
    content_schema = (branch or {}).get("properties", {}).get("content")
    if content_schema is not None and isinstance(node.get("content"), (dict, list)):
        w = {"words": [], "roles": []}
        walk_schema(repo.schema, content_schema, node["content"], "", w)
        for path, n, mx in w["words"]:
            out["errors"].append(f"MAXWORDS: {sec}.{path}: {n} > {mx} (node {i})")
        for path, want, have in w["roles"]:
            if have != want:
                out["errors"].append(f"ASSET_ROLE_MISMATCH: {sec}.{path} (node {i}) declares role '{want}', found '{have}'")
    check_assets(node, i, out, repo)
    check_motion(node, i, contract, out["errors"])
    check_variant_agreement(node, i, contract, out["errors"], repo)
    check_block_lists(node, i, contract, out["errors"], out["warnings"])


def check_contract_counts(secs, repo, errors):
    """Contract `constraints.onePerPage` / `maxPerPage`, read from each section contract."""
    for s in sorted(set(secs)):
        c = (repo.sections.get(s) or {}).get("constraints", {})
        mx = 1 if c.get("onePerPage") else c.get("maxPerPage")
        if isinstance(mx, int) and secs.count(s) > mx:
            errors.append(f"CONTRACT_MAX_PER_PAGE: '{s}' appears {secs.count(s)} times, its contract allows {mx}")


# --------------------------------------------------------------------------- entry points
def _schema_errors(spec, repo, limit=40):
    errs = sorted(repo.validator.iter_errors(spec), key=lambda e: [str(p) for p in e.absolute_path])
    out = []
    for e in errs[:limit]:
        p = "/".join(str(x) for x in e.absolute_path) or "<root>"
        out.append(f"SCHEMA: {p}: {e.message[:300]}")
    if len(errs) > limit:
        out.append(f"SCHEMA: ... {len(errs) - limit} more schema errors suppressed")
    return out


def validate(spec, repo_root=None, skipSchema=False):
    repo = Repo.get(repo_root)
    errors, warnings = [], []
    if not isinstance(spec, dict):
        return ["SPEC_SHAPE: PageSpec must be a JSON object"], []
    if not skipSchema:
        errors += _schema_errors(spec, repo)
    nodes = spec.get("nodes")
    if not isinstance(nodes, list):
        errors.append("SPEC_SHAPE: nodes[] missing or not an array; semantic checks skipped")
        return errors, warnings
    good = []
    for i, n in enumerate(nodes):
        if isinstance(n, dict) and isinstance(n.get("section"), str):
            good.append((i, n))
        elif skipSchema:
            errors.append(f"SPEC_SHAPE: node {i} is not an object with a string `section`")
    secs = [n["section"] for _, n in good]
    tid, route = spec.get("template"), spec.get("route")
    routes = [route] if isinstance(route, str) else []

    # 2. route belongs to template
    if isinstance(route, str) and isinstance(tid, str):
        served = {e["template"] for e in resolve_route(route, repo)}
        if tid not in served:
            errors.append(f"ROUTE_TEMPLATE_MISMATCH: route '{route}' is served by template {sorted(served)}, not '{tid}'")
    # 3. nodes[] against the declared template
    terrs = check_template(secs, tid, repo) if isinstance(tid, str) else ["ROUTE_UNKNOWN_TEMPLATE: no template declared"]
    errors += terrs
    # 4. graph rules over the node sequence (tone / flip: see content_tone)
    inst = matching_instance(tid, secs, routes, repo) if isinstance(tid, str) else None
    seq = []
    for k, (i, n) in enumerate(good):
        tone = content_tone(n["section"], n.get("content"))
        if tone is None and inst is not None:
            tone = inst["sequence"][k].get("tone")
        seq.append({"section": n["section"], "variant": n.get("variant"), "tone": tone,
                    "flip": content_flip(n["section"], n.get("content"))})
    ge, gw = run_graph(seq, tid, routes, repo)
    errors += ge
    warnings += gw
    check_contract_counts(secs, repo, errors)
    # 5. per-node
    out = {"errors": errors, "warnings": warnings}
    for i, n in good:
        check_node(n, i, repo, out)
    # 6. repo-level pinned values
    errors += check_pinned_roles(repo)
    # real per-route instance: soft signal for data-dependent (`condition`) nodes
    if isinstance(tid, str) and tid in repo.templates and not terrs and routes:
        for ins in repo.templates[tid]["instances"]:
            if any(route_matches(ir, routes[0]) for ir in ins["routes"]) and ids(ins["sequence"]) != secs:
                warnings.append(f"INSTANCE_DEVIATION: sections differ from the real instance for {routes[0]} in templates.json "
                                f"(condition-dependent nodes: {[n['section'] for n in repo.templates[tid]['nodes'] if n.get('condition')]})")
                break
    return errors, warnings


def validate_sequence(seq, template_id, routes=None, repo_root=None):
    """Structural-only validation of a [{section, tone?, flip?}] sequence: template cross-reference
    plus every graph rule. Used to feed the real per-route instances of templates.json."""
    repo = Repo.get(repo_root)
    errors = check_template(ids(seq), template_id, repo)
    ge, gw = run_graph(seq, template_id, routes or [], repo)
    check_contract_counts(ids(seq), repo, ge)
    return errors + ge, gw


def main(argv):
    args = [a for a in argv if not a.startswith("--")]
    as_json = "--json" in argv
    if len(args) != 1:
        print("usage: semantic_validate.py <pagespec.json> [--json]", file=sys.stderr)
        return 2
    try:
        with open(args[0], encoding="utf-8") as f:
            spec = json.load(f)
    except (OSError, ValueError) as e:
        errors, warnings = [f"SPEC_SHAPE: cannot read {args[0]} as JSON: {e}"], []
    else:
        errors, warnings = validate(spec)
    if as_json:
        print(json.dumps({"ok": not errors, "errors": errors, "warnings": warnings}, indent=2))
    else:
        for e in errors:
            print("ERROR  ", e)
        for w in warnings:
            print("WARNING", w)
        print(f"{'FAIL' if errors else 'PASS'}: {len(errors)} error(s), {len(warnings)} warning(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
