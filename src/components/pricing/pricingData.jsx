import { FaqLink as L } from './shared.jsx'

// Copy from https://reevo.ai/pricing (measured 2026-09-29).

export const PLANS = [
  {
    name: 'Core',
    tagline: 'For early teams launching their GTM motion',
    features: [
      '1,000 enrichment credits per user / mo.',
      '1,000 dialer min per user / mo.',
      '2,500 meeting min per user / mo.',
      '50 active sequences per org',
      '48 hour SLA',
    ],
  },
  {
    name: 'Pro',
    tagline: 'For scaling teams running more advanced sales motions',
    features: [
      '2,000 enrichment credits / user / mo.',
      '2,000 dialer min per user / mo.',
      '4,000 meeting min per user / mo.',
      '100 active sequences per org',
      '24 hour SLA',
      'Slack Connect with Reevo Team',
    ],
  },
  {
    name: 'Enterprise',
    tagline: 'For mature GTM teams that need a tailored, flexible solution',
    dark: true,
    footer: "We'll build your plan together",
  },
]

// Cell values: true = check, false = x, null = minus (dimmed), string = text
export const COMPARE = [
  {
    title: 'Find',
    icon: '/assets/images/nav/find.png',
    rows: [
      ['TAM sourcing', true, true, 'Build account lists that match your ideal customer profile, so reps only work accounts worth their time.'],
      ['Contact & company enrichment', '1,000 credits / user / mo', '2,000 credits / user / mo', 'Verified emails, phone numbers, and company data in one click, plus contact capture from LinkedIn with the Chrome extension.'],
      ['Web research', true, true, 'Prospect the live web: Find buyers beyond any database, emails verified, enrolled in a sequence in one motion.'],
      ['Inbound forms & routing', true, true, 'Branded forms with fields mapped straight to your CRM. Every submission gets routed, sequenced, or booked, with its source on the record.'],
      ['Intent signals & Signal prospecting', null, null, 'Spot buying signals on your target accounts, and let every win surface lookalike buyers scored by fit.', true],
    ],
  },
  {
    title: 'Connect',
    icon: '/assets/images/nav/connect.png',
    rows: [
      ['Email infrastructure & deliverability', true, true, 'Buy domains and mailboxes, import inboxes in bulk, warm them automatically, and watch mailbox health at a glance.'],
      ['Sequences & dialer', '50 active sequences / org · 1,000 dialer min / user / mo · 1 phone number / user', '100 active sequences / org · 2,000 dialer min / user / mo · 1 phone number / user (+1 number change)', 'Multichannel sequences with A/B testing, smart fallback rules, and a finish date for every run. Built-in power dialer.'],
      ['Smart scheduler', '2 scheduling links / user', 'Unlimited scheduling links', 'Scheduling links for single-host, round-robin, and multi-host events that book straight onto the calendar.'],
      ['Reply tracking', true, true, 'Slack or email alerts the moment a reply lands, with every response and next step in one view.'],
    ],
  },
  {
    title: 'Sell',
    icon: '/assets/images/nav/sell.png',
    rows: [
      ['Meeting prep', true, true, 'Account and contact research compiled before every meeting, so reps walk in prepared.'],
      ['Meeting recording & intelligence', '2,500 min recorded / user / mo', '4,000 min recorded / user / mo', 'Record on Zoom, bot-free on desktop, or in person on iOS. Highlights, action items, and sentiment, cited to the exact moment in the call.'],
      ['Smart task logging', true, true, 'Tasks generated from meetings and email, logged to the right record.'],
    ],
  },
  {
    title: 'Manage',
    icon: '/assets/images/nav/manage.png',
    rows: [
      ['Auto-deal update', true, true, 'Deals, accounts, and contacts move through stages on their own as activity comes in.'],
      ['Reporting & forecasting', '300 reports · 50 dashboards · 20 custom datasets · 25 computed fields (per org)', 'Unlimited reports, dashboards, datasets, and computed fields', 'Waterfall charts, dashboards on your own fiscal calendar, and a weighted forecast you can defend to the board.'],
      ['Coaching insights', null, null, 'Rep-level insight from every call, so managers coach from evidence.', true],
    ],
  },
  {
    title: 'Foundation',
    icon: '/assets/images/nav/foundation.png',
    rows: [
      ['Ask Reevo', true, true, 'Ask anything about pipeline, deals, or your team. Cited answers, deep research, scheduled prompts, and it answers in Slack.'],
      ['AI-native CRM', true, true, 'Records that stay current: merge duplicates with previews, bulk edit at scale, and migrate from HubSpot or Attio with a guided import.'],
      ['Custom objects & relationships', '5 custom objects · 100 custom fields (per org)', '10 custom objects · 100 custom fields (per org)', 'Model your business with custom objects, link records with custom relationships, and roll numbers up with computed fields.'],
      ['Integrations & MCP', true, true, 'Works with Slack, Zoom, Google Calendar, Granola, and Teams. MCP brings Notion, Linear, Pylon, and PostHog context into Ask Reevo. Connect your Reevo data via Claude and ChatGPT. And we’re constantly adding.'],
      ['Trust & control', true, true, 'Teams, roles, and record-level permissions, with full change history on every field. SOC 2 Type 2 and ISO 27001.'],
      ['Workflow automation', '20,000 workflow credits / org / mo', '40,000 workflow credits / org / mo', 'Trigger on any CRM event, meeting, or schedule. Act in Slack and Teams, enroll sequences, and dry-run before going live.'],
      ['Command Center', null, null, 'Pipeline, team performance, and the next actions that need your attention, on one screen.', true],
    ],
  },
  {
    title: 'Onboarding & Support',
    caption: 'Onboarding & Support features comparison between Core and Pro plans',
    rows: [
      ['Email support', true, true],
      ['SLA', '48 hours', '24 hours'],
      ['Slack Connect with Reevo', false, true],
    ],
  },
]

export const PRICING_FAQ = [
  {
    q: 'How much does Reevo cost?',
    a: "Reevo pricing depends on your team's stage, needs, and sales motion. Reevo offers Core, Pro, and Enterprise plans, and you can talk with the Reevo team to find the right plan and pricing for your organization.",
  },
  {
    q: 'What Reevo pricing plans are available?',
    a: 'Reevo offers three plans: Core for early teams launching their GTM motion, Pro for scaling teams with more advanced sales motions, and Enterprise for mature GTM organizations that need a more tailored solution.',
  },
  {
    q: "What's included with Reevo?",
    a: 'Reevo brings prospecting, outreach, calling, meeting intelligence, CRM, pipeline management, reporting, automation, and more into one platform. Available capabilities, usage allowances, and support may vary by plan.',
  },
  {
    q: 'Are Find, Connect, Sell, Manage, and Foundation separate Reevo products to purchase?',
    a: (
      <>
        <L href="/products/find">Find</L>, <L href="/products/connect">Connect</L>, <L href="/products/sell">Sell</L>,{' '}
        <L href="/products/manage">Manage</L>, and <L href="/products/foundation">Foundation</L> describe different
        capability areas within the Reevo platform. They're designed to work together on the same data and context
        rather than function as separate point solutions.
      </>
    ),
  },
  {
    q: 'Does Reevo offer special pricing for startups?',
    a: (
      <>
        Yes. Qualifying startups can access special pricing through <L href="/startups">Reevo's Startup Program</L>,
        giving early-stage teams a way to build their GTM foundation on Reevo from the start.
      </>
    ),
  },
]
