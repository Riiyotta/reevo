import { STACK } from '../ui.jsx'
import Prose from './Prose.jsx'

// Narrow document layout shared by /zoom-setup, /bot-for-slack-setup and /release-notes:
// section shell + 880px column + space-y stack, Metrify display-2xl H1.
export default function DocPage({ title, children, prose = true }) {
  return (
    <section className="relative bg-background py-16 md:py-24 lg:py-32">
      <div>
        <div className="w-full px-6 sm:px-8 md:px-10 lg:px-12">
          <div className="mx-auto w-full max-w-[880px]">
            <div className={STACK}>
              <h1 className="block font-heading text-display-2xl font-extrabold uppercase text-strong">{title}</h1>
              {prose ? <Prose>{children}</Prose> : children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
