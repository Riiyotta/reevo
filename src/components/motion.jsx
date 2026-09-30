import { useLayoutEffect, useRef, useState } from 'react'

// Minimal framer-motion-style presence built on WAAPI, matching the original's
// motion.div + AnimatePresence behaviour: enter from `initial`, animate to `animate`,
// exit back to `exit`, then unmount. Interruptions retarget from the current
// computed value with the full duration (as framer-motion does).
// Values measured on reevo.ai: nav/dialog/accordion all use 200ms cubic-bezier(.4,0,.2,1).
export const EASE_STANDARD = 'cubic-bezier(.4,0,.2,1)' // framer ease [.4,0,.2,1]
export const EASE_OUT = 'cubic-bezier(0,0,.58,1)' // framer "easeOut" (default tween ease)

const resolve = (el, frame) => (frame.height === 'auto' ? { ...frame, height: `${el.scrollHeight}px` } : frame)

function readCurrent(el, keys) {
  const cs = getComputedStyle(el)
  const out = {}
  for (const k of keys) out[k] = k === 'height' ? `${el.getBoundingClientRect().height}px` : cs[k]
  return out
}

export function Presence({
  show,
  initial,
  animate,
  exit = initial,
  duration = 200,
  easing = EASE_STANDARD,
  as: Tag = 'div',
  ...rest
}) {
  const [mounted, setMounted] = useState(show)
  const ref = useRef(null)
  const anim = useRef(null)
  if (show && !mounted) setMounted(true)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const target = show ? animate : exit
    const keys = Object.keys(target)
    const from = !anim.current && show ? resolve(el, initial) : readCurrent(el, keys)
    anim.current?.cancel()
    const a = el.animate([from, resolve(el, target)], { duration, easing, fill: 'forwards' })
    anim.current = a
    a.onfinish = () => {
      if (anim.current !== a) return
      Object.assign(el.style, target)
      a.cancel()
      if (!show) {
        anim.current = null
        setMounted(false)
      }
    }
  }, [show, mounted]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!mounted) return null
  return <Tag ref={ref} {...rest} />
}

// framer-style easeOutCubic, fitted to the original's accordion opacity samples
export const EASE_OUT_CUBIC = 'cubic-bezier(.33,1,.68,1)'

// Height + opacity collapse (Radix Accordion.Content driven by motion on the original).
// Initially-open content renders without animating; later toggles animate from the
// current computed value so interruptions retarget smoothly.
export function Collapse({ open, duration = 200, easing = EASE_STANDARD, className = '', children, ...rest }) {
  const [mounted, setMounted] = useState(open)
  const ref = useRef(null)
  const anim = useRef(null)
  const first = useRef(true)
  if (open && !mounted) setMounted(true)

  useLayoutEffect(() => {
    const el = ref.current
    const isFirst = first.current
    first.current = false
    if (!el || isFirst) return
    const inFlight = !!anim.current
    const fromH = inFlight || !open ? el.getBoundingClientRect().height : 0
    const fromO = inFlight ? +getComputedStyle(el).opacity : open ? 0 : 1
    anim.current?.cancel()
    const a = el.animate(
      [
        { height: `${fromH}px`, opacity: fromO },
        { height: `${open ? el.scrollHeight : 0}px`, opacity: open ? 1 : 0 },
      ],
      { duration, easing, fill: open ? 'none' : 'forwards' },
    )
    anim.current = a
    a.onfinish = () => {
      if (anim.current !== a) return
      anim.current = null
      if (!open) setMounted(false)
    }
  }, [open, mounted]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!mounted) return null
  return (
    <div ref={ref} role="region" data-state={open ? 'open' : 'closed'} className={`overflow-hidden ${className}`} {...rest}>
      {children}
    </div>
  )
}
