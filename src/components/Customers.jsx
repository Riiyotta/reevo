import { useEffect, useRef, useState } from 'react'
import { Heart } from 'lucide-react'
import { MediaDialog } from './dialog.jsx'
import {
  CASCA_PATHS, CASCA_VIEWBOX, InlineSvg, KHOSLA_PATHS, KHOSLA_VIEWBOX, PROPEL_PATHS, PROPEL_VIEWBOX,
} from './svgPaths.js'
import { CAROUSEL, CAROUSEL_ITEM, COL_LABEL, GRID, Headline, PlayTriangle, Section, SectionLabel } from './ui.jsx'

function PropelLogo({ className }) {
  return <InlineSvg viewBox={PROPEL_VIEWBOX} paths={PROPEL_PATHS} className={className} label="Propel" />
}

function KhoslaLogo({ className }) {
  return <InlineSvg viewBox={KHOSLA_VIEWBOX} paths={KHOSLA_PATHS} className={className} label="Khosla Ventures" />
}

function CascaLogo({ className }) {
  return <InlineSvg viewBox={CASCA_VIEWBOX} paths={CASCA_PATHS} className={className} label="Casca" />
}

const TESTIMONIALS = [
  {
    video: '/assets/videos/testimonials/tony-teaser.mp4', full: '/assets/videos/testimonials/tony-full.mp4',
    Logo: PropelLogo, logoClass: 'h-[28px] lg:h-[35px]',
    quote: 'The last piece of software we actually ever need within our go-to-market side.',
    name: 'Tony', role: 'CEO, Propel',
  },
  {
    video: '/assets/videos/testimonials/samir-teaser.mp4', full: '/assets/videos/testimonials/samir-full.mp4',
    Logo: KhoslaLogo, logoClass: 'h-[16px] lg:h-[20px]',
    quote: 'Every sales executive will be a better sales executive. They will service their customers better.',
    name: 'Samir', role: 'Managing Director, Khosla Ventures',
  },
  {
    video: '/assets/videos/testimonials/adlon-teaser.mp4', full: '/assets/videos/testimonials/adlon-full.mp4',
    Logo: CascaLogo, logoClass: 'h-[18px] lg:h-[22px]',
    quote: 'Reevo has allowed us, as a team, to focus on the human elements of sales.',
    name: 'Adlon', role: 'COO, Casca',
  },
]

const PRESS = [
  ['bloomberg', 102, 'Bloomberg', 'https://www.bloomberg.com/news/articles/2025-11-05/khosla-ventures-and-kleiner-perkins-back-ai-startup-reevo'],
  ['yahoo-finance', 121, 'Yahoo Finance', 'https://finance.yahoo.com/news/reevo-debuts-80-million-funding-171500872.html'],
  ['revenuebrew', 125, 'Revenue Brew', 'https://www.revenuebrew.com/stories/2025/11/14/reevo-launches-with-funding'],
  ['sfbt', 101, 'San Francisco Business Times', 'https://www.bizjournals.com/sanfrancisco/news/2025/11/06/sfbt-digest-thursday-pelosi-retire-doordash-elf-sf.html'],
  ['wsj', 172, 'The Wall Street Journal', 'https://venturecapital.cmail20.com/t/d-e-gjttukk-ihtrmdkuu-t/'],
]

// Original: only the last-hovered card's teaser plays (card 0 by default); the rest are paused.
function CardVideo({ src, playing }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (playing) el.play().catch(() => {})
    else el.pause()
  }, [playing])
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      className="h-full w-full object-cover brightness-[1.15] contrast-[1.15] grayscale"
    />
  )
}

function VideoDialog({ open, onClose, title, src }) {
  const closeRef = useRef(null)
  return (
    <MediaDialog
      open={open}
      onClose={onClose}
      label={title}
      closeRef={closeRef}
      className="aspect-video w-[min(90vw,1240px,calc((100vh-24px)*16/9))]"
      style={{ pointerEvents: open ? 'auto' : 'none' }}
    >
      <video src={src} autoPlay playsInline controls className="h-full w-full" style={{ objectFit: 'cover' }} />
    </MediaDialog>
  )
}

export default function Customers() {
  const [playing, setPlaying] = useState(0)
  const [dialog, setDialog] = useState(null)
  const closeDialog = () => setDialog(null)
  const lastRef = useRef(null) // keep the last video mounted while the dialog exits
  if (dialog) lastRef.current = dialog
  const active = TESTIMONIALS.find((t) => t.name === lastRef.current)

  return (
    <Section id="customers" className="bg-gray-3" pattern="/assets/images/patterns/pattern-05.png">
      <SectionLabel icon={Heart}>Customers love Reevo</SectionLabel>
      <Headline>
        Teams that switched to Reevo <strong className="font-bold">sell more and type less.</strong>
      </Headline>
      <div className={GRID}>
        <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-22 xl:col-start-2">
          <ul className={CAROUSEL}>
            {TESTIMONIALS.map(({ video, Logo, logoClass, quote, name, role }, idx) => (
              <li key={name} className={CAROUSEL_ITEM}>
                <div onMouseEnter={() => setPlaying(idx)} className="flex min-h-[440px] w-[75vw] min-w-0 flex-col bg-white sm:min-h-[404px] sm:w-[55vw] md:h-full md:min-h-[440px] md:w-full xl:min-h-[470px]">
                  <button
                    type="button"
                    aria-label={`Play ${name} testimonial`}
                    aria-haspopup="dialog"
                    aria-expanded={dialog === name}
                    onClick={() => setDialog(name)}
                    className="group relative block aspect-video w-full overflow-hidden"
                  >
                    <CardVideo src={video} playing={playing === idx} />
                    <span className="absolute left-8 top-8 text-white">
                      <Logo className={`w-auto ${logoClass}`} />
                    </span>
                    <span className="absolute bottom-0 left-0 right-0 flex items-center justify-end p-8">
                      <span className="flex aspect-[132/96] h-9 items-center justify-center bg-black/50 text-white transition-opacity duration-200 group-hover:opacity-80">
                        <PlayTriangle className="h-auto w-[18%]" />
                      </span>
                    </span>
                  </button>
                  <div className="flex-1 p-8">
                    <p className="relative text-display-lg font-bold text-strong">
                      <span className="absolute -translate-x-full">“</span>
                      {quote.replace(/ (\S+)$/, '\u00a0$1')}”
                    </p>
                  </div>
                  <p className="p-8 font-mono text-display-xs uppercase text-strong">
                    {name}
                    <br />
                    <span className="opacity-80">{role}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={GRID}>
        <div className={`${COL_LABEL} flex flex-col items-center gap-5 lg:flex-row lg:justify-center lg:gap-12 xl:gap-14`}>
          <span className="font-mono text-display-xs uppercase text-strong">As seen on</span>
          <div className="flex flex-wrap items-center justify-center gap-5 [--logo-scale:.85] sm:gap-6 md:gap-8 md:[--logo-scale:1] xl:gap-10">
            {PRESS.map(([file, w, alt, href]) => (
              <a key={file} href={href} target="_blank" rel="noopener noreferrer">
                <img src={`/assets/${file}.svg`} alt={alt} className="h-auto max-w-none" style={{ width: `calc(${w}px * var(--logo-scale))` }} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <VideoDialog open={!!dialog} onClose={closeDialog} title={`${active?.name ?? ''} - Testimonial Video`} src={active?.full} />
    </Section>
  )
}
