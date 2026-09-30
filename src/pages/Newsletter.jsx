import { COL_TEXT, Container, GRID } from '../components/ui.jsx'
import CTA from '../components/CTA.jsx'
import { Input, SubmitButton, useLocalSubmit } from '../components/company/Form.jsx'

export default function Newsletter() {
  const onSubmit = useLocalSubmit()
  return (
    <main>
      <header className="py-10 md:py-12 xl:py-14">
        <Container>
          <div className={`${GRID} gap-y-6`}>
            <div className={COL_TEXT}>
              <h1 className="block text-balance font-heading text-display-2xl font-extrabold uppercase text-strong">
                The GTM Source: One Email. No Fluff.
              </h1>
              <h2 className="mt-2 md:mt-3">
                Join 8,000+ sales and revenue leaders receiving curated insights on prospecting, outreach, and pipeline
                management. This is the intelligence behind your next&nbsp;win.
              </h2>
              <div className="mt-6 md:mt-8 xl:mt-10">
                <form onSubmit={onSubmit}>
                  <div className="flex flex-col gap-3">
                    <div className="space-y-2">
                      <Input
                        type="email"
                        name="workEmail"
                        placeholder="Enter your work email"
                        aria-label="Work email"
                        autoComplete="email"
                        required
                      />
                    </div>
                    <SubmitButton className="w-full">Get the newsletter</SubmitButton>
                  </div>
                </form>
                <p className="mt-3 text-xs text-muted-foreground md:mt-4">
                  By clicking "Get the newsletter" you agree to the use of your data in accordance with Reevo's{' '}
                  <a className="underline" href="https://reevo.ai/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy Notice
                  </a>
                  , including for marketing purposes.
                </p>
              </div>
            </div>
            <div className="col-span-6 md:col-start-7 md:row-start-1 lg:col-span-14 lg:col-start-11 xl:col-span-14 xl:col-start-11">
              <div className="aspect-square">
                <img src="/assets/images/lp/workspace.jpg" alt="Woman working at her desk" width={810} height={810} />
              </div>
            </div>
          </div>
        </Container>
      </header>
      <CTA />
    </main>
  )
}
