import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronRight, ListChecks, NotebookPen, QrCode, Send, Sparkles, Youtube } from 'lucide-react'
import { Button, Container, GRID, Tag, buttonClass, STACK } from '../ui.jsx'
import { Collapse, Presence } from '../motion.jsx'
import FaqSection from '../faq.jsx'
import { CardDialog, useModal } from '../dialog.jsx'
import { NBSP as NB } from '../text.js'
import Prose from './Prose.jsx'
import qrSvg from './qr.svg?raw'

// /apps/mobile sections. Measured on reevo.ai/apps/mobile (1440 / 390), 2026-09-29.
const IMG = '/assets/images/surfaces/mobile'

/* ------------------------------------------------------------------ */
/* Download dialog (Radix Dialog on the original; opens without animation) */

function DownloadDialog({ open, onClose }) {
  useModal(open, onClose)
  if (!open) return null
  return (
    <CardDialog onClose={onClose} labelledBy="download-dialog-title" panelClassName="!max-w-[440px]">
      <div className="space-y-4 md:space-y-5">
        <div className="space-y-2">
          <h2 id="download-dialog-title" className="block text-display-lg font-bold text-strong">
            Scan to install Reevo
          </h2>
          <p className="text-sm">
            Point your phone’s camera at the code. It opens the App Store or Google Play depending on your{NB}device.
          </p>
        </div>
        <div className="flex justify-center py-2">
          <div className="rounded border border-border bg-white p-4" dangerouslySetInnerHTML={{ __html: qrSvg }} />
        </div>
        <div className="space-y-4 text-center">
          <p className="text-sm">or search ReevoAI in your app store</p>
          <div className="flex items-center justify-center gap-2">
            <a
              href="https://apps.apple.com/us/app/reevoai/id6759569888?ct=web_desktop_badge_qr_dialog&mt=8"
              target="_blank"
              rel="noreferrer"
              className="inline-flex transition-opacity duration-200 hover:opacity-80"
            >
              <img src={`${IMG}/app-store.svg`} alt="Download Reevo on the App Store" width="120" height="40" className="h-10 w-auto" style={{ color: 'transparent' }} />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=ai.reevo.mobile&referrer=utm_source%3Dreevo_web%26utm_medium%3Ddesktop_badge%26utm_campaign%3Dmobile_app_page%26utm_content%3Dqr_dialog"
              target="_blank"
              rel="noreferrer"
              className="inline-flex transition-opacity duration-200 hover:opacity-80"
            >
              <img src={`${IMG}/google-play.svg`} alt="Get Reevo on Google Play" width="120" height="40" className="h-10 w-auto" style={{ color: 'transparent' }} />
            </a>
          </div>
        </div>
      </div>
    </CardDialog>
  )
}

/* ------------------------------------------------------------------ */
/* Hero notification stack                                             */

const NOTES = [
  { icon: Sparkles, chip: 'bg-pink-2 text-pink-13', title: 'Ask Reevo', body: 'Which one of my prospects, accounts, and customers will be attending the Connect Expo 2026?' },
  { icon: NotebookPen, chip: 'bg-blue-2 text-blue-13', title: 'Meeting prep ready', body: 'Acme QBR · 3 talking points, 2 open risks' },
  { icon: Send, chip: 'bg-green-2 text-green-13', title: 'Follow-up drafted', body: 'Recap + next steps ready for Jordan Lee' },
  { icon: ListChecks, chip: 'bg-orange-2 text-orange-13', title: 'Task created', body: 'Send pricing to Acme — due Friday' },
]
// Newest card is opaque, older ones step down (measured 1 / .7 / .45).
const OPACITY = [1, 0.7, 0.45]
const CYCLE = 2600 // measured: one card arrives every 2.6s; once 3 are shown the oldest leaves
const MOVE = { duration: 400, easing: 'cubic-bezier(.4,0,.2,1)' }

function Notification({ note }) {
  const Icon = note.icon
  return (
    <div className="flex items-start gap-2 rounded bg-white p-3 shadow-diffused md:gap-3 md:p-3.5">
      <span className={`flex size-7 shrink-0 items-center justify-center rounded md:size-8 ${note.chip}`}>
        <div className="inline-flex items-center justify-center">
          <Icon className="size-4 w-[75%] flex-shrink-0" />
        </div>
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-strong">{note.title}</p>
        <p className="text-pretty text-xs text-foreground max-md:line-clamp-1 md:mt-0.5">{note.body}</p>
      </div>
    </div>
  )
}

function NotificationStack() {
  // items: { key, n (note index), exiting }
  const [items, setItems] = useState([{ key: 0, n: 0 }])
  const nodes = useRef(new Map())
  const rects = useRef(new Map())
  const counter = useRef(1)

  useEffect(() => {
    const add = () => {
      nodes.current.forEach((el, k) => rects.current.set(k, el.getBoundingClientRect().top))
      setItems((prev) => {
        const live = prev.filter((i) => !i.exiting)
        const next = [...prev.map((i) => (live.length >= 3 && i === live[0] ? { ...i, exiting: true } : i))]
        const n = (live[live.length - 1].n + 1) % NOTES.length
        next.push({ key: counter.current++, n, entering: true })
        return next
      })
    }
    const interval = setInterval(add, CYCLE)
    return () => clearInterval(interval)
  }, [])

  // FLIP existing cards; animate entering/exiting ones.
  useLayoutEffect(() => {
    nodes.current.forEach((el, k) => {
      const item = items.find((i) => i.key === k)
      if (!item) return
      const before = rects.current.get(k)
      if (item.entering && !el.dataset.entered) {
        el.dataset.entered = '1'
        el.animate([{ transform: 'translateY(28px) scale(0.96)' }, { transform: 'none' }], MOVE)
      } else if (before !== undefined) {
        const dy = before - el.getBoundingClientRect().top
        if (Math.abs(dy) > 0.5) {
          el.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], { ...MOVE, composite: 'add' })
        }
      }
      if (item.exiting && !el.dataset.exiting) {
        el.dataset.exiting = '1'
        const a = el.animate([{ scale: 1, opacity: 0.45 }, { scale: 0.95, opacity: 0 }], {
          duration: 180,
          easing: 'cubic-bezier(0,0,.58,1)',
          fill: 'forwards',
        })
        a.onfinish = () => setItems((prev) => prev.filter((i) => i.key !== k))
      }
    })
    rects.current.clear()
    // Flip freshly mounted cards from opacity 0 to their rank opacity (CSS transition below).
    if (items.some((i) => i.entering)) {
      const raf = requestAnimationFrame(() =>
        setItems((prev) => prev.map((i) => (i.entering ? { ...i, entering: false } : i))),
      )
      return () => cancelAnimationFrame(raf)
    }
  }, [items])

  const live = items.filter((i) => !i.exiting)
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-3 left-3 right-3 flex max-w-[400px] flex-col justify-end gap-2 md:bottom-5 md:left-5 md:right-5"
    >
      {items.map((item) => {
        const rank = live.length - 1 - live.indexOf(item)
        const opacity = item.exiting ? undefined : OPACITY[rank] ?? 0
        return (
          <div
            key={item.key}
            ref={(el) => (el ? nodes.current.set(item.key, el) : nodes.current.delete(item.key))}
            style={{
              opacity: item.entering ? 0 : opacity,
              transition: 'opacity 250ms cubic-bezier(0,0,.58,1)',
              backfaceVisibility: 'hidden',
            }}
          >
            <Notification note={NOTES[item.n]} />
          </div>
        )
      })}
    </div>
  )
}

export function MobileHero() {
  const [open, setOpen] = useState(false)
  return (
    <header className="py-10 md:py-12 xl:py-14">
      <Container>
        <div className={`${GRID} items-start gap-y-10`}>
          <div className="col-span-6 md:col-span-5 lg:col-span-9 xl:col-span-8 xl:col-start-2">
            <Tag>Reevo mobile CRM app</Tag>
            <h1 className="mt-4 block text-balance font-heading text-display-2xl font-extrabold uppercase text-strong md:mt-5">
              Deals don’t wait at a desk. <span className="text-pink-11">Close them faster on the{NB}go.</span>
            </h1>
            <p className="mt-3 text-lg text-strong md:mt-4">
              <strong className="font-semibold">
                Record conversations, ask about any account, and update a deal in booths, lobbies, and restaurants.
              </strong>{' '}
              Your team sees it land and can act on it before you're back at your{NB}desk.
            </p>
            <div className="mt-6 grid w-full max-w-[400px] grid-cols-1 gap-2 sm:grid-cols-2 md:mt-8 md:pt-2 xl:mt-10">
              <Button href="/get-started" variant="primary" icon={ChevronRight} className="w-full">
                Talk to sales
              </Button>
              <div className="w-full space-y-3">
                <Button variant="outline" icon={QrCode} className="w-full" aria-haspopup="dialog" onClick={() => setOpen(true)}>
                  Download now
                </Button>
              </div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-7 md:col-start-6 lg:col-span-14 lg:col-start-11 xl:col-span-14 xl:col-start-11">
            <div className="relative aspect-square w-full overflow-hidden rounded">
              <img
                alt=""
                src={`${IMG}/conference.jpg`}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ color: 'transparent' }}
              />
              <NotificationStack />
            </div>
          </div>
        </div>
      </Container>
      <DownloadDialog open={open} onClose={() => setOpen(false)} />
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* Feature sections: auto-advancing single accordion + crossfading image */

const ADVANCE_MS = 5000 // measured: next item opens every 5s while the section is in view

function FeatureImage({ items, active }) {
  // Old image leaves after ~200ms, new one fades in over ~250ms (measured).
  const [shown, setShown] = useState(active)
  useEffect(() => {
    if (active === shown) return
    const t = setTimeout(() => setShown(active), 200)
    return () => clearTimeout(t)
  }, [active, shown])
  const it = items[shown]
  return (
    <div className="relative aspect-square overflow-hidden [&>*]:inset-0 [&>*]:h-full [&>*]:w-full">
      <Presence
        key={shown}
        show
        initial={{ opacity: shown === 0 && active === 0 ? 1 : 0 }}
        animate={{ opacity: 1 }}
        duration={250}
        className="absolute inset-0"
      >
        <img
          alt={it.alt}
          src={`${IMG}/${it.img}`}
          width="1200"
          height="1200"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          style={{ color: 'transparent' }}
        />
      </Presence>
    </div>
  )
}

export function FeatureSection({ first = false, imageRight = false, title, lede, items }) {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), ADVANCE_MS)
    return () => clearTimeout(t)
  }, [inView, active, items.length])

  const textCol = imageRight
    ? 'col-span-6 md:col-span-6 lg:col-span-10 lg:col-start-1 xl:col-span-8 xl:col-start-2'
    : 'col-span-6 md:col-span-6 lg:col-span-10 lg:col-start-14 xl:col-span-8 xl:col-start-15'
  const imgCol = imageRight
    ? 'col-span-6 md:col-span-6 md:col-start-7 md:row-start-1 md:row-end-3 lg:col-span-12 lg:col-start-13 xl:col-span-13 xl:col-start-12'
    : 'col-span-6 md:col-span-6 md:col-start-1 md:row-start-1 md:row-end-3 lg:col-span-12 lg:col-start-1 xl:col-span-13 xl:col-start-1'
  const accCol = imageRight
    ? 'col-span-6 md:col-span-6 lg:col-span-10 lg:col-start-1 xl:col-span-8 xl:col-start-2'
    : 'col-span-6 md:col-span-6 lg:col-span-10 lg:col-start-14 xl:col-span-8 xl:col-start-15'

  return (
    <section ref={ref} className={`relative bg-background py-16 md:py-24 lg:py-32 ${first ? 'border-t border-border' : '!pt-0'}`}>
      <div>
        <Container>
          <div className={`${GRID} md:grid-rows-1`}>
            <div className={textCol}>
              <h2 className="mb-3 block font-heading text-display-2xl font-extrabold uppercase text-strong md:mb-4 lg:mb-5 xl:mb-6">
                {title}
              </h2>
              <p className="mb-2 text-lg text-foreground sm:mb-4 md:mb-0">{lede}</p>
            </div>
            <div className={imgCol}>
              <FeatureImage items={items} active={active} />
            </div>
            <div className={accCol}>
              <div className="pt-2 sm:pt-4 md:pt-0">
                <div className="w-full lg:pb-6" data-orientation="vertical">
                  {items.map((it, i) => {
                    const open = i === active
                    return (
                      <div
                        key={it.title}
                        data-state={open ? 'open' : 'closed'}
                        className={`border-l py-1 ${open ? 'border-l-strong' : 'border-border'}`}
                      >
                        <h3 className="flex">
                          <button
                            type="button"
                            aria-expanded={open}
                            aria-disabled={open}
                            onClick={() => setActive(i)}
                            className={`flex flex-1 cursor-pointer items-center gap-4 px-4 py-3 text-left font-bold text-strong ${open ? '' : 'opacity-60'}`}
                          >
                            {it.title}
                          </button>
                        </h3>
                        <Collapse open={open} className="px-4 text-foreground">
                          <div className="pb-3">{it.body}</div>
                        </Collapse>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Dark "one event" timeline                                            */

const TIMELINE = [
  { time: '8:52 AM', where: 'in the badge line', body: `You pull briefs on the three accounts you are meeting today. Last touch, open action items, what you committed to last${NB}time.` },
  { time: '11:20 AM', where: 'at the booth', body: `One tap records the conversation. Your camera turns their badge into a contact. Neither one takes you out of the${NB}conversation.` },
  { time: '4:45 PM', where: 'before the last session', body: `The summaries are already on the record. You create the opportunities, run your team's follow-up skill, and send the emails without opening a${NB}laptop.` },
]
const TICK = 'bg-strong h-px w-6 md:h-10 md:w-px'
const TICKS = [
  `${TICK} opacity-20 max-md:opacity-100`,
  ...Array(5).fill(`${TICK} opacity-20 max-md:w-3`),
  ...Array(6).fill(`${TICK} opacity-20 max-md:hidden`),
  `${TICK} opacity-0`,
]

export function EventTimeline() {
  return (
    <section className="dark min-h-[60vh] bg-background py-16 md:py-24 lg:py-32">
      <Container>
        <div className={STACK}>
          <div className={GRID}>
            <div className="col-span-6 md:col-span-7 lg:col-span-12 xl:col-start-2">
              <h2 className="block font-heading text-display-2xl font-extrabold uppercase text-strong">
                One Event. Every Conversation On the{NB}Record.
              </h2>
            </div>
            <div className="col-span-6 md:col-span-5 lg:col-span-9 lg:col-start-15 xl:col-span-8 xl:col-start-16">
              <p className="text-lg text-foreground">
                A dozen conversations in a day, and every one of them is on the record before you fly{NB}home.
              </p>
            </div>
          </div>
          <div className={GRID}>
            <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-22 xl:col-start-2">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {TIMELINE.map((t) => (
                  <div
                    key={t.time}
                    className="group flex h-[148px] border-strong max-md:gap-4 sm:h-[132px] md:h-auto md:flex-col-reverse md:justify-between md:border-l md:pl-6"
                  >
                    <div
                      className="relative flex flex-col justify-between max-md:-mb-2.5 max-md:mt-2.5 md:mt-16 md:flex-row lg:mt-20 xl:mt-24"
                      aria-hidden="true"
                    >
                      {TICKS.map((c, i) => (
                        <div key={i} className={c} />
                      ))}
                    </div>
                    <div className="pr-5 max-md:pb-8 lg:pr-6 xl:pr-8">
                      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                        <span className="font-semibold text-strong">{t.time}</span>
                        <span className="text-sm text-muted-foreground">{t.where}</span>
                      </div>
                      <p className="mt-3 text-foreground md:max-w-[34ch]">{t.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Taxi photo over dark band + pattern                                 */

export function TaxiBand() {
  return (
    <div className="relative mb-0 bg-gray-10">
      <div role="presentation" aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-16 bg-background md:h-24 lg:h-32" />
      <Container>
        <div className={GRID}>
          <div className="relative z-20 col-start-1 col-end-7 row-start-1 md:col-end-12 lg:col-start-1 lg:col-end-[23] xl:col-start-2 xl:col-end-[23]">
            <div className="-ml-6 mb-16 sm:-ml-8 md:mb-24 md:ml-0 lg:mb-32">
              <div className="relative aspect-[1221/641] overflow-hidden">
                <img
                  alt=""
                  src={`${IMG}/taxi.jpg`}
                  width="1221"
                  height="641"
                  loading="lazy"
                  decoding="async"
                  className="absolute left-0 top-0 h-full w-full object-cover"
                  style={{ color: 'transparent' }}
                />
              </div>
            </div>
          </div>
          <div className="relative z-10 col-start-2 col-end-7 row-start-1 md:col-start-6 md:col-end-13 lg:col-start-10 lg:col-end-[25] xl:col-start-11">
            <div className="-mr-6 flex h-full sm:-mr-8 md:mr-0">
              <div className="relative h-full w-full">
                <img
                  alt=""
                  src={`${IMG}/pattern.png`}
                  width="700"
                  height="700"
                  loading="lazy"
                  decoding="async"
                  className="absolute left-0 top-0 h-full w-full object-cover"
                  style={{ color: 'transparent' }}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */

const FAQ = [
  [
    `Does Reevo have a mobile CRM app for iPhone and${NB}Android?`,
    <>
      Yes. Reevo has a native mobile CRM app for iPhone and Android. It gives sales reps access to their accounts, contacts,
      opportunities, meetings, and <a href="/products/foundation">Ask Reevo</a> using the same data and context available in the
      web app.
    </>,
  ],
  [
    `What can Ask Reevo do on${NB}mobile?`,
    <>
      <a href="/products/foundation">Ask Reevo</a> uses the same CRM and conversation context on mobile as it does on the web.
      Reps can talk or type to ask what changed on an account, identify stakeholders, review previous commitments, prepare for
      meetings, @mention a specific record, and run saved skills with a slash command.
    </>,
  ],
  [
    `Can I record a sales meeting on my phone without a${NB}bot?`,
    <>
      Yes. One tap starts recording an in-person meeting or call with <a href="/products/sell">live transcription</a>. No bot
      invitation or meeting link is required. When the conversation ends, the transcript and summary sync to the relevant CRM
      record.
    </>,
  ],
  [
    `Can Reevo turn a business card or conference badge into a${NB}contact?`,
    <>
      Yes. Point your phone’s camera at a business card or conference badge, and Reevo reads the details,{' '}
      <a href="/products/find">creates the contact</a>, and associates it with the appropriate account. The information makes it
      into the CRM while the conversation is still fresh.
    </>,
  ],
  [
    `Can I create and update CRM records from my${NB}phone?`,
    <>
      Yes. Reps can create accounts, contacts, and opportunities, log next steps, and{' '}
      <a href="/products/manage">update deal information</a> directly from the mobile app. Those changes sync to the same CRM
      records the rest of the team uses.
    </>,
  ],
  [
    `Can I send sales follow-ups from the Reevo mobile${NB}app?`,
    <>
      Yes. Reevo can <a href="/products/connect">draft a follow-up</a> using what was actually said during the conversation.
      Reps can review and send it from their inbox while the meeting is still fresh, with the activity and next steps attached to
      the record.
    </>,
  ],
  [
    `Is the Reevo mobile app included in my${NB}plan?`,
    <>
      Yes. The mobile app is included with a <a href="/pricing">Reevo account</a> at no extra cost. Sign in with the same
      credentials you use for the web app, and your CRM records and conversation context are already there.
    </>,
  ],
]

export function MobileFaq() {
  return <FaqSection single items={FAQ.map(([q, a]) => ({ q, a }))} />
}

/* ------------------------------------------------------------------ */
/* Closing CTA: same layout as the home CTA (components/CTA.jsx) with a page-specific lede. */

export function MobileCTA() {
  return (
    <section className="relative bg-background py-16 md:py-24 lg:py-32">
      <div>
        <Container>
          <div className={`${GRID} gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-14`}>
            <div className="col-span-6 md:col-span-12 lg:col-span-22 xl:col-span-21 xl:col-start-2">
              <h2 className="block font-heading text-display-3xl font-black uppercase text-strong">
                Every workflow. Full context. Compounding results.
              </h2>
            </div>
            <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-22 xl:col-start-2">
              <p className="text-lg text-strong">Get the app, record your next meeting, and watch the record update{NB}itself.</p>
            </div>
            <div className="col-span-6 lg:col-span-6 xl:col-start-2">
              <div className="space-y-2">
                <a href="/get-started" className={buttonClass({ variant: 'primary', className: 'w-full' })}>
                  Get started
                  <span className="inline-flex size-4">
                    <ChevronRight className="size-4" />
                  </span>
                </a>
                <a href="/product-tour" className={buttonClass({ variant: 'outline', className: 'w-full' })}>
                  See Reevo
                  <span className="inline-flex size-4">
                    <Youtube className="size-4" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
