import { Fragment } from 'react'
import { Youtube } from 'lucide-react'
import { Button, Container, GRID, Tag, STACK } from '../ui.jsx'
import { Html } from './primitives.jsx'

export default function ProductFeatures({ title, iconBg, items }) {
  return (
    <section className="relative overflow-x-clip bg-background py-16 md:py-24 lg:py-32">
      <Container>
        <div className={STACK}>
          <div className={GRID}>
            <div className="col-span-6 md:col-span-7 lg:col-span-12 xl:col-span-11 xl:col-start-2">
              <Html as="p" className="text-pretty text-2xl text-strong" html={title} />
            </div>
          </div>

          <div className={`${GRID} gap-y-10 sm:gap-y-16 md:gap-y-20 lg:gap-y-24`}>
            {items.map(({ icon: Icon, title: t, soon, body }) => (
              <Fragment key={t}>
                <div role="presentation" aria-hidden="true" className="hidden xl:col-span-1 xl:block" />
                <div className="col-span-6 sm:col-span-3 md:col-span-4 lg:col-span-8 xl:col-span-7">
                  <div className="space-y-6 pr-6 md:pr-8 lg:pr-10 xl:pr-12">
                    <div className="relative flex size-12 items-center justify-center text-strong">
                      <div className={`absolute inset-0 rounded ${iconBg}`} />
                      <div className="inline-flex items-center justify-center">
                        <Icon className="relative size-4 shrink-0" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Html as="h3" className="block text-display-lg font-bold text-strong" html={t} />
                        {soon && <Tag>Soon</Tag>}
                      </div>
                      <Html as="p" html={body} />
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>

          <div className={GRID}>
            <div className="col-span-6 md:col-span-4 lg:col-span-8 xl:col-span-7 xl:col-start-2">
              <div className="md:pr-8 lg:pr-10 xl:pr-12">
                <Button href="/product-tour" variant="outline" icon={Youtube} className="w-full">
                  See Reevo
                </Button>
              </div>
            </div>
            {/* Dark slab bleeding off the right edge into the next (dark) section */}
            <div
              role="presentation"
              aria-hidden="true"
              className="md:col-span-8 md:col-start-5 lg:col-span-15 lg:col-start-9 xl:col-span-15 xl:col-start-10"
            >
              <div className="relative bg-gray-10 md:-mr-[10vw] md:h-[calc(100%+theme(spacing.24))] lg:-mr-[15vw] lg:h-[calc(100%+theme(spacing.32))] xl:-mr-[20vw] xl:h-[calc(100%+theme(spacing.40))]" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
