import { useLocation } from 'react-router-dom'
import { Container, GRID } from '../components/ui.jsx'
import GetStartedForm from '../components/pricing/GetStartedForm.jsx'

export default function GetStarted() {
  // The pricing email capture hands its email over via router state (the original uses ?email=)
  const { state } = useLocation()
  return (
    <main>
      <section className="relative bg-background py-16 md:py-24 lg:py-32">
        <Container>
          <div className={GRID}>
            <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-22 xl:col-start-2">
              <div className="mx-auto max-w-lg">
                <div className="mb-6 lg:mb-8 xl:mb-10">
                  <h1 className="block text-display-xl font-bold text-strong">See Reevo in action</h1>
                  <p className="mt-2 md:mt-3">Schedule a quick demo to see if Reevo fits your&nbsp;needs.</p>
                </div>
                <GetStartedForm initialEmail={state?.email || ''} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
