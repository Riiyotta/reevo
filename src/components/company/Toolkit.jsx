import { ArrowRight } from 'lucide-react'
import { COLUMNS, FOUNDATION } from '../../data/platform.js'
import { CAROUSEL, CAROUSEL_ITEM, FeatureChip, GRID, Tag } from '../ui.jsx'

// Product columns + Foundation band as rendered on /startups (#toolkit). Same markup as the home
// "built different" block, but that component bundles its own label/headline so it can't be reused as-is.
export default function Toolkit() {
  return (
    <div className={GRID}>
      <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-23 xl:col-start-2">
        <div className={CAROUSEL}>
          {COLUMNS.map((col) => (
            <div key={col.title} className={CAROUSEL_ITEM}>
              <div className="flex h-full w-[70vw] min-w-0 flex-col items-start max-md:border max-md:border-gray-4 max-md:p-6 sm:w-[50vw] md:w-full">
                <a href={col.href} className="mb-5 inline-flex items-center gap-1.5 text-strong sm:mb-6">
                  <span className="block text-display-lg font-bold text-strong">{col.title}</span>
                  <ArrowRight className="size-4 shrink-0" />
                </a>
                <ul className="flex-1 space-y-3">
                  {col.items.map(([label, Icon, soon]) => (
                    <li key={label} className="flex items-center gap-3 text-sm text-strong">
                      <FeatureChip icon={Icon} color={col.chip} />
                      {label}
                      {soon && <Tag>Soon</Tag>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-10 lg:mt-12 xl:mt-14">
          <a
            href="/products/foundation"
            className="mb-5 flex justify-between gap-1.5 bg-strong/[.075] p-3 px-4 text-strong sm:mb-6 sm:flex-row sm:items-center sm:justify-center"
          >
            <div className="items-baseline gap-1.5 sm:flex">
              <span className="block text-display-lg font-bold text-strong">Foundation:</span>
              <p>One memory layer where context compounds</p>
            </div>
            <ArrowRight className="size-4 shrink-0" />
          </a>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {FOUNDATION.map(([label, Icon]) => (
              <li key={label} className="flex items-center gap-3 text-sm text-strong">
                <FeatureChip icon={Icon} color="bg-blue-3" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
