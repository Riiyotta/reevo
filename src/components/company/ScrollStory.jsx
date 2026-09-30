import { useEffect, useRef } from 'react'
import { Container, GRID, PatternStrip } from '../ui.jsx'

// About page manifesto: a 5 x --slide-h tall section whose sticky viewport cross-fades 5 statements
// as you scroll. Measured on reevo.ai (framer useScroll offset ["start start","end end"] + useTransform, linear):
//  - scroll progress p = scrolled / (sectionHeight - viewportHeight)
//  - slide i owns [i/5, (i+1)/5]; it fades in over [i/5, i/5 + .06] (opacity 0->1, y 28px->0)
//    and out over [(i+1)/5 - .06, (i+1)/5] (opacity 1->0, y 0->-28px). First slide starts visible, last never exits.
//  - dots: active weight crossfades over +-.05 around each boundary; width 6->24px, opacity .3->1.
const SLIDES = [
  <strong key="0">Selling is one of the most human things we&nbsp;do.</strong>,
  'It’s listening closely, understanding what someone really needs, earning trust, and helping them get to a better outcome. That’s the craft, and we started Reevo to elevate it.',
  'Somewhere along the way, the tools meant to support that craft started getting in the way. Reps spend their days feeding software instead of talking to buyers, and the context they work so hard to build, everything they learn about a customer, a deal, a moment that matters, scatters across a dozen disconnected systems and disappears the moment it’s needed.',
  'That context is the most valuable thing a sales team creates. It’s also what makes AI genuinely useful: intelligence built on fragments can only guess, while intelligence built on connected context can actually help — surfacing the right insight at the right moment and getting sharper with every interaction.',
  <>
    So we built Reevo to make context compound: one intelligent foundation where knowledge builds on itself, and
    every day of use makes your team more effective. That’s how real transformation happens. The tools carry the
    context, so people are freed to do the part only people can do – <strong>win deals.</strong>
  </>,
]

const N = SLIDES.length
const SEG = 1 / N
const FADE = 0.06
const DOT = 0.05
const Y = 28
const clamp01 = (v) => Math.min(1, Math.max(0, v))

function slideState(i, p) {
  const start = i * SEG
  const end = (i + 1) * SEG
  if (i > 0 && p < start + FADE) {
    const t = clamp01((p - start) / FADE)
    return [t, Y * (1 - t)]
  }
  if (i < N - 1 && p > end - FADE) {
    const t = clamp01((p - (end - FADE)) / FADE)
    return [1 - t, -Y * t]
  }
  return [1, 0]
}

function dotWeight(i, p) {
  const rise = i === 0 ? 1 : clamp01((p - (i * SEG - DOT)) / (2 * DOT))
  const fall = i === N - 1 ? 1 : 1 - clamp01((p - ((i + 1) * SEG - DOT)) / (2 * DOT))
  return Math.min(rise, fall)
}

export default function ScrollStory() {
  const sectionRef = useRef(null)
  const slideRefs = useRef([])
  const dotRefs = useRef([])

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = sectionRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const range = r.height - window.innerHeight
      const p = range > 0 ? clamp01(-r.top / range) : 0
      slideRefs.current.forEach((s, i) => {
        if (!s) return
        const [o, y] = slideState(i, p)
        s.style.opacity = String(o)
        s.style.transform = y === 0 ? 'none' : `translateY(${y}px)`
        s.setAttribute('aria-hidden', o > 0.5 ? 'false' : 'true')
      })
      dotRefs.current.forEach((d, i) => {
        if (!d) return
        const w = dotWeight(i, p)
        d.style.width = `${6 + 18 * w}px`
        d.style.opacity = String(0.3 + 0.7 * w)
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="dark relative bg-background [--slide-h:65vh] md:[--slide-h:100vh]"
      style={{ height: 'calc(var(--slide-h, 100vh) * 5)' }}
    >
      <div className="sticky top-nav-mobile flex h-[calc(100vh-var(--nav-height-mobile))] items-center overflow-hidden md:top-nav-desktop md:h-[calc(100vh-var(--nav-height-desktop))]">
        <PatternStrip src="/assets/images/patterns/pattern-01.png" />
        {SLIDES.map((content, i) => (
          <div
            key={i}
            ref={(el) => (slideRefs.current[i] = el)}
            className="absolute inset-0 flex items-center"
            aria-hidden={i === 0 ? 'false' : 'true'}
            style={i === 0 ? { opacity: 1, transform: 'none' } : { opacity: 0, transform: `translateY(${Y}px)` }}
          >
            <Container>
              <div className={GRID}>
                <div className="col-span-6 md:col-span-12 lg:col-span-20 lg:col-start-3 xl:col-span-18 xl:col-start-4">
                  <p className="text-balance text-center text-2xl text-strong">{content}</p>
                </div>
              </div>
            </Container>
          </div>
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex items-center justify-center gap-1.5 md:bottom-10 lg:bottom-12">
          {SLIDES.map((_, i) => (
            <span
              key={i}
              ref={(el) => (dotRefs.current[i] = el)}
              className="block size-1.5 rounded-full bg-strong"
              style={{ width: i === 0 ? 24 : 6, opacity: i === 0 ? 1 : 0.3 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
