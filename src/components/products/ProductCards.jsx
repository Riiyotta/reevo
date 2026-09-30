import { Container, GRID } from '../ui.jsx'
import { Html } from './primitives.jsx'

function CardText({ title, body, light }) {
  return (
    <div className="relative z-10 max-w-[496px] p-6">
      <Html as="p" className={`mb-2 block text-display-lg font-bold text-strong ${light ? '!text-gray-10' : '!text-white'}`} html={title} />
      <Html as="p" className={`opacity-90 ${light ? 'text-gray-10' : 'text-white'}`} html={body} />
    </div>
  )
}

function Card({ card, index }) {
  const { title, body, dark, light, bgImg, img, alt, wide, bg } = card
  if (wide) {
    return (
      <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-22 xl:col-start-2">
        <div className={`relative flex h-full flex-col justify-between md:flex-row-reverse md:justify-between ${bg}`}>
          <div className="md:w-[calc(50%-8px)]">
            <CardText title={title} body={body} light={light} />
          </div>
          <div className="relative aspect-[631/397] md:w-[calc(50%-8px)]">
            <img src={img} alt={alt} loading="lazy" width={700} height={700} decoding="async" className="absolute left-0 top-0 h-full w-full object-cover" />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={`col-span-6 md:col-span-6 lg:col-span-12 xl:col-span-11 ${index % 2 === 0 ? 'xl:col-start-2' : ''} ${dark ? 'dark' : ''}`}>
      <div className="relative flex h-full flex-col justify-between bg-background">
        <div>
          <CardText title={title} body={body} light={light} />
        </div>
        {bgImg && (
          <div role="presentation" aria-hidden="true" className="absolute left-0 top-0 h-full w-full">
            <img src={bgImg} alt="" loading="lazy" width={1000} height={1000} decoding="async" className="absolute left-0 top-0 h-full w-full object-cover" />
          </div>
        )}
        <div className="relative aspect-[633/466]">
          <img src={img} alt={alt} loading="lazy" width={700} height={700} decoding="async" className="absolute left-0 top-0 h-full w-full object-cover" />
        </div>
      </div>
    </div>
  )
}

export default function ProductCards({ dark, h2, lede, cards }) {
  return (
    <section className={`relative py-16 md:py-24 lg:py-32 ${dark ? 'dark bg-background' : 'bg-gray-1'}`}>
      <Container>
        <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-14">
          <div className={GRID}>
            <div className="col-span-6 md:col-span-7 lg:col-span-12 xl:col-start-2">
              <Html as="h2" className="block font-heading text-display-2xl font-extrabold uppercase text-strong" html={h2} />
            </div>
            {lede && (
              <div className="col-span-6 md:col-span-5 lg:col-span-9 lg:col-start-15 xl:col-span-8 xl:col-start-16">
                <Html as="p" className="text-lg text-foreground" html={lede} />
              </div>
            )}
          </div>
          <div className={GRID}>
            {cards.map((c, i) => (
              <Card key={c.img} card={c} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
