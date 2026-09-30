import CTA from '../components/CTA.jsx'
import FaqSection from '../components/faq.jsx'
import { PageHeader } from '../components/pricing/shared.jsx'
import PricingPlans from '../components/pricing/PricingPlans.jsx'
import ComparePlans from '../components/pricing/ComparePlans.jsx'
import { PRICING_FAQ } from '../components/pricing/pricingData.jsx'

export default function Pricing() {
  return (
    <main>
      <PageHeader
        label="Pricing"
        title="Power your sales engine with Reevo"
        lede="Get a custom quote built around your current sales tools and needs, or choose a standard plan."
      />
      <PricingPlans />
      <ComparePlans />
      <FaqSection items={PRICING_FAQ} />
      <CTA />
    </main>
  )
}
