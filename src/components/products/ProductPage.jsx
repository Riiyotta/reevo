import CTA from '../CTA.jsx'
import { PRODUCTS } from './data.js'
import ProductTabs from './ProductTabs.jsx'
import ProductHero from './ProductHero.jsx'
import ProductFeatures from './ProductFeatures.jsx'
import ProductAccordion from './ProductAccordion.jsx'
import ProductTestimonial from './ProductTestimonial.jsx'
import ProductCards from './ProductCards.jsx'
import FaqSection from '../faq.jsx'

// Product FAQ data is trusted static HTML (links, bold, &nbsp;).
const ProductFaq = (props) => <FaqSection html {...props} />

const SECTIONS = {
  accordion: ProductAccordion,
  testimonial: ProductTestimonial,
  cards: ProductCards,
  faq: ProductFaq,
  cta: CTA,
}

// Shared template for /products/{find,connect,sell,manage,foundation}
export default function ProductPage({ slug }) {
  const p = PRODUCTS[slug]
  return (
    <main>
      <ProductTabs active={slug} dot={p.dot} />
      <ProductHero {...p.hero} />
      <ProductFeatures {...p.features} />
      {p.sections.map(({ type, ...props }, i) => {
        const S = SECTIONS[type]
        return <S key={i} {...props} />
      })}
    </main>
  )
}
