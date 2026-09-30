import { Lock, ShieldCheck, ShieldHalf } from 'lucide-react'
import { Container, GRID } from './ui.jsx'
import { FOOTERMARK_PATHS, FOOTERMARK_VIEWBOX, InlineSvg } from './svgPaths.js'

const GROUPS = [
  {
    title: 'Products',
    links: [
      ['Find', '/products/find', 'bg-orange-8'], ['Connect', '/products/connect', 'bg-pink-9'],
      ['Sell', '/products/sell', 'bg-green-8'], ['Manage', '/products/manage', 'bg-yellow-8'],
      ['Foundation', '/products/foundation', 'bg-blue-8'],
    ],
  },
  {
    title: 'Platform',
    links: [['Pricing', '/pricing'], ['Blog', '/blog'], ['Product Tour', '/product-tour'], ['Login', 'http://app.reevo.ai']],
  },
  {
    title: 'Company',
    links: [
      ['About us', '/about'], ['Careers', '/careers'], ['Startup Program', '/startups'],
      ['Become a Partner', '/partners'], ['Release Notes', '/release-notes'], ['Newsletter', '/newsletter'],
    ],
  },
  {
    title: 'Social',
    links: [['LinkedIn', 'https://www.linkedin.com/company/reevo-ai/'], ['X/Twitter', 'https://x.com/reevo_ai']],
  },
]

const CHIPS = [
  [Lock, 'SOC2 Compliant'],
  [ShieldHalf, 'AICPA SOC  Trusted'],
  [ShieldCheck, 'ISO 27001 Certified'],
]

const Spacer = () => <div className="hidden lg:col-span-1 lg:block" />

export default function Footer() {
  return (
    <footer className="bg-white py-10 md:py-14 lg:py-16 xl:py-20">
      <Container>
        <div className={`${GRID} gap-y-10`}>
          <div className="col-span-6 md:col-span-12 lg:col-span-3 xl:col-start-2">
            <a href="/" aria-label="Back to home" className="inline-block">
              <InlineSvg viewBox={FOOTERMARK_VIEWBOX} paths={FOOTERMARK_PATHS} evenOddFirst className="h-auto w-[29px] text-gray-10" />
            </a>
          </div>
          {GROUPS.map((g) => (
            <FooterGroup key={g.title} group={g} />
          ))}
        </div>

        <div className="h-10 lg:h-48 xl:h-64" />

        <div className={`${GRID} gap-y-10 md:items-baseline`}>
          <div className="col-span-6 md:col-span-12 lg:col-span-7 lg:col-start-19 lg:row-start-1 xl:col-span-4 xl:col-start-20">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-1 text-foreground">
                <a href="https://reevo.ai/privacy" target="_blank" rel="noopener noreferrer" className="text-xs">Privacy Notice</a>
                <span className="text-xs">/</span>
                <a href="https://reevo.ai/terms" target="_blank" rel="noopener noreferrer" className="text-xs">Terms of Service</a>
              </div>
              <button type="button" className="block cursor-pointer text-left text-xs text-foreground">
                Do Not Sell or Share My Personal Information
              </button>
            </div>
          </div>
          <div className="col-span-6 md:col-span-12 lg:col-span-6 lg:col-start-5 lg:row-start-1 xl:col-span-5 xl:col-start-6">
            <p className="text-xs text-muted-foreground">© 2026 Reevo, Inc.</p>
          </div>
          <div className="col-span-6 md:col-span-12 lg:col-span-9 lg:col-start-10 lg:row-start-1 xl:col-span-8">
            <ul className="flex flex-wrap gap-1">
              {CHIPS.map(([Icon, label]) => (
                <li key={label} className="flex h-[28px] items-center gap-2 rounded-sm border border-border px-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center justify-center">
                    <Icon className="size-3 shrink-0" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function FooterGroup({ group }) {
  return (
    <>
      <Spacer />
      <div className="col-span-3 md:col-span-3 lg:col-span-4 xl:col-span-4">
        <p className="mb-3 text-xs text-muted-foreground md:mb-4">{group.title}</p>
        <ul>
          {group.links.map(([label, href, dot]) => (
            <li key={label}>
              <a
                href={href}
                className="flex items-center gap-2 py-1 text-sm text-strong"
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {dot && <div className={`size-2 ${dot}`} />}
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
