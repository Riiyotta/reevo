import { ArrowRight, Database } from 'lucide-react'
import { COLUMNS, FOUNDATION } from '../data/platform.js'
import { CAROUSEL, CAROUSEL_ITEM, FeatureChip, GRID, Headline, Section, SectionLabel, Tag } from './ui.jsx'

export default function BuiltDifferent() {
  return (
    <Section id="built-different" className="bg-gray-2" pattern="/assets/images/patterns/pattern-01.png">
      <SectionLabel icon={Database}>One AI-native platform, your entire sales motion</SectionLabel>
      <Headline lede="Built on an AI foundation, Reevo runs your whole sales motion on the full context of every deal, from what your team's learned to signals they haven't seen yet.">
        Revenue should feel <strong className="font-bold">predictable.</strong>
      </Headline>
      <div className={GRID}>
        <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-23 xl:col-start-2">
          <ul className={CAROUSEL}>
            {COLUMNS.map((col) => (
              <li key={col.title} className={CAROUSEL_ITEM}>
                <div className="flex h-full w-[70vw] flex-col max-md:border max-md:border-gray-4 max-md:p-6 sm:w-[50vw] md:w-full">
                  <a
                    href={col.href}
                    className="mb-5 inline-flex items-center gap-1.5 self-start text-display-lg font-bold text-strong sm:mb-6"
                  >
                    {col.title}
                    <ArrowRight className="size-4" />
                  </a>
                  <ul className="flex-1 space-y-3">
                    {col.items.map(([label, Icon, soon]) => (
                      <li key={label} className="flex items-center gap-3 text-sm text-strong">
                        <FeatureChip icon={Icon} color={col.chip} />
                        <span>{label}</span>
                        {soon && <Tag>Soon</Tag>}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 md:mt-10 lg:mt-12 xl:mt-14">
            <a
              href="/products/foundation"
              className="mb-5 flex justify-between gap-1.5 bg-strong/[.075] p-3 px-4 text-strong sm:mb-6 sm:items-center sm:justify-center"
            >
              <div className="items-baseline gap-1.5 sm:flex">
                <span className="block text-display-lg font-bold text-strong">Foundation:</span>
                <p>One memory layer where context compounds</p>
              </div>
              <div className="inline-flex items-center justify-center">
                <ArrowRight className="size-4 shrink-0" />
              </div>
            </a>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {FOUNDATION.map(([label, Icon]) => (
                <li key={label} className="flex items-center gap-3 text-sm text-strong">
                  <FeatureChip icon={Icon} color="bg-blue-3" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
