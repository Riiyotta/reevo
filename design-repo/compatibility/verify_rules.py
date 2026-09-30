#!/usr/bin/env python3
"""Prove every real template (node grammar AND every real per-route instance) satisfies every `error`
rule in compatibility/graph.json, or is a named exception. `warn` rules are reported, not fatal.

Run: python3 design-repo/compatibility/verify_rules.py
The check ids here (check_*) are the same ids graph.json's `enforcedBy.check` names; a later stage
implements the same logic in schema/semantic_validate.py.
"""
import json, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
G = json.loads((HERE / "graph.json").read_text())
TPL = json.loads((HERE.parent / "templates" / "templates.json").read_text())
RULES = {r["id"]: r for r in G["rules"]}
cat = lambda s: s.split(".")[0]

# A "seq" is a list of dicts {section, tone?, flip?}. Template nodes are converted with tone/flip = None
# (tone/flip checks are skipped at node level and proven on the instances instead).
def ids(seq): return [x["section"] for x in seq]

def check_one_hero(seq, tid, p):
    n = sum(1 for s in ids(seq) if cat(s) == p["category"])
    if n > p["max"]: return [f"{n} heroes"]
    if n == 0: return ["no hero (allowed only for a named heroless template)"]
    return []
def check_shell_one_per_page(seq, tid, p):
    return [f"{s} x{ids(seq).count(s)}" for s in p["sections"] if ids(seq).count(s) != 1]
def check_shell_first_last(seq, tid, p):
    s = ids(seq); v = []
    if s[0] != p["first"]: v.append(f"first is {s[0]}")
    if s[-1] != p["last"]: v.append(f"last is {s[-1]}")
    return v
def check_hero_follows_nav(seq, tid, p):
    s = ids(seq)
    return [f"{x} preceded by {s[i-1] if i else None}" for i, x in enumerate(s) if cat(x) == p["category"] and (i == 0 or s[i-1] not in p["allowedPredecessors"])]
def check_must_immediately_follow(seq, tid, p):
    s = ids(seq); v = []
    for a, b in p["pairs"]:  # b must be immediately preceded by a
        for i, x in enumerate(s):
            if x == b and (i == 0 or s[i-1] != a): v.append(f"{b} not directly after {a}")
    return v
def check_must_be_followed_by(seq, tid, p):
    s = ids(seq); v = []
    for a, b in p["pairs"]:
        for i, x in enumerate(s):
            if x == a and (i + 1 >= len(s) or s[i+1] != b): v.append(f"{a} not directly followed by {b}")
    return v
def check_cta_before_footer(seq, tid, p):
    s = ids(seq); v = []
    n = s.count(p["section"])
    if n > p["max"]: v.append(f"{n} cta bands")
    for i, x in enumerate(s):
        if x == p["section"]:
            j = i + 1
            while j < len(s) and s[j] in p["allowedBetween"]: j += 1
            if j >= len(s) or s[j] != p["followedBy"] or j != i + 1: v.append(f"cta followed by {s[i+1]}")
    return v
def check_product_features_then_dark(seq, tid, p):
    v = []
    for i, x in enumerate(seq):
        if x["section"] == p["section"]:
            nxt = seq[i+1] if i + 1 < len(seq) else None
            if nxt is None or nxt["section"] not in p["nextMayBe"]: v.append(f"next is {nxt and nxt['section']}")
            elif nxt.get("tone") is not None and nxt["tone"] != "dark": v.append(f"next {nxt['section']} tone {nxt['tone']}")
    return v
def check_straddle_then_white(seq, tid, p):
    v = []
    for i, x in enumerate(seq):
        if x["section"] in p["sections"]:
            nxt = seq[i+1] if i + 1 < len(seq) else None
            if nxt is None: v.append("nothing follows"); continue
            if nxt.get("tone") is not None and nxt["tone"] != "white": v.append(f"{x['section']} followed by {nxt['section']} tone {nxt['tone']}")
    return v
def check_accordion_max(seq, tid, p):
    n = ids(seq).count(p["section"]); return [f"{n} accordions"] if n > p["max"] else []
def check_accordion_alternate(seq, tid, p):
    v = []
    for a, b in zip(seq, seq[1:]):
        if a["section"] == b["section"] == p["section"] and a.get("flip") is not None and a["flip"] == b["flip"]: v.append("adjacent accordions share a side")
    return v
def check_no_adjacent_same_section(seq, tid, p):
    return [f"{a} twice in a row" for a, b in zip(ids(seq), ids(seq)[1:]) if a == b]
def check_no_adjacent_same_category(seq, tid, p):
    return [f"{a} next to {b}" for a, b in zip(ids(seq), ids(seq)[1:]) if cat(a) == cat(b) and cat(a) not in p["exemptCategories"]]
def check_one_per_page(seq, tid, p):
    s = ids(seq); v = []
    for x in p["sections"]:
        if s.count(x) > 1: v.append(f"{x} x{s.count(x)}")
    return v
def check_no_consecutive_scroll_stages(seq, tid, p):
    s = ids(seq); v = []
    if sum(1 for x in s if x in p["stageSections"]) > p["maxPerPage"]: v.append("too many scroll stages")
    v += [f"{a},{b} consecutive" for a, b in zip(s, s[1:]) if a in p["stageSections"] and b in p["stageSections"]]
    return v
def check_motion_budget(seq, tid, p):
    n = sum(1 for x in ids(seq) if x in p["ambientSections"])
    return [f"{n} ambient-motion sections > {p['maxAmbient']}"] if n > p["maxAmbient"] else []
def check_faq_followed_by_cta(seq, tid, p):
    s = ids(seq)
    return [f"faq followed by {s[i+1]}" for i, x in enumerate(s) if x == p["section"] and s[i+1] != p["followedBy"]]

CHECKS = {f.__name__: f for f in [check_one_hero, check_shell_one_per_page, check_shell_first_last, check_hero_follows_nav,
    check_must_immediately_follow, check_must_be_followed_by, check_cta_before_footer, check_product_features_then_dark,
    check_straddle_then_white, check_accordion_max, check_accordion_alternate, check_no_adjacent_same_section,
    check_no_adjacent_same_category, check_one_per_page, check_no_consecutive_scroll_stages, check_motion_budget, check_faq_followed_by_cta]}

def nodes_as_seq(t):
    return [{"section": n["section"], "tone": None, "flip": None} for n in t["nodes"]]

def run(rules=None, verbose=True):
    rules = rules or G["rules"]
    hard_fail, soft = [], []
    stats = {"error": 0, "warn": 0}
    for r in rules:
        fn = CHECKS.get(r["enforcedBy"]["check"])
        if fn is None: hard_fail.append(f"{r['id']}: no implementation for {r['enforcedBy']['check']}"); continue
        excs = r.get("exceptions", [])
        unused_exc = set(range(len(excs)))
        def covering(tid, label, routes):
            for k, e in enumerate(excs):
                if e["template"] != tid: continue
                if e.get("instanceRoutes") is None or (routes and set(routes) & set(e["instanceRoutes"])): return k
            return None
        for t in TPL["templates"]:
            targets = [("nodes", nodes_as_seq(t), None)] + [("instance " + "+".join(i["routes"]), i["sequence"], i["routes"]) for i in t["instances"]]
            for label, seq, routes in targets:
                stats[r["severity"]] += 1
                for m in fn(seq, t["id"], r["params"]):
                    k = covering(t["id"], label, routes)
                    if k is not None:
                        unused_exc.discard(k); continue
                    (hard_fail if r["severity"] == "error" else soft).append(f"{r['id']} [{r['severity']}] {t['id']} ({label}): {m}")
        for k in sorted(unused_exc):
            hard_fail.append(f"{r['id']}: exception #{k} ({excs[k]['template']}) is never needed (stale exception)")
        for e in excs:
            if e["template"] not in {t['id'] for t in TPL['templates']}: hard_fail.append(f"{r['id']}: exception names unknown template {e['template']}")
    return hard_fail, soft, stats

if __name__ == "__main__":
    for r in G["rules"]:
        if r["severity"] not in ("error", "warn"): sys.exit(f"bad severity on {r['id']}")
        for k in ("id", "description", "measuredFrom", "enforcedBy", "params"):
            if k not in r: sys.exit(f"{r['id']} missing {k}")
    hard, soft, st = run()
    oh = {e["template"] for e in RULES["ONE_HERO"]["exceptions"]}
    if oh != set(TPL["heroless"]): hard.append(f"ONE_HERO exceptions {sorted(oh)} != templates.json heroless {sorted(TPL['heroless'])}")
    print(f"rules: {len(G['rules'])} ({sum(r['severity']=='error' for r in G['rules'])} error, {sum(r['severity']=='warn' for r in G['rules'])} warn)")
    print(f"templates: {len(TPL['templates'])}; instances: {sum(len(t['instances']) for t in TPL['templates'])}")
    print(f"checks evaluated: {st['error']} error-level, {st['warn']} warn-level (template nodes + every real instance)")
    print("\nrule                                   sev    exceptions (templates)")
    for r in G["rules"]:
        print(f"  {r['id']:38s} {r['severity']:5s}  {', '.join(e['template'] for e in r.get('exceptions', [])) or '-'}   -> {r['enforcedBy']['check']}")
    if soft: print("\nWARNINGS (non-fatal):"); [print(" ~", s) for s in soft]
    if hard: print("\nFAIL:"); [print(" -", s) for s in hard]; sys.exit(1)
    print("\nPASS: every real template satisfies every error rule or is a named (and actually-needed) exception")
