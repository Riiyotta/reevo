import { useCallback, useEffect, useRef, useState } from 'react'
import { Briefcase, ChevronDown, FileQuestion, ListPlus, Lock, Mail, Menu, Rocket, Rss, Users, X } from 'lucide-react'
import { Container, Tag, Wordmark, buttonClass } from './ui.jsx'
import { InlineSvg, WORDMARK_PATHS } from './svgPaths.js'
import { Collapse, Presence } from './motion.jsx'

// Square Reevo mark used as the "About us" icon (viewBox 0 0 34 34, first path of the wordmark)
function MarkIcon() {
  return (
    <span className="flex size-4 shrink-0 items-center justify-center">
      <InlineSvg viewBox="0 0 34 34" paths={[WORDMARK_PATHS[0]]} evenOddFirst className="size-[13px] text-foreground" />
    </span>
  )
}

const lucideIcon = (Icon) => () => (
  <span className="inline-flex items-center justify-center">
    <Icon className="size-4 shrink-0 text-foreground" />
  </span>
)

const PRODUCTS = [
  { name: 'Find', href: '/products/find', desc: 'Source high-value buyers with precision', img: '/assets/images/nav/find.png' },
  { name: 'Connect', href: '/products/connect', desc: 'Engage, qualify, and seamlessly route leads', img: '/assets/images/nav/connect.png' },
  { name: 'Sell', href: '/products/sell', desc: 'Capture every interaction and convert deals faster', img: '/assets/images/nav/sell.png' },
  { name: 'Manage', href: '/products/manage', desc: 'Track performance, pipeline, and activity', img: '/assets/images/nav/manage.png' },
  { name: 'Foundation', href: '/products/foundation', desc: 'One memory layer where context compounds', img: '/assets/images/nav/foundation.png' },
]

const WORKS_WITH = [
  { label: 'Integrations', href: '/integrations', tag: 'New' },
  { label: 'Mobile App', href: '/apps/mobile' },
  { label: 'Chrome Extension', href: 'https://chromewebstore.google.com/detail/reevo/fhnjabhbjkfgcijifbeeifdbbiclphaa' },
]

const COMPANY = [
  { label: 'About us', href: '/about', Icon: MarkIcon },
  { label: 'Careers', href: '/careers', Icon: lucideIcon(Briefcase) },
]

const RESOURCES = [
  { label: 'Blog', href: '/blog', Icon: lucideIcon(Rss) },
  { label: 'Newsletter', href: '/newsletter', Icon: lucideIcon(Mail) },
  { label: 'Startup Program', href: '/startups', Icon: lucideIcon(Rocket) },
  { label: 'Partners', href: '/partners', Icon: lucideIcon(Users) },
  { label: 'Help Center', href: 'https://help.reevo.ai/', Icon: lucideIcon(FileQuestion) },
  { label: 'Release Notes', href: '/release-notes', Icon: lucideIcon(ListPlus) },
]

const NAV = [
  { label: 'Platform', menu: 'platform' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Tour', href: '/product-tour' },
  { label: 'Company', menu: 'company' },
  { label: 'Resources', menu: 'resources' },
]

const NAV_ITEM = 'inline-flex h-[36px] items-center gap-2 rounded px-4 text-foreground transition-colors duration-200'
const NAV_LABEL = 'block font-mono text-display-xs uppercase text-strong'
const PANEL = 'absolute left-0 top-full z-50 mt-1 rounded bg-white p-0 shadow-diffused'

// Original: motion.div initial/exit {opacity:0, y:-4, scale:.98, transformOrigin:'top'} -> {opacity:1, y:0, scale:1},
// transition {duration:.2, ease:[.4,0,.2,1]}. Panels cross-fade (old exits while new enters).
const PANEL_HIDDEN = { opacity: 0, transform: 'translateY(-4px) scale(0.98)' }
const PANEL_SHOWN = { opacity: 1, transform: 'none' }
// Radix NavigationMenu defaults
const OPEN_DELAY = 200 // delayDuration
const CLOSE_DELAY = 150 // close timer on pointer leave
const SKIP_DELAY = 300 // skipDelayDuration
const PANEL_LINK = 'flex items-center gap-2 rounded px-2.5 py-2 text-sm font-medium text-strong transition-colors duration-200 hover:bg-gray-1'
const PANEL_LABEL = 'block px-2.5 py-2 font-mono text-display-xs uppercase !text-muted-foreground'

function LinkList({ items }) {
  return (
    <ul className="w-[232px] p-1.5">
      {items.map((l) => (
        <li key={l.label}>
          <a href={l.href} className={PANEL_LINK} {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {l.Icon && <l.Icon />}
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

function PlatformPanel() {
  return (
    <div className="w-[590px]">
      <div className="flex">
        <div className="flex-1 p-1.5">
          <span className={PANEL_LABEL}>Products</span>
          <ul>
            {PRODUCTS.map((p) => (
              <li key={p.name}>
                <a href={p.href} className="flex items-center gap-3 rounded p-2.5 transition-colors duration-200 hover:bg-gray-1">
                  <span className="size-9 shrink-0 overflow-hidden rounded">
                    <img src={p.img} alt="" className="size-full object-cover" />
                  </span>
                  <span className="flex-1 space-y-0.5">
                    <span className="block text-sm font-medium text-strong">{p.name}</span>
                    <span className="block text-xs">{p.desc}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[210px] shrink-0 border-l border-border p-1.5">
          <span className={PANEL_LABEL}>Works with</span>
          <ul>
            {WORKS_WITH.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={PANEL_LINK} {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {l.label}
                  {l.tag && <Tag>{l.tag}</Tag>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border p-1.5">
        <div className="flex items-center gap-4 px-2.5 py-2">
          <span className="flex items-center gap-2">
            <Lock className="size-4 shrink-0 text-strong" />
            <span className="text-sm font-medium text-strong">Trust Center</span>
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>SOC 2</span>
            <span>·</span>
            <span>AICPA SOC</span>
            <span>·</span>
            <span>ISO 27001</span>
          </span>
        </div>
      </div>
    </div>
  )
}

const PANELS = {
  platform: <PlatformPanel />,
  company: <LinkList items={COMPANY} />,
  resources: <LinkList items={RESOURCES} />,
}

// Mobile menu (below lg). Radix Accordion type="multiple" on the original: several sections can be open.
const M_LABEL = 'block font-mono text-display-xs uppercase text-strong'
const M_MUTED = 'block font-mono text-display-xs uppercase text-muted-foreground'

function MobileLink({ href, onNavigate, children, name, tag, desc }) {
  return (
    <a href={href} onClick={onNavigate} className="flex items-center gap-2 transition-colors duration-200" {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
      <div className="flex-1 space-y-0.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-strong">{name}</span>
          {tag && <span className="inline-flex h-[21px] items-center justify-center rounded border border-border px-2 font-mono text-display-xs font-normal uppercase text-strong">{tag}</span>}
        </div>
        {desc && <span className="block text-xs text-foreground">{desc}</span>}
      </div>
    </a>
  )
}

function MobileMenu({ onNavigate }) {
  const [open, setOpen] = useState(() => new Set())
  const toggle = (k) =>
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(k) ? next.delete(k) : next.add(k)
      return next
    })

  const content = {
    platform: (
      <>
        <span className={M_MUTED}>Products</span>
        {PRODUCTS.map((p) => (
          <MobileLink key={p.name} href={p.href} onNavigate={onNavigate} name={p.name} desc={p.desc}>
            <div className="relative aspect-square size-8 shrink-0 overflow-hidden rounded">
              <img src={p.img} alt={p.name} className="absolute left-0 top-0 size-full object-cover" />
            </div>
          </MobileLink>
        ))}
        <span className={M_MUTED}>Works with</span>
        {WORKS_WITH.map((l) => (
          <MobileLink key={l.label} href={l.href} onNavigate={onNavigate} name={l.label} tag={l.tag} />
        ))}
      </>
    ),
    company: COMPANY.map((l) => (
      <MobileLink key={l.label} href={l.href} onNavigate={onNavigate} name={l.label}>
        <l.Icon />
      </MobileLink>
    )),
    resources: RESOURCES.map((l) => (
      <MobileLink key={l.label} href={l.href} onNavigate={onNavigate} name={l.label}>
        <l.Icon />
      </MobileLink>
    )),
  }

  return (
    <div className="no-scrollbar fixed inset-x-0 bottom-0 top-nav-mobile z-50 w-screen overflow-y-auto bg-background md:top-nav-desktop lg:hidden">
      <nav className="flex h-full flex-col" aria-label="Mobile">
        <div className="flex-1">
          <Container>
            {NAV.map((item) =>
              item.menu ? (
                <div key={item.label} className="border-t border-border last:border-b">
                  <button
                    type="button"
                    aria-expanded={open.has(item.menu)}
                    aria-controls={`mobile-nav-${item.menu}`}
                    data-state={open.has(item.menu) ? 'open' : 'closed'}
                    onClick={() => toggle(item.menu)}
                    className="group flex h-12 w-full cursor-pointer items-center justify-between gap-2 rounded-none"
                  >
                    <span className={M_LABEL}>{item.label}</span>
                    <span className={`flex ${open.has(item.menu) ? 'rotate-180' : ''}`}>
                      <ChevronDown className="size-3 shrink-0" />
                    </span>
                  </button>
                  {/* Original: motion.div {height:0,opacity:0} <-> {height:'auto',opacity:1}, 200ms [.4,0,.2,1] */}
                  <Collapse open={open.has(item.menu)} id={`mobile-nav-${item.menu}`} className="px-2">
                    <div className="space-y-4 pb-4">{content[item.menu]}</div>
                  </Collapse>
                </div>
              ) : (
                <a key={item.label} href={item.href} onClick={onNavigate} className="flex h-12 items-center border-t border-border last:border-b">
                  <span className={M_LABEL}>{item.label}</span>
                </a>
              ),
            )}
          </Container>
        </div>
        <Container className="flex-shrink-0 py-8">
          <div className="flex flex-col gap-2 md:flex-row">
            <a href="http://app.reevo.ai" target="_blank" className={buttonClass({ variant: 'outline', size: 'sm', className: 'w-full md:flex-1' })}>
              Log in
            </a>
            <a href="/get-started" className={buttonClass({ variant: 'primary', size: 'sm', className: 'w-full md:flex-1' })}>
              Get started
            </a>
          </div>
        </Container>
      </nav>
    </div>
  )
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef(null)

  // Radix NavigationMenu hover model: open after 200ms when nothing is open (instant within 300ms of a close
  // or while another menu is open), close 150ms after the pointer leaves trigger + content, click toggles.
  const timers = useRef({ open: 0, close: 0, skip: 0 })
  const openRef = useRef(null)
  const delayed = useRef(true)
  const clickClosed = useRef(null)
  const clear = (k) => window.clearTimeout(timers.current[k])
  const setMenu = useCallback((v) => {
    openRef.current = v
    setOpenMenu(v)
    clear('skip')
    if (v) delayed.current = false
    else timers.current.skip = window.setTimeout(() => (delayed.current = true), SKIP_DELAY)
  }, [])
  useEffect(() => () => Object.keys(timers.current).forEach(clear), [])

  const onTriggerEnter = (menu) => (e) => {
    if (e.pointerType !== 'mouse' || clickClosed.current === menu) return
    clear('open')
    clear('close')
    if (openRef.current === menu) return
    if (openRef.current || !delayed.current) setMenu(menu)
    else timers.current.open = window.setTimeout(() => setMenu(menu), OPEN_DELAY)
  }
  const onLeave = (e) => {
    if (e.pointerType !== 'mouse') return
    clear('open')
    clear('close')
    timers.current.close = window.setTimeout(() => setMenu(null), CLOSE_DELAY)
  }
  const onContentEnter = (e) => e.pointerType === 'mouse' && clear('close')
  const onTriggerClick = (menu) => {
    clear('open')
    clear('close')
    const closing = openRef.current === menu
    clickClosed.current = closing ? menu : null
    setMenu(closing ? null : menu)
  }

  useEffect(() => {
    if (!openMenu) return
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenu(null)
    }
    const onKey = (e) => e.key === 'Escape' && setMenu(null)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [openMenu, setMenu])

  return (
    <header className="sticky left-0 right-0 top-0 z-50 bg-background">
      <Container>
        <div className="flex h-nav-mobile items-center justify-between md:h-nav-desktop">
          <div className="flex flex-1 items-center">
            <a href="/" aria-label="Back to home">
              <Wordmark className="h-auto w-[90px] text-gray-10 md:w-[98px] xl:w-[104px]" />
            </a>
          </div>

          <nav ref={navRef} className="max-lg:hidden">
            <ul className="flex items-center justify-center gap-1">
              {NAV.map((item) => (
                <li key={item.label} className="relative">
                  {item.menu ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={openMenu === item.menu}
                        data-state={openMenu === item.menu ? 'open' : 'closed'}
                        onClick={() => onTriggerClick(item.menu)}
                        onPointerEnter={onTriggerEnter(item.menu)}
                        onPointerMove={onTriggerEnter(item.menu)}
                        onPointerLeave={(e) => {
                          if (clickClosed.current === item.menu) clickClosed.current = null
                          onLeave(e)
                        }}
                        className={`${NAV_ITEM} ${openMenu === item.menu ? 'bg-gray-1' : ''}`}
                      >
                        <span className={NAV_LABEL}>{item.label}</span>
                        <ChevronDown className="-mr-px size-3 shrink-0" />
                      </button>
                      <Presence
                        show={openMenu === item.menu}
                        initial={PANEL_HIDDEN}
                        animate={PANEL_SHOWN}
                        className={PANEL}
                        style={{ transformOrigin: 'center top', pointerEvents: openMenu === item.menu ? 'auto' : 'none' }}
                        onPointerEnter={onContentEnter}
                        onPointerLeave={onLeave}
                      >
                        {PANELS[item.menu]}
                      </Presence>
                    </>
                  ) : (
                    <a href={item.href} className={NAV_ITEM}>
                      <span className={NAV_LABEL}>{item.label}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-1 items-center justify-end gap-2">
            <a href="http://app.reevo.ai" target="_blank" className={buttonClass({ variant: 'outline', size: 'sm', className: 'max-lg:hidden' })}>
              Log in
            </a>
            <a href="/get-started" className={buttonClass({ variant: 'primary', size: 'sm' })}>
              Get started
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              className={buttonClass({
                variant: 'outline',
                size: 'sm',
                className: `w-[74px] lg:hidden ${mobileOpen ? 'bg-secondary-foreground/10' : ''}`,
              })}
            >
              {mobileOpen ? <X className="size-3 shrink-0" /> : <Menu className="size-3 shrink-0" />}
              {mobileOpen ? 'Close' : 'Menu'}
              <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </div>
      </Container>
      {mobileOpen && <MobileMenu onNavigate={() => setMobileOpen(false)} />}
    </header>
  )
}
