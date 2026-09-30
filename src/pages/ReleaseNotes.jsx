import { useEffect, useRef, useState } from 'react'
import { Check, Hash } from 'lucide-react'
import DocPage from '../components/blog/DocPage.jsx'
import Prose from '../components/blog/Prose.jsx'
import { Presence } from '../components/motion.jsx'
import CTA from '../components/CTA.jsx'
import { RELEASE_NOTES } from '../data/releaseNotes.js'
import { formatDateUTC } from '../data/blog.js'

// "Copy link to this entry": hash icon swaps to a check for ~2s (scale + fade).
function CopyLink({ id }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`
    navigator.clipboard?.writeText(url).catch(() => {})
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }
  const Icon = copied ? Check : Hash
  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy link to this entry"
      title="Copy link to this entry"
      className="touch ml-2 mt-[-0.33em] inline-flex cursor-pointer items-center justify-center align-middle text-teal-9 opacity-0 transition-opacity focus:opacity-100 group-hover/heading:opacity-100"
    >
      <Presence
        key={copied ? 'check' : 'hash'}
        as="span"
        show
        initial={{ opacity: 0, transform: 'scale(0.8)' }}
        animate={{ opacity: 1, transform: 'scale(1)' }}
        duration={150}
      >
        <div className="inline-flex items-center justify-center">
          <Icon className="size-4 flex-shrink-0" />
        </div>
      </Presence>
    </button>
  )
}

function Entry({ entry }) {
  return (
    <article id={entry.id} className="group relative flex scroll-mt-16 flex-col gap-2 md:scroll-mt-24 md:flex-row md:items-start">
      <div role="presentation" aria-hidden="true" className="absolute -bottom-3 left-[3px] top-3 w-px bg-border group-last:bottom-0 max-md:hidden" />
      <div className="flex shrink-0 items-center gap-3 md:sticky md:top-24 md:w-48 md:pb-[var(--nav-height-desktop)] md:pt-0.5 xl:w-56">
        <div
          role="presentation"
          aria-hidden="true"
          className="relative z-10 size-[7px] rounded-full bg-teal-8 [box-shadow:0_0_0_4px_rgb(var(--color-background))] max-md:hidden"
        />
        <time dateTime={entry.date} className="font-medium text-strong max-md:text-teal-9">
          {formatDateUTC(entry.date)}
        </time>
      </div>
      {/* md:flex-1: the original column is shrink-to-fit but its long changelog copy always fills 648px;
          the short summaries here would not, so the column is stretched to the same width. */}
      <div className="pb-10 group-last:pb-0 md:flex-1 md:pb-16 lg:pb-20 xl:pb-24">
        <header className="group/heading relative mb-5 md:mb-6 lg:mb-8 xl:mb-10">
          <h2 className="inline text-display-xl font-bold text-strong">{entry.title}</h2>
          <CopyLink id={entry.id} />
          {entry.sub && <p className="mt-1.5 italic md:mt-2 xl:mt-3">{entry.sub}</p>}
        </header>
        <Prose>
          {entry.points && (
            <ul>
              {entry.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          )}
          {entry.text && <p>{entry.text}</p>}
          {entry.figures?.map((f) => (
            <figure key={f.src}>
              <img
                src={f.src}
                alt=""
                width={f.w}
                height={f.h}
                style={{ width: f.width, maxWidth: '100%' }}
                className="mx-auto"
                loading="lazy"
              />
              {f.caption && (
                <figcaption className="mt-2.5 text-center text-sm text-muted-foreground lg:mt-3">{f.caption}</figcaption>
              )}
            </figure>
          ))}
        </Prose>
      </div>
    </article>
  )
}

export default function ReleaseNotes() {
  return (
    <main>
      <DocPage title="Release Notes" prose={false}>
        <section>
          {RELEASE_NOTES.map((e) => (
            <Entry key={e.id} entry={e} />
          ))}
        </section>
      </DocPage>
      <CTA />
    </main>
  )
}
