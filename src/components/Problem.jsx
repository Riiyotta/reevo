import { Frown } from 'lucide-react'
import { CAROUSEL, CAROUSEL_ITEM, GRID, Headline, Section, SectionLabel } from './ui.jsx'

const CARDS = [
  {
    img: '/assets/integration-tax.jpg',
    alt: 'Surreal black and white photo of a person sitting at a table with coffee cups, covering their head with crumpled foil, pop art style with purple overlay',
    title: 'Meeting prep is a scavenger hunt.',
    body: 'Everything your team knows about the account is scattered across inboxes, recordings, and half-filled CRM fields. Reps spend 30 minutes reconstructing it before every call. Reevo preps the full picture automatically.',
  },
  {
    img: '/assets/swivel-chair.jpg',
    alt: 'Conceptual black and white photo of a tired person slumped forward with their face on a laptop at a café table, exhaustion theme with orange square overlay',
    title: 'Bending over backward to move deals.',
    body: 'No single tool saw the whole conversation, so next steps depend on what the rep remembers to type. Reevo captures what was actually said, drafts the follow-up, and updates the record on its own.',
  },
  {
    img: '/assets/fake-ai.jpg',
    alt: 'Artistic black and white image of a woman in a dress and high heels leaning backward over an office swivel chair, abstract pose with green overlay',
    title: 'Coaching in the dark.',
    body: 'Managers coach from what reps report in the pipeline meeting, not from what happened on the calls. Reevo grounds every coaching conversation in real call evidence, for every rep, every week.',
  },
]

export default function Problem() {
  return (
    <Section id="problem" className="dark bg-background" pattern="/assets/images/patterns/pattern-02.png">
      <SectionLabel icon={Frown}>Why fragmented sales tools lose context</SectionLabel>
      <Headline lede="A CRM nobody updates. A call recorder. An outbound tool. Each one sees a fragment, so the AI bolted onto them is guessing. AI without the full picture is just guessing.">
        None of your tools can see <strong className="font-bold">the whole deal.</strong>
      </Headline>
      <div className={GRID}>
        <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-22 xl:col-start-2">
          <ul className={CAROUSEL}>
            {CARDS.map((c) => (
              <li key={c.title} className={CAROUSEL_ITEM}>
                <div className="flex h-full w-[60vw] flex-col gap-6 md:w-full">
                  <div className="relative aspect-square w-full overflow-hidden">
                    <img src={c.img} alt={c.alt} className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2 pr-6 lg:pr-8 xl:pr-12">
                    <p className="text-display-lg font-bold text-strong">{c.title}</p>
                    <p className="text-foreground">{c.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
