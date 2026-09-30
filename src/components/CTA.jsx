import { ChevronRight, Youtube } from 'lucide-react'
import { Button, Container, GRID } from './ui.jsx'

export default function CTA() {
  return (
    <section className="relative bg-background py-16 md:py-24 lg:py-32">
      <Container>
        <div className={`${GRID} gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-14`}>
          <h2 className="col-span-6 font-heading text-display-3xl font-black uppercase text-strong md:col-span-12 lg:col-span-22 xl:col-span-21 xl:col-start-2">
            Every workflow. Full context. Compounding results.
          </h2>
          <p className="col-span-6 text-lg text-strong md:col-span-12 lg:col-span-24 xl:col-span-22 xl:col-start-2">
            Onboarding is easy. Get up and running in minutes.
          </p>
          <div className="col-span-6 space-y-2 lg:col-span-6 xl:col-start-2">
            <Button href="/get-started" variant="primary" icon={ChevronRight} className="w-full">
              Get started
            </Button>
            <Button href="/product-tour" variant="outline" icon={Youtube} className="w-full">
              See Reevo
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
