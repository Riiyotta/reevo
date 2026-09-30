import { useEffect, useMemo, useState } from 'react'
import { Inbox, Minus, Plus, Search, X } from 'lucide-react'
import { Button, GRID } from '../ui.jsx'
import { INTEGRATIONS, LOGO_OVERRIDES } from './integrationsData.js'

// Logic ported from the original IntegrationsBrowser (reevo.ai page chunk): pillar filter,
// sub-category pills, name/domain search, 60-per-page "Load more", ?category=&subcategory= sync.
const PAGE = 60
const PILLARS = ['Find', 'Connect', 'Sell', 'Manage', 'Foundation']
const PILLAR_COPY = {
  Find: 'Sources that put new accounts and contacts in front of your team: data, buying signals, and the channels that generate demand.',
  Connect: 'Everything for reaching out and running the conversation: calling, email, meetings, and messaging.',
  Sell: 'Move deals to close: proposals, e-signature, quoting, billing, and forecasting.',
  Manage: 'Run the business after the sale: analytics, projects, storage, and customer success.',
  Foundation: 'The systems everything else builds on: your CRM, ERP, identity, automation, and AI.',
}

const ALL = INTEGRATIONS.map(([name, pillar, category, website, featured]) => ({
  name,
  pillar,
  category,
  website,
  featured: !!featured,
}))
const byName = (a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
const FEATURED = ALL.filter((i) => i.featured)
const REST = ALL.filter((i) => !i.featured).sort(byName)

const COUNTS = {}
const SUBCATS = {}
for (const p of PILLARS) (COUNTS[p] = 0), (SUBCATS[p] = [])
for (const i of ALL) {
  COUNTS[i.pillar] += 1
  const s = SUBCATS[i.pillar].find((c) => c.name === i.category)
  s ? (s.count += 1) : SUBCATS[i.pillar].push({ name: i.category, count: 1 })
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const host = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]
  }
}
const logo = (website) => {
  const h = host(website)
  return LOGO_OVERRIDES[h] ?? `https://img.logo.dev/${h}?token=pk_M82RldRMTY-j05HKOkyrNQ&size=128&format=png&retina=true`
}
const pillarFrom = (v) => PILLARS.find((p) => p.toLowerCase() === v?.toLowerCase()) ?? 'All'
const subFrom = (pillar, v) => {
  if (pillar === 'All' || !v) return null
  return SUBCATS[pillar].find((c) => slug(c.name) === v.toLowerCase())?.name ?? null
}

function Card({ item }) {
  return (
    <div className="flex items-center gap-3 rounded border border-border bg-background p-2 xl:p-3">
      <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded bg-background after:absolute after:inset-0 after:rounded after:border after:border-black/10 after:content-['']">
        <img src={logo(item.website)} alt={`${item.website} logo`} loading="lazy" className="size-full object-cover" />
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-strong">{item.name}</span>
    </div>
  )
}

function CardGrid({ items }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-3">
      {items.map((i, n) => (
        <Card key={`${i.name}-${i.website}-${n}`} item={i} />
      ))}
    </div>
  )
}

function PillarButton({ label, count, active, onSelect }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className="group flex w-full cursor-pointer items-center py-1.5 text-left"
    >
      <span
        className={`flex items-center gap-1.5 transition-colors ${
          active ? 'font-medium text-strong' : 'text-muted-foreground group-hover:text-foreground'
        }`}
      >
        {label} <span className="text-[90%] font-normal tabular-nums opacity-80">({count.toLocaleString()})</span>
      </span>
    </button>
  )
}

function SubPill({ label, count, active, onSelect }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-2.5 py-[5px] text-xs transition-colors ${
        active ? 'border-strong bg-strong text-background' : 'text-muted-foreground hover:border-muted-foreground hover:text-foreground'
      }`}
    >
      {label}
      <span className="text-[90%] tabular-nums opacity-80">({count.toLocaleString()})</span>
    </button>
  )
}

export default function IntegrationsBrowser() {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const [query, setQuery] = useState('')
  const [pillar, setPillar] = useState(() => pillarFrom(params.get('category')))
  const [sub, setSub] = useState(() => subFrom(pillarFrom(params.get('category')), params.get('subcategory')))
  const [limit, setLimit] = useState(PAGE)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const q = query.trim().toLowerCase()
  const selectPillar = (p) => {
    setPillar(p)
    setSub(null)
  }
  const onSearch = (v) => {
    setQuery(v)
    if (v.trim()) selectPillar('All')
  }
  const searching = q !== ''
  const isDefault = pillar === 'All' && sub === null && !searching

  const results = useMemo(
    () =>
      ALL.filter((i) =>
        q
          ? i.name.toLowerCase().includes(q) || host(i.website).toLowerCase().includes(q)
          : (pillar === 'All' || i.pillar === pillar) && (!sub || i.category === sub),
      ).sort(byName),
    [pillar, sub, q],
  )

  useEffect(() => setLimit(PAGE), [pillar, sub, q])
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search)
    pillar === 'All' ? sp.delete('category') : sp.set('category', pillar.toLowerCase())
    sub ? sp.set('subcategory', slug(sub)) : sp.delete('subcategory')
    const s = sp.toString()
    window.history.replaceState(window.history.state, '', s ? `?${s}` : window.location.pathname)
  }, [pillar, sub])

  const restShown = Math.max(0, limit - FEATURED.length)
  const restItems = REST.slice(0, restShown)
  const pageItems = results.slice(0, limit)
  const total = isDefault ? ALL.length : results.length
  const shown = isDefault ? FEATURED.length + restItems.length : pageItems.length
  const title = searching ? `Results for “${query.trim()}”` : pillar === 'All' ? 'All integrations' : pillar
  const hasMore = isDefault ? REST.length > restShown : results.length > limit

  return (
    <div className={`${GRID} gap-y-8`}>
      <aside className="col-span-6 md:sticky md:top-28 md:col-span-4 md:self-start md:pr-6 lg:col-span-6 lg:pr-0 xl:top-32 xl:col-span-5 xl:col-start-2">
        <div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute bottom-0 left-0 top-0 flex items-center pl-3.5 text-muted-foreground">
                <span className="inline-flex items-center justify-center">
                  <Search className="size-4 shrink-0" />
                </span>
              </div>
              <input
                type="search"
                value={query}
                onChange={(e) => onSearch(e.target.value)}
                placeholder={`Search ${ALL.length.toLocaleString()} tools`}
                aria-label="Search integrations by name or domain"
                className="flex h-button w-full min-w-0 rounded-lg border border-border bg-background px-9 text-sm text-foreground outline-none ring-0 placeholder:text-muted-foreground focus-visible:border-strong focus-visible:bg-background [&::-webkit-search-cancel-button]:appearance-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute bottom-0 right-0 top-0 flex cursor-pointer items-center pr-3.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="inline-flex items-center justify-center">
                    <X className="size-4 shrink-0" />
                  </span>
                </button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setFiltersOpen((o) => !o)}
              aria-expanded={filtersOpen}
              aria-controls="integration-filters"
              className="shrink-0 pl-3 pr-4 md:hidden"
            >
              <span className="inline-flex items-center justify-center">
                {filtersOpen ? <Minus className="size-4 shrink-0" /> : <Plus className="size-4 shrink-0" />}
              </span>
              Filters
            </Button>
          </div>
          <div id="integration-filters" className={`${filtersOpen ? 'block' : 'hidden'} md:block`}>
            <div role="group" aria-label="Filter by category" className="mt-3.5 md:mt-[26px]">
              <PillarButton label="All" count={ALL.length} active={pillar === 'All'} onSelect={() => selectPillar('All')} />
              {PILLARS.map((p) => (
                <PillarButton key={p} label={p} count={COUNTS[p]} active={pillar === p} onSelect={() => selectPillar(p)} />
              ))}
            </div>
          </div>
        </div>
      </aside>

      <div className="col-span-6 flex min-w-0 flex-col md:col-span-8 lg:col-span-17 lg:col-start-8 xl:col-span-17 xl:col-start-8">
        <div className="mb-6 flex items-start justify-between gap-4 md:mb-8 lg:mb-10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="block text-display-xl font-bold text-strong">{title}</h2>
            </div>
            {pillar !== 'All' && !searching && (
              <p className="mt-2 max-w-lg text-sm text-foreground">{PILLAR_COPY[pillar]}</p>
            )}
            {pillar !== 'All' && !searching && (
              <div role="group" aria-label={`${pillar} sub-categories`} className="mt-5 flex flex-wrap gap-1.5 md:mt-7 lg:mt-9">
                <SubPill label="All" count={COUNTS[pillar]} active={sub === null} onSelect={() => setSub(null)} />
                {SUBCATS[pillar].map((c) => (
                  <SubPill key={c.name} label={c.name} count={c.count} active={sub === c.name} onSelect={() => setSub(c.name)} />
                ))}
              </div>
            )}
          </div>
        </div>

        {isDefault ? (
          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            <section className="space-y-4">
              <h3 className="font-medium text-strong">Featured</h3>
              <CardGrid items={FEATURED} />
            </section>
            <section className="space-y-4">
              <h3 className="font-medium text-strong">All tools</h3>
              <CardGrid items={restItems} />
            </section>
          </div>
        ) : results.length === 0 ? (
          <div className="flex h-full min-h-[200px] items-center justify-center rounded border border-border text-center">
            {/* v4 space-y-3 puts margin-bottom on the inline-flex icon, which grows its line box */}
            <div>
              <div className="mb-3 inline-flex items-center justify-center">
                <Inbox className="size-4 shrink-0 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                No integrations match your search.{' '}
                <button
                  type="button"
                  onClick={() => {
                    selectPillar('All')
                    setQuery('')
                  }}
                  className="cursor-pointer underline"
                >
                  Clear filters
                </button>
              </p>
            </div>
          </div>
        ) : (
          <CardGrid items={pageItems} />
        )}

        {hasMore && (
          <div className="mt-6 flex flex-col items-center justify-center gap-3 md:mt-8 lg:mt-10 lg:gap-4">
            <Button variant="outline" onClick={() => setLimit((l) => l + PAGE)}>
              Load more
            </Button>
            <p className="text-xs tabular-nums text-muted-foreground">
              Showing {shown.toLocaleString()} of {total.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
