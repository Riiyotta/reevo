#!/usr/bin/env python3
"""Prove each drift check in verify_all.py actually FAILS on bad input.

    python3 extraction/prove_drift.py

For every defect: copy the design-repo to a scratch temp dir (the real repo is never mutated),
inject the defect, run the COPY's extraction/verify_all.py, and assert
  (1) the run exits 1 and prints `FAIL [<expected check>]`, and
  (2) that same check does NOT fail on the untouched repo (so the failure is caused by the defect).
Then it asserts the graceful no-source mode (WARN, never FAIL) and the citation resolver self-test.

Citation defects: the scratch parent gets symlinks to the real source project (src/, CLONE_SPEC.md,
package.json ...), so the resolver runs against real files and only the injected citation is bad.
The no-source mode is proven separately in a scratch parent with no source tree at all.

Note: a defect is judged against the CHECK it targets, not the overall exit code, so a pre-existing,
unrelated FAIL elsewhere in the repo cannot mask or fake a result. The overall status of the clean
repo is printed separately.
"""
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.dirname(ROOT)
ABS_SAMPLE = "/Us" + "ers/someone/design-repo"  # built by concatenation so this file stays clean


def run_verify(repo, extra=()):
    p = subprocess.run([sys.executable, os.path.join(repo, "extraction", "verify_all.py"), *extra],
                       capture_output=True, text=True, timeout=900)
    return p.returncode, p.stdout + p.stderr


def failed_checks(out):
    return set(re.findall(r"^FAIL \[([^\]]+)\]", out, re.M))


def fail_lines(out):
    return re.findall(r"^FAIL \[[^\]]+\].*$", out, re.M)


def hit(out, expected, needle):
    """True if a FAIL line for `expected` (containing `needle`, if given) is present."""
    return any(l.startswith(f"FAIL [{expected}]") and needle in l for l in fail_lines(out))


def make_scratch(with_source=True):
    parent = tempfile.mkdtemp(prefix="drift-")
    repo = os.path.join(parent, "design-repo")
    shutil.copytree(ROOT, repo, ignore=shutil.ignore_patterns("__pycache__", "*.pyc", ".DS_Store", "design-repo.zip"))
    if with_source:
        for name in ("src", "public", "CLONE_SPEC.md", "CLONE_ASSETS.md", "package.json", "tailwind.config.js"):
            s = os.path.join(SRC, name)
            if os.path.exists(s):
                os.symlink(s, os.path.join(parent, name))
    return parent, repo


def jedit(repo, rel, fn):
    p = os.path.join(repo, rel)
    d = json.load(open(p, encoding="utf-8"))
    fn(d)
    with open(p, "w", encoding="utf-8", newline="\n") as f:
        f.write(json.dumps(d, indent=2, ensure_ascii=False) + "\n")


def sub(repo, rel, old, new):
    p = os.path.join(repo, rel)
    t = open(p, encoding="utf-8").read()
    assert old in t, f"{rel}: pattern not found: {old!r}"
    with open(p, "w", encoding="utf-8", newline="") as f:
        f.write(t.replace(old, new, 1))


# ------------------------------------------------------------------ defects
def d_phantom(r):
    jedit(r, "tokens/llm/component-allowlist.json", lambda d: d["components"].append(
        {"id": "phantom.section", "kind": "section", "file": "sections/phantom.section.json", "settableProps": []}))


def d_orphan(r):
    c = json.load(open(os.path.join(r, "sections", "hero.marketing-video.json"), encoding="utf-8"))
    c["id"] = "hero.orphan-test"
    with open(os.path.join(r, "sections", "hero.orphan-test.json"), "w", encoding="utf-8") as f:
        json.dump(c, f, indent=2)


def d_cite_range(r):
    jedit(r, "templates/routes.json", lambda d: d["routes"][0].__setitem__("measuredFrom", ["src/App.jsx:1-99999"]))


def d_cite_missing(r):
    jedit(r, "templates/routes.json", lambda d: d["routes"][0].__setitem__("measuredFrom", ["src/no-such-file.jsx:1-2"]))


def d_count(r):
    jedit(r, "registry.manifest.json", lambda d: d["counts"].__setitem__("sections", d["counts"]["sections"] + 1))


def d_version(r):
    jedit(r, "registry.manifest.json", lambda d: d.__setitem__("allowlistVersion", "9.9.9"))


def d_entry(r):
    jedit(r, "registry.manifest.json", lambda d: d["entryPoints"].__setitem__("schema", "../package.json"))


def d_abs(r):
    with open(os.path.join(r, "README.md"), "a", encoding="utf-8") as f:
        f.write(f"\nSee {ABS_SAMPLE}/README.md\n")


def d_schema(r):
    jedit(r, "schema/pagespec.schema.json", lambda d: d.__setitem__("title", d.get("title", "") + " (hand edited)"))


def d_pinned(r):
    jedit(r, "assets/asset-roles.json", lambda d: d["roles"]["person-portrait"].__setitem__("generationPolicy", "may-generate-new"))


def d_graph(r):
    jedit(r, "compatibility/graph.json", lambda d: d["rules"][0]["enforcedBy"].__setitem__("check", "check_does_not_exist"))


def d_readme_count(r):
    sub(r, "README.md", "| Sections | 46 |", "| Sections | 47 |")


def d_settable(r):
    def f(d):
        e = next(x for x in d["components"] if x["kind"] == "section")
        e["settableProps"] = e["settableProps"] + ["invented"]
    jedit(r, "tokens/llm/component-allowlist.json", f)


DEFECTS = [
    ("phantom allowlist entry", d_phantom, "d.allowlist-parity"),
    ("orphan contract (no allowlist entry)", d_orphan, "d.allowlist-parity"),
    ("allowlist settableProps != contract fields", d_settable, "d.allowlist-parity"),
    ("citation line past EOF", d_cite_range, "e.citations"),
    ("citation to missing file", d_cite_missing, "e.citations"),
    ("wrong manifest count", d_count, "g.manifest-counts"),
    ("manifest allowlistVersion mismatch", d_version, "f.allowlistVersion"),
    ("entryPoints entry with ../", d_entry, "h.entryPoints"),
    ("absolute path in README", d_abs, "i.no-absolute-paths"),
    ("schema hand-edit (drift vs generator)", d_schema, "c.schema-drift"),
    ("pinned role -> other valid policy", d_pinned, "j.asset-roles", "person-portrait: generationPolicy is"),
    ("graph rule -> nonexistent check fn", d_graph, "l.graph-validator"),
    ("stale README count", d_readme_count, "p.readme-counts"),
]


def main():
    print("clean repo, full run:")
    rc0, out0 = run_verify(ROOT)
    clean_fail = failed_checks(out0)
    print(f"  overall exit {rc0}; failing checks on the untouched repo: {sorted(clean_fail) or 'none'}\n")
    rows, ok_all = [], True
    have_source = os.path.isdir(os.path.join(SRC, "src"))
    for name, fn, expected, *rest in DEFECTS:
        needle = rest[0] if rest else ""
        if expected == "e.citations" and not have_source:
            # No sibling source tree: check e degrades to WARN by design (nothing to resolve against), so a
            # bad citation can't be exercised here. The resolver itself is still proven by the
            # --citation-selftest row below, which needs no source tree.
            rows.append((name, expected, "SKIPPED (no source)", "n/a"))
            continue
        parent, repo = make_scratch()
        try:
            fn(repo)
            rc, out = run_verify(repo)
            caught = rc == 1 and hit(out, expected, needle)
            clean_ok = not hit(out0, expected, needle)
            good = caught and clean_ok
            ok_all &= good
            rows.append((name, expected, "CAUGHT" if caught else "MISSED", "yes" if clean_ok else "NO"))
        finally:
            shutil.rmtree(parent, ignore_errors=True)
    # graceful no-source mode: WARN, never FAIL, for the source-dependent checks
    parent, repo = make_scratch(with_source=False)
    try:
        rc, out = run_verify(repo)
        f = failed_checks(out)
        warns = set(re.findall(r"^WARN \[([^\]]+)\]", out, re.M))
        good = {"e.citations", "k.verify_routes"} <= warns and not ({"e.citations", "k.verify_routes"} & f)
        ok_all &= good
        rows.append(("no source tree (graceful mode)", "WARN e.citations + k.verify_routes", "WARNED, not failed" if good else "WRONG", "n/a"))
    finally:
        shutil.rmtree(parent, ignore_errors=True)
    rc, out = run_verify(ROOT, ("--citation-selftest",))
    good = rc == 0 and "CITATION SELFTEST PASS" in out
    ok_all &= good
    rows.append(("citation resolver self-test", "past-EOF/missing/reversed rejected", "PASS" if good else "FAIL", "n/a"))

    w0 = max(len(r[0]) for r in rows)
    w1 = max(len(r[1]) for r in rows)
    print(f"{'defect'.ljust(w0)}  {'expected check'.ljust(w1)}  result              check passes on clean repo?")
    print(f"{'-' * w0}  {'-' * w1}  ------------------  ---------------------------")
    for a, b, c, d in rows:
        print(f"{a.ljust(w0)}  {b.ljust(w1)}  {c.ljust(18)}  {d}")
    print("\nRESULT:", "ALL DEFECTS CAUGHT" if ok_all else "SOME DEFECTS NOT CAUGHT")
    return 0 if ok_all else 1


if __name__ == "__main__":
    sys.exit(main())
