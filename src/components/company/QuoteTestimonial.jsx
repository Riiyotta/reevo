import { Container, GRID } from '../ui.jsx'

// Single-quote testimonial block (photo + quote over a coloured card, name tag overlapping the photo),
// as used on /startups. Same layout as the home #testimonials section but with configurable colours,
// a bottom pattern strip and a linked company name.
export default function QuoteTestimonial({
  id = 'testimonials',
  sectionBg = 'bg-gray-9',
  cardColor = '#c9f8ff', // teal-2
  quoteColor = '#121212', // gray-10
  patternTop = '/assets/images/testimonials/patterns/pattern-top.png',
  patternBottom = '/assets/images/testimonials/patterns/pattern-bottom.png',
  photo,
  photoAlt,
  quote,
  name,
  role,
}) {
  const strip =
    'absolute left-0 h-[28px] w-full overflow-hidden bg-left [background-size:auto_28px] max-sm:-mr-6 md:h-[40px] md:[background-size:auto_40px]'
  return (
    <section id={id} className={`relative py-16 md:py-24 lg:py-32 ${sectionBg}`}>
      <div>
        <div className="absolute inset-0 [&_*]:h-full" role="presentation" aria-hidden="true">
          <section className="relative bg-transparent py-16 md:py-24 lg:py-32">
            <div>
              <Container>
                <div className={GRID}>
                  <div
                    className="relative col-span-6 md:col-span-12 lg:col-span-20 lg:col-start-5 xl:col-span-18 xl:col-start-6"
                    style={{ backgroundColor: cardColor }}
                  >
                    <div className="lg:pb-8 xl:pb-10" />
                  </div>
                </div>
              </Container>
            </div>
          </section>
        </div>
        {patternTop && (
          <div role="presentation" aria-hidden="true" className={`${strip} top-0`} style={{ backgroundImage: `url(${patternTop})` }} />
        )}
        {patternBottom && (
          <div role="presentation" aria-hidden="true" className={`${strip} bottom-0`} style={{ backgroundImage: `url(${patternBottom})` }} />
        )}
        <cite className="relative z-10 not-italic">
          <Container>
            <div className={`${GRID} relative max-md:gap-y-0`}>
              <div className="col-span-6 md:col-span-5 md:col-start-1 md:row-start-1 md:row-end-3 lg:col-span-9 lg:col-start-1 xl:col-span-8 xl:col-start-2">
                <div className="relative aspect-square lg:-mr-4">
                  <img
                    src={photo}
                    alt={photoAlt}
                    width={700}
                    height={700}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="col-span-6 md:col-span-7 md:row-span-2 md:row-start-1 lg:col-span-13 lg:col-start-11 xl:col-span-12 xl:col-start-11">
                <div className="p-8 md:flex md:h-full md:items-center lg:px-0 lg:py-8 xl:py-10">
                  <div className="relative z-[1]">
                    <p className="relative block text-display-lg-2 font-medium not-italic" style={{ color: quoteColor }}>
                      <span className="absolute -translate-x-[120%]">“</span>
                      {quote}”
                    </p>
                  </div>
                </div>
              </div>
              <div className="z-10 col-span-6 max-md:row-start-2 max-md:-mt-16 max-md:pr-2 md:col-span-4 md:col-start-1 md:row-start-1 md:row-end-3 md:self-end lg:col-span-6 lg:col-start-1 xl:col-span-6 xl:col-start-2">
                <div className="md:pb-6 lg:pb-8 xl:pb-[56px]">
                  <div className="flex h-14 items-center bg-white px-8">
                    <div className="relative z-[1] text-strong">
                      <p className="block font-mono text-display-xs uppercase not-italic">{name}</p>
                      <p className="block font-mono text-display-xs uppercase not-italic opacity-80">{role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </cite>
      </div>
    </section>
  )
}
