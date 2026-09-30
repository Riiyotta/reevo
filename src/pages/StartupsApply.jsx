import { COL_LABEL, Container, GRID } from '../components/ui.jsx'
import { Field, Honeypot, Input, Select, SubmitButton, useLocalSubmit } from '../components/company/Form.jsx'
import PhoneConsent from '../components/PhoneConsent.jsx'

const PEOPLE = ['1', '2-3', '4-7', '8-15', '16-50', '51-200', '201+', "I'm not sure"].map((v) => [v, v])
const CUSTOMERS = [
  ['b2b', 'Businesses (B2B)'],
  ['b2c', 'Consumers (B2C)'],
  ['both', 'Both'],
  ['other', 'Other'],
]
const FIRMS = [
  ['accel', 'Accel'],
  ['andreessen', 'Andreessen Horowitz'],
  ['battery', 'Battery Ventures'],
  ['benchmark', 'Benchmark'],
  ['bessemer', 'Bessemer Venture Partners'],
  ['first-round', 'First Round Capital'],
  ['founders-fund', 'Founders Fund'],
  ['general-catalyst', 'General Catalyst'],
  ['greylock', 'Greylock'],
  ['index', 'Index Ventures'],
  ['insight', 'Insight Partners'],
  ['khosla', 'Khosla Ventures'],
  ['kleiner-perkins', 'Kleiner Perkins'],
  ['lightspeed', 'Lightspeed'],
  ['menlo-ventures', 'Menlo Ventures'],
  ['nea', 'NEA'],
  ['redpoint', 'Redpoint'],
  ['sequoia', 'Sequoia'],
  ['sv-angel', 'SV Angel'],
  ['thrive', 'Thrive Capital'],
  ['yc', 'Y Combinator'],
  ['other', 'Other'],
]

export default function StartupsApply() {
  const onSubmit = useLocalSubmit()
  return (
    <main>
      <section className="relative bg-background py-16 md:py-24 lg:py-32">
        <Container>
          <div className={GRID}>
            <div className={COL_LABEL}>
              <div className="mx-auto max-w-lg">
                <div className="mb-6 lg:mb-8 xl:mb-10">
                  <h1 className="block text-display-xl font-bold text-strong">
                    Put your startup’s go-to-market on the fast track
                  </h1>
                  <p className="mt-2 md:mt-3">
                    Let us know about your company and you could qualify for discounted startup&nbsp;pricing.
                  </p>
                </div>
                <div className="relative">
                  <form className="space-y-6" onSubmit={onSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      <Field id="firstName" label="First name">
                        <Input id="firstName" name="firstName" placeholder="John" required autoComplete="given-name" />
                      </Field>
                      <Field id="lastName" label="Last name">
                        <Input id="lastName" name="lastName" placeholder="Doe" required autoComplete="family-name" />
                      </Field>
                    </div>
                    <Field id="companyName" label="Company name">
                      <Input id="companyName" name="companyName" placeholder="Acme, Inc." required />
                    </Field>
                    <Field id="workEmail" label="Work email">
                      <Input id="workEmail" name="workEmail" type="email" placeholder="john.doe@acme.com" required autoComplete="email" />
                    </Field>
                    <Field id="phoneNumber" label="Phone number (optional)">
                      <div className="relative flex">
                        <div className="pointer-events-none absolute bottom-2.5 left-0 top-2.5 flex items-center justify-center border-r border-border px-4 text-sm">
                          +1
                        </div>
                        <Input id="phoneNumber" name="phoneNumber" type="tel" placeholder="(123) 456-7890" className="pl-16" />
                      </div>
                    </Field>
                    <Field id="numberOfPeople" label="About how many people at your company drive revenue growth?">
                      <Select id="numberOfPeople" name="numberOfPeople" options={PEOPLE} required />
                    </Field>
                    <Field id="customer" label="Who do you sell to?">
                      <Select id="customer" name="customer" options={CUSTOMERS} required />
                    </Field>
                    <div className="flex flex-col gap-6 sm:flex-row">
                      <div className="space-y-2 sm:flex-1">
                        <Field id="teamSize" label="Team size">
                          <Input id="teamSize" name="teamSize" type="number" min="1" step="1" inputMode="numeric" placeholder="10" required />
                        </Field>
                      </div>
                      <div className="space-y-2 sm:flex-[2]">
                        <Field id="firm" label="VC firm or accelerator">
                          <Select id="firm" name="firm" options={FIRMS} required />
                        </Field>
                      </div>
                    </div>
                    <Field id="howDidYouHear" label="How did you hear about us? (optional)">
                      <Input id="howDidYouHear" name="howDidYouHear" placeholder="Advertisement, referral, social media, etc." />
                    </Field>
                    <Honeypot />
                    <SubmitButton className="w-full lg:w-[338px]">See if you qualify</SubmitButton>
                    <PhoneConsent />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
