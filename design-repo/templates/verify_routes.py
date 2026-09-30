#!/usr/bin/env python3
"""Prove route <-> template coverage is 1:1 and concrete URLs sum to 71 (28 non-blog + 43 blog).

Run from anywhere: python3 design-repo/templates/verify_routes.py
Reads src/App.jsx, src/data/blog.js, src/data/compare.js of the project (two levels above design-repo/templates).
"""
import json, re, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
tpl = json.loads((HERE / "templates.json").read_text())
rt = json.loads((HERE / "routes.json").read_text())
errs = []
def err(m): errs.append(m)

# No sibling source tree (design-repo shipped standalone): this check needs src/App.jsx, so skip with a
# notice rather than crash. verify_all.py treats this the same way.
if not (ROOT / "src/App.jsx").exists():
    print("SKIP: no source tree at " + str(ROOT.name) + "/src (design-repo is standalone); route coverage can only be proven next to the source project")
    sys.exit(0)

# 1. routes.json vs the real <Route path=...> lines in App.jsx
app = (ROOT / "src/App.jsx").read_text().splitlines()
real = {}
for i, l in enumerate(app, 1):
    m = re.search(r'<Route path="([^"]+)"', l)
    if m: real[m.group(1)] = i
paths = [r["path"] for r in rt["routes"]]
if len(paths) != len(set(paths)): err("duplicate route path in routes.json")
if set(paths) != set(real): err(f"route set differs from App.jsx: only-json={set(paths)-set(real)} only-app={set(real)-set(paths)}")
# every route's cited App.jsx line must be the line its <Route> really sits on (no hardcoded range to go stale)
for r in rt["routes"]:
    m = re.search(r"src/App\.jsx:(\d+)", " ".join(r["measuredFrom"]))
    if not m: err(f"{r['path']}: no src/App.jsx citation in routes.json")
    elif real.get(r["path"]) != int(m.group(1)): err(f"{r['path']}: routes.json cites App.jsx:{m.group(1)} but the <Route> is on line {real.get(r['path'])}")
for r in rt["routes"]:
    for c in r["measuredFrom"]:
        m = re.fullmatch(r"src/App\.jsx:(\d+)", c)
        if not m or real.get(r["path"]) != int(m.group(1)): err(f"bad citation for {r['path']}: {c}")

# 2. exactly-one-template, every template used
tids = [t["id"] for t in tpl["templates"]]
if len(tids) != len(set(tids)): err("duplicate template id")
used = {}
for r in rt["routes"]:
    if r["template"] not in tids: err(f"{r['path']} -> unknown template {r['template']}")
    used.setdefault(r["template"], []).append(r["path"])
unused = [t for t in tids if t not in used]
if unused: err(f"templates with no route: {unused}")

# 3. template instances must list exactly the routes bound to the template
for t in tpl["templates"]:
    inst_routes = [x for i in t["instances"] for x in i["routes"]]
    bound = used.get(t["id"], [])
    if len(inst_routes) != len(set(inst_routes)): err(f"{t['id']}: a route appears in two instances")
    # concrete instance routes must be covered by a bound pattern
    def covers(pat, concrete):
        if pat == concrete: return True
        return pat in ("/blog/:slug", "/compare/:competitor") and concrete.startswith(pat.split(":")[0]) or (pat == "*" and concrete == "*")
    for c in inst_routes:
        if not any(covers(p, c) for p in bound): err(f"{t['id']}: instance route {c} not covered by bound patterns {bound}")
    for p in bound:
        if not any(covers(p, c) for c in inst_routes): err(f"{t['id']}: bound pattern {p} has no instance sequence")

# 4. concrete URL counts vs real data
blog = (ROOT / "src/data/blog.js").read_text()
n_blog = len(re.findall(r'"slug":\s*"', blog))
cmp_src = (ROOT / "src/data/compare.js").read_text()
blk = re.split(r"(?:export )?const COMPETITORS = \{", cmp_src, maxsplit=1)[1]
n_cmp = len(re.findall(r"^  (\w+): \{", blk.split("\n}\n", 1)[0], re.M))
by = {r["path"]: r["concreteUrlCount"] for r in rt["routes"]}
if by["/blog/:slug"] != n_blog: err(f"/blog/:slug count {by['/blog/:slug']} != blog.js slugs {n_blog}")
if by["/compare/:competitor"] != n_cmp: err(f"/compare count {by['/compare/:competitor']} != compare.js competitors {n_cmp}")
tot = sum(by.values()); blog_n = by["/blog/:slug"]; non_blog = tot - blog_n
if (tot, non_blog, blog_n) != (71, 28, 43): err(f"totals wrong: total={tot} nonblog={non_blog} blog={blog_n}")
if by["*"] != 0: err("catch-all must have 0 concrete URLs")
for r in rt["routes"]:
    if r["retrievalEligible"] != (r["concreteUrlCount"] > 0): err(f"retrievalEligible mismatch on {r['path']}")

# 5. nonRoutes must not be real routes; catch-all renders Home
for n in rt["nonRoutes"]:
    if n["path"] in real: err(f"non-route {n['path']} is actually routed")
if 'path="*" element={<Home />}' not in app[real["*"] - 1]: err("catch-all no longer renders Home")
if next(r for r in rt["routes"] if r["path"] == "*")["template"] != "home": err("`*` must map to home")

# 6. every template starts with shell.navbar and ends with shell.footer
for t in tpl["templates"]:
    if t["nodes"][0]["section"] != "shell.navbar" or t["nodes"][-1]["section"] != "shell.footer": err(f"{t['id']}: shell not first/last")

print(f"route patterns in App.jsx : {len(real)}")
print(f"route patterns in json    : {len(paths)}  (each bound to exactly one template: {'yes' if not any('->' in e for e in errs) else 'NO'})")
print(f"templates                 : {len(tids)}  all used: {'yes' if not unused else 'NO'}")
for t in tids: print(f"  {t:20s} <- {', '.join(used.get(t, []))}")
print(f"concrete URLs             : total={tot} non-blog={non_blog} blog={blog_n}  (blog.js slugs={n_blog}, compare.js competitors={n_cmp})")
print(f"nonRoutes                 : {[n['path'] for n in rt['nonRoutes']]}")
if errs:
    print("\nFAIL"); [print(" -", e) for e in errs]; sys.exit(1)
print("\nPASS: route coverage is 1:1, every template used, concrete URLs sum to 71 (28 + 43)")
