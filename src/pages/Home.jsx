import Hero from '../components/Hero.jsx'
import LogoMarquee from '../components/LogoMarquee.jsx'
import BuiltDifferent from '../components/BuiltDifferent.jsx'
import Problem from '../components/Problem.jsx'
import Solution from '../components/Solution.jsx'
import Customers from '../components/Customers.jsx'
import Foundation from '../components/Foundation.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CTA from '../components/CTA.jsx'

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoMarquee />
      <BuiltDifferent />
      <Problem />
      <Solution />
      <Customers />
      <Foundation />
      <Testimonials />
      <CTA />
    </main>
  )
}
