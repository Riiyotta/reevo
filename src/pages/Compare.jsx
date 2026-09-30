import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CTA from '../components/CTA.jsx'
import { CompareHero, FeatureCompare, QuickCompare, Reasons } from '../components/compare/CompareSections.jsx'
import { getCompetitor } from '../data/compare.js'

// /compare/:competitor (apollo, attio, fireflies, gong, hubspot, outreach, salesforce).
// Unknown slugs fall back to DEFAULT_COMPETITOR in src/data/compare.js.
export default function Compare() {
  const { competitor } = useParams()
  const c = getCompetitor(competitor)

  useEffect(() => {
    document.title = c.title
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = c.description
  }, [c])

  return (
    <main key={c.name}>
      <CompareHero c={c} />
      <QuickCompare c={c} />
      <Reasons c={c} />
      {c.features && <FeatureCompare c={c} />}
      <CTA />
    </main>
  )
}
