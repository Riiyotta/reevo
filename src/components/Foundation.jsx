import { useCallback, useEffect, useRef, useState } from 'react'
import { ToggleRight } from 'lucide-react'
import { COL_TEXT, GRID, Section, SectionLabel } from './ui.jsx'

const SLIDE_MS = 5000

const SLIDES = [
  {
    img: '/assets/reevo-alerts.jpg',
    alt: 'Slack conversation where a rep asks Reevo which deals are at risk this quarter and Reevo replies naming three at-risk deals with the reasons',
  },
  {
    img: '/assets/summary.jpg',
    alt: "Ask Reevo activity summary of a deal's pricing and ROI concerns, with an insight and recommended next steps",
  },
  {
    img: '/assets/output.jpg',
    alt: "Ask Reevo naming the team's strongest seller for an objection and laying out their step-by-step talk track",
  },
]

export default function Foundation() {
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState({}) // per-slide 0..100, as on the original
  const timer = useRef(0)
  const startRef = useRef(Date.now())

  // Original: setInterval every 16ms computing (Date.now() - start) / 5000 * 100; at 100 it advances,
  // zeroes both bars and restarts. Clicking a tab jumps there and restarts the timer.
  const start = useCallback((i) => {
    clearInterval(timer.current)
    startRef.current = Date.now()
    setProgress((p) => ({ ...p, [i]: 0 }))
    timer.current = setInterval(() => {
      const pct = Math.min(((Date.now() - startRef.current) / SLIDE_MS) * 100, 100)
      if (pct >= 100) {
        clearInterval(timer.current)
        const next = (i + 1) % SLIDES.length
        setCurrent(next)
        setProgress((p) => ({ ...p, [i]: 0, [next]: 0 }))
        setTimeout(() => start(next), 0)
      } else setProgress((p) => ({ ...p, [i]: pct }))
    }, 16)
  }, [])

  useEffect(() => {
    start(0)
    return () => clearInterval(timer.current)
  }, [start])

  const select = (i) => {
    setCurrent(i)
    start(i)
  }

  return (
    <Section className="bg-background" pattern="/assets/images/patterns/pattern-04.png">
      <SectionLabel icon={ToggleRight}>Foundation</SectionLabel>
      <div className={`${GRID} gap-y-6`}>
        <div className={COL_TEXT}>
          <h3 className="mb-2 font-heading text-display-2xl font-extrabold uppercase text-strong md:mb-3 lg:mb-4">
            Built on one source of truth.
          </h3>
          <p className="mb-4 md:mb-0">
            Every interaction, workflow, and record lives in a single memory layer so context compounds instead of
            scattering across tools.
          </p>
        </div>

        <div className="relative col-span-6 aspect-square w-full md:col-span-6 md:col-start-7 md:row-start-1 lg:col-span-14 lg:col-start-11 lg:row-span-2">
          {SLIDES.map((s, i) => (
            <div
              key={s.img}
              id={`ask-reevo-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`ask-reevo-tab-${i}`}
              hidden={i !== current}
              data-current={i === current || undefined}
              className="absolute inset-0"
            >
              <img src={s.img} alt={s.alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div className={`${COL_TEXT} flex h-full flex-col justify-end lg:row-start-2`}>
          <p className="mb-2 text-display-lg font-bold text-strong">Meet Ask Reevo.</p>
          <p>
            Type a question about pipeline, deal health, objections, or next steps. Reevo reasons across everything your
            team knows and cites the exact call, email, or record behind every answer. It lives in Slack too. Mention it
            in any channel and get the same cited answers where your team already works.
          </p>
          <ul role="tablist" className="mt-6 flex w-full gap-4 sm:mt-8 sm:max-w-[338px] lg:mt-10 xl:mt-14">
            {SLIDES.map((s, i) => {
              const active = i === current
              return (
                <li key={s.img} className="flex flex-1">
                  <button
                    type="button"
                    role="tab"
                    id={`ask-reevo-tab-${i}`}
                    aria-selected={active}
                    aria-controls={`ask-reevo-panel-${i}`}
                    onClick={() => select(i)}
                    className="group flex flex-1 cursor-pointer flex-col gap-2 text-left"
                  >
                    <span
                      className={`block font-mono text-display-xs uppercase text-strong transition-opacity duration-200 group-hover:opacity-100 ${active ? 'opacity-100' : 'opacity-40'}`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="block h-[5px] w-full overflow-hidden bg-gray-3">
                      {/* Original: motion.div animate {scaleX: progress/100, opacity: active ? 1 : 0},
                          transition {duration:.2, ease:'linear'}, retargeted on every 16ms tick. CSS transitions
                          retarget from the current value the same way. */}
                      <span
                        className="block h-full w-full origin-left bg-orange-8"
                        style={{
                          opacity: active ? 1 : 0,
                          transform: `scaleX(${(progress[i] || 0) / 100})`,
                          transition: 'transform 200ms linear, opacity 200ms linear',
                        }}
                      />
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Section>
  )
}
