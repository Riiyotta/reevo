import { Container, GRID } from '../ui.jsx'
import { Html } from './primitives.jsx'

// Product-page testimonial: same figure layout as the home Testimonials, but on a
// gray-9 band with top+bottom pattern strips, a coloured card and dark quote text.
const STRIP = 'absolute left-0 h-[28px] w-full overflow-hidden bg-left [background-size:auto_28px] max-sm:-mr-6 md:h-[40px] md:[background-size:auto_40px]'

export default function ProductTestimonial({ bg, img, alt, quote, name, role }) {
  return (
    <section id="testimonials" className="relative bg-gray-9 py-16 md:py-24 lg:py-32">
      <div role="presentation" aria-hidden="true" className="absolute inset-0 [&_*]:h-full">
        <section className="relative bg-transparent py-16 md:py-24 lg:py-32">
          <Container>
            <div className={GRID}>
              <div className={`relative col-span-6 md:col-span-12 lg:col-span-20 lg:col-start-5 xl:col-span-18 xl:col-start-6 ${bg}`}>
                <div className="lg:pb-8 xl:pb-10" />
              </div>
            </div>
          </Container>
        </section>
      </div>
      <div
        role="presentation"
        aria-hidden="true"
        className={`${STRIP} top-0`}
        style={{ backgroundImage: 'url(/assets/images/testimonials/patterns/pattern-top.png)' }}
      />
      <div
        role="presentation"
        aria-hidden="true"
        className={`${STRIP} bottom-0`}
        style={{ backgroundImage: 'url(/assets/images/testimonials/patterns/pattern-bottom.png)' }}
      />
      <cite className="relative z-10">
        <Container>
          <div className={`${GRID} relative max-md:gap-y-0`}>
            <div className="col-span-6 md:col-span-5 md:col-start-1 md:row-start-1 md:row-end-3 lg:col-span-9 lg:col-start-1 xl:col-span-8 xl:col-start-2">
              <div className="relative aspect-square lg:-mr-4">
                <img src={img} alt={alt} loading="lazy" width={700} height={700} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
            <div className="col-span-6 md:col-span-7 md:row-span-2 md:row-start-1 lg:col-span-13 lg:col-start-11 xl:col-span-12 xl:col-start-11">
              <div className="p-8 md:flex md:h-full md:items-center lg:px-0 lg:py-8 xl:py-10">
                <div style={{ zIndex: 1 }}>
                  <p className="relative block text-display-lg-2 font-medium not-italic text-gray-10">
                    <span className="absolute -translate-x-[120%]">“</span>
                    <Html html={quote} />”
                  </p>
                </div>
              </div>
            </div>
            <div className="z-10 col-span-6 max-md:row-start-2 max-md:-mt-16 max-md:pr-2 md:col-span-4 md:col-start-1 md:row-start-1 md:row-end-3 md:self-end lg:col-span-6 lg:col-start-1 xl:col-span-6 xl:col-start-2">
              <div className="md:pb-6 lg:pb-8 xl:pb-[56px]">
                <div className="flex h-14 items-center bg-white px-8">
                  <div className="text-strong" style={{ zIndex: 1 }}>
                    <p className="block font-mono text-display-xs uppercase not-italic">{name}</p>
                    <Html as="p" className="block font-mono text-display-xs uppercase not-italic opacity-80" html={role} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </cite>
    </section>
  )
}
