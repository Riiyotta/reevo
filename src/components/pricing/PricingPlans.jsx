import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { FieldError, workEmailError } from './validation.jsx'
import { Button, Container, GRID } from '../ui.jsx'
import { PLANS } from './pricingData.jsx'

const MONO = 'block font-mono text-display-xs uppercase text-strong'

// "Talk to a human" email capture. Original validates (business email), POSTs to a capture API and
// routes to /get-started?source=pricing&email=… . The clone validates client-side only, sends nothing,
// and hands the email to /get-started via router state (not the URL).
function EmailForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const onSubmit = (e) => {
    e.preventDefault()
    const err = workEmailError(email)
    if (err) return setError(err)
    navigate('/get-started?source=pricing', { state: { email } })
  }
  return (
    <form className="space-y-2 lg:space-y-2.5" onSubmit={onSubmit}>
      <div className="space-y-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError(null)
          }}
          placeholder="Enter your work email"
          className="flex h-button w-full min-w-0 rounded-lg border border-primary/20 bg-primary-foreground px-4 text-sm text-foreground outline-none ring-0 placeholder:text-muted-foreground focus-visible:border-strong focus-visible:bg-background"
        />
        {error && <FieldError>{error}</FieldError>}
      </div>
      <Button type="submit" variant="primary" icon={ChevronRight} className="w-full">
        Talk to a human
      </Button>
    </form>
  )
}

function PlanCard({ plan }) {
  return (
    <div className={`relative flex flex-col ${plan.dark ? 'dark bg-gray-10' : 'bg-gray-1 [&:nth-child(2)]:bg-gray-3'}`}>
      <div className="p-6 pt-8">
        <h3 className="mb-4 block font-heading text-display-2xl font-extrabold uppercase text-strong md:mb-5 lg:mb-6 xl:mb-8">
          {plan.name}
        </h3>
        <p className="mb-6 block text-display-lg font-bold text-strong md:mb-7 xl:mb-8">{plan.tagline}</p>
        <EmailForm />
      </div>
      <div className="flex-1 p-6 pt-2 md:pt-4 xl:pt-6">
        {plan.features && (
          <ul className="space-y-3 lg:space-y-4">
            {plan.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className={MONO}>•</span>
                <span className={MONO}>{f}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex h-16 items-center justify-center">
        {plan.footer ? (
          <span className={MONO}>{plan.footer}</span>
        ) : (
          <a href="#compare-plans" className="flex h-full w-full items-center justify-center gap-2 text-strong">
            <span className={`${MONO} underline`}>Show full plan comparison</span>
            <span className="inline-flex items-center justify-center">
              <ChevronDown className="size-4 shrink-0" />
            </span>
          </a>
        )}
      </div>
    </div>
  )
}

export default function PricingPlans() {
  return (
    <section id="plans" className="relative bg-background py-16 pt-4 md:py-24 md:pt-8 lg:py-32 lg:pt-8">
      <Container>
        <div className={GRID}>
          <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-22 xl:col-start-2">
            <div className="grid gap-1.5 md:grid-cols-3">
              {PLANS.map((p) => (
                <PlanCard key={p.name} plan={p} />
              ))}
              <div className="mt-4 flex flex-col gap-6 border border-gray-4 p-6 md:col-span-3 md:mt-6 md:flex-row md:items-center">
                <img
                  src="/assets/images/pricing/gtm.jpg"
                  alt="Reevo Startup Program"
                  width={288}
                  height={288}
                  loading="lazy"
                  className="size-20 shrink-0 rounded md:size-28 lg:size-32"
                />
                <div className="space-y-2">
                  <p className="text-lg font-bold text-strong">
                    Build on the right GTM foundation from the start with Reevo’s Startup&nbsp;Program
                  </p>
                  <p>
                    Avoid the point solution, Frankenstack nightmare and get a complete, turnkey GTM engine. Qualifying
                    startups unlock special pricing on their Reevo&nbsp;stack.
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button href="/startups" variant="outline">
                    Learn more
                  </Button>
                  <Button href="/startups-apply-now" variant="primary" icon={ChevronRight}>
                    See if you qualify
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
