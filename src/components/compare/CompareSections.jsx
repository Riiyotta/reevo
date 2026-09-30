import { Fragment, createElement as h, useState } from 'react'
import { Check, ChevronRight, FlipHorizontal, GitCompareArrows, ListOrdered, Plus, X, Youtube } from 'lucide-react'
import { Button, COL_HEADLINE, COL_LABEL, Container, GRID, Headline, STACK, Section, SectionLabel, Wordmark } from '../ui.jsx'

// Sections of the /compare/:competitor template (reevo.ai/compare/*), classes ported 1:1 from the original.

// Rich text: string, or array of strings and { b } bold segments
export function Rich({ value }) {
  if (typeof value === 'string') return value
  return value.map((s, i) => (typeof s === 'string' ? <Fragment key={i}>{s}</Fragment> : <strong key={i}>{s.b}</strong>))
}

function CompetitorLogo({ logo }) {
  return h(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: logo.viewBox },
    logo.paths.map((p, i) =>
      h('path', { key: i, d: p.d, fill: 'currentColor', ...(p.evenOdd ? { fillRule: 'evenodd', clipRule: 'evenodd' } : {}) }),
    ),
  )
}

export function CompareHero({ c }) {
  return (
    <header className="py-10 md:py-12 xl:py-14 xl:pb-0">
      <Container>
        <div className={GRID}>
          <div className={COL_LABEL}>
            <p className="mb-5 block font-mono text-display-xs uppercase text-strong sm:mb-6 lg:mb-8">How Reevo compares</p>
            <h1 className="block font-heading text-display-3xl font-black uppercase text-strong">Reevo vs. {c.name}</h1>
          </div>
          <div className="col-span-6 md:col-span-5 md:col-start-8 md:row-span-3 lg:col-span-9 lg:col-start-15 xl:col-span-8 xl:col-start-15">
            <div className="py-2 md:py-0">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src="/assets/images/compare/hero-ui.jpg"
                  alt="Reevo's unified revenue platform interface"
                  decoding="async"
                  className="absolute left-0 top-0 h-full w-full object-cover text-transparent"
                />
              </div>
            </div>
          </div>
          <div className="col-span-6 md:col-start-1 lg:col-span-12 xl:col-span-11 xl:col-start-2">
            <h2 className="text-pretty text-lg text-strong">
              <Rich value={c.intro} />
            </h2>
          </div>
          <div className="col-span-6 md:col-start-1 lg:col-span-7 xl:col-start-2 xl:pb-14">
            <div className="flex flex-col gap-2 pt-2 sm:max-w-[400px] sm:flex-row lg:pt-3 xl:pt-4">
              <Button href="/get-started" variant="primary" icon={ChevronRight} className="sm:flex-1">
                Get started
              </Button>
              <Button href="/product-tour" variant="outline" icon={Youtube} className="sm:flex-1">
                See Reevo
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}

// Deviation: on the original the tables overflow the viewport below sm (e.g. 404-410px wide at 390),
// making the page scroll sideways. The table sections here add overflow-x-clip (no visual change at scrollX 0).
const QUICK_CELL ='border border-border w-1/3 px-6 py-5 align-top md:py-6 xl:px-8 xl:py-7'
const QUICK_HEAD = 'px-6 py-5 md:p-6 xl:p-8'

export function QuickCompare({ c }) {
  return (
    <Section className="overflow-x-clip bg-gray-2" pattern="/assets/images/patterns/pattern-05.png">
      <SectionLabel icon={GitCompareArrows}>Quick compare</SectionLabel>
      <Headline>
        <strong className="font-bold">Reevo vs. {c.name}: at a glance</strong>
      </Headline>
      <div className={GRID}>
        <div className={COL_LABEL}>
          <table className="border-collapse text-left text-sm text-strong max-sm:-mx-6 sm:w-full">
            <thead>
              <tr>
                <th className={QUICK_HEAD}>
                  <span className="sr-only">Feature</span>
                </th>
                <th className={`${QUICK_HEAD} border border-gray-4/25 bg-gray-3`}>
                  <Wordmark className="h-[23px] w-auto" />
                </th>
                <th className={`${QUICK_HEAD} border border-gray-4/25 bg-gray-3`}>
                  <span className="text-muted-foreground">
                    <div className="h-[20px] w-[76px] [&>svg]:h-full [&>svg]:w-auto">
                      <CompetitorLogo logo={c.logo} />
                    </div>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {c.quick.map(([label, reevo, them], i) => (
                <tr key={label} className={i % 2 === 0 ? 'bg-gray-1' : 'bg-background'}>
                  <td className={QUICK_CELL}>
                    <strong>{label}</strong>
                  </td>
                  <td className={QUICK_CELL}>{reevo}</td>
                  <td className={QUICK_CELL}>{them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  )
}

export function Reasons({ c }) {
  const titleStyle = c.accent ? { color: c.accent } : undefined
  return (
    <Section className="bg-background" pattern="/assets/images/patterns/pattern-02.png">
      <SectionLabel icon={ListOrdered}>What customers say</SectionLabel>
      <div>
        <Headline>
          <strong className="font-bold">{c.reasonsHeadline}</strong>{' '}
        </Headline>
        <div className={`${GRID} mt-4 md:mt-5 xl:mt-6`}>
          <div className={COL_HEADLINE}>
            {c.reasonsBody.map((p, i) => (
              <p key={i}>
                <Rich value={p} />
              </p>
            ))}
          </div>
        </div>
      </div>
      {c.reasons.map(([title, body]) => (
        <div key={title} className={GRID}>
          <div className="col-span-6 md:col-span-4 lg:col-span-5 xl:col-span-6 xl:col-start-2">
            <p className="block text-display-lg font-bold text-strong" style={titleStyle}>
              {title}
            </p>
          </div>
          <div className="col-span-6 md:col-span-8 lg:col-span-15 lg:col-start-9 xl:col-span-13 xl:col-start-11">
            <p className="text-xl text-strong">{body}</p>
          </div>
        </div>
      ))}
      {c.callout && (
        <div className={GRID}>
          <div className="col-span-6 max-md:hidden md:col-span-4 lg:col-span-6 xl:col-span-5">
            <div className="relative aspect-square overflow-hidden">
              <img
                src={c.callout.img}
                alt={c.callout.alt}
                loading="lazy"
                decoding="async"
                className="absolute left-0 top-0 h-full w-full object-cover text-transparent"
              />
            </div>
          </div>
          <div className="col-span-6 md:col-span-8 lg:col-span-17 xl:col-span-18">
            <div
              className="min-h-full p-6 md:-ml-4 md:flex md:items-center md:p-8 lg:p-10 xl:p-12"
              style={{ backgroundColor: c.accent }}
            >
              <p className="text-white">{c.callout.text}</p>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}

// Categories visible before "Show more features" (original renders the first 3, then all on click)
const INITIAL_CATEGORIES = 3
const FEAT_BORDER = 'border-border/50'

function Availability({ yes }) {
  return (
    <div className={`relative inline-flex items-center gap-1 ${yes ? 'text-green-5' : 'text-[#F96A1A]'}`}>
      <div className="inline-flex items-center justify-center" aria-hidden="true">
        {yes ? <Check className="size-4 flex-shrink-0" /> : <X className="size-4 flex-shrink-0" />}
      </div>
      <span className="sr-only">{yes ? 'Available' : 'Not available'}</span>
    </div>
  )
}

export function FeatureCompare({ c }) {
  const [expanded, setExpanded] = useState(false)
  const cats = expanded ? c.features : c.features.slice(0, INITIAL_CATEGORIES)
  return (
    <section className="dark relative overflow-x-clip bg-background py-16 md:py-24 lg:py-32">
      <div>
        <Container>
          <div className={STACK}>
            <SectionLabel icon={FlipHorizontal}>Feature compare</SectionLabel>
            <Headline>
              <strong className="font-bold">Reevo and {c.name} side-by-side</strong>
            </Headline>
            <div className={GRID}>
              <div className={COL_LABEL}>
                <table className="w-full border-collapse text-sm text-strong">
                  <thead>
                    <tr>
                      <th className="px-6 py-0 text-center max-md:hidden">
                        <span className="sr-only">Category</span>
                      </th>
                      <th className="px-6 py-0 text-center">
                        <span className="sr-only">Feature</span>
                      </th>
                      <th className="px-6 py-0 text-center">
                        <span className="sr-only">Reevo</span>
                        <Wordmark className="mx-auto h-[22px] w-auto" />
                      </th>
                      <th className="px-6 py-0 text-center">
                        <span className="sr-only">{c.name}</span>
                        <span className="text-muted-foreground/60">
                          <span
                            className="mx-auto flex h-[20px] w-[76px] justify-center [&>svg]:h-full [&>svg]:w-auto"
                            aria-hidden="true"
                          >
                            <CompetitorLogo logo={c.logo} />
                          </span>
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cats.map((cat) => (
                      <Fragment key={cat.name}>
                        <tr className="md:hidden">
                          <td className={`${FEAT_BORDER} border-b p-4 pl-0 pt-10 font-bold`} colSpan={3}>
                            {cat.name}
                          </td>
                        </tr>
                        {cat.rows.map(([feature, reevo, them], i) => {
                          const first = i === 0 ? ' md:pt-10' : ''
                          return (
                            <tr key={feature}>
                              {i === 0 && (
                                <td
                                  className={`${FEAT_BORDER} border-0 p-4 pl-0 align-top font-bold max-md:hidden md:w-1/4 md:pt-10`}
                                  rowSpan={cat.rows.length}
                                >
                                  {cat.name}
                                </td>
                              )}
                              <td className={`${FEAT_BORDER} border-b p-4 max-md:pl-0 md:w-[41%] lg:pl-6 xl:pl-8${first}`}>
                                {feature}
                              </td>
                              <td className={`${FEAT_BORDER} border-b p-4 text-center${first}`}>
                                <Availability yes={reevo} />
                              </td>
                              <td className={`${FEAT_BORDER} border-b p-4 text-center${first}`}>
                                <Availability yes={them} />
                              </td>
                            </tr>
                          )
                        })}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
                {!expanded && c.features.length > INITIAL_CATEGORIES && (
                  <div className="flex justify-center pt-6 md:justify-start md:pl-[25%] md:pt-8 xl:pt-10">
                    <div className="w-full md:pl-4 lg:pl-6 xl:pl-8">
                      <Button
                        variant="outline"
                        icon={Plus}
                        className="min-w-[240px] max-sm:w-full"
                        onClick={() => setExpanded(true)}
                      >
                        Show more features
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
