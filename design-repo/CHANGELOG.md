# Changelog

Repository version is a hand-maintained documentation marker (see `versionFieldNote` in `registry.manifest.json`); only `allowlistVersion` is machine-checked.

## 0.1.1 - 2026-09-30

Refresh after a code cleanup of the source project (merged duplicate dialogs, FAQ accordions, collapse helpers, section shells and widow-control helpers; removed dead code).

- Citations: every `src/...:line` citation re-pointed at the current code. Most were remapped mechanically by diffing each changed file against its pre-cleanup copy; about 100 whose code had been merged or rewritten were re-grounded by hand.
- Contracts: `dialog-shell` now describes the shared `MediaDialog` / `CardDialog` module (new `card` variant); `section-shell` is a single shell with a `stack` prop and `pattern`-only top offset (variants `without-pattern` / `with-pattern`); `content.faq-accordion` describes one shared FAQ (`html` and `single` options) instead of three implementations; `collapse` lives in the motion module; `accordion-item` no longer composes `presence`.
- Removed: the `COL_FULL` grid span and its `colFull` layout token (unused in the source).
- Verification tooling: `templates/verify_routes.py` now compares each route's cited `App.jsx` line with the real `<Route>` line instead of a hardcoded range, and accepts `COMPETITORS` with or without `export`.
- Counts re-synced: 249 tokens (layout 26 -> 25); allowlist `section-shell` gains `stack`.

## 0.1.0 - 2026-09-30

First complete build of the Reevo design-repo (status: design-review-pending, not production approved).

- Tokens: four authored layers (foundation, semantic, component, layout), light and dark themes, and the LLM-facing catalog, policy and component allowlist under `tokens/llm/`.
- Contracts: primitives, components and sections, each with a citation trail (`measuredFrom`) into the source project.
- Templates and routes: every real page template plus the route table (including the `*` catch-all and the two parameterised patterns), with `templates/verify_routes.py` proving route coverage against the live `App.jsx`.
- Compatibility graph: ordering and rhythm rules in `compatibility/graph.json`, each naming the check function that enforces it, proven over every real template and route instance by `compatibility/verify_rules.py`.
- Schema: `schema/pagespec.schema.json`, generated deterministically by `extraction/build_schema.py`, plus an example instance and `schema/semantic_validate.py` (template cross-reference, graph rules, asset-role and pinned-role checks, per-field word budgets).
- Asset roles: a closed role registry with generation policies, pinned compliance-critical roles and global prohibitions on reproducing real logos, people or proprietary content.
- Verification: `extraction/verify_all.py` (JSON parse, schema validity and drift, allowlist parity, citation ranges, version parity, manifest and README count recompute, entry-point self-containment, absolute-path scan, asset-role closure and pinned values, route and rule verifiers, graph/validator agreement, referenced-file existence, adversarial suite, word budgets) and `extraction/prove_drift.py`, which injects each defect into a scratch copy and proves the matching check fails.
- Manifest, citation ledger (`extraction/measured-values.json`), README and this changelog.
