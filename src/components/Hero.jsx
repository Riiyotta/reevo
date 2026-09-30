import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Youtube } from 'lucide-react'
import { Button, Container, GRID, PlayTriangle, Tag } from './ui.jsx'
import { EASE_OUT, Presence } from './motion.jsx'

function PreviewVideo() {
  const ref = useRef(null)
  // Original has no autoplay attr but ReactPlayer plays it muted on mount.
  useEffect(() => {
    ref.current?.play().catch(() => {})
  }, [])
  return (
    <video
      ref={ref}
      src="/assets/videos/promo-teaser.mp4"
      poster="/assets/images/home/promo-teaser-poster.jpg"
      muted
      loop
      playsInline
      preload="metadata"
      className="block h-full w-full object-cover"
    />
  )
}

export default function Hero() {
  const [started, setStarted] = useState(false)

  // Original VideoPlayer: teaser plays muted/looped (with poster); clicking play swaps in the full video
  // (playing, unmuted, controls, no loop) and the overlay exits via motion.div exit {opacity:0} over 0.3s
  // with framer's default tween ease "easeOut" = cubic-bezier(0,0,.58,1) (fitted on reevo.ai).
  const handlePlay = () => setStarted(true)

  return (
    <header className="pt-10 text-center md:pt-12 xl:pt-14">
      <Container>
        <div className="mb-5 flex justify-center sm:mb-6 lg:mb-8">
          <Tag>The AI-native sales platform</Tag>
        </div>
        <div className={`${GRID} gap-y-6`}>
          <h1 className="col-span-6 font-heading text-display-3xl font-black uppercase text-strong md:col-span-12 lg:col-span-22 lg:col-start-2">
            Your sales tools are guessing. Reevo actually knows.
          </h1>
          <h2 className="col-span-6 text-balance text-display-lg-2 font-bold text-strong md:col-span-8 md:col-start-3 lg:col-span-16 lg:col-start-5 xl:col-span-14 xl:col-start-6">
            Reevo runs your whole sales motion on everything your team knows. It learns from every deal – so every rep
            closes like your best one.
          </h2>
          <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-12 xl:col-start-7">
            <div className="mx-auto flex flex-col gap-2 sm:max-w-[400px] sm:flex-row md:pt-2">
              <Button href="/get-started" variant="primary" icon={ChevronRight} className="sm:flex-1">
                Get started
              </Button>
              <Button href="/product-tour" variant="outline" icon={Youtube} className="sm:flex-1">
                See Reevo
              </Button>
            </div>
          </div>
          <div className="col-span-6 max-md:row-start-2 md:col-span-12 md:pt-6 lg:col-span-24">
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-10">
              {started ? (
                <video
                  key="full"
                  src="/assets/videos/promo-full.mp4"
                  autoPlay
                  playsInline
                  controls
                  className="block h-full w-full object-cover"
                />
              ) : (
                <PreviewVideo />
              )}
              <Presence
                show={!started}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                duration={300}
                easing={EASE_OUT}
                className="absolute inset-0 flex items-center justify-center"
              >
                <button
                  type="button"
                  onClick={handlePlay}
                  aria-label="Play video"
                  className="flex aspect-[132/96] w-[15%] cursor-pointer items-center justify-center bg-gray-10 text-white transition-opacity duration-200 hover:opacity-80 lg:w-[10%]"
                >
                  <PlayTriangle className="h-auto w-[18%]" />
                </button>
              </Presence>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
