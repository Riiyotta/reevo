import { Fragment } from 'react'
import { ChevronRight, Command } from 'lucide-react'
import { Button, COL_IMAGE, COL_TEXT, GRID, Headline, Section, SectionLabel } from './ui.jsx'

const ROWS = [
  {
    pill: 'bg-orange-2', label: 'Find', img: '/assets/find.jpg', href: '/products/find',
    alt: 'Reevo Find: Lead generation CRM screenshot with company filters including industry, location, employees, and revenue, alongside contact list of professionals with names, companies, and emails',
    title: 'Generate more pipeline.',
    body: 'Build lists of the accounts worth your time, enrich them in a click, and research any buyer with built-in web search, so your team spends its energy selling instead of hunting for data.',
  },
  {
    pill: 'bg-pink-2', label: 'Connect', img: '/assets/connect.jpg', href: '/products/connect',
    alt: 'Reevo Connect: Email performance dashboard showing outbound metrics with 2,495 emails sent, progress breakdown by done, in progress, and enrolled, CRM analytics interface on purple background',
    title: 'More meetings, less manual outreach.',
    body: 'Turn signals into booked meetings, personalizing every touch with full context on each buyer. Make sure no warm lead ever goes cold.',
  },
  {
    pill: 'bg-green-3', label: 'Sell', img: '/assets/sell.jpg', href: '/products/sell',
    alt: 'Reevo Sell: Video meeting summary tool with AI-generated transcript, sentiment analysis, and highlights, showing woman in headphones during remote call, business productivity software on blue background',
    title: 'Win more deals.',
    body: 'Go into every meeting fully prepared and see deal risk before deals slip, so nothing catches your team off guard. Give every rep a day back each week, freeing them to spend more time selling.',
  },
  {
    pill: 'bg-yellow-3', label: 'Manage', img: '/assets/manage.jpg', href: '/products/manage',
    alt: 'Reevo Manage opportunities chart tracking deals and prospects created each month against a goal line',
    title: 'Numbers you can actually trust.',
    body: 'Forecasts grounded in evidence instead of optimism, giving you a pipeline you can finally trust. Make it easy to coach every rep, every week, turning that same evidence into consistent, repeatable improvement.',
  },
]

const PILL = 'relative inline-flex h-6 items-center px-2 leading-none uppercase'
const PILL_TEXT = 'relative block font-mono text-display-xs uppercase text-strong'

export default function Solution() {
  return (
    <Section id="solution" className="bg-background" pattern="/assets/images/patterns/pattern-03.png">
      <SectionLabel icon={Command}>How Reevo turns sales context into action</SectionLabel>
      <Headline lede="Every call, email, and deal feeds one shared memory, so Reevo drafts follow-ups, updates the CRM, and flags risk on its own. Works alongside the tools you already use, or runs everything out of the box.">
        The <strong className="font-bold">AI-Native</strong> Sales Platform.
      </Headline>
      <div className="space-y-10 md:space-y-12 xl:space-y-14">
        {ROWS.map((r, i) => (
          <Fragment key={r.label}>
            {i > 0 && (
              <div className={GRID}>
                <hr className="col-span-6 border-border md:col-span-12 lg:col-span-24 xl:col-span-23 xl:col-start-2" />
              </div>
            )}
            <div className={`${GRID} gap-y-6`}>
              <div className={COL_IMAGE}>
                <div className="md:hidden">
                  <div className={`${PILL} ${r.pill}`}>
                    <p className={PILL_TEXT}>{r.label}</p>
                  </div>
                </div>
                <div className="relative aspect-square w-full">
                  <img src={r.img} alt={r.alt} className="absolute inset-0 h-full w-full object-cover" />
                </div>
              </div>
              <div className={COL_TEXT}>
                <div className="mb-4 hidden sm:mb-6 md:flex lg:mb-8 xl:mb-10">
                  <div className={`${PILL} ${r.pill}`}>
                    <p className={PILL_TEXT}>{r.label}</p>
                  </div>
                </div>
                <h3 className="mb-2 font-heading text-display-2xl font-extrabold uppercase text-strong md:mb-3 lg:mb-4">{r.title}</h3>
                <p className="mb-6 md:mb-8 lg:mb-10 xl:mb-14">{r.body}</p>
                <Button href={r.href} variant="outline" icon={ChevronRight} className="w-full sm:w-auto sm:min-w-[196px]">
                  Learn more
                </Button>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </Section>
  )
}
