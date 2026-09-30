import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Button } from '../ui.jsx'
import { CardDialog, useModal } from '../dialog.jsx'
import { FieldError, formatPhone, workEmailError } from './validation.jsx'
import PhoneConsent from '../PhoneConsent.jsx'

const INPUT =
  'flex h-button w-full min-w-0 rounded-lg border border-transparent bg-gray-1 px-4 text-sm text-foreground outline-none ring-0 placeholder:text-muted-foreground focus-visible:border-strong focus-visible:bg-background'
const SELECT =
  'flex h-button w-full rounded-lg border border-transparent bg-gray-1 px-4 text-sm outline-none ring-0 focus-visible:border-gray-10 focus-visible:bg-background'
const LABEL = 'block w-full select-none text-xs font-medium'

const PEOPLE = ['1', '2-3', '4-7', '8-15', '16-50', '51-200', '201+', "I'm not sure"].map((v) => ({ value: v, label: v }))
const CUSTOMER = [
  { value: 'b2b', label: 'Businesses (B2B)' },
  { value: 'b2c', label: 'Consumers (B2C)' },
  { value: 'both', label: 'Both' },
  { value: 'other', label: 'Other' },
]
const SALES_PROCESS = [
  { value: 'sales-led', label: 'Yes, we sell through people' },
  { value: 'self-serve', label: "No, it's fully self-serve checkout" },
]

// Same rules as the original's zod schema
function validate(v) {
  const e = {}
  if (!v.firstName) e.firstName = 'First name is required'
  if (!v.lastName) e.lastName = 'Last name is required'
  if (!v.companyName) e.companyName = 'Company name is required'
  const em = workEmailError(v.workEmail)
  if (em) e.workEmail = em
  if (!v.numberOfPeople) e.numberOfPeople = 'Please select a range'
  if (!v.customer) e.customer = 'Please select a customer type'
  if (v.customer === 'b2c' && !v.salesProcess) e.salesProcess = 'Please select an option'
  return e
}

function Select({ id, options, value, onChange }) {
  return (
    <select id={id} name={id} value={value} onChange={onChange} className={SELECT}>
      <option value="">Select an option</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

// Visual shell of the original's scheduler dialog (it embeds a cal.reevo.ai iframe, prefilled
// with the form values). The clone shows an empty frame and never loads or sends anything.
function SchedulerShell({ onClose }) {
  useModal(true, onClose)
  return (
    <CardDialog
      onClose={onClose}
      panelClassName="max-w-[calc(100%-24px)] sm:max-w-[90vw] lg:max-w-[1060px] xl:max-w-[1100px]"
    >
      <div className="space-y-4 md:space-y-5">
        <div className="space-y-2">
          <h2 className="block text-display-lg font-bold text-strong">Book a time with us</h2>
        </div>
        <div className="flex h-[440px] items-center justify-center border border-border text-sm text-muted-foreground md:h-[520px] lg:h-[609px]">
          Scheduler (third-party embed not loaded in this clone)
        </div>
      </div>
    </CardDialog>
  )
}

export default function GetStartedForm({ initialEmail = '' }) {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    workEmail: initialEmail,
    phoneNumber: '',
    numberOfPeople: '',
    customer: '',
    salesProcess: '',
    howDidYouHear: '',
    website: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false) // react-hook-form: validate on submit, then on change
  const [revealed, setRevealed] = useState(false)

  const set = (k) => (e) => {
    let v = e.target.value
    if (k === 'phoneNumber') v = formatPhone(v)
    const next = { ...values, [k]: v }
    if (k === 'customer' && v !== 'b2c') next.salesProcess = ''
    setValues(next)
    if (submitted) setErrors(validate(next))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length || values.website) return
    setRevealed(true)
  }

  const input = (id, props = {}) => (
    <input id={id} name={id} value={values[id]} onChange={set(id)} className={INPUT} {...props} />
  )

  return (
    <div className="relative">
      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={LABEL} htmlFor="firstName">First name</label>
            {input('firstName', { placeholder: 'John' })}
            {errors.firstName && <FieldError>{errors.firstName}</FieldError>}
          </div>
          <div className="space-y-2">
            <label className={LABEL} htmlFor="lastName">Last name</label>
            {input('lastName', { placeholder: 'Doe' })}
            {errors.lastName && <FieldError>{errors.lastName}</FieldError>}
          </div>
        </div>
        <div className="space-y-2">
          <label className={LABEL} htmlFor="companyName">Company name</label>
          {input('companyName', { placeholder: 'Acme, Inc.' })}
          {errors.companyName && <FieldError>{errors.companyName}</FieldError>}
        </div>
        <div className="space-y-2">
          <label className={LABEL} htmlFor="workEmail">Work email</label>
          {input('workEmail', { type: 'email', placeholder: 'john.doe@acme.com' })}
          {errors.workEmail && <FieldError>{errors.workEmail}</FieldError>}
        </div>
        <div className="space-y-2">
          <label className={LABEL} htmlFor="phoneNumber">Phone number (optional)</label>
          <div className="relative flex">
            <div className="pointer-events-none absolute bottom-2.5 left-0 top-2.5 flex items-center justify-center border-r border-border px-4 text-sm">
              +1
            </div>
            {input('phoneNumber', { type: 'tel', placeholder: '(123) 456-7890', className: `${INPUT} pl-16` })}
          </div>
        </div>
        <div className="space-y-2">
          <label className={LABEL} htmlFor="numberOfPeople">
            About how many people at your company drive revenue growth?
          </label>
          <Select id="numberOfPeople" options={PEOPLE} value={values.numberOfPeople} onChange={set('numberOfPeople')} />
          {errors.numberOfPeople && <FieldError>{errors.numberOfPeople}</FieldError>}
        </div>
        <div className="space-y-2">
          <label className={LABEL} htmlFor="customer">Who do you sell to?</label>
          <Select id="customer" options={CUSTOMER} value={values.customer} onChange={set('customer')} />
          {errors.customer && <FieldError>{errors.customer}</FieldError>}
        </div>
        {values.customer === 'b2c' && (
          <div className="space-y-2">
            <label className={LABEL} htmlFor="salesProcess">Is a person involved in closing the sale?</label>
            <Select id="salesProcess" options={SALES_PROCESS} value={values.salesProcess} onChange={set('salesProcess')} />
            {errors.salesProcess && <FieldError>{errors.salesProcess}</FieldError>}
          </div>
        )}
        <div className="space-y-2">
          <label className={LABEL} htmlFor="howDidYouHear">How did you hear about us? (optional)</label>
          {input('howDidYouHear', { placeholder: 'Advertisement, referral, social media, etc.' })}
        </div>
        {/* honeypot */}
        <div className="pointer-events-none absolute -z-10 h-0 w-0 select-none overflow-hidden opacity-0">
          <label className={LABEL} htmlFor="website">Website</label>
          {input('website', { tabIndex: -1, autoComplete: 'off' })}
        </div>
        <Button type="submit" variant="primary" icon={ChevronRight} className="w-full lg:w-[338px]">
          Schedule your custom demo
        </Button>
        <PhoneConsent />
      </form>
      {revealed && <SchedulerShell onClose={() => setRevealed(false)} />}
    </div>
  )
}
