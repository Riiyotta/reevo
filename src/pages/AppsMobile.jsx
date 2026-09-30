import {
  EventTimeline,
  FeatureSection,
  MobileCTA,
  MobileFaq,
  MobileHero,
  TaxiBand,
} from '../components/blog/MobileSections.jsx'
import { NBSP as NB } from '../components/text.js'

const SECTIONS = [
  {
    first: true,
    title: 'Know what changed before the door opens.',
    lede: `Nobody opens a laptop on a show floor. Everything you would have looked up at your desk is on the phone, in the two minutes before you shake${NB}hands.`,
    items: [
      {
        title: 'Ask Reevo about any account',
        body: `Talk or type. Pull a specific account, contact, or deal in with an @ mention so the answer comes back about that exact${NB}record.`,
        img: 'ask-reevo.jpg',
        alt: 'Reevo mobile app using Ask Reevo to answer a question about a specific account',
      },
      {
        title: 'Your day, with prep attached',
        body: `Every meeting in one view with prep, attendees, past transcripts, summaries, and sentiment, all searchable from the same${NB}screen.`,
        img: 'meeting-prep.jpg',
        alt: "Reevo mobile app showing the day's meetings with prep, attendees, past transcripts, and sentiment",
      },
    ],
  },
  {
    imageRight: true,
    title: 'Capture what nobody was going to write down.',
    lede: `The moments that decide deals happen where a laptop doesn't belong, in person or on a call. One tap captures them, and the person you're talking to still gets your${NB}attention.`,
    items: [
      {
        title: 'Record without a bot',
        body: `In person or on a call, one tap starts recording with live transcription. The whole conversation makes it back with a summary on the record by the time you hang${NB}up.`,
        img: 'live-record.jpg',
        alt: 'Reevo mobile app recording a conversation with live transcription',
      },
      {
        title: 'Photo to contact',
        body: `Point your camera at a business card or a conference badge. Reevo reads the details and files the contact against the right account. No more business cards in your pocket that never make it into the${NB}CRM.`,
        img: 'photo-to-contact.jpg',
        alt: 'Reevo mobile app turning a photographed business card into a contact',
      },
    ],
  },
  {
    title: 'Leave with the record already updated.',
    lede: `The follow-up goes out while the conversation is still fresh and the CRM is current before the next meeting begins. There's nothing left to write up on Sunday${NB}night.`,
    items: [
      {
        title: 'Create records on the go',
        body: `Add the account, the contact you just met, and the opportunity from your phone. It's logged while the conversation is fresh, not three days${NB}later.`,
        img: 'new-opportunity.jpg',
        alt: 'Reevo mobile app creating a new opportunity from the field',
      },
      {
        title: 'Send the follow-up before you leave',
        body: `Draft it on your phone from what was actually said, and send it from your inbox while they're still thinking about the${NB}conversation.`,
        img: 'follow-up.jpg',
        alt: 'Reevo mobile app drafting a follow-up email from the conversation',
      },
      {
        title: 'Every capture makes the next one better',
        body: `Everything you capture feeds what Reevo knows about the account. Follow-ups draft sharper, records stay clean, and whoever owns the next step can start before you${NB}land.`,
        img: 'live-feed.jpg',
        alt: 'Reevo mobile app showing captured activity visible to the whole team',
      },
    ],
  },
]

export default function AppsMobile() {
  return (
    <main>
      <MobileHero />
      {SECTIONS.map((s) => (
        <FeatureSection key={s.title} {...s} />
      ))}
      <EventTimeline />
      <TaxiBand />
      <MobileFaq />
      <MobileCTA />
    </main>
  )
}
