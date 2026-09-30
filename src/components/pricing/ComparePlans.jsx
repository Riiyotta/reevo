import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, Info, Minus, X } from 'lucide-react'
import { Container, GRID, Tag } from '../ui.jsx'
import { COMPARE } from './pricingData.jsx'
import { nb } from '../text.js'

const CELL = 'border border-border px-4 py-3 md:px-6 md:py-4'
const HEAD = `${CELL} border-none font-medium text-strong`

// Radix Tooltip (side="right", sideOffset 4, content ml-1.5, no animation, instant open).
// bg gray-9, 14px white text, max-w 250, 6px arrow on the left edge.
function InfoTip({ text }) {
  const ref = useRef(null)
  const [pos, setPos] = useState(null)
  const show = () => {
    const r = ref.current.getBoundingClientRect()
    setPos({ x: Math.round(r.right + 4), y: r.top + r.height / 2 })
  }
  const hide = () => setPos(null)
  return (
    <div className="inline-flex max-lg:hidden">
      <button
        ref={ref}
        type="button"
        aria-label="More info"
        onPointerEnter={show}
        onPointerLeave={hide}
        onFocus={show}
        onBlur={hide}
        className="-m-1 inline-flex p-1 text-foreground"
      >
        <span className="inline-flex items-center justify-center">
          <Info className="size-4 shrink-0" />
        </span>
      </button>
      {pos &&
        createPortal(
          <div
            role="tooltip"
            ref={(el) => {
              // Radix positions with whole-pixel translate values
              if (el) el.style.transform = `translate(${pos.x}px, ${Math.round(pos.y - el.offsetHeight / 2)}px)`
            }}
            className="fixed left-0 top-0 z-50 min-w-max"
          >
            <div className="relative z-50 ml-1.5 max-w-[250px] bg-gray-9 px-4 py-3.5 text-xs text-white after:absolute after:right-full after:top-1/2 after:-translate-y-1/2 after:border-[6px] after:border-transparent after:border-r-gray-9 after:content-['']">
              <p className="font-normal">{nb(text)}</p>
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}

function Value({ v }) {
  if (typeof v === 'string') return v
  const Icon = v === true ? Check : v === false ? X : Minus
  return (
    <div className="inline-flex align-middle">
      <span className="inline-flex items-center justify-center">
        <Icon className={`size-4 shrink-0 ${v === null ? 'opacity-50' : ''}`} />
      </span>
    </div>
  )
}

function CompareTable({ group }) {
  return (
    <table className="w-full text-left text-sm">
      <caption className="sr-only">
        {group.caption || `${group.title} product features comparison between Core and Pro plans`}
      </caption>
      <thead>
        <tr className="h-[50px] lg:h-[60px]">
          <th scope="col" className={`${HEAD} w-[40%] lg:w-1/3`}>
            <div className="flex items-center gap-3">
              {group.icon && (
                <div className="relative size-6 overflow-hidden md:size-8">
                  <img src={group.icon} alt="" width={32} height={32} loading="lazy" />
                </div>
              )}
              <p className="block text-display-xl font-bold text-strong">{group.title}</p>
            </div>
          </th>
          <th scope="col" className={`${HEAD} w-[30%] lg:w-1/3`}>
            Core
          </th>
          <th scope="col" className={`${HEAD} w-[30%] lg:w-1/3`}>
            Pro
          </th>
        </tr>
      </thead>
      <tbody>
        {group.rows.map(([label, core, pro, tip, soon]) => (
          <tr key={label} className="h-[50px] lg:h-[60px]">
            <th scope="row" className={`${CELL} font-medium text-strong`}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{label}</p>
                  {soon && <Tag>Soon</Tag>}
                </div>
                {tip && <InfoTip text={tip} />}
              </div>
            </th>
            <td className={CELL}>
              <Value v={core} />
            </td>
            <td className={CELL}>
              <Value v={pro} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function ComparePlans() {
  return (
    <div id="compare-plans" className="scroll-mt-24">
      <Container>
        <div className={GRID}>
          <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-22 xl:col-start-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-strong md:mb-8 xl:mb-10">Compare plans.</h2>
              <div className="-mx-4 md:mx-0">
                <div className="space-y-8 md:space-y-10 xl:space-y-12">
                  {COMPARE.map((g) => (
                    <CompareTable key={g.title} group={g} />
                  ))}
                  <p className="text-xs">
                    Updated as of: Aug 1, 2026. For additional inquiries reach out to{' '}
                    <a className="underline" href="mailto:support@reevo.ai">
                      support@reevo.ai
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
