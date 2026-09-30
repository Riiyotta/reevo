# Reevo marketing site (reevo.ai), as rebuilt in this project's src/ (React + Vite + Tailwind v3)

Source: Reevo marketing site (reevo.ai), as rebuilt in this project's src/ (React + Vite + Tailwind v3)
Status: **measured-from-clone** · production approved: **false**
71 routes · 16 templates · 46 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Blog post, Compare a competitor, Product detail) account for 55 of 71 routes (77%). The remaining 16 routes span 13 templates.

| template | routes | share |
|---|---:|---:|
| Blog post | 43 | 61% |
| Compare a competitor | 7 | 10% |
| Product detail | 5 | 7% |
| Form page | 3 | 4% |
| Setup instructions | 2 | 3% |
| Home | 1 | 1% |
| About | 1 | 1% |
| Careers | 1 | 1% |
| Startup program | 1 | 1% |
| Mobile app | 1 | 1% |
| Blog index | 1 | 1% |
| Release notes | 1 | 1% |
| Pricing | 1 | 1% |
| Product tour | 1 | 1% |
| Integrations | 1 | 1% |
| Newsletter | 1 | 1% |

## Page chrome

**71 routes carry chrome = `unspecified`** — Home, About, Careers, Startup program, Mobile app, Product detail, Compare a competitor, Blog post, Blog index, Setup instructions, Release notes, Form page, Pricing, Product tour, Integrations, Newsletter.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `shell.footer` | SHELL | 16 | 71 | `src/components/Footer.jsx` | Carried by every template (71 routes). |
| `shell.navbar` | SHELL | 16 | 71 | `src/components/Navbar.jsx` | Carried by every template (71 routes). |
| `content.post-article` | CONTENT | 1 | 43 | `src/pages/BlogPost.jsx (+3 more)` | Carried by the Blog post template (43 routes). |
| `content.related-posts` | CONTENT | 1 | 43 | `src/pages/BlogPost.jsx` | Carried by the Blog post template (43 routes). |
| `conversion.cta-band` | CONVERSION | 8 | 18 | `src/components/CTA.jsx (+1 more)` | Carried by the Home, Mobile app, Product detail, Compare a competitor, Release notes, Pricing, Integrations, Newsletter templates (18 routes). |
| `content.faq-accordion` | CONTENT | 4 | 8 | `src/components/faq.jsx (+2 more)` | Carried by the Mobile app, Product detail, Pricing, Product tour templates (8 routes). |
| `hero.split-image` | HERO | 2 | 8 | `src/components/compare/CompareSections.jsx (+1 more)` | Carried by the Compare a competitor, Integrations templates (8 routes). |
| `social-proof.testimonial` | SOCIAL-PROOF | 3 | 7 | `src/components/Testimonials.jsx (+2 more)` | Carried by the Home, Startup program, Product detail templates (7 routes). |
| `compare.feature-table` | COMPARE | 1 | 7 | `src/components/compare/CompareSections.jsx` | Carried by the Compare a competitor template (7 routes). |
| `compare.quick-table` | COMPARE | 1 | 7 | `src/components/compare/CompareSections.jsx` | Carried by the Compare a competitor template (7 routes). |
| `compare.reasons` | COMPARE | 1 | 7 | `src/components/compare/CompareSections.jsx` | Carried by the Compare a competitor template (7 routes). |
| `interactive.accordion-showcase` | INTERACTIVE | 2 | 6 | `src/components/products/ProductAccordion.jsx (+1 more)` | Carried by the Mobile app, Product detail templates (6 routes). |
| `content.product-cards` | CONTENT | 1 | 5 | `src/components/products/ProductCards.jsx` | Carried by the Product detail template (5 routes). |
| `content.product-features` | CONTENT | 1 | 5 | `src/components/products/ProductFeatures.jsx` | Carried by the Product detail template (5 routes). |
| `hero.product` | HERO | 1 | 5 | `src/components/products/ProductHero.jsx` | Carried by the Product detail template (5 routes). |
| `nav.product-tabs` | NAV | 1 | 5 | `src/components/products/ProductTabs.jsx` | Carried by the Product detail template (5 routes). |
| `hero.page-header` | HERO | 3 | 3 | `src/components/pricing/shared.jsx (+1 more)` | Carried by the Blog index, Pricing, Product tour templates (3 routes). |
| `doc.prose-page` | DOC | 2 | 3 | `src/components/blog/DocPage.jsx (+2 more)` | Carried by the Setup instructions, Release notes templates (3 routes). |
| `form.centered-form` | FORM | 1 | 3 | `src/pages/GetStarted.jsx (+4 more)` | Carried by the Form page template (3 routes). |
| `content.lead-statement` | CONTENT | 2 | 2 | `src/pages/About.jsx (+2 more)` | Carried by the About, Careers templates (2 routes). |
| `content.platform-columns` | CONTENT | 2 | 2 | `src/components/BuiltDifferent.jsx (+1 more)` | Carried by the Home, Startup program templates (2 routes). |
| `hero.eyebrow-title-banner` | HERO | 2 | 2 | `src/pages/About.jsx (+1 more)` | Carried by the About, Careers templates (2 routes). |
| `media.photo-pattern-collage` | MEDIA | 2 | 2 | `src/pages/Startups.jsx (+1 more)` | Carried by the Startup program, Mobile app templates (2 routes). |
| `social-proof.logo-grid` | SOCIAL-PROOF | 2 | 2 | `src/pages/About.jsx (+2 more)` | Carried by the About, Careers templates (2 routes). |
| `content.dark-problem` | CONTENT | 1 | 1 | `src/components/Problem.jsx` | Carried by the Home template (1 routes). |
| `content.event-timeline` | CONTENT | 1 | 1 | `src/components/blog/MobileSections.jsx` | Carried by the Mobile app template (1 routes). |
| `content.footnote-attribution` | CONTENT | 1 | 1 | `src/pages/Integrations.jsx` | Carried by the Integrations template (1 routes). |
| `content.job-board` | CONTENT | 1 | 1 | `src/pages/Careers.jsx (+1 more)` | Carried by the Careers template (1 routes). |
| `content.plan-compare-table` | CONTENT | 1 | 1 | `src/components/pricing/ComparePlans.jsx` | Carried by the Pricing template (1 routes). |
| `content.post-list` | CONTENT | 1 | 1 | `src/pages/Blog.jsx (+1 more)` | Carried by the Blog index template (1 routes). |
| `content.pricing-plans` | CONTENT | 1 | 1 | `src/components/pricing/PricingPlans.jsx` | Carried by the Pricing template (1 routes). |
| `content.principle-rows` | CONTENT | 1 | 1 | `src/pages/Careers.jsx (+1 more)` | Carried by the Careers template (1 routes). |
| `content.qualification-terms` | CONTENT | 1 | 1 | `src/pages/Startups.jsx` | Carried by the Startup program template (1 routes). |
| `content.release-entry` | CONTENT | 1 | 1 | `src/pages/ReleaseNotes.jsx` | Carried by the Release notes template (1 routes). |
| `content.solution-rows` | CONTENT | 1 | 1 | `src/components/Solution.jsx` | Carried by the Home template (1 routes). |
| `content.team-cards` | CONTENT | 1 | 1 | `src/pages/About.jsx` | Carried by the About template (1 routes). |
| `content.tour-demo` | CONTENT | 1 | 1 | `src/components/pricing/TourDemo.jsx` | Carried by the Product tour template (1 routes). |
| `hero.form-split` | HERO | 1 | 1 | `src/pages/Newsletter.jsx` | Carried by the Newsletter template (1 routes). |
| `hero.marketing-video` | HERO | 1 | 1 | `src/components/Hero.jsx` | Carried by the Home template (1 routes). |
| `hero.mobile-app` | HERO | 1 | 1 | `src/components/blog/MobileSections.jsx` | Carried by the Mobile app template (1 routes). |
| `hero.title-cta` | HERO | 1 | 1 | `src/pages/Startups.jsx` | Carried by the Startup program template (1 routes). |
| `interactive.ask-reevo-carousel` | INTERACTIVE | 1 | 1 | `src/components/Foundation.jsx` | Carried by the Home template (1 routes). |
| `interactive.integrations-browser` | INTERACTIVE | 1 | 1 | `src/components/pricing/IntegrationsBrowser.jsx` | Carried by the Integrations template (1 routes). |
| `interactive.scroll-story` | INTERACTIVE | 1 | 1 | `src/components/company/ScrollStory.jsx` | Carried by the About template (1 routes). |
| `social-proof.customer-video-cards` | SOCIAL-PROOF | 1 | 1 | `src/components/Customers.jsx` | Carried by the Home template (1 routes). |
| `social-proof.logo-marquee` | SOCIAL-PROOF | 1 | 1 | `src/components/LogoMarquee.jsx` | Carried by the Home template (1 routes). |

**14 shared sections** appear in more than one template and belong in a component library.

**32 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Home — `template.home`

1 route · `/`

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | HERO | `hero.marketing-video` | page-local |
| 3 | SOCIAL-PROOF | `social-proof.logo-marquee` | page-local |
| 4 | CONTENT | `content.platform-columns` | shared ×2 |
| 5 | CONTENT | `content.dark-problem` | page-local |
| 6 | CONTENT | `content.solution-rows` | page-local |
| 7 | SOCIAL-PROOF | `social-proof.customer-video-cards` | page-local |
| 8 | INTERACTIVE | `interactive.ask-reevo-carousel` | page-local |
| 9 | SOCIAL-PROOF | `social-proof.testimonial` | shared ×3 |
| 10 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 11 | SHELL | `shell.footer` | shared ×16 |

### About — `template.company-about`

1 route · `/about`

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | HERO | `hero.eyebrow-title-banner` | shared ×2 |
| 3 | CONTENT | `content.lead-statement` | shared ×2 |
| 4 | INTERACTIVE | `interactive.scroll-story` | page-local |
| 5 | CONTENT | `content.team-cards` | page-local |
| 6 | SOCIAL-PROOF | `social-proof.logo-grid` | shared ×2 |
| 7 | SHELL | `shell.footer` | shared ×16 |

### Careers — `template.company-careers`

1 route · `/careers`

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | HERO | `hero.eyebrow-title-banner` | shared ×2 |
| 3 | CONTENT | `content.lead-statement` | shared ×2 |
| 4 | CONTENT | `content.principle-rows` | page-local |
| 5 | SOCIAL-PROOF | `social-proof.logo-grid` | shared ×2 |
| 6 | CONTENT | `content.job-board` | page-local |
| 7 | SHELL | `shell.footer` | shared ×16 |

### Startup program — `template.company-startups`

1 route · `/startups`

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | HERO | `hero.title-cta` | page-local |
| 3 | MEDIA | `media.photo-pattern-collage` | shared ×2 |
| 4 | CONTENT | `content.platform-columns` | shared ×2 |
| 5 | SOCIAL-PROOF | `social-proof.testimonial` | shared ×3 |
| 6 | CONTENT | `content.qualification-terms` | page-local |
| 7 | SHELL | `shell.footer` | shared ×16 |

### Mobile app — `template.apps-mobile`

1 route · `/apps/mobile`

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | HERO | `hero.mobile-app` | page-local |
| 3 | INTERACTIVE | `interactive.accordion-showcase` | shared ×2 |
| 4 | CONTENT | `content.event-timeline` | page-local |
| 5 | MEDIA | `media.photo-pattern-collage` | shared ×2 |
| 6 | CONTENT | `content.faq-accordion` | shared ×4 |
| 7 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 8 | SHELL | `shell.footer` | shared ×16 |

### Product detail — `template.product-detail`

5 routes · `/products/find`, `/products/connect`, `/products/sell`, `/products/manage`, `/products/foundation`

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | NAV | `nav.product-tabs` | page-local |
| 3 | HERO | `hero.product` | page-local |
| 4 | CONTENT | `content.product-features` | page-local |
| 5 | INTERACTIVE | `interactive.accordion-showcase` | shared ×2 |
| 6 | SOCIAL-PROOF | `social-proof.testimonial` | shared ×3 |
| 7 | CONTENT | `content.product-cards` | page-local |
| 8 | CONTENT | `content.faq-accordion` | shared ×4 |
| 9 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 10 | SHELL | `shell.footer` | shared ×16 |

### Compare a competitor — `template.compare-competitor`

7 routes · `/compare/apollo`, `/compare/attio`, `/compare/fireflies`, `/compare/gong`, `/compare/hubspot`, `/compare/outreach`, `/compare/salesforce`

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | HERO | `hero.split-image` | shared ×2 |
| 3 | COMPARE | `compare.quick-table` | page-local |
| 4 | COMPARE | `compare.reasons` | page-local |
| 5 | COMPARE | `compare.feature-table` | page-local |
| 6 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 7 | SHELL | `shell.footer` | shared ×16 |

### Blog post — `template.blog-post`

43 routes · `/blog/ai-crm-features`, `/blog/ai-crm-real-intelligence`, `/blog/ai-native-crm-guide`, `/blog/ai-sales-prospecting`, `/blog/api-integration-sales-motion`, `/blog/ask-reevo-slack-artifacts-custom-views`, `/blog/autonomous-sales-pipeline`, `/blog/b2b-sales-funnel`, `/blog/best-power-dialer-software`, `/blog/casca`, `/blog/cold-calling-scripts`, `/blog/cold-email-template`, `/blog/crm-data-enrichment`, `/blog/crm-migration`, `/blog/data-enrichment-tools`, `/blog/data-janitor-revenue-architect`, `/blog/discovery-call-guide`, `/blog/discovery-call-questions`, `/blog/email-deliverability-sender-reputation`, `/blog/email-subject-lines`, `/blog/future-revenue-stackless`, `/blog/go-to-market-strategy-gtm-meaning`, `/blog/high-intent-prospecting-checklist`, `/blog/hubspot-alternatives`, `/blog/more-dials-mentality-sales-outreach`, `/blog/pipeline-review-questions`, `/blog/propel`, `/blog/redefining-how-companies-go-to-market`, `/blog/revenue-operating-system`, `/blog/sales-cadence-guide`, `/blog/sales-email-templates`, `/blog/sales-forecasting-techniques`, `/blog/sales-pipeline-metrics`, `/blog/sales-pre-call-cheat-sheet`, `/blog/sales-prospecting-techniques`, `/blog/sales-sequence-guide`, `/blog/sales-stack-consolidation`, `/blog/sales-team-admin-work`, `/blog/sales-team-motivation`, `/blog/salesforce-alternatives`, `/blog/system-of-record-revenue-operating-system`, `/blog/tam-sourcing`, `/blog/will-ai-replace-sales-jobs`

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | CONTENT | `content.post-article` | page-local |
| 3 | CONTENT | `content.related-posts` | page-local |
| 4 | SHELL | `shell.footer` | shared ×16 |

### Blog index — `template.blog-index`

1 route · `/blog`

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | HERO | `hero.page-header` | shared ×3 |
| 3 | CONTENT | `content.post-list` | page-local |
| 4 | SHELL | `shell.footer` | shared ×16 |

### Setup instructions — `template.doc-page`

2 routes · `/bot-for-slack-setup`, `/zoom-setup`

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | DOC | `doc.prose-page` | shared ×2 |
| 3 | SHELL | `shell.footer` | shared ×16 |

### Release notes — `template.changelog`

1 route · `/release-notes`

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | DOC | `doc.prose-page` | shared ×2 |
| 3 | CONTENT | `content.release-entry` | page-local |
| 4 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 5 | SHELL | `shell.footer` | shared ×16 |

### Form page — `template.form-page`

3 routes · `/get-started`, `/partners`, `/startups-apply-now`

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | FORM | `form.centered-form` | page-local |
| 3 | SHELL | `shell.footer` | shared ×16 |

### Pricing — `template.pricing`

1 route · `/pricing`

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | HERO | `hero.page-header` | shared ×3 |
| 3 | CONTENT | `content.pricing-plans` | page-local |
| 4 | CONTENT | `content.plan-compare-table` | page-local |
| 5 | CONTENT | `content.faq-accordion` | shared ×4 |
| 6 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 7 | SHELL | `shell.footer` | shared ×16 |

### Product tour — `template.product-tour`

1 route · `/product-tour`

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | HERO | `hero.page-header` | shared ×3 |
| 3 | CONTENT | `content.tour-demo` | page-local |
| 4 | CONTENT | `content.faq-accordion` | shared ×4 |
| 5 | SHELL | `shell.footer` | shared ×16 |

### Integrations — `template.integrations`

1 route · `/integrations`

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | HERO | `hero.split-image` | shared ×2 |
| 3 | INTERACTIVE | `interactive.integrations-browser` | page-local |
| 4 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 5 | CONTENT | `content.footnote-attribution` | page-local |
| 6 | SHELL | `shell.footer` | shared ×16 |

### Newsletter — `template.newsletter`

1 route · `/newsletter`

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×16 |
| 2 | HERO | `hero.form-split` | page-local |
| 3 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 4 | SHELL | `shell.footer` | shared ×16 |

## Section reference

### SHELL

_Chrome rendered once outside the router and present on every route: the sticky header and the footer._

**`shell.footer`** — Global site footer: brand mark, four link groups (Products, Platform, Company, Social), legal links, copyright and three compliance chips. Always the last node on every route.

· Carried by every template (71 routes). · appears on 71 routes · implemented by `src/components/Footer.jsx`

**`shell.navbar`** — Global sticky header: brand mark, primary navigation (three dropdown panels plus two direct links), a persistent Get started CTA and a Log in link, collapsing to a full-screen accordion menu below lg. It is the always-present route into pricing, tour and sign-up.

· Carried by every template (71 routes). · appears on 71 routes · implemented by `src/components/Navbar.jsx`

### HERO

_The page-opening header block: headline, lede and calls to action, sometimes with a video, image or form beside it._

**`hero.eyebrow-title-banner`** — Company-page opener: a mono eyebrow (the h1), a large all-caps statement and a full-width decorative banner (a pattern strip or a wide pattern image) that gives the page a brand-colour anchor before the story content.

· Carried by the About, Careers templates (2 routes). · appears on 2 routes · implemented by `src/pages/About.jsx (+1 more)`

**`hero.form-split`** — Newsletter sign-up hero: headline, short pitch and a one-field email form with a consent line on the left, a square photo on the right. Turns the page visit into a subscription ask.

· Carried by the Newsletter template (1 routes). · appears on 1 routes · implemented by `src/pages/Newsletter.jsx`

**`hero.marketing-video`** — Home-page hero: a tag, an all-caps headline, a supporting sentence, two CTAs and a 16:9 promo video that plays a muted looping teaser until the visitor presses play, then swaps to the full video.

· Carried by the Home template (1 routes). · appears on 1 routes · implemented by `src/components/Hero.jsx`

**`hero.mobile-app`** — Mobile-app landing hero: tag, headline with a coloured emphasis span, bold-led pitch and two CTAs (talk to sales, or open a QR install dialog), beside a square photo with a looping stack of sample notification cards that demonstrates what the app surfaces.

· Carried by the Mobile app template (1 routes). · appears on 1 routes · implemented by `src/components/blog/MobileSections.jsx`

**`hero.page-header`** — Plain text page opener for utility-style pages: a small mono label, a large all-caps title and an optional one-sentence lede. Sets the page topic before the main content (plans, demo, post list).

· Carried by the Blog index, Pricing, Product tour templates (3 routes). · appears on 3 routes · implemented by `src/components/pricing/shared.jsx (+1 more)`

**`hero.product`** — Product-page hero: headline, one bold-led lede and a single Get started button on a gray band, with a wide product screenshot and a decorative pattern that straddle into the white section below.

· Carried by the Product detail template (5 routes). · appears on 5 routes · implemented by `src/components/products/ProductHero.jsx`

**`hero.split-image`** — Hero for informational landing pages: mono eyebrow, large all-caps headline, a lede and one or two CTAs on the left, with a square supporting image on the right at md and up. Used to frame a comparison or the integrations catalogue before detailed content.

· Carried by the Compare a competitor, Integrations templates (8 routes). · appears on 8 routes · implemented by `src/components/compare/CompareSections.jsx (+1 more)`

**`hero.title-cta`** — Text-only hero for the startup programme page: an all-caps headline, a one-sentence pitch and two CTAs (apply, and see the product). No media; the image collage follows it.

· Carried by the Startup program template (1 routes). · appears on 1 routes · implemented by `src/pages/Startups.jsx`

### NAV

_Secondary in-page navigation that sits between the site header and the page body._

**`nav.product-tabs`** — Product-page tab strip listing the five products (Find, Connect, Sell, Manage, Foundation) with the current one highlighted by its brand-colour dot, so visitors can move between product pages.

· Carried by the Product detail template (5 routes). · appears on 5 routes · implemented by `src/components/products/ProductTabs.jsx`

### SOCIAL-PROOF

_Evidence that other companies use the product: logo strips and grids, customer video cards, testimonials._

**`social-proof.customer-video-cards`** — Let real customers make the case: three video testimonial cards (hover-to-play teaser, click for the full video in a dialog) followed by an As seen on press row that links to real coverage.

· Carried by the Home template (1 routes). · appears on 1 routes · implemented by `src/components/Customers.jsx`

**`social-proof.logo-grid`** — Prove credibility with a static wall of real third-party logos: who backs the company (About, Startups) or where the team has worked before (Careers).

· Carried by the About, Careers templates (2 routes). · appears on 2 routes · implemented by `src/pages/About.jsx (+2 more)`

**`social-proof.logo-marquee`** — Immediately under the hero, reassure visitors that real companies already run on the platform, using a slow ambient row of customer logos with a one-line caption.

· Carried by the Home template (1 routes). · appears on 1 routes · implemented by `src/components/LogoMarquee.jsx`

**`social-proof.testimonial`** — Put one real customer's face, quote, name and role at full width so a visitor sees a peer vouching for a specific outcome. One layout, implemented three times in the source (home, /startups, product pages).

· Carried by the Home, Startup program, Product detail templates (7 routes). · appears on 7 routes · implemented by `src/components/Testimonials.jsx (+2 more)`

### CONTENT

_The substantive body of a page: feature and product explanation, pricing, principles, team, jobs, articles and lists._

**`content.dark-problem`** — Frame the problem before the product: on a dark background, name why fragmented sales tools lose context and back it with three pain-point cards, creating contrast and tension ahead of the solution section.

· Carried by the Home template (1 routes). · appears on 1 routes · implemented by `src/components/Problem.jsx`

**`content.event-timeline`** — Tell a day-in-the-life story on a dark background: three timestamped moments at a conference show how the product captures every conversation, presented as a horizontal timeline with tick marks.

· Carried by the Mobile app template (1 routes). · appears on 1 routes · implemented by `src/components/blog/MobileSections.jsx`

**`content.faq-accordion`** — Answer the objections and basic questions a buyer has just before the closing call to action, with a fixed 'Frequently asked questions' heading on the left and a ruled list of question/answer rows on the right. Answers stay hidden until asked so the section stays short while still carrying searchable copy.

· Carried by the Mobile app, Product detail, Pricing, Product tour templates (8 routes). · appears on 8 routes · implemented by `src/components/faq.jsx (+2 more)`

**`content.footnote-attribution`** — A quiet strip between the closing call to action and the footer that credits the third-party data provider whose logos appear on the page, as required for attribution.

· Carried by the Integrations template (1 routes). · appears on 1 routes · implemented by `src/pages/Integrations.jsx`

**`content.job-board`** — Turn careers interest into applications: list every open role grouped by team, with a sticky team index for jumping, each row linking straight to its external posting.

· Carried by the Careers template (1 routes). · appears on 1 routes · implemented by `src/pages/Careers.jsx (+1 more)`

**`content.lead-statement`** — Right after a company-page hero, state the mission or point of view in one large paragraph with a bold opening phrase, then hand the visitor straight to the next action.

· Carried by the About, Careers templates (2 routes). · appears on 2 routes · implemented by `src/pages/About.jsx (+2 more)`

**`content.plan-compare-table`** — Give a buyer the detailed Core vs Pro entitlement comparison, grouped by product pillar, that the plan cards only summarise. It is the anchor target for the plan cards' 'Show full plan comparison' link and lets a buyer verify allowances before contacting sales.

· Carried by the Pricing template (1 routes). · appears on 1 routes · implemented by `src/components/pricing/ComparePlans.jsx`

**`content.platform-columns`** — Show the whole product surface at a glance: four product-pillar columns (Find, Connect, Sell, Manage) with feature chips, plus a Foundation band underneath, so visitors see one platform rather than four tools.

· Carried by the Home, Startup program templates (2 routes). · appears on 2 routes · implemented by `src/components/BuiltDifferent.jsx (+1 more)`

**`content.post-article`** — Present one blog article as a readable long-form page: title block, square cover, the article body in a prose column, a conversion prompt at the foot, and a sticky left sidebar (author and share links, key takeaways, table of contents, newsletter signup) that helps the reader navigate and subscribe while reading.

· Carried by the Blog post template (43 routes). · appears on 43 routes · implemented by `src/pages/BlogPost.jsx (+3 more)`

**`content.post-list`** — Let a reader browse every blog article, newest first, and narrow the list by category: a filter row followed by a vertical list of article cards, the first one drawn larger as the featured article.

· Carried by the Blog index template (1 routes). · appears on 1 routes · implemented by `src/pages/Blog.jsx (+1 more)`

**`content.pricing-plans`** — Present the three commercial plans side by side without publishing prices, so every plan card routes the visitor to a sales conversation (work-email capture) instead of a checkout. A startup-programme banner underneath offers a discount path to a specific audience.

· Carried by the Pricing template (1 routes). · appears on 1 routes · implemented by `src/components/pricing/PricingPlans.jsx`

**`content.principle-rows`** — Communicate how the company operates and what it values as a list of short titled statements, each a two-column row (bold title left, explanatory sentence right), so culture reads as clear commitments rather than a paragraph.

· Carried by the Careers template (1 routes). · appears on 1 routes · implemented by `src/pages/Careers.jsx (+1 more)`

**`content.product-cards`** — On a product page, show two to four benefit cards, each pairing a short benefit statement with a screenshot of the feature, to make the value tangible after the accordion walkthrough.

· Carried by the Product detail template (5 routes). · appears on 5 routes · implemented by `src/components/products/ProductCards.jsx`

**`content.product-features`** — On each product page, lay out the capabilities of that product as a scannable grid of icon, name and one-sentence description, with a See Reevo call to action, before the deeper accordion showcases.

· Carried by the Product detail template (5 routes). · appears on 5 routes · implemented by `src/components/products/ProductFeatures.jsx`

**`content.qualification-terms`** — Close the startups offer: state who qualifies (size and investor-backing criteria), show the accepted investors as a logo wall, give one action to apply, and list the terms in small print.

· Carried by the Startup program template (1 routes). · appears on 1 routes · implemented by `src/pages/Startups.jsx`

**`content.related-posts`** — Keep a reader in the blog after finishing an article: a titled strip with a View all link, followed by two related article cards in the same layout as the blog index, so the next read is one click away.

· Carried by the Blog post template (43 routes). · appears on 43 routes · implemented by `src/pages/BlogPost.jsx`

**`content.release-entry`** — Record one product release in a changelog timeline: a dated, linkable heading with an optional italic subtitle, then either a short bullet list or one summary sentence, and optionally one or two screenshots. Repeated once per release so a reader can scan what changed and when.

· Carried by the Release notes template (1 routes). · appears on 1 routes · implemented by `src/pages/ReleaseNotes.jsx`

**`content.solution-rows`** — Walk through the four product pillars (Find, Connect, Sell, Manage) as alternating image and text rows, each tying a customer outcome to a product screenshot and a Learn more link to the pillar page.

· Carried by the Home template (1 routes). · appears on 1 routes · implemented by `src/components/Solution.jsx`

**`content.team-cards`** — Put real faces and credentials on the company: four founder cards (photo, name, role) that reveal a short bio on hover, introduced by a paragraph on where the team's experience comes from.

· Carried by the About template (1 routes). · appears on 1 routes · implemented by `src/pages/About.jsx`

**`content.tour-demo`** — Let a visitor try the product hands-on without talking to sales: a looping teaser video with a 'Try the interactive demo' button opens a self-guided demo in a modal, and a follow-up callout below converts people who liked it into a custom-demo booking.

· Carried by the Product tour template (1 routes). · appears on 1 routes · implemented by `src/components/pricing/TourDemo.jsx`

### INTERACTIVE

_Blocks whose main job is a behaviour: carousels, auto-advancing accordions, a scroll-linked story, a filterable catalogue._

**`interactive.accordion-showcase`** — Explain one product capability area through a headline, an optional lede, a single-open accordion of 2 to 4 benefit items and a square screenshot that changes with the open item. The section advances itself so a visitor sees each benefit paired with its screenshot without clicking.

· Carried by the Mobile app, Product detail templates (6 routes). · appears on 6 routes · implemented by `src/components/products/ProductAccordion.jsx (+1 more)`

**`interactive.ask-reevo-carousel`** — Show, on a single square stage, three real Ask Reevo answers (Slack conversation, deal summary, best-seller talk track) that cycle on their own, so a visitor sees the AI answering with cited context without having to click. Sits under a 'Foundation' label with a one-source-of-truth headline.

· Carried by the Home template (1 routes). · appears on 1 routes · implemented by `src/components/Foundation.jsx`

**`interactive.integrations-browser`** — Let a visitor check whether the tool they already use is supported, by browsing or searching a catalogue of about 1,300 integrations grouped by the five product pillars. It backs the page's '1,300+ tools' claim with a searchable list and lets a filtered view be shared by URL.

· Carried by the Integrations template (1 routes). · appears on 1 routes · implemented by `src/components/pricing/IntegrationsBrowser.jsx`

**`interactive.scroll-story`** — Deliver a five-part company manifesto one statement at a time. The section is five viewport-heights tall with a sticky stage, so the visitor's own scrolling paces the reading and each statement replaces the last in place, making a long statement feel like a guided story instead of a wall of text.

· Carried by the About template (1 routes). · appears on 1 routes · implemented by `src/components/company/ScrollStory.jsx`

### COMPARE

_Competitor comparison blocks used only on the /compare/* pages._

**`compare.feature-table`** — Let a deep-diving buyer verify the comparison feature by feature: a dark table of grouped capabilities with a yes or no mark for Reevo and for the competitor, collapsed to the first three groups until the visitor asks for more.

· Carried by the Compare a competitor template (7 routes). · appears on 7 routes · implemented by `src/components/compare/CompareSections.jsx`

**`compare.quick-table`** — Give a comparison-page visitor the answer in four rows: a three-column table that sets Reevo against one named competitor on best-for, system of record, AI capability and ideal team, so the decision is visible before any longer argument.

· Carried by the Compare a competitor template (7 routes). · appears on 7 routes · implemented by `src/components/compare/CompareSections.jsx`

**`compare.reasons`** — Explain in prose why a buyer would pick Reevo over this one competitor: an intro paragraph, three (or four) short reason pairs of a title and an explanation, and for two competitors a colour-accented callout that frames the competitor as a product of an earlier era.

· Carried by the Compare a competitor template (7 routes). · appears on 7 routes · implemented by `src/components/compare/CompareSections.jsx`

### MEDIA

_Image-led presentation blocks with little copy._

**`media.photo-pattern-collage`** — Full-bleed image moment between a hero and the content below: a wide photograph overlapped by a decorative pattern block, standing on a coloured band that hands over to white so the photo appears to straddle the section boundary.

· Carried by the Startup program, Mobile app templates (2 routes). · appears on 2 routes · implemented by `src/pages/Startups.jsx (+1 more)`

### FORM

_Forms. None of them submit anywhere in this clone; they validate in the browser only._

**`form.centered-form`** — Whole-page lead-capture form: a heading, one or two intro lines and a single centred column of labelled fields ending in a wide submit button. Used for demo booking, startup-programme applications and partner enquiries.

· Carried by the Form page template (3 routes). · appears on 3 routes · implemented by `src/pages/GetStarted.jsx (+4 more)`

### DOC

_Long-form instruction or changelog page body._

**`doc.prose-page`** — Long-form reference page in a narrow reading column: an all-caps title followed by rich-text instructions (setup guides) or a caller-supplied list (release notes). Optimised for reading, with no hero or imagery.

· Carried by the Setup instructions, Release notes templates (3 routes). · appears on 3 routes · implemented by `src/components/blog/DocPage.jsx (+2 more)`

### CONVERSION

_The closing call-to-action band that ends a page before the footer._

**`conversion.cta-band`** — Closing conversion band directly above the footer: an all-caps headline, one line of reassurance and a stacked primary Get started plus outline See Reevo button pair.

· Carried by the Home, Mobile app, Product detail, Compare a competitor, Release notes, Pricing, Integrations, Newsletter templates (18 routes). · appears on 18 routes · implemented by `src/components/CTA.jsx (+1 more)`
