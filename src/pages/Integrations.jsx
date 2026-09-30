import { ChevronRight } from 'lucide-react'
import CTA from '../components/CTA.jsx'
import { Button, Container, GRID } from '../components/ui.jsx'
import IntegrationsBrowser from '../components/pricing/IntegrationsBrowser.jsx'

export default function Integrations() {
  return (
    <main>
      <header className="py-10 md:py-12 xl:py-14 xl:pb-0">
        <Container>
          <div className={GRID}>
            <div className="col-span-6 md:col-span-12 lg:col-span-22 xl:col-span-20 xl:col-start-2">
              <p className="mb-5 block font-mono text-display-xs uppercase text-strong sm:mb-6 lg:mb-8">Integrations</p>
              <h1 className="block font-heading text-display-3xl font-black uppercase text-strong">
                Integrate 1,300+ tools and watch the whole team sell&nbsp;faster.
              </h1>
            </div>
            <div className="col-span-6 md:col-span-5 md:col-start-8 md:row-span-3 lg:col-span-9 lg:col-start-15 xl:col-span-8 xl:col-start-15">
              <div className="py-2 md:py-0">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src="/assets/images/integrations/integrations-grid.png"
                    alt=""
                    decoding="async"
                    className="absolute left-0 top-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-6 md:col-start-1 lg:col-span-12 xl:col-span-11 xl:col-start-2">
              <p className="text-pretty text-lg text-strong">
                <strong>Every call, email, meeting and activity lands in one shared memory,</strong> and Reevo acts on
                what it learns. Reevo drafts the follow-up, updates the deal, and books dinner at the place your buyer
                mentioned on the call.
              </p>
            </div>
            <div className="col-span-6 md:col-start-1 lg:col-span-7 xl:col-start-2 xl:pb-14">
              <div className="pt-2 lg:pt-3 xl:pt-4">
                <Button href="/get-started" variant="primary" icon={ChevronRight} className="w-full">
                  Talk to sales
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </header>
      <section className="relative bg-gray-1 py-16 md:py-24 lg:py-32">
        <Container>
          <IntegrationsBrowser />
        </Container>
      </section>
      <CTA />
      <div className="py-6">
        <Container>
          <div className={GRID}>
            <div className="col-span-6 md:col-span-12 xl:col-start-2">
              <p className="text-xs text-muted-foreground">
                Logos provided by{' '}
                <a href="https://logo.dev" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  Logo.dev
                </a>
              </p>
            </div>
          </div>
        </Container>
      </div>
    </main>
  )
}
