// Client-side validation mirrored from reevo.ai's form bundle (zod schema + helper).
const FREE_DOMAINS = [
  '@gmail.com', '@yahoo.com', '@ymail.com', '@hotmail.com', '@outlook.com', '@icloud.com', '@me.com', '@mac.com',
  '@aol.com', '@live.com', '@msn.com', '@protonmail.com', '@proton.me', '@pm.me', '@yandex.com', '@mail.ru',
  '@zoho.com', '@fastmail.com', '@rambler.ru', '@qq.com', '@163.com', '@acme.com', '@gmail.co', '@2529.com',
  '@icloud.co', '@bussiness.com', '@2925.com', '@bk.ru', '@magazinnn.com', '@35125.com', '@foxmail.com',
  '@fake.com', '@esg.com', '@testing.com', '@test.com',
]

export function workEmailError(value) {
  if (!value) return 'Email is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address'
  const v = value.toLowerCase()
  if (FREE_DOMAINS.some((d) => v.includes(d))) return 'Please use a business email address'
  return null
}

// "(123) 456-7890" as the user types
export function formatPhone(value) {
  const d = value.replace(/\D/g, '')
  if (d.length <= 3) return d
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 10)}`
}

export function FieldError({ children }) {
  return <p className="text-xs text-[#fb2c36]">{children}</p>
}
