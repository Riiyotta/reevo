import { ChevronRight, Plus, Youtube } from 'lucide-react'
import { Button, COL_HEADLINE, Container, GRID, Section } from '../components/ui.jsx'
import { Lead } from '../components/company/shared.jsx'
import Toolkit from '../components/company/Toolkit.jsx'
import QuoteTestimonial from '../components/company/QuoteTestimonial.jsx'

const INVESTORS = [
  'accel', 'andreessen', 'battery', 'benchmark', 'bessemer', 'first-round', 'founders-fund', 'general-catalyst',
  'greylock', 'index', 'insight', 'khosla', 'kleiner-perkins', 'lightspeed', 'menlo-ventures', 'nea', 'redpoint',
  'sequoia', 'sv-angel', 'thrive', 'yc',
]

const TERMS = [
  'Startup pricing valid for new customers only. Cannot be combined with other discounts or promotional offers.',
  'Startup pricing applies to a maximum of 10 seats.',
  'Startup pricing applies to your 1st year contract only.',
]

function Hero() {
  return (
    <header className="py-10 md:py-12 xl:py-14">
      <Container>
        <div className={GRID}>
          <div className="col-span-6 md:col-span-12 lg:col-span-22 xl:col-span-20 xl:col-start-2">
            <h1 className="block text-balance font-heading text-display-3xl font-black uppercase text-strong">
              Startup tools for GTM breakthroughs
            </h1>
          </div>
          <div className={COL_HEADLINE}>
            <p className="text-pretty text-lg">
              Build your go-to-market the right way from the start. Qualifying startups get discounted access to
              everything.
            </p>
          </div>
          <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-22 xl:col-start-2">
            <div className="mt-1 sm:mt-2 lg:mt-3 xl:mt-4">
              <div className="flex flex-col gap-2 sm:max-w-[400px] sm:flex-row">
                <Button href="/startups-apply-now" icon={ChevronRight} className="sm:flex-1">
                  See if you qualify
                </Button>
                <Button href="/product-tour" variant="outline" icon={Youtube} className="sm:flex-1">
                  See Reevo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}

function Collage() {
  return (
    <div className="relative bg-white">
      <div role="presentation" aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-16 bg-background md:h-24 lg:h-32" />
      <Container>
        <div className={GRID}>
          <div className="relative z-20 col-start-1 col-end-7 row-start-1 md:col-end-12 lg:col-start-1 lg:col-end-[23] xl:col-start-2 xl:col-end-[23]">
            <div className="-ml-6 mb-16 sm:-ml-8 md:mb-24 md:ml-0 lg:mb-32">
              <div className="relative aspect-[1221/641] overflow-hidden">
                <img
                  src="/assets/images/startups/collaboration.jpg"
                  alt="Two colleagues reviewing a document together at a laptop"
                  width={1221}
                  height={641}
                  loading="lazy"
                  className="absolute left-0 top-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="relative z-10 col-start-2 col-end-7 row-start-1 md:col-start-6 md:col-end-13 lg:col-start-10 lg:col-end-[25] xl:col-start-11">
            <div className="-mr-6 flex h-full sm:-mr-8 md:mr-0">
              <div className="relative h-full w-full">
                <img
                  src="/assets/images/startups/pattern.png"
                  alt=""
                  width={700}
                  height={700}
                  loading="lazy"
                  className="absolute left-0 top-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

function PlusDivider() {
  return (
    <div className="relative mx-auto flex size-10 items-center justify-center rounded-full bg-teal-8 text-white before:absolute before:right-full before:h-0.5 before:w-16 before:bg-gradient-to-l before:from-teal-8 before:to-transparent after:absolute after:left-full after:h-0.5 after:w-16 after:bg-gradient-to-r after:from-teal-8 after:to-transparent md:size-12 md:before:w-24 md:after:w-24 xl:before:w-32 xl:after:w-32">
      <Plus className="size-4 shrink-0" />
    </div>
  )
}

export default function Startups() {
  return (
    <main>
      <Hero />
      <Collage />

      <Section id="toolkit" className="bg-background">
        <Lead col={COL_HEADLINE}>
          Get every tool you need to manage your full funnel.{' '}
          <strong>Purpose-built to work together, right out of the box.</strong>
        </Lead>
        <Toolkit />
      </Section>

      <QuoteTestimonial
        photo="/assets/images/testimonials/chris.jpg"
        photoAlt="Chris photo"
        quote={
          <>
            I’m obsessed with the post-meeting email follow-up feature. It’s easily saving me an hour a day on writing
            recap emails. And with AI generating meeting summaries and notes for our product team, we’ve already built
            over 120 pages of unique insights that are shaping our roadmap and sharpening our edge against competitors.
            Absolute game&nbsp;changer.
          </>
        }
        name="Chris"
        role={
          <>
            Co-Founder &amp; CEO,&nbsp;
            <a href="https://www.joinzipper.com/" target="_blank" rel="noopener noreferrer" className="underline">
              Zipper
            </a>
          </>
        }
      />

      <Section id="requirements" className="bg-background text-center">
        <h2 className="text-2xl text-strong">Qualification requirements</h2>
        <div className="mx-auto max-w-[440px]">
          <div className="space-y-6 lg:space-y-8">
            <p className="block text-display-lg font-bold text-strong">20 or fewer employees or contractors in total</p>
            <PlusDivider />
            <div className="space-y-2 lg:space-y-3">
              <p className="block text-display-lg font-bold text-strong">
                Backed by one of the VC firms or accelerators listed below
              </p>
              <p className="text-xs">
                If your investor(s) aren't listed, don't hesitate to apply anyway. We're always excited to learn about
                new teams and&nbsp;stories.
              </p>
            </div>
          </div>
        </div>
        <div className={GRID}>
          <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-20 xl:col-start-3">
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
              {INVESTORS.map((i) => (
                <div key={i}>
                  <img src={`/assets/images/startups/investors/${i}.png`} alt={i} width={372} height={282} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button href="/startups-apply-now" icon={ChevronRight}>
          See if you qualify
        </Button>
        <div className={GRID}>
          <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-20 xl:col-start-3">
            <div className="space-y-3 text-left">
              <p className="font-bold">Terms</p>
              <div className="leading-[140%]">
                <ul className="m-0 list-disc pl-[1.25em] text-md">
                  {TERMS.map((t) => (
                    <li key={t} className="my-[.5em] pl-[.375em] text-xs marker:text-foreground">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}
