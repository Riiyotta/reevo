import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Container, GRID, Tag } from '../ui.jsx'
import { EASE_STANDARD } from '../motion.jsx'
import { Collapse, EASE_OUT_CUBIC } from '../motion.jsx'
import { Html } from './primitives.jsx'

// Measured on reevo.ai: single-open accordion that auto-advances every 5s while the
// section is on screen (paused off screen, restarted on re-entry and on click).
// Content height/opacity ~175ms ease-out; image exits (opacity -> 0, same timing as
// the content) and the next one then fades in over ~200ms (AnimatePresence mode="wait").
const ADVANCE_MS = 5000
const CONTENT_MS = 175
const IMG_IN_MS = 200

const TEXT_COL = 'col-span-6 md:col-span-6 lg:col-span-10 lg:col-start-1 xl:col-span-8 xl:col-start-2'
const TEXT_COL_R = 'col-span-6 md:col-span-6 lg:col-span-10 lg:col-start-14 xl:col-span-8 xl:col-start-15'
const IMG_COL =
  'col-span-6 md:col-span-6 md:col-start-7 md:row-start-1 md:row-end-3 lg:col-span-12 lg:col-start-13 xl:col-span-13 xl:col-start-12'
const IMG_COL_R =
  'col-span-6 md:col-span-6 md:col-start-1 md:row-start-1 md:row-end-3 lg:col-span-12 lg:col-start-1 xl:col-span-13 xl:col-start-1'

function useInView(ref, threshold) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold])
  return inView
}

export default function ProductAccordion({ dark, reverse, noPb, h2, lede, items }) {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const [active, setActive] = useState(0)
  const [shown, setShown] = useState(0)
  const inView = useInView(sectionRef, 0.3)
  const mountedImg = useRef(false)

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), ADVANCE_MS)
    return () => clearTimeout(t)
  }, [active, inView, items.length])

  // exit the current image, then swap
  useEffect(() => {
    const el = imgRef.current
    if (!el || active === shown) return
    const from = +getComputedStyle(el).opacity
    el.getAnimations().forEach((a) => a.cancel())
    const a = el.animate([{ opacity: from }, { opacity: 0 }], { duration: CONTENT_MS, easing: EASE_OUT_CUBIC, fill: 'forwards' })
    a.onfinish = () => setShown(active)
    return () => (a.onfinish = null)
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  // enter the new image
  useLayoutEffect(() => {
    if (!mountedImg.current) {
      mountedImg.current = true
      return
    }
    const el = imgRef.current
    el.getAnimations().forEach((a) => a.cancel())
    el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: IMG_IN_MS, easing: EASE_STANDARD })
  }, [shown])

  const textCol = reverse ? TEXT_COL_R : TEXT_COL
  const img = items[shown]

  return (
    <section ref={sectionRef} className={`relative bg-background py-16 md:py-24 lg:py-32 ${dark ? 'dark' : ''} ${noPb ? '!pb-0' : ''}`}>
      <Container>
        <div className={`${GRID} md:grid-rows-1`}>
          <div className={textCol}>
            <Html as="h2" className="mb-3 block font-heading text-display-2xl font-extrabold uppercase text-strong md:mb-4 lg:mb-5 xl:mb-6" html={h2} />
            {lede && <Html as="p" className="mb-2 text-lg text-foreground sm:mb-4 md:mb-0" html={lede} />}
          </div>

          <div className={reverse ? IMG_COL_R : IMG_COL}>
            <div className="relative aspect-square overflow-hidden">
              <div ref={imgRef} className="absolute inset-0 h-full w-full" style={{ willChange: 'opacity, transform' }}>
                <img src={img.img} alt={img.alt} loading="lazy" width={1000} height={1000} decoding="async" />
              </div>
            </div>
          </div>

          <div className={textCol}>
            <div className="pt-2 sm:pt-4 md:pt-0">
              <div className="w-full lg:pb-6" data-orientation="vertical">
                {items.map((it, i) => {
                  const open = i === active
                  return (
                    <div key={it.title} data-state={open ? 'open' : 'closed'} className={`border-l py-1 ${open ? 'border-l-strong' : 'border-border'}`}>
                      <h3 className="flex">
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-disabled={open || undefined}
                          onClick={() => setActive(i)}
                          className={`flex flex-1 cursor-pointer items-center gap-4 px-4 py-3 text-left font-bold text-strong ${open ? '' : 'opacity-60'}`}
                        >
                          {it.title}
                          {it.soon && <Tag>Soon</Tag>}
                        </button>
                      </h3>
                      <Collapse open={open} duration={CONTENT_MS} easing={EASE_OUT_CUBIC} className="px-4 text-foreground">
                        <Html as="div" className="pb-3" html={it.body} />
                      </Collapse>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
