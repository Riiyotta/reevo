import { ChevronRight, CircleDollarSign, Flag, SquareUserRound } from 'lucide-react'
import { Button, COL_HEADLINE, COL_LABEL, Container, Eyebrow, GRID, SectionLabel, Section } from '../components/ui.jsx'
import { COL_LEAD_WIDE, Lead } from '../components/company/shared.jsx'
import ScrollStory from '../components/company/ScrollStory.jsx'

const TEAM = [
  {
    name: 'David Zhu',
    role: 'Co-Founder & CEO',
    img: 'david',
    bio: 'David was previously Head of Engineering at DoorDash for New Verticals, Platform, Money, and Enterprise, where he launched high-impact business lines generating hundreds of millions in revenue. He built and led teams of 200+ engineers across three sites as DoorDash scaled from a $700M valuation to a $75B market cap at IPO. Before DoorDash, David was an engineering leader at several early-stage startups with successful exits.',
  },
  {
    name: 'Cindy Hao',
    role: 'Co-Founder',
    img: 'cindy',
    bio: 'Cindy previously incubated startups at Atomic, the venture studio behind companies like Hims & Hers. She and David met at OpenStore, an Atomic incubation, where they led the Growth team and experienced firsthand the challenges of GTM. Drawing on her 0-to-1 startup experience, Cindy now leads Finance & Strategy and People Operations at Reevo.',
  },
  {
    name: 'Clement Fang',
    role: 'Co-Founder',
    img: 'clement',
    bio: 'Clement and David have been friends since elementary school and later went through multiple startup exits including DoorDash. At DoorDash, Clement helped rebuild the underlying platform that powers $100B+ annual transaction volume. He leads engineering at Reevo, applying his expertise in software architectural design to lay the foundation of a powerful AI-native data platform.',
  },
  {
    name: 'Curtis Tan',
    role: 'Co-Founder',
    img: 'curtis',
    bio: 'Curtis and David met in 6th grade, attended UC Berkeley together, and later reunited at DoorDash. As GM of New Ventures, Curtis scaled teams to launch initiatives like DoorDash Capital and built the Strategic Finance function for the Merchant Business, driving sustainable growth. Previously, he was Head of Sales Finance at Square, where he built the team supporting Sales Leadership on planning, pricing, and productivity.',
  },
]

const INVESTORS = [
  ['khosla', 'Khosla Ventures logo'],
  ['kleiner-perkins', 'Kleiner Perkins logo'],
]

function Hero() {
  return (
    <header className="relative">
      {/* Teal backdrop (full bleed below xl, container width at xl) */}
      <div className="absolute inset-0 z-10 [&_*]:h-full" role="presentation" aria-hidden="true">
        <div>
          <Container>
            <div className={GRID}>
              <div className="col-span-6 md:col-span-12 lg:col-span-24">
                <div className="-mx-6 bg-teal-6 sm:-mx-8 md:-mx-10 lg:-mx-12 xl:mx-0" />
              </div>
            </div>
          </Container>
        </div>
      </div>
      <div className="relative z-10 pt-10 md:pt-12 xl:pt-14">
        <Container>
          <div className={GRID}>
            <div className="col-span-6 md:col-span-12 lg:col-span-22 xl:col-span-20 xl:col-start-2">
              <Eyebrow as="h1" className="mb-5 sm:mb-6 lg:mb-8">
                About us
              </Eyebrow>
              <p className="block font-heading text-display-3xl font-black uppercase text-strong">
                Selling is a craft.
                <br />
                We build in service of it.
              </p>
            </div>
            <div className="col-span-6 -mx-6 sm:-mx-8 md:col-span-12 md:-mx-10 lg:col-span-24 lg:-mx-12 xl:mx-0">
              <div
                className="h-[76px] overflow-hidden bg-right [background-size:auto_76px] md:h-[152px] md:[background-size:auto_152px]"
                style={{ backgroundImage: 'url(/assets/images/about/pattern.png)' }}
              />
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}

function TeamCard({ name, role, img, bio }) {
  return (
    <div className="relative">
      <div className="group relative">
        <div className="relative aspect-[635/422] overflow-hidden">
          <img
            src={`/assets/images/about/leadership/${img}.jpg`}
            alt={`${name} photo`}
            width={840}
            height={840}
            loading="lazy"
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
        </div>
        <div className="absolute left-0 top-0 size-full bg-gray-10 p-6 opacity-0 transition-opacity duration-200 md:p-8 lg:group-hover:opacity-100">
          <p className="block text-display-lg font-bold text-gray-2">{bio}</p>
        </div>
        <div className="absolute bottom-4 left-0 right-6 sm:bottom-6 sm:right-8 lg:bottom-7 lg:right-10 xl:bottom-[33px] xl:right-12">
          <div className="bg-gray-10 px-8 py-3">
            <Eyebrow as="p" className="!text-teal-6">
              {name}
            </Eyebrow>
            <Eyebrow as="p" className="!text-teal-6 opacity-80">
              {role}
            </Eyebrow>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <main>
      <Hero />

      <Section id="mission" className="bg-background">
        <SectionLabel icon={Flag}>Our mission</SectionLabel>
        <Lead col={COL_LEAD_WIDE}>
          <strong>To elevate the Sales craft.</strong> We imagine a future where the best sellers spend their days on
          what actually wins deals: the conversations, the relationships, the instincts you can't automate. We're
          building the platform that gives the craft back to the people who practice it. Come build with us.
        </Lead>
        <div className={GRID}>
          <div className="col-span-6 md:col-span-7 lg:col-span-10 xl:col-span-9 xl:col-start-2">
            <div className="space-y-2 sm:flex sm:flex-row sm:gap-2 sm:space-y-0">
              <Button href="/careers#openings" icon={ChevronRight} className="w-full sm:flex-1">
                See open roles
              </Button>
              <Button href="/get-started" variant="outline" icon={ChevronRight} className="w-full sm:flex-1">
                Get started
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <ScrollStory />

      <Section id="team" className="bg-background" pattern="/assets/images/patterns/pattern-10.png">
        <SectionLabel icon={SquareUserRound}>Our team</SectionLabel>
        <Lead col={COL_LEAD_WIDE}>
          <strong>We’re builders who care deeply about the people who sell.</strong> Our founders and core engineering
          DNA come from scaling some of the most demanding platforms in tech - DoorDash, Stripe, Amazon, Affirm, and
          Square. We bring that execution speed and architectural rigor to a category that has been waiting for it,
          grounded in a simple belief: great software should make people better at their work, not busier.
        </Lead>
        <div className="space-y-6">
          <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-y-8 xl:gap-y-10">
            {TEAM.map((m) => (
              <TeamCard key={m.name} {...m} />
            ))}
          </div>
        </div>
      </Section>

      <Section id="investors" className="bg-gray-2" pattern="/assets/images/patterns/pattern-11.png">
        <SectionLabel icon={CircleDollarSign}>Our investors</SectionLabel>
        <Lead col={COL_HEADLINE}>
          <strong>Backed by top-tier investors</strong>
        </Lead>
        <div className={GRID}>
          <div className={COL_LABEL}>
            <div className="grid gap-4 sm:grid-cols-2">
              {INVESTORS.map(([file, alt]) => (
                <div key={file} className="relative aspect-[635/422] overflow-hidden">
                  <img
                    src={`/assets/images/about/investors/${file}.png`}
                    alt={alt}
                    loading="lazy"
                    className="absolute left-0 top-0 h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}
