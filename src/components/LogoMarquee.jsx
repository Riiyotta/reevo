import { useLayoutEffect, useRef } from 'react'
import { Container, GRID } from './ui.jsx'
import { EASE_OUT } from './motion.jsx'

// react-fast-marquee on the original: speed 30 (px/s), direction left, pauseOnHover (which also pauses on click),
// autoFill. rfm sets animation-duration = trackWidth / speed, so it is recomputed on resize.
const SPEED = 30

// Rendered widths at 1440 (CLONE_ASSETS.md A); scaled by --logo-scale (.85 below md)
const LOGOS = [
  ['casca', 98],
  ['propel', 114],
  ['nclarity', 82],
  ['snap', 90],
  ['coreranger', 133],
  ['codecargo', 120],
  ['wallaroo', 130],
  ['genefab', 132],
  ['pgl', 80],
]

function Track({ hidden, trackRef }) {
  return (
    <div ref={trackRef} className="marquee-track flex min-w-full flex-none animate-marquee items-center" aria-hidden={hidden || undefined}>
      {LOGOS.map(([name, w]) => (
        <div key={name} className="mx-5 md:mx-6 xl:mx-8">
          <img
            src={`/assets/${name}.svg`}
            alt={hidden ? '' : name}
            className="h-auto max-w-none"
            style={{ width: `calc(${w}px * var(--logo-scale))` }}
          />
        </div>
      ))}
    </div>
  )
}

export default function LogoMarquee() {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return
    // Original wraps the marquee in motion.div initial {opacity:0} animate {opacity:1} transition {duration:.7}
    // (framer default tween ease "easeOut"), started once mounted on the client.
    wrap.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 700, easing: EASE_OUT })
    const setDuration = () => {
      const d = `${track.getBoundingClientRect().width / SPEED}s`
      wrap.querySelectorAll('.marquee-track').forEach((t) => (t.style.animationDuration = d))
    }
    setDuration()
    const ro = new ResizeObserver(setDuration)
    ro.observe(track)
    return () => ro.disconnect()
  }, [])

  return (
    <section className="py-10 text-center md:py-12 xl:py-14">
      <Container>
        <div className={GRID}>
          <div className="col-span-6 md:col-span-12 lg:col-span-22 lg:col-start-2">
            <p className="mb-5 text-balance text-xs md:mb-4 lg:mb-5 xl:mb-6">One platform for your whole sales motion</p>
            <div className="mask-x-from-90 min-h-[35px] [--logo-scale:.85] md:[--logo-scale:1]">
              <div ref={wrapRef} className="marquee flex overflow-x-hidden">
                <Track trackRef={trackRef} />
                <Track hidden />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
