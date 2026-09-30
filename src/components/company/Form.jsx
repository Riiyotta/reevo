import { useState } from 'react'
import { Check, ChevronRight } from 'lucide-react'
import { buttonClass } from '../ui.jsx'

// Form controls measured on reevo.ai/partners and /startups-apply-now (shadcn-style inputs on top of
// @tailwindcss/forms): 46px tall, bg gray-1, 8px radius, transparent 1px border, 8px/16px padding,
// focus-visible -> white bg + #121212 border. Native <select> keeps the forms-plugin chevron.
const FIELD =
  'appearance-none text-foreground bg-gray-1 w-full min-w-0 rounded-lg border border-transparent px-4 text-sm outline-none ring-0 placeholder:text-muted-foreground focus-visible:border-strong focus-visible:bg-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'

const CHEVRON =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='oklch(55.1%25 0.027 264.364)' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")"

export function Label({ htmlFor, children, as: Tag = 'label' }) {
  return (
    <Tag htmlFor={htmlFor} className="block w-full select-none text-xs font-medium">
      {children}
    </Tag>
  )
}

export function Input({ className = '', ...props }) {
  return <input className={`${FIELD} flex h-button py-2 ${className}`} {...props} />
}

export function Textarea({ className = '', ...props }) {
  return <textarea className={`${FIELD} resize-none py-3 ${className}`} {...props} />
}

export function Select({ options, className = '', ...props }) {
  return (
    <select
      className={`flex h-button w-full appearance-none rounded-lg border border-transparent bg-gray-1 px-4 py-2 text-sm text-foreground outline-none ring-0 focus-visible:border-gray-10 focus-visible:bg-background ${className}`}
      style={{ backgroundImage: CHEVRON, backgroundPosition: 'calc(100% - 8px) 50%', backgroundSize: '24px 24px', backgroundRepeat: 'no-repeat' }}
      defaultValue=""
      {...props}
    >
      <option value="">Select an option</option>
      {options.map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}

export function Field({ id, label, children }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  )
}

// Radix-style checkbox (button role=checkbox): 20px, 2px radius, gray-1 -> gray-10 with a white check.
export function Checkbox({ name, value, label }) {
  const [checked, setChecked] = useState(false)
  return (
    <label className="flex cursor-pointer items-start gap-2.5">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        data-state={checked ? 'checked' : 'unchecked'}
        onClick={() => setChecked((c) => !c)}
        className={`peer h-5 w-5 shrink-0 rounded border-0 ${checked ? 'bg-gray-10 text-white' : 'bg-gray-1'}`}
      >
        {checked && (
          <span className="pointer-events-none flex items-center justify-center text-current">
            <Check className="size-4 shrink-0" />
          </span>
        )}
      </button>
      <input type="checkbox" aria-hidden="true" tabIndex={-1} name={name} value={value} checked={checked} readOnly className="sr-only" />
      <span className="select-none text-sm">{label}</span>
    </label>
  )
}

// Hidden honeypot field present in both original forms
export function Honeypot() {
  return (
    <div className="pointer-events-none absolute -z-10 h-0 w-0 select-none overflow-hidden opacity-0" aria-hidden="true">
      <Label htmlFor="website">Website</Label>
      <Input id="website" name="website" tabIndex={-1} autoComplete="off" />
    </div>
  )
}

export function SubmitButton({ className = '', children }) {
  return (
    <button type="submit" className={buttonClass({ className })}>
      {children}
      <span className="inline-flex size-4">
        <ChevronRight className="size-4" />
      </span>
    </button>
  )
}

// Clone forms never send data anywhere: native constraint validation runs, then submit is swallowed.
export function useLocalSubmit() {
  return (e) => {
    e.preventDefault()
  }
}
