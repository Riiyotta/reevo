import { GRID } from '../ui.jsx'

// Lead paragraph (`text-strong text-2xl text-pretty`) in a configurable column
export function Lead({ col, className = 'text-2xl text-pretty', children }) {
  return (
    <div className={GRID}>
      <div className={col}>
        <p className={`text-strong ${className}`}>{children}</p>
      </div>
    </div>
  )
}

export const COL_LEAD_WIDE = 'col-span-6 md:col-span-10 lg:col-span-18 xl:col-span-16 xl:col-start-2'
export const COL_LEAD_13 = 'col-span-6 md:col-span-10 lg:col-span-18 xl:col-span-13 xl:col-start-2'
