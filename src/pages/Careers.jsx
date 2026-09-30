import { Briefcase, ChevronRight, CircleUserRound, RefreshCcw, SquarePlus } from 'lucide-react'
import { Button, COL_HEADLINE, COL_LABEL, Container, Eyebrow, GRID, SectionLabel, Section, STACK } from '../components/ui.jsx'
import { COL_LEAD_13, Lead } from '../components/company/shared.jsx'
import { ASHBY_BASE, TEAMS } from '../components/company/jobs.js'

const OPERATE = [
  [
    'Trust & Authenticity',
    'With radical transparency at our core, our customers never have to second-guess what to expect from us.',
    "Our roadmap is a commitment, not a wish list. What you see is what you get, and what's coming is already taking shape. No smoke, no mirrors. Just relentless focus on honest engineering and marketing.",
  ],
  [
    'Value through empathy',
    'Most companies see features. We see our customers’ day and live inside their workflow.',
    "Every button, every workflow, every single interaction is engineered from the ground up. We're not building for an abstract user. We're building for the actual humans hustling to get things done. Our obsession is understanding exactly how our users work and shipping products that they’ll actually use and find value in.",
  ],
  [
    'Performant momentum',
    'True innovation isn’t just about speed. It’s about consistent performance over time.',
    'We balance bold innovation with precise execution, making reliability our top feature. We excel at starting small and moving fast, while also designing scalable, high-impact systems capable of powering billions of dollars in deal volume.',
  ],
]

const VALUES = [
  ['Dream Big, Make Magic.', 'We have a growth mindset, we’re action-oriented, and we push the envelope because we know the future isn\'t built by playing it safe.'],
  ['Believe in Potential, Amplified.', 'We believe in the power of individuals and empower each person to become the best version of themselves.'],
  ['Build Better, Together.', 'It’s always us against the problem, never us against each other. We achieve more than we can individually.'],
  ['Play to Win, Always.', 'We choose optimism, we assume best intent, and we know that this is a marathon, not a sprint. We’re in this for the long haul.'],
  ['Own It, End to End.', "We don't wait for perfect specs. When we see a problem, we find a solution and ship it."],
]

const LOGOS = [
  'doordash', 'meta', 'apple', 'amazon', 'rippling', 'linkedin', 'faire', 'asana',
  'stripe', 'affirm', 'hubspot', 'square', 'notion', 'uber', 'verkada', 'salesforce',
]

function PrincipleRow({ title, children }) {
  return (
    <div className={GRID}>
      <div className="col-span-6 md:col-span-4 lg:col-span-5 xl:col-span-6 xl:col-start-2">
        <p className="block text-display-lg font-bold text-strong">{title}</p>
      </div>
      <div className="col-span-6 md:col-span-8 lg:col-span-15 lg:col-start-9 xl:col-span-13 xl:col-start-11">
        <p className="text-xl text-strong">{children}</p>
      </div>
    </div>
  )
}

function JobRow({ title, location, id }) {
  return (
    <div className="relative flex items-center border-t border-border py-4 last:border-b">
      <div className="flex flex-1 flex-col gap-1 lg:flex-row lg:gap-4">
        <Eyebrow as="p">
          <a
            href={ASHBY_BASE + id}
            target="_blank"
            rel="noreferrer"
            className="after:absolute after:inset-0 after:z-10 after:content-['']"
          >
            {title}
          </a>
        </Eyebrow>
        <Eyebrow as="p" className="opacity-70">
          {location}
        </Eyebrow>
      </div>
      <div className="flex size-[28px] shrink-0 items-center justify-center bg-gray-2">
        <ChevronRight className="size-4 shrink-0" />
      </div>
    </div>
  )
}

export default function Careers() {
  return (
    <main>
      <header className="py-10 md:py-12 xl:py-14">
        <Container>
          <div className={GRID}>
            <div className="col-span-6 md:col-span-12 lg:col-span-22 xl:col-span-20 xl:col-start-2">
              <Eyebrow as="h1" className="mb-5 sm:mb-6 lg:mb-8">
                Careers
              </Eyebrow>
              <h2 className="block text-balance font-heading text-display-3xl font-black uppercase text-strong">
                Built by builders for builders.
              </h2>
            </div>
            <div className="col-span-6 md:col-span-12 lg:col-span-24">
              <div className="relative -mb-10 mt-1 aspect-[1400/752] sm:mt-2 md:-mb-12 lg:-mb-14 lg:mt-3 xl:-mb-16 xl:mt-4">
                <img
                  src="/assets/images/careers/hero-pattern.jpg"
                  alt=""
                  width={1400}
                  height={752}
                  className="absolute left-0 top-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </header>

      <section className="relative bg-background py-16 md:py-24 lg:py-32">
        <Container>
          <div className={`${GRID} gap-y-6 md:gap-y-8 lg:gap-y-10`}>
            <div className="col-span-6 md:col-span-12 lg:col-span-20 xl:col-span-19 xl:col-start-2">
              <p className="text-pretty text-3xl text-strong">
                <strong>Scaling a company is brutal.</strong> We know because we've done it. Our product isn't about
                theoretical optimization. It's about giving revenue teams a real, practical edge.
              </p>
            </div>
            <div className="col-span-6 sm:col-span-3 md:col-span-4 lg:col-span-6 xl:col-span-6 xl:col-start-2">
              <Button href="#openings" icon={ChevronRight} className="w-full">
                View openings
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section id="values" className="bg-gray-2" pattern="/assets/images/patterns/pattern-07.png">
        <SectionLabel icon={SquarePlus}>How we operate</SectionLabel>
        <Lead col={COL_LEAD_13}>
          <strong>We're creating the exact toolkit we needed</strong> when we were fighting for every customer, every
          dollar, every inch of growth. These operating principles keep us focused on the mission at hand.
        </Lead>
        <div className={STACK}>
          {OPERATE.map(([title, strong, rest]) => (
            <PrincipleRow key={title} title={title}>
              <strong>{strong}</strong> {rest}
            </PrincipleRow>
          ))}
        </div>
      </Section>

      <Section id="experience" className="dark bg-background" pattern="/assets/images/patterns/pattern-08.png">
        <SectionLabel icon={RefreshCcw}>Launch, scale, repeat</SectionLabel>
        <Lead col={COL_LEAD_13}>
          <strong>The Reevo team launched and scaled today's leading tech companies.</strong>
        </Lead>
        <div className={GRID}>
          <div className={COL_LABEL}>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:grid-cols-4 lg:gap-6">
              {LOGOS.map((l) => (
                <div key={l}>
                  <div className="relative aspect-[100/66] overflow-hidden lg:aspect-[100/60]">
                    <img
                      src={`/assets/images/careers/logos/${l}.svg`}
                      alt={`${l} logo`}
                      className="absolute left-0 top-0 h-full w-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        className="bg-gray-2"
        pattern="/assets/images/patterns/pattern-10.png"
        stack="space-y-16 md:space-y-20 lg:space-y-24"
      >
        <SectionLabel icon={CircleUserRound}>Our core values</SectionLabel>
        <Lead col={COL_LEAD_13}>
          <strong>We are on a mission</strong> to fuel growth from inception to scale by crafting products that people
          genuinely love and trust. We are looking for teammates that:
        </Lead>
        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          {VALUES.map(([title, body]) => (
            <PrincipleRow key={title} title={title}>
              {body}
            </PrincipleRow>
          ))}
        </div>
      </Section>

      <Section id="openings" className="bg-background" pattern="/assets/images/patterns/pattern-07.png">
        <SectionLabel icon={Briefcase}>Open roles</SectionLabel>
        <Lead col={COL_HEADLINE}>
          <strong>Sounds like you? Join us.</strong>
        </Lead>
        <div className={`${GRID} gap-y-10`}>
          <div className="col-span-6 max-md:hidden md:col-span-3 lg:col-span-4 xl:col-start-2">
            <div className="sticky top-32">
              <p className="mb-4 block font-heading text-display-md font-bold uppercase text-strong">Teams</p>
              <nav className="space-y-1">
                {TEAMS.map((t) => (
                  <a key={t.id} href={`#${t.id}`} className="block py-1">
                    <Eyebrow>{t.title}</Eyebrow>
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="col-span-6 md:col-span-8 md:col-start-5 lg:col-span-15 lg:col-start-9 xl:col-span-13 xl:col-start-11">
            <div className="space-y-10 md:space-y-12 lg:space-y-14 xl:space-y-16">
              {TEAMS.map((t) => (
                <div key={t.id} id={t.id} className="scroll-mt-32">
                  <p className="mb-4 block text-display-xl font-bold text-strong md:mb-5 xl:mb-6">{t.title}</p>
                  <div>
                    {t.jobs.map(([title, location, id]) => (
                      <JobRow key={id} title={title} location={location} id={id} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}
