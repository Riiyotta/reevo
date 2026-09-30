import FaqSection from '../components/faq.jsx'
import { FaqLink as L, PageHeader } from '../components/pricing/shared.jsx'
import TourDemo from '../components/pricing/TourDemo.jsx'

const TOUR_FAQ = [
  {
    q: 'Can I try out Reevo?',
    a: "Yes, the Reevo product tour is an interactive, self-guided way to see how the platform works. You can explore how Reevo connects sales workflows and puts your team's data and context to work without needing to book a sales call first.",
  },
  {
    q: 'What can I see in the Reevo product tour?',
    a: "The product tour gives you a closer look at how Reevo supports the sales motion across prospecting, buyer engagement, sales conversations, pipeline management, and CRM. You'll see how these workflows connect inside one platform instead of living across disconnected tools.",
  },
  {
    q: 'Do I need to book a demo to take the Reevo product tour?',
    a: (
      <>
        No. The product tour is self-guided, so you can explore Reevo on your own and at your own pace. If you want to
        go deeper afterward, you can <L href="/get-started">schedule a quick demo</L> with the Reevo team.
      </>
    ),
  },
  {
    q: "What's the difference between the Reevo product tour and a demo?",
    a: "The product tour gives you an interactive introduction to Reevo that you can explore whenever you want. A demo goes deeper into the platform based on your team's specific sales motion, workflows, and needs.",
  },
  {
    q: 'Is Reevo one platform or multiple sales products?',
    a: (
      <>
        Reevo is one AI-native sales platform. <L href="/products/find">Find</L>,{' '}
        <L href="/products/connect">Connect</L>, <L href="/products/sell">Sell</L>,{' '}
        <L href="/products/manage">Manage</L>, and <L href="/products/foundation">Foundation</L> are capability areas
        that describe different parts of the sales motion, all powered by the same underlying data and context.
      </>
    ),
  },
]

export default function ProductTour() {
  return (
    <main>
      <PageHeader
        label="Product Tour"
        title="See Reevo in action"
        lede="Take a self-guided tour of Reevo, the AI-native sales platform built to unify your entire sales tools."
      />
      <TourDemo />
      <FaqSection items={TOUR_FAQ} />
    </main>
  )
}
