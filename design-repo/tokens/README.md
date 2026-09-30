# Tokens (stage 1a)

Grounded in `tailwind.config.js`, `src/index.css`, `CLONE_SPEC.md` (sections 0-1, 11-14) and `src/components/ui.jsx`. Every token has `measuredFrom: <path>:<line>[-<line>]`, relative to the project root.

## Layers
- `00-foundation/` raw values: color, typography, radius, spacing, breakpoint, elevation, icon-size, motion
- `10-semantic/` roles referencing foundation: color, typography, radius, motion
- `20-component/` component-scoped values: button, nav, tag-chip, pattern-strip, marquee
- `30-layout/` grid, container, section-rhythm
- `themes/` light.json and dark.json resolve every semantic colour to a foundation hex (dark is applied to `#problem`)
- `llm/` token-catalog.json, token-policy.json, component-allowlist.json (empty until stage 1b)

## Counts (recomputed from disk)
| file | tokens |
|---|---|
| tokens/00-foundation/breakpoint.json | 5 |
| tokens/00-foundation/color.json | 61 |
| tokens/00-foundation/elevation.json | 2 |
| tokens/00-foundation/icon-size.json | 8 |
| tokens/00-foundation/motion.json | 16 |
| tokens/00-foundation/radius.json | 7 |
| tokens/00-foundation/spacing.json | 14 |
| tokens/00-foundation/typography.json | 45 |
| tokens/10-semantic/color.json | 19 |
| tokens/10-semantic/motion.json | 6 |
| tokens/10-semantic/radius.json | 5 |
| tokens/10-semantic/typography.json | 11 |
| tokens/20-component/button.json | 16 |
| tokens/20-component/marquee.json | 6 |
| tokens/20-component/nav.json | 11 |
| tokens/20-component/pattern-strip.json | 5 |
| tokens/20-component/tag-chip.json | 18 |
| tokens/30-layout/container.json | 6 |
| tokens/30-layout/grid.json | 10 |
| tokens/30-layout/section-rhythm.json | 10 |
| tokens/themes/dark.json | 19 |
| tokens/themes/light.json | 19 |

Total tokens across layers 00-30: 281 (themes resolve the 19 semantic colours and are not counted again). Catalog referenceable names: 186. Asset roles: 17.

## Notes
- `rounded` is 2px (`--radius`), not Tailwind's default.
- Fluid type sizes are exact `clamp()` strings; do not hard-code px.
- CLONE_SPEC.md:44 records the default transition as .15s; the clone's explicit `duration-200` (200ms) is what is tokenised.
- PageSpecs carry no per-instance token override; see `llm/token-policy.json` `overrides`.
- `component-allowlist.json` is intentionally empty; stage 1b owns its ids.
