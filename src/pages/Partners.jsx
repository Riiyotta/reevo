import { COL_LABEL, Container, GRID } from '../components/ui.jsx'
import { Checkbox, Field, Honeypot, Input, Label, Select, SubmitButton, Textarea, useLocalSubmit } from '../components/company/Form.jsx'

const PARTNER_TYPES = [
  ['technology', 'Technology Partner'],
  ['consulting', 'Consulting Partner'],
  ['agency', 'Agency Partner'],
  ['community', 'Community Partner'],
  ['referral', 'Referral Partner'],
  ['other', 'Other'],
]
const SEGMENTS = ['Startups', 'SMB', 'Mid-Market', 'Enterprise']
const INTERESTS = ['Product integration', 'Implementations & services', 'Co-marketing', 'Referrals', 'Other']

function CheckGroup({ legend, name, items }) {
  return (
    <fieldset className="space-y-3">
      <Label as="legend">{legend}</Label>
      {items.map((label) => (
        <Checkbox key={label} name={name} value={label} label={label} />
      ))}
    </fieldset>
  )
}

export default function Partners() {
  const onSubmit = useLocalSubmit()
  return (
    <main>
      <section className="relative bg-background py-16 md:py-24 lg:py-32">
        <Container>
          <div className={GRID}>
            <div className={COL_LABEL}>
              <div className="mx-auto max-w-lg">
                <div className="mb-6 space-y-2 md:space-y-3 lg:mb-8 xl:mb-10">
                  <h1 className="block text-display-xl font-bold text-strong">Partner with Reevo</h1>
                  <p>
                    We partner with technology platforms, agencies, consultants, and startup communities helping
                    companies build and scale their go-to-market&nbsp;teams.
                  </p>
                  <p>
                    If you're interested in exploring a partnership with Reevo, tell us a bit about your company and how
                    you see us working&nbsp;together.
                  </p>
                </div>
                <form className="relative space-y-6" onSubmit={onSubmit}>
                  <div className="space-y-6">
                    <p className="block text-display-lg font-bold text-strong">Contact Information</p>
                    <Field id="fullName" label="Full name">
                      <Input id="fullName" name="fullName" placeholder="John Doe" required autoComplete="name" />
                    </Field>
                    <Field id="workEmail" label="Work email">
                      <Input id="workEmail" name="workEmail" type="email" placeholder="john.doe@acme.com" required autoComplete="email" />
                    </Field>
                    <Field id="jobTitle" label="Job title">
                      <Input id="jobTitle" name="jobTitle" placeholder="Head of Partnerships" required />
                    </Field>
                    <Field id="companyName" label="Company name">
                      <Input id="companyName" name="companyName" placeholder="Acme, Inc." required />
                    </Field>
                    <Field id="companyWebsite" label="Company website">
                      <Input id="companyWebsite" name="companyWebsite" placeholder="acme.com" required />
                    </Field>
                  </div>
                  <div className="space-y-6">
                    <p className="block text-display-lg font-bold text-strong">Partnership Information</p>
                    <Field id="partnerType" label="Partner type">
                      <Select id="partnerType" name="partnerType" options={PARTNER_TYPES} required />
                    </Field>
                    <CheckGroup legend="Customer segment" name="customerSegment" items={SEGMENTS} />
                    <CheckGroup legend="How are you interested in partnering with Reevo?" name="interest" items={INTERESTS} />
                    <Field id="description" label="Briefly describe your company and how you see us working together">
                      <Textarea
                        id="description"
                        name="description"
                        rows={4}
                        placeholder="Tell us about your company and the partnership opportunity..."
                      />
                    </Field>
                  </div>
                  <Honeypot />
                  <SubmitButton className="w-full lg:w-[338px]">Submit</SubmitButton>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
