Source: https://reevo.ai/?ref=saaspo.com

# Reevo home page: clone spec

Measured live on 2026-09-29 with Playwright at 1440x900, 768x1024 and 390x844. All px are computed values (getBoundingClientRect / getComputedStyle). Page Y values are document offsets at 1440 unless noted. The original is Next.js (App Router) + **Tailwind v4** (CSS variables + `@layer utilities`), `next/image`, `react-fast-marquee`, lucide icons, Radix (nav popovers), and a small motion lib for inline opacity/transform. Build target is Tailwind v3, so every token below must be mapped into `tailwind.config.js` (`theme.extend`) and `index.css`; the class strings quoted from the original are Tailwind v4 syntax (e.g. `bg-size-[auto_60px]`, `mask-x-from-90%`, `size-4`, `bg-strong/7.5`).

Asset details are in `/Users/riyaghosh/V3/Reevo/CLONE_ASSETS.md` (manifest, missing-asset URLs, inline SVG markup).

---

## 0. Global tokens (from `ff761d0ec2d83b20.css` `:root` / `.dark`, and `6e20e8068aab9870.css` for fonts)

### Breakpoints (NOT Tailwind defaults). Media queries found: `min-width` 600 / 840 / 1140 / 1380 px (and `96rem`)
| name | min-width | note |
|---|---|---|
| sm | 600px | |
| md | 840px | tablet at 768 is BELOW md (single-column mobile layout, but fluid type scales up) |
| lg | 1140px | desktop nav appears (`max-lg:hidden` / `lg:hidden` for Menu button) |
| xl | 1380px | 1440 measured = xl |

Tailwind v3 config: `screens: { sm:'600px', md:'840px', lg:'1140px', xl:'1380px', '2xl':'1536px' }`.

### Fonts (all `font-display:swap`; woff2 copies already in public/fonts)
- `--font-sans: "Haltung", system-ui, sans-serif` (body). Weights 400, 400 italic, 500, 700, 700 italic. Fallback face: Arial with ascent 96.37% / descent 25.36% / line-gap 0 / size-adjust 98.58%.
- `--font-heading: "Metrify", sans-serif`. Weights 400, 500, 700, 800, 900 (normal). Fallback: Arial ascent 127.51% / descent 31.88% / line-gap 31.88% / size-adjust 62.74%.
- `--font-mono: "GTAmericaMono", "Consolas", monospace` (single weight, 400). Fallback: Arial ascent 73.60% / descent 18.99% / size-adjust 135.87%.
- Body: `font-family Haltung`, color `#3c3c3c` (gray-9), background `#fff`.
- Local woff2 files: already present in `/Users/riyaghosh/V3/Reevo/public/fonts/` under the original hashed names (`<hash>-s.p.woff2`). Map from `6e20e8068aab9870.css`: metrify 400=5a1939b990a8ae92, 500=a5cdf4507e05b80a, 700=48fefe2276517d74, 800=cdb4207d9156d056, 900=7467bd508c427a2b; haltung 400=adf06ed147ff8f4c, 400 italic=e2b20310cd2df4ae, 500=5f099d1fc3ece706, 700=7b61ee17c1b12113, 700 italic=416f91833d5cd616; gtAmericaMono (single weight)=ec10966dde464df8.

### Colors (`:root`)
```
--color-black:#000; --color-white:#fff;
gray-1 #f7f7f0  gray-2 #f2f2ea  gray-3 #e7e7de  gray-4 #a8a6a4  gray-5 #92918f
gray-6 #7d7b7a  gray-7 #676665  gray-8 #525151  gray-9 #3c3c3c  gray-10 #121212
yellow-1 #ffffdb 3 #fffda7 5 #fff47d 8 #ffdd4e 9 #f8c647 10 #efab3e 12 #c05822
green-1 #e8fcf3 2 #d9faec 3 #bef5dd 4 #a4efce 5 #8ce8bf 6 #74dfaf 8 #54c794 9 #49b585 10 #38a373 11 #2c9364 13 #16774b 15 #085d37
orange-1 #fff0e8 2 #fedfce 3 #fecfb5 8 #fa7b34 9 #f96a1a 13 #9e2d09
blue-1 #eaf7ff 2 #d8efff 3 #b4e0ff 7 #48a5ff 8 #3896fa 13 #2b5fc8 15 #2044b2
pink-1 #fff1fa 2 #ffe2f4 3 #fed3ed 4 #fcc0e5 9 #e36fb6 11 #d156a2 13 #b64189 15 #7f0b50
teal-1 #e3fcff 2 #c9f8ff 4 #9cecfa 6 #77dbec 8 #5ac4d6 9 #4ab7ca 13 #187887 14 #10666f 15 #0a5257
```
Semantic (light): `--color-background:#fff` `--color-foreground:#3c3c3c` `--color-strong:#121212` `--color-primary:#121212` `--color-primary-foreground:#fff` `--color-secondary-foreground:#3c3c3c` `--color-muted-foreground:#92918f` `--color-border:#e7e7de`.
Semantic `.dark` (applied to `#problem`): background `#121212`, foreground `#f2f2ea`, strong `#fff`, border `#676665`, primary `#fff`, primary-foreground `#121212`, secondary-foreground `#fff`.
Other: `--radius:2px`, `--radius-xs .125rem`, `-sm .25rem`, `-lg .5rem`, `-2xl 1rem`. Default transition: `.15s cubic-bezier(.4,0,.2,1)`. `--nav-height-mobile:64px; --nav-height-desktop:72px; --button-height:46px; --button-height-sm:36px`. `--spacing:.25rem`. Container widths `--container-md 28rem ... 3xl 48rem`.

### Fluid type scale (exact `clamp()` + line-height + letter-spacing; these are the custom utilities `.text-xs`, `.text-2xl`, `.text-display-*`)
| class | font-size | line-height | letter-spacing | 1440 px | 768 px | 390 px |
|---|---|---|---|---|---|---|
| text-xs | clamp(.75rem,.699rem+.2041vw,.875rem) | 115% | -.01em | 14 | 12.75 | 12 |
| text-sm | clamp(.875rem,.824rem+.2041vw,1rem) | 135% | 0 | 16 | 14.75 | 14 |
| text-md | clamp(1rem,.949rem+.2041vw,1.125rem) | 135% | 0 | 18 | | |
| text-lg | clamp(1.125rem,1.074rem+.2041vw,1.25rem) | 135% | 0 | 20 | 18.75 | 18 |
| text-xl | clamp(1.5rem,1.2449rem+1.0204vw,2.125rem) | 115% | -.01em | | | |
| text-2xl | clamp(1.75rem,1.3929rem+1.4286vw,2.625rem) | 105% | -.01em | 42 | 33.26 | 28 |
| text-3xl | clamp(2.25rem,1.7398rem+2.0408vw,3.5rem) | 105% | -.02em | | | |
| text-display-xs | 12px | 115% | 0 | 12 | 12 | 12 |
| text-display-md | clamp(.875rem,.824rem+.2041vw,1rem) | 105% | .15em | | | |
| text-display-lg | clamp(1.125rem,1.074rem+.2041vw,1.25rem) | 115% | -.02em | 20 | 18.75 | 18 |
| text-display-lg-2 | clamp(1.25rem,1.0969rem+.6122vw,1.625rem) | 110% | -.02em | 26 | 22.25 | 20 |
| text-display-xl | clamp(1.5rem,1.2959rem+.8163vw,2rem) | 105% | -.02em | | | |
| text-display-2xl | clamp(3rem,2.2857rem+2.8571vw,4.75rem) | 80% | -.01em | 76 | 58.51 | 48 |
| text-display-3xl | clamp(3.5939rem,2.1729rem+5.6842vw,7.0755rem) | 80% | -.01em | 113.21 | 78.42 | 57.50 |

(the `.text-xs` etc. width above uses the viewport width vw, so tablet = fractional px; reproduce with the clamp strings, do not hard-code.)

### Type roles (as used, 1440 computed)
| role | element / classes | font | size / line-height / letter-spacing / weight | color | transform |
|---|---|---|---|---|---|
| Eyebrow / label / nav item / stepper | `block text-strong font-mono text-display-xs uppercase` | GTAmericaMono | 12 / 13.8 / normal / 400 | #121212 (#fff in dark) | uppercase |
| Hero H1 | `font-heading text-display-3xl uppercase font-black` | Metrify | 113.208 / 90.566 / -1.132 / 900 | #121212 | uppercase |
| CTA H2 (same as H1) | same | Metrify | 113.208 / 90.566 / -1.132 / 900 | #121212 | uppercase |
| Hero sub | `text-display-lg-2 font-bold text-balance` | Haltung | 26 / 28.6 / -0.52 / 700 | #121212 | |
| Section headline | `text-strong text-2xl text-pretty` (with `<strong>` 700 for the last phrase) | Haltung | 42 / 44.1 / -0.42 / 400 (strong 700) | #121212 (#fff dark) | |
| Section lede | `text-foreground mt-3 text-lg` | Haltung | 20 / 27 / 0 / 400 | #3c3c3c (#f2f2ea dark) | |
| Product H3 | `font-heading text-display-2xl uppercase font-extrabold` | Metrify | 76 / 60.8 / -0.76 / 800 | #121212 | uppercase |
| Product body | default p | Haltung | 18 / 24.3 / 0 / 400 | #3c3c3c | |
| Column title (Find/Connect/...) | `text-display-lg font-bold` | Haltung | 20 / 23 / -0.4 / 700 | #121212 | |
| Body small (li, footer link) | `text-sm` | Haltung | 16 / 21.6 / 0 / 400 | #121212 | |
| Caption / logo label | `text-xs` | Haltung | 14 / 16.1 / -0.14 / 400 | #3c3c3c (footer group titles/copyright #92918f) | |
| Button lg | `text-sm font-medium` | Haltung | 16 / 21.6 / normal / 500 | | |
| Button sm (nav) | `text-xs font-medium` | Haltung | 14 / 16.1 / -0.14 / 500 | | |
| Card quote (customer) | `text-display-lg font-bold` | Haltung | 20 / 23 / -0.4 / 700 | #121212 | |
| Big quote (Nate) | `text-display-lg-2 font-bold font-medium not-italic` | Haltung | 26 / 28.6 / -0.52 / **500** | #f2f2ea (`--color-gray-2`) | |

Note: opening quote mark `“` is an absolutely positioned span with `-translate-x-[100%]` (cards) / `-translate-x-[120%]` (big quote), hanging left of the text; the closing `”` is inline at end of text.

### Shared components
- **Container**: outer `w-full px-6 sm:px-8 md:px-10 lg:px-12` (24 / 32 / 40 / 48 px side padding at <600 / 600 / 840 / 1140+), inner `w-full mx-auto max-w-[1400px]`. At 1440 content box = x 48 to 1392 (1344 wide). At 768: padding 32 (sm band 600-839). At 390: 24.
- **Grid**: `grid grid-cols-6 gap-4 md:grid-cols-12 lg:grid-cols-24` (gap 16). Common column spans: hero H1 `col-span-6 md:col-span-12 lg:col-span-22 lg:col-start-2` (x105 w1231 at 1440); section content `xl:col-span-22 xl:col-start-2` etc. 1440 col width = (1344 - 23*16)/24 = 40.83.
- **Section shell**: `relative py-16 md:py-24 lg:py-32` (64 / 96 / 128 px vertical padding; at 768 measured 64, since md=840). Inside: decorative pattern strip `absolute top-0 left-0 w-full` then content wrapper `pt-6 md:pt-0`.
- **Pattern strip** (see assets): grid row `col-span-5 col-start-2 sm:col-span-4 sm:col-start-3 md:col-span-6 md:col-start-7 lg:col-span-12 lg:col-start-13 xl:col-span-12 xl:col-start-13`, a div `h-[60px] md:h-[120px] overflow-hidden bg-left bg-repeat`, `background-size:auto 60px` (md+: `auto 120px`), `max-sm:-mr-6`. At 1440: x728, w664, h120, at very top of the section (sits over the section padding).
- **Section label row**: `flex items-center gap-4`: 24x24 square (`size-6 bg-strong text-background`, i.e. #121212 with white icon; inverted in dark section) containing a 12px lucide icon, then eyebrow h2 (mono 12). Icon per section: database (built-different), frown (problem), command (solution), heart (customers), toggle-right (foundation). Label sits in `col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-22 xl:col-start-2` = x105. Text starts x145 (24 + 16 gap).
- **Section stack** rhythm: `space-y-10 md:space-y-16 lg:space-y-20 xl:space-y-24` (40 / 64 / 80 / 96). At 1440: label (24h) -> 96 gap -> headline (137h)-> 96 -> content. e.g. built-different label y1641, headline y1761 (24+96=120), columns y1994 (1761+137+96).
- **Headline block**: `col-span-6 md:col-span-9 lg:col-span-14 xl:col-span-12 xl:col-start-2` (x105 w664 at 1440); p headline then p lede `mt-3`.
- **Tag / badge**: `inline-flex items-center justify-center rounded border px-2 h-[21px]` + mono 12 uppercase, border 1px #e7e7de, radius 2px (`rounded` = --radius 2px; NB `rounded-sm` = .25rem = 4px is used for compliance chips). Used for hero pill, "Soon" and "New".
- **Buttons**: base `inline-flex relative items-center justify-between cursor-pointer whitespace-nowrap font-medium transition-all duration-200 shrink-0`. 
  - Primary: `bg-primary text-primary-foreground hover:opacity-80` = #121212 bg, #fff text, no border.
  - Secondary (outline): `text-secondary-foreground bg-transparent border border-secondary-foreground hover:bg-secondary-foreground/10` = 1px solid #3c3c3c, hover bg rgba(60,60,60,.10).
  - Large (`h-[46px] px-5 gap-1.5 text-sm rounded-[8px]`): width 195 ("Get started"+chevron-right 16px) / 197 ("See Reevo"+youtube 16px) / 196 (Learn more + chevron-right). Content is space-between with icon at right (icon `inline-flex size-4` lucide).
  - Small (nav) (`h-[36px] px-3 gap-1 justify-center text-xs rounded-[4px]`): "Log in" 63x36 outline, "Get started" 92x36 primary.
  - transition: `all 0.2s cubic-bezier(.4,0,.2,1)`.
- **Shadow `shadow-diffused`** (dropdown panels): `0 0 0 0 rgba(0,0,0,0), ..., 176px 308px 142px 0 rgba(0,0,0,.01), 99px 174px 120px 0 rgba(0,0,0,.05), 44px 77px 89px 0 rgba(0,0,0,.09), 11px 19px 49px 0 rgba(0,0,0,.10)`.
- Lucide icons used (lucide-react, stroke 2, 24 viewBox scaled by size class): chevron-down, chevron-right, youtube, arrow-right, database, frown, command, heart, toggle-right, menu, x, lock, shield-half, shield-check, plus per-feature icons listed in section 2.

---

## 1. Header / nav (sticky) and dropdowns

`<header class="bg-background sticky top-0 right-0 left-0 z-50">` height 72 (desktop, md+ uses `--nav-height-desktop`; below md 64), white bg, no border, no shadow. Sticky top 0, always visible (no hide-on-scroll, no bg change measured). Inner: container 1344 wide, `flex items-center justify-between`.

**Left**: logo link `/` (aria "Back to home"), inline SVG wordmark with `text-gray-10 h-auto w-[90px] md:w-[98px] xl:w-[104px]`; at 1440 = 104x32 at (48,20). SVG markup in CLONE_ASSETS.md. (Note `md:` here is 840px: at 768 logo is 90x27 at (24,18)... at 390 also 90x27.)

**Center (lg+ only, `max-lg:hidden`)**: `ul flex items-center justify-center gap-1`, block x473 w493 h36 at y18. Items each `h-[36px] px-4 gap-2 rounded (2px) transition-colors duration-200 hover:bg-gray-1 (#f7f7f0)`, label mono 12 uppercase #121212:
| item | type | rect (x,w) |
|---|---|---|
| PLATFORM (+chevron-down 12px) | Radix popover button, `radix-state-open:bg-gray-1` | 473, 111 |
| PRICING | link `/pricing` | 588, 84 |
| TOUR | link `/product-tour` | 676, 62 |
| COMPANY (+chevron) | button | 742, 103 |
| RESOURCES (+chevron) | button | 849, 118 |
Opening happens on click (Radix), not hover-only; open state gives button bg #f7f7f0.

**Right**: `flex flex-1 items-center justify-end gap-2`: "Log in" (`http://app.reevo.ai`, outline sm, x1229 w63) and "Get started" (`/get-started`, primary sm, x1300 w92). Menu button `lg:hidden`.

**Dropdown panel base**: `shadow-diffused absolute z-50 mt-1 rounded bg-white p-0`, top = 58 (18+36 button +4 mt-1). Radius 2px, bg #fff, no border.
- **Platform** panel: w590 h391 at x473 y58. Top area `flex` h340: left `flex-1 p-1.5` (w380) "Products" list; right `w-[210px] shrink-0 border-l border-border` (#e7e7de). Bottom bar `border-t border-border p-1.5` h51.
  - Left: header label "PRODUCTS" (mono 12, color `!text-muted-foreground` #92918f, `px-2.5 py-2`, h30). Rows `hover:bg-gray-1 flex items-center gap-3 rounded p-2.5 transition-colors duration-200` h60 (y94,154,213,273,333), each with `size-9` (36px) `rounded overflow-hidden` image + text `flex-1 space-y-0.5`: name `text-sm font-medium text-strong` (16px/22 line) and description `text-xs` (14px/16):
    - Find `/products/find` "Source high-value buyers with precision" img `/assets/images/nav/find.png`
    - Connect `/products/connect` "Engage, qualify, and seamlessly route leads" `nav/connect.png`
    - Sell `/products/sell` "Capture every interaction and convert deals faster" `nav/sell.png`
    - Manage `/products/manage` "Track performance, pipeline, and activity" `nav/manage.png`
    - Foundation `/products/foundation` "One memory layer where context compounds" `nav/foundation.png`
  - Right: "WORKS WITH" label same style, then links `text-sm font-medium text-strong px-2.5 py-2 rounded hover:bg-gray-1` (h38): "Integrations" + tag "New" (`/integrations`), "Mobile App" (`/apps/mobile`), "Chrome Extension" (`https://chromewebstore.google.com/detail/reevo/fhnjabhbjkfgcijifbeeifdbbiclphaa`).
  - Bottom bar: `flex items-center gap-4 px-2.5 py-2`: lock icon 16px + "Trust Center" (`text-sm font-medium`), then `text-xs text-muted-foreground` "SOC 2 · AICPA SOC · ISO 27001" (gap-1.5).
- **Company** panel: w232 h87 at x742 y58. Links (each w220 h38, `px-2.5 py-2`): "About us" `/about`, "Careers" `/careers` (a 16px icon slot exists at x758,y75 in the Careers-adjacent span; an external/arrow icon, unverified).
- **Resources** panel: w232 h238 at x849 y58. "Blog" `/blog`, "Newsletter" `/newsletter`, "Startup Program" `/startups`, "Partners" `/partners`, "Help Center" `https://help.reevo.ai/`, "Release Notes" `/release-notes`.
- Popover open/close animation not captured (Radix defaults; suggested 150ms fade). Unverified.

**Mobile / tablet (below lg = 1140px)**: nav center hidden. Header 64 tall (`--nav-height-mobile`). Right side: "Get started" (primary sm, 82x36 at x202 @390; at 768 86x36 at 568) + "Menu" button (74x36, outline sm style, `Menu` + lucide-menu 12px; sr-only "Open menu"). "Log in" hidden in header. When open the button turns to "Close" + lucide-x with bg rgba(60,60,60,.10).
- Open menu: Radix Popover `fixed` panel, x0 y64 w=100vw h=(100vh-64) (780 @844), bg #fff, `no-scrollbar`. Content `flex h-full flex-col`: top accordion in container: rows `border-t border-border last:border-b` h48/49: PLATFORM (accordion w/ chevron 12px rotating 180deg when open), PRICING (`/pricing`), TOUR (`/product-tour`), COMPANY (accordion), RESOURCES (accordion); label mono 12 uppercase. Bottom `flex-shrink-0 py-8` at y700 with `flex flex-col gap-2 md:flex-row`: "Log in" (outline sm, full width 342x36) and "Get started" (primary sm, full width). Accordion contents same links as dropdowns (not expanded/measured).

---

## 2. Hero (`<header class="pt-10 text-center md:pt-12 xl:pt-14">`) y72 to 1325 (h1253) at 1440

Padding-top: 56 @1440 (`xl:pt-14`), 48 @md, 40 @mobile. No background (white). Text centered.
Grid `grid-cols-6 md:grid-cols-12 lg:grid-cols-24 gap-y-6` (row gap 24).
1. **Pill**: `mb-5 flex justify-center sm:mb-6 lg:mb-8` (32 mb @lg), tag "The AI-native sales platform" 226x21 at (607,128), border 1px #e7e7de, radius 2px, px-8px, mono 12 uppercase #121212.
2. **H1** (x105 y181, w1231 h181, 2 lines, centered): "Your sales tools are guessing. Reevo actually knows." Metrify 900 uppercase 113.208px / 90.566 line / -1.132 ls, #121212. Column `lg:col-span-22 lg:col-start-2`. (Mobile 57.5/46 at x24 w342 h184 - 4 lines; 768: 78.42/62.74, h188.)
3. **Sub H2** (x331 y386 w777 h57, 2 lines): "Reevo runs your whole sales motion on everything your team knows. It learns from every deal – so every rep closes like your best one." Haltung 700 26/28.6/-0.52 `text-balance`, #121212. Column `md:col-span-8 md:col-start-3 lg:col-span-16 lg:col-start-5 xl:col-span-14 xl:col-start-6`. Note en dash "–".
4. **CTAs** (y467 h54, x388 w664 outer col `xl:col-span-12 xl:col-start-7`): inner `mx-auto flex flex-col gap-2 sm:max-w-[400px] sm:flex-row md:pt-2`, so 400 wide, 8px gap, 8 top pad at md+. Buttons y475: "Get started" (`/get-started`, primary lg 195x46 x520, chevron-right) and "See Reevo" (`/product-tour`, outline lg 197x46 x723, youtube icon). Mobile: stacked full width 342x46, y681/735.
5. **Hero video** (col `col-span-6 max-md:row-start-2 md:col-span-12 md:pt-6 lg:col-span-24`): wrapper `relative overflow-hidden` at x48 y569 w1344 h756 (16:9, no radius, no border/shadow), bg #121212 (`bg-gray-10`) `aspect-[16/9]`. On mobile it is placed BEFORE the heading text (`max-md:row-start-2` means it is row 2... see mobile geometry: on 390 the video is at y353 (192 high) below the H1/sub? Measured: h1 y145, sub y569, CTAs y681, video y353: the video is second row, i.e. between H1 and the sub+CTAs).
   - `<video src="/assets/videos/promo-teaser.mp4" muted loop playsinline style="display:block;width:100%;height:100%;object-fit:cover">`, no autoplay attr but it plays (JS-driven), no poster, `preload="metadata"`, intrinsic 1572x1078, duration 11.375s.
   - Overlay `absolute inset-0 flex items-center justify-center` with opacity 1 (framer): play button `bg-gray-10 flex aspect-[132/96] w-[15%] lg:w-[10%] cursor-pointer text-white transition-opacity duration-200 hover:opacity-80` = 134x98 at (653,898) at 1440, #121212 solid rectangle, white right-pointing triangle svg `w-[18%]` (24x31) centered. Click presumably starts the video with sound (not exercised; unverified).
6. Height: total hero content y128 to 1325.

### Logo strip (`<section class="py-10 text-center md:py-12 xl:py-14">`) y1325 h187
Padding 56 @xl. Caption p (`mb-5 text-xs text-balance md:mb-4 lg:mb-5 xl:mb-6`, 14px/16.1, #3c3c3c) "One platform for your whole sales motion" at y1381 (centered, x105 w1231). Then marquee wrapper `min-h-[35px] mask-x-from-90% [--logo-scale:.85] md:[--logo-scale:1]` (x105 y1421 w1231 h35), mask = `linear-gradient(to right,#000 90%,transparent 100%)` intersect `linear-gradient(to left,#000 90%,transparent)` (10% fade at each edge).
- **Marquee**: `react-fast-marquee` (`.rfm-marquee-container`, `overflow-x:hidden; display:flex`), two `.rfm-marquee` tracks each `flex:0 0 auto`, animation `scroll 51.8333s linear infinite` (keyframes `0%{transform:translateX(0)} 100%{transform:translateX(-100%)}`), direction normal (moves LEFT), pauses on hover (`--pause-on-hover: paused`) and on active. Track width 1555 px, so speed = 1555/51.8333 = 30 px/s (react-fast-marquee `speed={30}`), `gradient={false}`. Each `.rfm-child` contains `div.mx-5 md:mx-6 xl:mx-8` (20/24/32 px each side => 64 gap at xl) wrapping the `<img>` (`h-auto`, width attr per logo, `--logo-scale` multiplies size on mobile: 0.85).
- Logos in order with 1440 rendered sizes (w x h): casca 98x22, propel 114x35, nclarity 82x24, snap 90x25, coreranger 133x29, codecargo 120x25, wallaroo 130x25, genefab 132x26, pgl 80x20 (SVGs, ~300px intrinsic; served via next/image w=96..256). Sequence then repeats (duplicate track).

---

## 3. `#built-different` (bg #f2f2ea gray-2) y1513 h1036 at 1440 (mobile 930 h1006, tablet 1050 h848)

Section shell (128 padding at lg). Pattern strip `pattern-01.png` at (728,1513) 664x120.
Content wrapper y1641 h780:
- Label row: icon `database`, h2 "One AI-native platform, your entire sales motion" (x145 y1646).
- Headline (x105 y1761 w664 h137): p `text-2xl`: "Revenue should feel **predictable.**" (42/44.1 -0.42, strong 700) + lede p `mt-3 text-lg` (x105 y1817 w664 h81): "Built on an AI foundation, Reevo runs your whole sales motion on the full context of every deal, from what your team's learned to signals they haven't seen yet."
- **Feature columns** (y1994 h255 at x105 w1287, container `xl:col-span-23 xl:col-start-2` hmm `col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-23 xl:col-start-2`). Flex row: `flex flex-row md:...gap` with 4 equal columns each `md:flex-1 md:min-w-0 md:pl-0` (310w each, x105/430/756/1082; column gap 16 (pl-4 on non-md)). Below md (mobile/tablet) it is a horizontal scroll-snap carousel: `-mx-6 sm:-mx-8 px-2 sm:px-4 max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:scroll-smooth`, `scroll-padding-left:8px` (16px at sm), each item `shrink-0 pl-4 last:pr-4 max-md:snap-start`, card `w-[70vw] sm:w-[50vw] md:w-full` with `max-md:border max-md:border-gray-4 (#a8a6a4) max-md:p-24px`, hover `hover:border-gray-4`? (border-gray-4 already); at mobile cards are 250x? (e.g. x49 text) at 390: title x49.
  - Column content: title link `inline-flex items-center gap-1.5 mb-5 sm:mb-6` (Haltung 700 20/23/-0.4) + `arrow-right` 16px; links: `/products/find`, `/products/connect`, `/products/sell`, `/products/manage`. Then `ul.flex-1.space-y-3` (12px between items), each `li.flex.items-center.gap-3.text-sm` (h32, label 16/21.6 #121212), FOLLOWED by a 32x32 chip `relative flex size-8 shrink-0 items-center justify-center rounded (2px) text-gray-10` containing a 16px lucide icon. NOTE chip is AFTER the text in DOM but the chip renders at LEFT (x105) with text at right, so li is `flex-row-reverse`-like (text x137... measured li text x=105? The li rect 105..302 includes chip at x105 w32, label after it). Build: chip left, label right, gap 12. "Soon" tag (mono 12 uppercase, 21px high, border) sits at right after the label (x254).
  - Chip colors: Find `#fecfb5` (orange-3), Connect `#fed3ed` (pink-3), Sell `#bef5dd` (green-3), Manage `#fffda7` (yellow-3), Foundation row `#b4e0ff` (blue-3).
  - Items and icons:
    - Find: TAM sourcing (combine), Contact enrichment (user-search), Company enrichment (folder-search), Intent signals (signal) [Soon], Lead scoring (crown) [Soon].
    - Connect: Domain purchase (banknote), Inbox warming (inbox), Sequence & dial (square-stack), Smart scheduler (calendar-check), Reply tracking (message-square-reply).
    - Sell: Meeting prep (file-search), Call recording (disc), Transcription (search-check), Smart task logging (list-checks).
    - Manage: Auto-deal update (refresh-cw), Forecasting (trending-up), Reporting (chart-column), Coaching insights (speech).
  - Row li pitch: 44px (32 + 12).
- **Foundation band** (y2305 h116, `mt-8 md:mt-10 lg:mt-12 xl:mt-14` = 56): link `/products/foundation` `flex justify-between gap-1.5 p-3 px-4 mb-5 sm:mb-6 sm:flex-row sm:items-center sm:justify-center text-strong bg-strong/7.5` = h49, bg rgba(18,18,18,.075) (computed `oklab(0.182 ... / 0.075)`), radius 0, padding 12px 16px, gap 6px, centered. Content: "Foundation :" (Haltung 700 20/23/-0.4; textContent "Foundation:") + description p 18/24.3 (`One memory layer where context compounds`) + arrow-right 16px (x978). At mobile it is stacked (title + text, x40).
  - Below (mb-6): `grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6` (h43 at 1440), li each `flex items-center gap-3 text-sm` (201 wide) with chip (blue-3 #b4e0ff): AI-native CRM (database), Ask Reevo (message-circle-question), Custom objects & relationships (boxes), Workflow automation (workflow), Command center (layout-dashboard), One-click migration (import).
- Mobile: section h1006; columns become carousel (cards x49 w ~250).

---

## 4. `#problem` (dark, `.dark`, bg #121212) y2549 h1254 (mobile 1936 h904, tablet 1898 h958)

Pattern strip `pattern-02.png` (728,2549) 664x120. Label row: icon frown (square is #fff with dark icon), h2 "Why fragmented sales tools lose context" (white).
- Headline: "None of your tools can see **the whole deal.**" (42/44.1, white; 2 lines at w664, h88) then lede p (#f2f2ea, 20/27, mt-3) "A CRM nobody updates. A call recorder. An outbound tool. Each one sees a fragment, so the AI bolted onto them is guessing. AI without the full picture is just guessing."
- 3 columns (y3074 h600, x105, 520, 936, each 400 wide; `md:flex-1 md:flex-col`, carousel below md with `w-[60vw]` cards, mobile 234x234 images): image `relative aspect-square w-full overflow-hidden` (400x400, `object-cover`, no radius), then `flex-1 pr-6 lg:pr-8 xl:pr-12` text (col gap-6 = 24). Title p `text-display-lg font-bold` white 20/23; body p 18/24.3 #f2f2ea:
  1. `integration-tax.jpg`: "Meeting prep is a scavenger hunt." / "Everything your team knows about the account is scattered across inboxes, recordings, and half-filled CRM fields. Reps spend 30 minutes reconstructing it before every call. Reevo preps the full picture automatically."
  2. `swivel-chair.jpg`: "Bending over backward to move deals." / "No single tool saw the whole conversation, so next steps depend on what the rep remembers to type. Reevo captures what was actually said, drafts the follow-up, and updates the record on its own."
  3. `fake-ai.jpg`: "Coaching in the dark." / "Managers coach from what reps report in the pipeline meeting, not from what happened on the calls. Reevo grounds every coaching conversation in real call evidence, for every rep, every week."
  Image alt texts: (1) "Surreal black and white photo of a person sitting at a table with coffee cups, covering their head with crumpled foil, pop art style with purple overlay" (2) "Conceptual black and white photo of a tired person slumped forward with their face on a laptop at a café table, exhaustion theme with orange square overlay" (3) "Artistic black and white image of a woman in a dress and high heels leaning backward over an office swivel chair, abstract pose with green overlay". Source images are 640x640 intrinsic (jpg).

---

## 5. `#solution` (bg #fff) y3802 h4057 (mobile 2840 h3203, tablet 2856 h4383)

Pattern strip `pattern-03.png` at (728,3802). Label icon `command`, h2 "How Reevo turns sales context into action". Headline "The Sales Platform. **AI-Native**" (note DOM text order: "The" + " Sales Platform." + `<strong>AI-Native</strong>`; renders as "The **AI-Native** Sales Platform." i.e. strong sits inline between; measured strong x181 after "The"). Lede: "Every call, email, and deal feeds one shared memory, so Reevo drafts follow-ups, updates the CRM, and flags risk on its own. Works alongside the tools you already use, or runs everything out of the box."

Four product rows in `space-y-10 md:space-y-12 xl:space-y-14` (40/48/56 stack) separated by `<hr class="border-border">` (1px #e7e7de, x105 w1287 at 1440), all rows `grid grid-cols-6 md:grid-cols-12 lg:grid-cols-24 gap-y-6`. Each row (row pitch ~890 px at 1440, e.g. image top y4284, 5174, 6064, 6955):
- **Image col**: `col-span-6 md:col-start-7 md:row-start-1 lg:col-span-14 lg:col-start-11 xl:col-span-14 xl:col-start-11` = x615 w777 at 1440, `relative aspect-square w-full` (777x777), `<img object-cover>` (source 828x828 / next/image w=828..1920), no radius, no border. On mobile (<md) a chip label (`md:hidden`, `inline-flex h-6 px-2` mono 12 uppercase) sits above the image, image full width (342 sq @390, 704 sq @768).
- **Text col**: `col-span-6 md:col-span-5 lg:col-span-9 xl:col-span-8 xl:col-start-2` (x105 w437 at 1440): hidden-below-md label `mb-4 sm:mb-6 lg:mb-8 xl:mb-10 hidden md:flex` = `relative inline-flex h-6 items-center px-2 uppercase` mono 12 (x113 y4289 shows px-2 within a 24px-high pill; pill has NO visible border/bg measured), then h3 (`mb-2 md:mb-3 lg:mb-4`), body p (`mb-6 md:mb-8 lg:mb-10 xl:mb-14`), then outline lg button "Learn more" (196x46).
  - Row 1 Find: image `find.jpg`; h3 "Generate more pipeline." (h122 2 lines); body "Build lists of the accounts worth your time, enrich them in a click, and research any buyer with built-in web search, so your team spends its energy selling instead of hunting for data."; `/products/find`.
  - Row 2 Connect: `connect.jpg`; "More meetings, less manual outreach." (h182 3 lines); "Turn signals into booked meetings, personalizing every touch with full context on each buyer. Make sure no warm lead ever goes cold."; `/products/connect`.
  - Row 3 Sell: `sell.jpg`; "Win more deals." (h61 1 line); "Go into every meeting fully prepared and see deal risk before deals slip, so nothing catches your team off guard. Give every rep a day back each week, freeing them to spend more time selling."; `/products/sell`.
  - Row 4 Manage: `manage.jpg`; "Numbers you can actually trust." (h122); "Forecasts grounded in evidence instead of optimism, giving you a pipeline you can finally trust. Make it easy to coach every rep, every week, turning that same evidence into consistent, repeatable improvement."; `/products/manage`.
  - Alts: Find "Reevo Find: Lead generation CRM screenshot with company filters including industry, location, employees, and revenue, alongside contact list of professionals with names, companies, and emails"; Connect "Reevo Connect: Email performance dashboard showing outbound metrics with 2,495 emails sent, progress breakdown by done, in progress, and enrolled, CRM analytics interface on purple background"; Sell "Reevo Sell: Video meeting summary tool with AI-generated transcript, sentiment analysis, and highlights, showing woman in headphones during remote call, business productivity software on blue background"; Manage "Reevo Manage opportunities chart tracking deals and prospects created each month against a goal line".
- Sticky: there is a compiled utility `@media (min-height:1000px){ .[@media(min-height:1000px)]:sticky ... }` in the CSS but NO element on the home page currently uses it (no sticky element other than the header). No scroll-linked/parallax behavior found.

---

## 6. `#customers` (bg #e7e7de gray-3) y7860 h1154 (mobile 6043 h919, tablet 7239 h881)

Pattern strip `pattern-05.png` (728,7860). Label icon `heart`, h2 "Customers love Reevo". Headline "Teams that switched to Reevo **sell more and type less.**" (42/44.1, h88 2 lines, #121212).
- **3 video testimonial cards** (y8292 h470, 400 wide, x105/520/936, gap 15; carousel below md with `w-[75vw] sm:w-[55vw]`, snap): card `flex min-h-[440px] sm:min-h-[404px] xl:min-h-[470px] flex-col bg-white` = white bg, radius 0, no border/shadow. Parts:
  1. Video button `group relative aspect-video overflow-hidden` 400x225: `<video src=... muted loop playsinline class="h-full w-full object-cover brightness-[1.15] contrast-[1.15] grayscale">` (filter: brightness 1.15, contrast 1.15, grayscale 100%). Videos autoplay when in view (first one was playing, others paused until visible; likely IntersectionObserver). Bottom gradient overlay `bg-gradient-to-b from-black/0 to-black/?` (`absolute right-0 bottom-0 left-0 flex items-center justify-end p-8`, h100 at y8417): computed backgroundImage none in JS query (class contains `to black/0` unresolved; treat as subtle bottom black gradient, unverified opacity), holding play chip `flex aspect-[132/96] h-9 items-center justify-center bg-black/50 text-white transition-opacity duration-200 group-hover:opacity-80` = 50x36 at (423,8449), rgba(0,0,0,.5), triangle icon `w-[18%]` (9x11). Company logo top-left `absolute top-8 left-8`, white (`text-white`) inline SVG: Propel `h-[28px] lg:h-[35px]` (113x35 @lg), Khosla `h-[16px] lg:h-[20px]` (171x20), Casca `h-[18px] lg:h-[22px]` (100x22). SVGs in CLONE_ASSETS.md.
     - Videos: `/assets/videos/testimonials/tony-teaser.mp4` (1280x720, 9.80s), `samir-teaser.mp4` (8.72s), `adlon-teaser.mp4` (9.84s).
  2. Quote `flex-1 p-8` (h154): p `text-display-lg font-bold` (20/23/-0.4 #121212) at x137 w336; hanging open quote.
     - Tony (Propel): "The last piece of software we actually ever need within our go-to-market side."
     - Samir (Khosla): "Every sales executive will be a better sales executive. They will service their customers better."
     - Adlon (Casca): "Reevo has allowed us, as a team, to focus on the human elements of sales."
  3. Attribution `p-8` (h92): mono 12 uppercase #121212: name line then `<span opacity-80>` role, `<br>` between. "Tony / CEO, Propel", "Samir / Managing Director, Khosla Ventures", "Adlon / COO, Casca".
- **As seen on** row (y8858, h27): `flex flex-col items-center gap-5 lg:flex-row lg:gap-12 xl:gap-14`: label "AS SEEN ON" (mono 12 uppercase, x264) then flex-wrap logos `gap-5 sm:gap-6 md:gap-8 xl:gap-10` (--logo-scale .85 mobile): links (target `_blank`, presumably) with images: Bloomberg 102x21 (`https://www.bloomberg.com/news/articles/2025-11-05/khosla-ventures-and-kleiner-perkins-back-ai-startup-reevo?accessToken=...&leadSource=uverify%20wall`), Yahoo Finance 121x17 (`https://finance.yahoo.com/news/reevo-debuts-80-million-funding-171500872.html`), Revenue Brew 125x13 (`https://www.revenuebrew.com/stories/2025/11/14/reevo-launches-with-funding`), SF Business Times 101x27 (`https://www.bizjournals.com/sanfrancisco/news/2025/11/06/sfbt-digest-thursday-pelosi-retire-doordash-elf-sf.html`), WSJ 172x14 (`https://venturecapital.cmail20.com/t/d-e-gjttukk-ihtrmdkuu-t/`). The Bloomberg URL contains a session accessToken; use a plain `https://www.bloomberg.com/news/articles/2025-11-05/khosla-ventures-and-kleiner-perkins-back-ai-startup-reevo`.

---

## 7. Foundation section (no id; bg #fff) y9013 h1153 (mobile 6962 h1002, tablet 8120 h1263)

Pattern strip `pattern-04.png` (728,9013). Label icon `toggle-right`, h2 "Foundation".
Grid row `gap-y-6`: text col (x105 w437) with h3 (Metrify 800, 76px uppercase) "Built on one source of truth." + p (`mb-4 md:mb-0`, 18/24.3) "Every interaction, workflow, and record lives in a single memory layer so context compounds instead of scattering across tools."; image col `md:col-start-7 md:row-start-1 lg:col-span-14 lg:col-start-11 lg:row-span-2` x615 y9261 777x777 aspect-square, slides stacked `absolute inset-0`, `role=tabpanel` (`hidden` when not current, `data-current`), `object-cover`.
Second text col (`lg:row-start-2`, `flex h-full flex-col justify-end`, x105 y9638 w437 h401): p `text-display-lg font-bold mb-2` "Meet Ask Reevo." (20/23), p body (18/24.3) "Type a question about pipeline, deal health, objections, or next steps. Reevo reasons across everything your team knows and cites the exact call, email, or record behind every answer. It lives in Slack too. Mention it in any channel and get the same cited answers where your team already works.", then stepper `ul.mt-6 flex w-full gap-4 sm:mt-8 sm:max-w-[338px] lg:mt-10 xl:mt-14` (3 buttons `flex-1 flex-col gap-2 text-left group`; each: mono 12 label "01/02/03" (rendered "0 1" in textContent; DOM has "0" "1" split), opacity 40 by default, 100 when active, `group-hover:opacity-100`, transition-opacity 200ms; below a 5px-high track `bg-gray-3 (#e7e7de) overflow-hidden` with fill `bg-orange-8 (#fa7b34) origin-left` `transform:scaleX(progress)`, opacity 0 on inactive, 1 active). Stepper 338 wide, 3 items ~102 wide with 16 gap.
- **Motion (Ask Reevo carousel)**: auto-advance loop 01 -> 02 -> 03 -> 01, each slide ~5.0 s (progress scaleX 0 -> 1 linear; sampled rate 0.147 per 769 ms = ~5.2 s; slide switch cadence measured 5.0 s between starts). Progress bar driven by JS (inline transform per frame). Click on step jumps to that slide and restarts progress. Slide swap is instant (panel `hidden` toggled; no crossfade measured, all opacity 1). Order: DOM panel index 0 = `reevo-alerts.jpg` (Slack alert, 01), index 1 = `summary.jpg` (02), index 2 = `output.jpg` (03). Starts at 01 on mount. Alts: alerts "Slack conversation where a rep asks Reevo which deals are at risk this quarter and Reevo replies naming three at-risk deals with the reasons"; summary "Ask Reevo activity summary of a deal's pricing and ROI concerns, with an insight and recommended next steps"; output "Ask Reevo naming the team's strongest seller for an objection and laying out their step-by-step talk track". Source images 750x750 jpg (loaded at w=1920 by next/image).

---

## 8. `#testimonials` (bg #e7e7de gray-3) y10167 h709 (mobile 7964 h842, tablet 9383 h1067)

- Top pattern (`absolute top-0 left-0 w-full h-[28px] md:h-[40px]` bg-size auto 28px / md auto 40px, `bg-left`, max-sm `-mr-6`): `testimonials/patterns/pattern-top-neutral.png`, 1440x40 at y10167.
- Dark card backdrop: a nested section (`bg-transparent`, `absolute inset-0 [&_*]:h-full`, presentation) draws a `#121212` rect (`var(--color-gray-10)`) at x331 y10295 w1004 h453: grid col `lg:col-span-20 lg:col-start-5 xl:col-span-18 xl:col-start-6`, with `lg:pb-8 xl:pb-10` inner. It is BEHIND the `cite` content (`relative z-10`) and spans from behind the photo (x105..558) to x1335.
- Content grid at y10295 (h453): photo `col-span-6 md:col-span-5 lg:col-span-9 xl:col-span-8 xl:col-start-2` `relative aspect-square lg:-mr-4` = 453x453 at x105, `nate.jpg` object-cover (700x700 attr, 750 intrinsic), no radius.
  - Quote col `md:col-span-7 lg:col-span-13 lg:col-start-11 xl:col-span-12 xl:col-start-11` (x615 w664): `p-8 md:flex md:h-full md:items-center lg:px-0 lg:py-8 xl:py-10`, text 26/28.6/-0.52 weight 500 color #f2f2ea, y10407 h229: "Coming from HubSpot, Reevo was truly a breath of fresh air. Their vertically integrated platform for outbound sales and AI-first workflow has made spinning up campaigns a breeze for us, and we're booking meetings at a steady clip with their outbound tools. The Reevo team has been the best vendor we've ever worked with, and they continue to ship huge updates at breakneck pace. The future is bright for these guys." (nbsp between "these" and "guys"; wrapped with curly quotes “ ... ”).
  - Name tag `z-10 md:col-span-4 md:self-end lg:col-span-6 xl:col-span-6 xl:col-start-2` `md:pb-6 lg:pb-8 xl:pb-[56px]`: white bar `flex h-14 items-center bg-white px-8` = 324x56 at (105,10636), text mono 12 uppercase #121212: "Nate" / "Digital Marketing Manager , nClarity" (2nd line opacity 80; DOM text "Digital Marketing Manager,&nbsp;nClarity"). Mobile: tag overlaps photo bottom (`max-md:row-start-2 max-md:-mt-16 max-md:pr-2`).
  - Text block has inline `opacity:1; transform:none; z-index:1` (framer-motion whileInView/initial) — initial hidden state is not observable (already visible with no animation observed on scroll).

---

## 9. CTA section (bg #fff) y10876 h676 (mobile 8806 h509, tablet 10450 h490)

No pattern strip. Content y11004 h420, grid `gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-14` (56 @xl).
- H2 (x105 y11004 w1174 h181, 2 lines): "Every workflow. Full context. Compounding results." Metrify 900 113.208/90.566/-1.132 uppercase #121212 (`col-span-6 md:col-span-12 lg:col-span-22 xl:col-span-21 xl:col-start-2`), left-aligned.
- Sub p (y11241 h27, x105, `text-lg` 20/27 #121212, col `xl:col-span-22 xl:col-start-2`): "Onboarding is easy. Get up and running in minutes."
- Buttons (col `col-span-6 lg:col-span-6 xl:col-start-2`, w324): `space-y-2` (8 gap) stacked: "Get started" primary lg 324x46 (y11324, `/get-started`), "See Reevo" outline lg 324x46 (y11378, `/product-tour`), icons at right (chevron-right, youtube). Mobile: full width 342, sub p 18px.

---

## 10. Footer (`<footer class="bg-white py-10 md:py-14 lg:py-16 xl:py-20">`) y11552 h693 (mobile 9315 h775, tablet 10940 h759)

Padding 80 @xl (64 lg, 56 md, 40 base). No top border. 
- **Link grid** (y11632 h210), `grid grid-cols-6 md:grid-cols-12 lg:grid-cols-24 gap-y-10`: 
  - Col A (`lg:col-span-3 xl:col-start-2`, x105 w154): logo link `/` with square Reevo mark SVG 29x29 `text-gray-10 w-[29px]`.
  - Spacer cols (`hidden lg:block lg:col-span-1`, 41 wide) between.
  - 4 link columns (`col-span-3 md:col-span-3 lg:col-span-4`, 211 wide at x331/615/898/1181): group title p (`text-muted-foreground mb-3 md:mb-4 text-xs` = 14/16.1 #92918f) then `ul` of `a.text-strong.flex.items-center.gap-2.py-1.text-sm` (16/21.6 #121212; row height 30 (1+21.6+... py-1), pitch 30):
    - Products: Find `/products/find`, Connect `/products/connect`, Sell `/products/sell`, Manage `/products/manage`, Foundation `/products/foundation`
    - Platform: Pricing `/pricing`, Blog `/blog`, Product Tour `/product-tour`, Login `http://app.reevo.ai`
    - Company: About us `/about`, Careers `/careers`, Startup Program `/startups`, Become a Partner `/partners`, Release Notes `/release-notes`, Newsletter `/newsletter`
    - Social: LinkedIn `https://www.linkedin.com/company/reevo-ai/`, X/Twitter `https://x.com/reevo_ai`
  - Mobile: 2-column grid (163 each; x24 / x203), tablet 2 columns (344 each x32/392).
- Spacer div `h-10 lg:h-48 xl:h-64` (256 @xl).
- **Bottom row** (y12098 h67) `grid ... gap-y-10 md:items-baseline`: 
  - Left (`lg:col-span-6 lg:col-start-5 xl:col-span-5 xl:col-start-6`, x331): "© 2026 Reevo, Inc." (14/16.1 #92918f).
  - Middle (`lg:col-span-9 lg:col-start-10 xl:col-span-8`, x615 w437): compliance chips `flex flex-wrap gap-1`: `h-[28px] px-2 gap-2 rounded-sm (4px) border border-border (1px #e7e7de) text-muted-foreground text-xs` with 12px lucide icon at left: "SOC2 Compliant" (lock, 139w), "AICPA SOC  Trusted" (shield-half, 155w; note double space in DOM), "ISO 27001 Certified" (shield-check, 153w; wraps to 2nd row at 1440).
  - Right (`lg:col-span-7 lg:col-start-19 xl:col-span-4 xl:col-start-20`, x1125 w211): `space-y-3`: row "Privacy Notice" `/privacy` / "Terms of Service" `/terms` (`text-xs #3c3c3c`, 4px gap, slash separator), then button "Do Not Sell or Share My Personal Information" (`text-xs text-left cursor-pointer #3c3c3c`, opens cookie preference; wraps to 2 lines, h32).
  - Mobile order: right group, copyright, chips stacked (y9857 / 9936 / 9990).

---

## 11. Mobile (390) and tablet (768) summary

- 390: `scrollWidth 390` (no horizontal overflow), doc height 10090. Sections y: hero 64, logos 781 (h149), built-different 930 (h1006), problem 1936 (h904), solution 2840 (h3203), customers 6043 (h919), foundation 6962 (h1002), testimonials 7964 (h842), CTA 8806 (h509), footer 9315 (h775). Padding 64 for sections, hero pt 40.
- 768: doc height 11699. Sections y: hero 64 (h836), logos 900 (h150), built-different 1050 (h848), problem 1898 (h958), solution 2856 (h4383), customers 7239 (h881), foundation 8120 (h1263), testimonials 9383 (h1067), CTA 10450 (h490), footer 10940 (h759). Below 840 the 12-col layout is NOT active: everything is a 6-col grid so text and images stack full width (704 wide at 32 padding). Nav is mobile version (menu button at x662). Hero H1 78.42px, centered; video 704x396 at y361.
- Mobile measured type: hero H1 57.5/46 (-0.575), H2 sub 20/22 (-0.4), buttons 14/18.9 (text-sm) h46, section headline 28/29.4 (-0.28), lede 18/24.3, H3 48/38.4 (-0.48, Metrify 800), product body 16/21.6, quote 18/20.7 (-0.36), big quote 20/22 (-0.4), footer 12/13.8/-0.12 (links 14/18.9).
- Carousels below md: problem (3 cols), built-different (4 cols), customer videos (3 cards): horizontal scroll-snap containers (`snap-x snap-mandatory overflow-x-auto scroll-smooth`, `snap-start`), items pl-4 (16px), first item offset by container `px-2`(8) / `sm:px-4` and `scroll-padding-left 8/16px`, container bleeds `-mx-6 sm:-mx-8`. Problem cards `w-[60vw]` (234 @390) `inline-block whitespace-nowrap` (text resets to normal wrap inside); built-different cards `w-[70vw] sm:w-[50vw]` (bordered #a8a6a4, p-24); customer cards `w-[75vw] sm:w-[55vw]`, min-h 440 (mobile) / 404 (sm).

---

## 12. Motion inventory

- **Marquee** (customer logo strip): CSS `@keyframes scroll` translateX(0 -> -100%), 51.8333s linear infinite, 30 px/s, pause on hover/active; edge mask 10% each side. No other continuous CSS animations (only `spin` keyframe defined, unused).
- **Ask Reevo carousel**: JS auto-advance ~5.0 s/slide with linear progress fill (scaleX 0-1, origin-left, `bg-orange-8`); inactive labels opacity .4 -> 1 (transition-opacity 200ms), click to select.
- **Videos**: hero `promo-teaser.mp4` (muted loop, JS-controlled, play-button overlay `opacity 1` framer-controlled, fades on click presumably; unverified), 3 testimonial videos muted/loop, grayscale filter; the playing state was observed in view (IntersectionObserver-like; first card playing when scrolled into view, others paused off-screen).
- **Hover states**: buttons `transition: all .2s cubic-bezier(.4,0,.2,1)`: primary `hover:opacity-80`; outline `hover:bg-rgba(60,60,60,.10)`; nav items and dropdown rows `hover:bg-gray-1 (#f7f7f0)`, `transition-colors duration-200`; video play chips `group-hover:opacity-80` (200ms); hero play button `hover:opacity-80`; stepper labels `group-hover:opacity-100`; footer links have `hover:text-...` utilities in CSS (`hover:text-gray-8`, `hover:text-gray-10`, `hover:text-strong`, `hover:text-foreground`), exact per-link value unmeasured (likely subtle color change, default transition 200ms). Cards on mobile `hover:border-gray-4`.
- **Transitions found on page (computed)**: `color/background-color/border-color/.../fill/stroke 0.2s cubic-bezier(.4,0,.2,1)`, `all 0.2s cubic-bezier(.4,0,.2,1)`, `opacity 0.2s cubic-bezier(.4,0,.2,1)`.
- **Scroll reveals**: NONE. Sampled document state before scrolling and 80 ms/1300 ms after scrolling with a MutationObserver-free style diff: no element changes opacity/transform on scroll (elements with inline `opacity:1;transform:none` are already at final values). H1 has no load animation (opacity 1, transform none at first paint). `IntersectionObserver` exists in the page bundle only for video play/pause and the carousel (assumed). No scroll-linked parallax; no sticky sections apart from the header.
- **Header**: sticky, constant.
- `prefers-reduced-motion` media rule exists in the CSS (`@media (prefers-reduced-motion)`), contents not examined.
- Console: 3 errors on load (third-party analytics, ignore).
- Tracking/third-party scripts in saved folder (posthog, GTM, LinkedIn Insight, Apollo tracker, warmly widget, etc.): not needed for the clone.

---

## 13. Head / meta (for index.html)

- `<title>Reevo | The AI-Native Sales Platform</title>`
- og:image `https://reevo.ai/share-image.png` (1200x630), alt "A complete revenue platform, so you can retire your complex sales stack. Find leads, connect with buyers, close deals, and manage revenue."; og:type website; twitter:card summary_large_image; twitter:creator @reevo; twitter:title same as title; twitter:description "Reevo is the AI-native sales platform for prospecting, outreach, deal management, forecasting, coaching, and CRM powered by the full context of your business."; twitter:image same as og:image.
- Icons: `/assets/images/favicon-light.png` (64x64, shortcut/icon/apple-touch), `favicon-light.svg` (prefers-color-scheme light), `favicon-dark.svg` (dark). None saved locally.

---

## 14. Suggested Tailwind v3 mapping
- `theme.extend.colors`: `gray:{1..10}`, `orange`, `yellow`, `green`, `blue`, `pink`, `teal` with the hex above; semantic `background/foreground/strong/muted-foreground/border` via CSS vars, redefined under `.dark` (`#problem` gets class `dark`).
- `theme.extend.fontFamily`: `sans:['Haltung','system-ui','sans-serif']`, `heading:['Metrify','sans-serif']`, `mono:['GTAmericaMono','Consolas','monospace']`.
- `fontSize` entries for the table above using `['clamp(...)',{lineHeight:'115%',letterSpacing:'-.01em'}]`.
- `screens` as above; `spacing`/`gap` defaults are compatible (`--spacing .25rem`).
- Original utility `bg-size-[auto_60px]` => arbitrary `[background-size:auto_60px]`; `mask-x-from-90%` => custom CSS mask (see 2); `size-N` => `w-N h-N`; `bg-strong/7.5` => `bg-[rgb(18_18_18/0.075)]`.
