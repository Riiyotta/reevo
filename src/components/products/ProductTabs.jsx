import { useLayoutEffect, useRef } from 'react'
import { Container } from '../ui.jsx'
import { EASE_STANDARD } from '../motion.jsx'
import { PRODUCT_TABS } from './data.js'

const TAB = 'flex h-[48px] flex-1 items-center justify-center rounded-t-[2px] text-sm font-medium'

// Active-tab marker: coloured 16px square with a 4px dark dot that pops in on mount
// (SSR: opacity 0 / scale .75 -> hydrated: opacity 1 / none).
function ActiveDot({ color }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    ref.current?.animate(
      [
        { opacity: 0, transform: 'scale(0.75)' },
        { opacity: 1, transform: 'none' },
      ],
      { duration: 200, easing: EASE_STANDARD },
    )
  }, [])
  return (
    <div className={`flex size-4 items-center justify-center ${color}`}>
      <div ref={ref} className="size-1 bg-gray-10" />
    </div>
  )
}

export default function ProductTabs({ active, dot }) {
  const current = PRODUCT_TABS.find((t) => t.slug === active)
  return (
    <>
      <div className="bg-background max-lg:hidden md:sticky md:top-nav-desktop md:z-40">
        <Container>
          <div className="flex gap-[2px]">
            {PRODUCT_TABS.map((t) =>
              t.slug === active ? (
                <span key={t.slug} className={`${TAB} gap-2.5 bg-gray-2 text-gray-10`}>
                  <ActiveDot color={dot} />
                  {t.label}
                </span>
              ) : (
                <a
                  key={t.slug}
                  href={`/products/${t.slug}`}
                  className={`${TAB} gap-2.5 bg-gray-3 text-gray-10/60 transition-colors duration-200 hover:bg-gray-2 hover:text-gray-10`}
                >
                  <div className="flex size-4 items-center justify-center bg-current opacity-35" />
                  {t.label}
                </a>
              ),
            )}
          </div>
        </Container>
      </div>
      <div className="lg:hidden">
        <div className={`${TAB} w-1/2 gap-2 rounded-tr bg-gray-2`}>
          <ActiveDot color={dot} />
          {current.label}
        </div>
      </div>
    </>
  )
}
