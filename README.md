# Reevo clone: information architecture

`ia.json` is the only file to hand-edit here. `IA.md` and `matrix.csv` are generated from it by `build.mjs`,
so any edit to them is overwritten on the next build.

```bash
node validate.mjs && node build.mjs
```

`validate.mjs` fails on route or template counts that don't add up, on a section a template references but
`ia.json` never defines (or the reverse), and on a section with an undeclared category. `build.mjs` then rewrites
`IA.md` (shape and reuse tables, per-template section tables, section reference) and `matrix.csv`
(section × template, for a spreadsheet).

## What the data shows

- **71 routes fall into 16 templates, and one template is most of them.** The 43 blog posts share one template
  (61% of routes). With the 7 compare pages and the 5 product pages, three templates account for 55 of 71 routes
  (77%). The other 13 templates have one to three routes each, so that is where the distinct page-building effort is.
- **14 sections are shared across templates and 32 appear on only one.** The two shell sections (navbar, footer)
  are on all 16. The closing call-to-action band is on 8 templates, the FAQ accordion on 4, and the testimonial
  on 3 (with three different implementations, listed as variants in the design-repo). The 32 single-use sections
  should stay page-local until a second page needs them.
- **Some single-use sections still serve many routes.** `content.post-article` and `content.related-posts` are
  used by one template but 43 routes; the compare sections by 7 and the product sections by 5. Their reuse count
  is low, but a change to them lands on many pages.
- **The `chrome` field is omitted.** Every template carries the same global header and footer (rendered once in
  `src/App.jsx`, outside `<Routes>`), so there is no chrome split to record.

## Read before "correcting" a number

- The `*` catch-all route renders Home. It is not a URL of its own, so it is not counted and Home is 1 route.
- `/privacy` and `/terms` link out to reevo.ai and are not local pages. `/thank-you` and
  `/product-tour/post-interactive-demo` exist on the original site but are not built, so they are not in the IA.
- A section's `scope` sentence gives its route count (a shared section's count is the sum over the templates that
  carry it), not its template count. `validate.mjs` checks those numbers against the data.
- `implementedBy` names the file that renders each section. Where a section spans several files, the first is
  listed with a "+N more" note. The design-repo's section contracts have the exact line ranges.

## Related

- `design-repo/` is the machine-validated design system for this same site (tokens, section contracts, templates,
  page schema, validator). Its templates and sections are what this IA was derived from, so the two should agree.
  Re-derive `ia.json` from it after a design-repo change, then re-run validate and build.
- The source is a real company's live site. Both this IA and the design-repo are for local or internal use; do not
  publish them.
