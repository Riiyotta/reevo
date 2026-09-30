import { Container, GRID } from '../ui.jsx'

// Inline link inside FAQ answers (typography plugin: strong colour, normal weight, underline)
export function FaqLink({ href, children }) {
  return (
    <a href={href} className="font-normal text-strong underline">
      {children}
    </a>
  )
}

// Page header shared by /pricing and /product-tour:
// mono eyebrow (h1) + display-3xl title (h2) + lede.
export function PageHeader({ label, title, lede }) {
  return (
    <header className="py-10 md:py-12 xl:py-14">
      <Container>
        <div className={GRID}>
          <div className="col-span-6 md:col-span-12 lg:col-span-22 xl:col-span-20 xl:col-start-2">
            <h1 className="mb-5 block font-mono text-display-xs uppercase text-strong sm:mb-6 lg:mb-8">{label}</h1>
            <h2 className="block text-balance font-heading text-display-3xl font-black uppercase text-strong">{title}</h2>
          </div>
          <div className="col-span-6 md:col-span-9 lg:col-span-14 xl:col-span-12 xl:col-start-2">
            <p className="text-pretty text-lg">{lede}</p>
          </div>
        </div>
      </Container>
    </header>
  )
}
