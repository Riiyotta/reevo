import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronRight, Mail } from 'lucide-react'
import { AUTHORS } from '../../data/blog.js'
import { Presence } from '../motion.jsx'
import { buttonClass } from '../ui.jsx'

const SITE = 'https://reevo.ai'

export function AuthorMeta({ post, dateText, className = '' }) {
  const url = encodeURIComponent(`${SITE}/blog/${post.slug}`)
  const title = encodeURIComponent(post.title)
  const summary = encodeURIComponent(post.excerpt)
  const body = encodeURIComponent(`Check out this article: ${post.title}\n\n${post.excerpt}\n\nRead more at: ${SITE}/blog/${post.slug}`)
  const share = 'flex size-8 items-center justify-center bg-blue-2 text-strong'
  return (
    <div className={`flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:gap-8 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="relative aspect-square size-10 flex-shrink-0 overflow-hidden lg:size-12">
          <img
            alt={`${post.author} portrait`}
            src={AUTHORS[post.author]}
            width="96"
            height="96"
            loading="lazy"
            decoding="async"
            className="absolute left-0 top-0 h-full w-full object-cover"
            style={{ color: 'transparent' }}
          />
        </div>
        <div className="space-y-0.5">
          <p className="block font-mono text-display-xs uppercase text-strong">{post.author}</p>
          <p className="block font-mono text-display-xs uppercase text-strong opacity-80">{dateText}</p>
        </div>
      </div>
      <div className="flex gap-1">
        <a href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`} target="_blank" rel="noreferrer" className={share}>
          <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none">
            <path
              fill="currentColor"
              d="M11.45 2h1.84L9.27 6.66 14 13h-3.703l-2.9-3.846L4.078 13H2.237l4.3-4.984L2 2h3.797L8.42 5.515 11.45 2Zm-.645 9.883h1.02L5.242 3.058H4.15l6.656 8.825Z"
            />
          </svg>
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`}
          target="_blank"
          rel="noreferrer"
          className={share}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none">
            <path
              fill="currentColor"
              d="M4.73 14V5.903H2.152V14H4.73ZM3.44 4.797c.899 0 1.458-.62 1.458-1.398C4.883 2.604 4.341 2 3.46 2 2.576 2 2 2.605 2 3.399c0 .777.56 1.398 1.424 1.398h.018ZM8.71 14V9.478c0-.242.018-.484.086-.657.186-.483.61-.983 1.323-.983.932 0 1.305.741 1.305 1.83V14H14V9.356c0-2.488-1.27-3.644-2.967-3.644-1.367 0-1.98.784-2.324 1.337v.028h-.017l.017-.028V5.903H6.133c.033.76 0 8.097 0 8.097H8.71Z"
            />
          </svg>
        </a>
        <a href={`mailto:?subject=${title}&body=${body}`} target="_blank" rel="noreferrer" className={share}>
          <div className="inline-flex items-center justify-center">
            <Mail className="size-4 flex-shrink-0" />
          </div>
        </a>
      </div>
    </div>
  )
}

export function KeyTakeaways({ items }) {
  if (!items.length) return null
  return (
    <div>
      <p className="mb-3 block text-display-lg font-bold text-strong">Key takeaways</p>
      <ul className="relative space-y-1.5">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-1 text-sm">
            <div className="inline-flex items-center justify-center">
              <ChevronRight className="mt-0.5 size-4 flex-shrink-0 shrink-0 text-blue-8" />
            </div>
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Active heading = last h2 whose top has crossed ~205px from the viewport top
// (measured on the original: 210px -> previous item, 200px -> this item).
const ACTIVE_OFFSET = 205

// maxHeight: the original uses max-h-[188px] when Key takeaways are shown, max-h-[252px] otherwise.
export function TableOfContents({ headings, maxHeight = 188 }) {
  const [active, setActive] = useState(-1)
  const [fade, setFade] = useState({ top: false, bottom: false })
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      let idx = -1
      headings.forEach((h, i) => {
        const el = document.getElementById(h.id)
        if (el && el.getBoundingClientRect().top < ACTIVE_OFFSET) idx = i
      })
      setActive(idx)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [headings])

  const updateFade = () => {
    const n = navRef.current
    if (!n) return
    setFade({ top: n.scrollTop > 0, bottom: n.scrollTop + n.clientHeight < n.scrollHeight - 1 })
  }
  useLayoutEffect(updateFade, [headings])

  return (
    <div>
      <p className="mb-3 block text-display-lg font-bold text-strong">On this page</p>
      <div className="relative">
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-background to-transparent transition-opacity duration-200 ${
            fade.top ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div>
          <nav ref={navRef} onScroll={updateFade} className={`-ml-3.5 space-y-1.5 overflow-y-auto py-1 pl-3.5 ${maxHeight === 188 ? 'max-h-[188px]' : 'max-h-[252px]'}`}>
            {headings.map((h, i) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                className={`relative block text-sm transition-colors hover:text-strong ${i === active ? 'text-strong' : ''}`}
              >
                <Presence
                  show={i === active}
                  initial={{ transform: 'translateY(-50%) scale(0)' }}
                  animate={{ transform: 'translateY(-50%) scale(1)' }}
                  duration={400}
                  easing="cubic-bezier(.22,1,.36,1)"
                  className="absolute -left-3 top-2.5"
                  style={{ transform: 'translateY(-50%)' }}
                >
                  <span className="block size-[5px] rounded-full bg-blue-8" />
                </Presence>
                {h.text}
              </a>
            ))}
          </nav>
        </div>
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-background to-transparent transition-opacity duration-200 ${
            fade.bottom ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  )
}

export function NewsletterBox() {
  return (
    <div className="rounded bg-blue-2 p-6 sm:p-8">
      <p className="mb-3 block text-display-lg font-bold text-strong md:mb-4 xl:mb-5">Get our newsletter, The GTM Source</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex gap-2">
          <input
            type="email"
            name="email"
            placeholder="Enter your work email"
            className="flex h-button w-full min-w-0 rounded-lg border border-transparent bg-background px-4 py-2 text-sm text-foreground outline-none ring-0 placeholder:text-muted-foreground focus-visible:border-strong focus-visible:bg-background"
          />
          <button type="submit" className={buttonClass({ variant: 'outline', size: 'lg', className: 'shrink-0' })}>
            Subscribe
          </button>
        </div>
      </form>
    </div>
  )
}
