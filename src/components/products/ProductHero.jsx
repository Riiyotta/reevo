import { ChevronRight } from 'lucide-react'
import { Button, Container, GRID } from '../ui.jsx'
import { Html } from './primitives.jsx'

export default function ProductHero({ h1, lede, img, alt, pattern }) {
  return (
    <div className="relative bg-gray-2 md:-mb-24 lg:-mb-32">
      <div className="py-6 sm:py-8 md:py-12 xl:py-14">
        <Container>
          <div className={GRID}>
            <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-21 xl:col-start-2">
              <h1 className="mb-2 block text-balance font-heading text-display-3xl font-black uppercase text-strong md:mb-4 lg:mb-6">
                {h1}
              </h1>
            </div>
            <div className="col-span-6 md:col-span-10 lg:col-span-14 xl:col-span-12 xl:col-start-2">
              <Html as="h2" className="text-lg text-strong" html={lede} />
            </div>
            <div className="col-span-6 pt-2 md:col-span-5 lg:col-span-6 lg:col-start-1 xl:col-start-2">
              <Button href="/get-started" variant="primary" icon={ChevronRight} className="w-full">
                Get started
              </Button>
            </div>
          </div>
        </Container>
        <div role="presentation" aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-16 bg-background md:h-24 lg:h-32" />
      </div>
      <div>
        <Container>
          <div className={`${GRID} relative z-10`}>
            <div className="relative z-10 col-span-6 col-start-1 row-start-1 row-end-2 md:col-span-11 md:col-start-1 lg:col-span-23 lg:col-start-1 xl:col-span-22 xl:col-start-2">
              <div className="-ml-6 mb-16 sm:-ml-8 md:mb-24 md:ml-0 lg:mb-32">
                <div className="relative aspect-[1282/688]">
                  <img src={img} alt={alt} width={1282} height={688} decoding="async" className="absolute left-0 top-0 h-full w-full object-cover" />
                </div>
              </div>
            </div>
            <div
              role="presentation"
              aria-hidden="true"
              className="col-span-6 col-start-1 row-start-1 row-end-2 md:col-span-6 md:col-start-8 lg:col-start-14 lg:col-end-[25] xl:col-start-14"
            >
              <div className="-mr-6 flex h-full sm:-mr-8 md:mr-0">
                <div className="relative h-full w-full xl:-mb-24">
                  <img src={pattern} alt="" width={1046} height={816} decoding="async" className="absolute left-0 top-0 h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
