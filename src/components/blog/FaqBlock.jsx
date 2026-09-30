import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Collapse } from '../motion.jsx'
import Prose from './Prose.jsx'

// In-article FAQ card (Radix Accordion type="single" collapsible on the original).
// Content height/opacity animate 0 -> auto over ~200ms; chevron rotates 180deg.
export default function FaqBlock({ title = 'Frequently Asked Questions', items }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="my-[2em] rounded border border-border bg-primary-foreground p-6 sm:p-8 lg:p-10">
      <p className="not-prose mb-[1em] block text-display-lg-2 font-bold text-strong">{title}</p>
      <div className="w-full [&>*:not(:last-child)]:mb-[1em]" data-orientation="vertical">
        {items.map(([q, a], i) => {
          const isOpen = open === i
          return (
            <div key={q} data-state={isOpen ? 'open' : 'closed'}>
              <button
                type="button"
                aria-expanded={isOpen}
                data-state={isOpen ? 'open' : 'closed'}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full cursor-pointer items-start gap-1.5 text-left text-md font-medium text-strong md:gap-2"
              >
                <div className="flex h-6 shrink-0">
                  <div className="inline-flex items-center justify-center">
                    <ChevronDown
                      className={`size-4 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
                {q}
              </button>
              <Collapse open={isOpen}>
                <div className="mt-2 pl-[22px] md:pl-6 md:pr-6">
                  <Prose>
                    <p>{a}</p>
                  </Prose>
                </div>
              </Collapse>
            </div>
          )
        })}
      </div>
    </div>
  )
}
