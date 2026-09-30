import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Container, GRID } from './ui.jsx'
import { Collapse } from './motion.jsx'
import { nb } from './text.js'

// Trusted static HTML from data files (strong / a / &nbsp; widow fixes).
function Html({ as: Tag = 'span', html, ...rest }) {
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: html }} />
}

// Answer wrapper mirrors the original's `prose ... leading-[140%] -mt-1 max-w-[60ch] pb-5 md:pr-8`
// (prose base 1rem, p = text-md, links strong / normal weight / underlined).
const PROSE =
  '-mt-1 max-w-[60ch] pb-5 text-[1rem] leading-[140%] md:pr-8 [&_a]:font-normal [&_a]:text-strong [&_a]:underline [&_p]:text-md'

// Accordion item. Content animates height + opacity over 200ms cubic-bezier(.4,0,.2,1),
// measured on /pricing (0 -> 88.9px, opacity 0 -> 1).
function FaqItem({ q, a, html, open, onToggle }) {
  const id = useId()
  const state = open ? 'open' : 'closed'
  return (
    <div data-state={state}>
      <h3 className="flex">
        <button
          type="button"
          id={`${id}-t`}
          aria-controls={`${id}-c`}
          aria-expanded={open}
          data-state={state}
          onClick={onToggle}
          className="group flex flex-1 cursor-pointer items-center justify-between gap-4 py-5 text-left text-md font-medium text-strong"
        >
          {html ? <Html className="max-w-[50ch]" html={q} /> : <span className="max-w-[50ch]">{nb(q)}</span>}
          <span className="inline-flex items-center justify-center">
            <ChevronDown
              className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            />
          </span>
        </button>
      </h3>
      <Collapse open={open} id={`${id}-c`} aria-labelledby={`${id}-t`}>
        {html ? (
          <Html as="div" className={PROSE} html={a} />
        ) : (
          <div className={PROSE}>
            <p>{typeof a === 'string' ? nb(a) : a}</p>
          </div>
        )}
      </Collapse>
    </div>
  )
}

// Page-level FAQ. Default is Radix Accordion type="multiple": items open and close independently
// (verified on /pricing); `single` opens one at a time (/apps/mobile). `items` are { q, a }: plain
// strings (a may also be JSX), or trusted HTML strings when `html`.
export default function FaqSection({ items, html = false, noPt = false, single = false }) {
  const [open, setOpen] = useState(() => new Set())
  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(single ? [] : prev)
      prev.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  return (
    <section id="faq" className={`relative bg-background py-16 md:py-24 lg:py-32 ${noPt ? '!pt-0' : ''}`}>
      <Container>
        <div className={`${GRID} gap-y-8`}>
          <div className="col-span-6 md:col-span-5 lg:col-span-9 xl:col-span-8 xl:col-start-2">
            <h2 className="block text-balance font-heading text-display-2xl font-extrabold uppercase text-strong">
              Frequently asked questions
            </h2>
          </div>
          <div className="col-span-6 md:col-span-7 md:col-start-6 lg:col-span-13 lg:col-start-12 xl:col-span-12 xl:col-start-12">
            <div className="divide-y divide-border border-b border-t border-border" data-orientation="vertical">
              {items.map((it, i) => (
                <FaqItem key={i} {...it} html={html} open={open.has(i)} onToggle={() => toggle(i)} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
