import { Container, GRID } from './ui.jsx'

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-gray-3 py-16 md:py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[28px] w-full bg-left bg-repeat [background-size:auto_28px] max-sm:-mr-6 md:h-[40px] md:[background-size:auto_40px]"
        style={{ backgroundImage: 'url(/assets/images/testimonials/patterns/pattern-top-neutral.png)' }}
      />
      <Container>
        <div className="relative">
          {/* Dark card backdrop behind the photo + quote */}
          <div role="presentation" className={`absolute inset-0 ${GRID}`}>
            <div className="col-span-6 h-full bg-gray-10 md:col-span-12 lg:col-span-20 lg:col-start-5 xl:col-span-18 xl:col-start-6" />
          </div>

          <figure className={`relative z-10 ${GRID} max-md:gap-y-0`}>
            <div className="col-span-6 md:col-span-5 md:col-start-1 md:row-start-1 md:row-end-3 lg:col-span-9 lg:col-start-1 xl:col-span-8 xl:col-start-2">
              <div className="relative aspect-square lg:-mr-4">
              <img
                src="/assets/nate.jpg"
                alt="Nate"
                width={700}
                height={700}
                className="absolute inset-0 h-full w-full object-cover"
              />
              </div>
            </div>

            <div className="col-span-6 p-8 md:col-span-7 md:row-span-2 md:row-start-1 md:flex md:h-full md:items-center lg:col-span-13 lg:col-start-11 lg:px-0 lg:py-8 xl:col-span-12 xl:col-start-11 xl:py-10">
              <blockquote className="relative text-display-lg-2 font-medium not-italic text-gray-2">
                <span className="absolute -translate-x-[120%]">“</span>
                Coming from HubSpot, Reevo was truly a breath of fresh air. Their vertically integrated platform for
                outbound sales and AI-first workflow has made spinning up campaigns a breeze for us, and we're booking
                meetings at a steady clip with their outbound tools. The Reevo team has been the best vendor we've ever
                worked with, and they continue to ship huge updates at breakneck pace. The future is bright for
                these&nbsp;guys.”
              </blockquote>
            </div>

            <figcaption className="z-10 col-span-6 max-md:row-start-2 max-md:-mt-16 max-md:pr-2 md:col-span-4 md:col-start-1 md:row-start-1 md:row-end-3 md:self-end lg:col-span-6 lg:col-start-1 xl:col-span-6 xl:col-start-2">
              <div className="md:pb-6 lg:pb-8 xl:pb-[56px]">
                <cite className="flex h-14 items-center bg-white px-8 not-italic">
                  <div className="text-strong">
                    <p className="block font-mono text-display-xs uppercase">Nate</p>
                    <p className="block font-mono text-display-xs uppercase opacity-80">Digital Marketing Manager,&nbsp;nClarity</p>
                  </div>
                </cite>
              </div>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  )
}
