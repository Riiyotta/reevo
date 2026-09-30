// Per-competitor copy and table data for /compare/:competitor.
// Extracted verbatim from https://reevo.ai/compare/{slug} on 2026-09-29 (including the original's
// copy quirks, e.g. the Fireflies headline says "Outreach" and the HubSpot/Salesforce body mentions Gong).
// Rich text is a string or an array of strings and { b } (bold) segments.
// Logos are inline single-colour SVGs (fill="currentColor") on the original; standalone copies live in
// /assets/images/compare/logos/{slug}.svg.

export const DEFAULT_COMPETITOR = 'gong'

const COMPETITORS = {
  apollo: {
    name: "Apollo",
    title: "Reevo: The best Apollo alternative",
    description: "Apollo.io is a strong player for building and exporting prospect lists, and also offers data delivery and basic sequencing. If you’re looking to run the entire sales motion—from finding leads to closing deals—Reevo is built for that.",
    intro: ["Apollo.io is a strong player for building and exporting prospect lists, and also offers data delivery and basic sequencing. If you’re looking to run the entire sales motion—from finding leads to closing deals—", { b: "Reevo is built for that." }, " Reevo puts AI at the center, combining prospecting, outreach, meeting prep, and pipeline management in one system."],
    logo: {
      viewBox: "0 0 152 40",
      paths: [
        { d: "m19.6.086.005 13.17c0 2.082-2.183 3.416-3.997 2.443L2.584 8.715a18.13 18.13 0 0 1 3.69-4.391l10.215 9.57c.541.508 1.395-.042 1.171-.754L13.7.494a17.672 17.672 0 0 1 5.9-.408ZM16.064 36.109l-.006-13.104c-.001-2.081 2.183-3.415 3.997-2.442l13.029 6.986c-1 1.653-2.255 3.13-3.709 4.376l-10.201-9.558c-.541-.507-1.395.043-1.172.755L21.95 35.72a17.667 17.667 0 0 1-5.886.389ZM22.01 16.77l9.46-10.376a18.016 18.016 0 0 0-4.332-3.757l-6.907 13.24c-.96 1.839.356 4.053 2.409 4.052l12.978-.006a18.554 18.554 0 0 0-.384-5.982l-12.48 4.017c-.701.226-1.244-.64-.744-1.188ZM.084 16.338l12.94-.006c2.052 0 3.368 2.213 2.409 4.053L8.56 33.556a18.013 18.013 0 0 1-4.317-3.744l9.41-10.32c.5-.55-.042-1.414-.745-1.188L.485 22.303a18.382 18.382 0 0 1-.4-5.965Z" },
        { d: "M57.022 3.782h3.595l11.939 28.666h-3.96l-3.684-9.121H52.669l-3.53 9.12h-3.742L57.022 3.783Zm1.675 4.568-4.645 11.603h9.442L58.697 8.35ZM96.013 22.42c0-6.115 4.16-10.553 9.891-10.553 5.756 0 9.934 4.438 9.934 10.554 0 6.116-4.178 10.554-9.934 10.554-5.731 0-9.89-4.439-9.89-10.554Zm3.746 0c0 4.602 2.355 7.46 6.145 7.46 3.817 0 6.188-2.858 6.188-7.46 0-4.6-2.371-7.459-6.188-7.459-3.79 0-6.145 2.859-6.145 7.46ZM142.109 11.867c-5.756 0-9.934 4.438-9.934 10.554 0 6.116 4.178 10.554 9.934 10.554 5.731 0 9.891-4.439 9.891-10.554 0-6.116-4.16-10.554-9.891-10.554Zm0 18.014c-3.817 0-6.189-2.859-6.189-7.46s2.372-7.46 6.189-7.46c3.791 0 6.145 2.859 6.145 7.46s-2.354 7.46-6.145 7.46Z", evenOdd: true },
        { d: "M122.206 32.448h-3.616V3.782h3.616v28.666ZM125.807 32.448h3.617V3.782h-3.617v28.666Z" },
        { d: "M84.69 32.975c-2.957 0-5.172-1.435-6.449-3.215V40h-3.616V12.393h3.616v2.723c1.28-1.798 3.496-3.25 6.448-3.25 5.502 0 9.198 4.242 9.198 10.555s-3.696 10.554-9.198 10.554Zm-.347-17.926c-3.702 0-6.262 2.796-6.262 6.811v1.121c0 4.015 2.56 6.812 6.262 6.812 3.63 0 5.798-2.756 5.798-7.372s-2.168-7.372-5.798-7.372Z", evenOdd: true },
      ],
    },
    quick: [
      ["Best for", "Full-funnel sales execution", "Lead database & outbound sequences"],
      ["System of record", "Built-in CRM + sales workflow tools", "No CRM (exports to others)"],
      ["AI capabilities", "Faster, all-knowing AI that connects insights and drives action across the platform", "Limited AI features (focused on email personalization)"],
      ["Ideal team", "SMB & mid-market sales teams", "SMB & mid-market outbound teams"],
    ],
    reasonsHeadline: "Why do customers choose Reevo over Apollo?",
    reasonsBody: ["With Apollo.io, you can find leads, but you’ll need other tools to turn them into customers. Reevo brings everything together: a built-in CRM withAI-powered engagement, pipeline tracking, and deal execution, all without juggling multiple vendors."],
    reasons: [
      ["One platform, not a patchwork", "Apollo helps you identify prospects, but you’ll need to export to a CRM, add a dialer, buy a meeting scheduler, and manage pipeline elsewhere. Reevo replaces all of them in a single, integrated workspace."],
      ["AI that does more than personalize emails", "Apollo’s AI is geared toward improving outbound copy. Reevo’s AI connects the dots across the sales cycle—finding leads, prepping meetings, surfacing risks, and recommending next steps."],
      ["From first touch to closed-won", "Reevo isn’t just a prospecting tool. It’s a complete revenue operating system, meaning your sales data, activities, and insights live in one place, automatically linked to opportunities."],
    ],
    features: [
      {
        name: "Prospecting",
        rows: [
          ["Built-in prospecting database", true, true],
          ["Intent signals & enrichment", true, true],
          ["Research agent", true, false],
        ],
      },
      {
        name: "Email & Sequences",
        rows: [
          ["Automated email sequences", true, true],
          ["Smart email composer", true, true],
          ["LinkedIn automation", true, true],
        ],
      },
      {
        name: "Scheduling & Dialer",
        rows: [
          ["Built-in scheduler with routing logic", true, true],
          ["Outbound/inbound dialer", true, true],
          ["Voicemail", true, true],
        ],
      },
      {
        name: "Call Intelligence",
        rows: [
          ["Call recording & transcription", true, true],
          ["Call outlines against MEDICC sales framework", true, false],
          ["Sentiment & topic tracking", true, true],
          ["Shareable snippets", true, true],
          ["Smart trackers", true, true],
        ],
      },
      {
        name: "AI Assist & Prep",
        rows: [
          ["Sales AI Assistant", true, false],
          ["Pre-meeting prep summaries", true, false],
          ["Auto action item capture", true, false],
        ],
      },
      {
        name: "CRM & Pipeline",
        rows: [
          ["Native CRM", true, true],
          ["Auto-pipeline stage movement based on conversational cues", true, false],
          ["CPQ & quote generation", true, false],
          ["Discount & approval workflows", true, true],
        ],
      },
      {
        name: "Reporting",
        rows: [
          ["Custom reports & dashboards", true, true],
          ["Formula fields & reporting datasets", true, true],
        ],
      },
      {
        name: "Integrations",
        rows: [
          ["Slack, Zoom, Google, Teams, public APIs, HubSpot (Reevo does not sync to SFDC)", true, true],
        ],
      },
    ],
  },
  attio: {
    name: "Attio",
    title: "Reevo: The best Attio alternative",
    description: "Attio is a flexible, modern CRM with customizable data structures, but if you want to run your entire sales motion from finding prospects to closing deals, Reevo may be a better fit.",
    intro: ["Attio is a flexible, modern CRM with customizable data structures, but if you want to run your entire sales motion from finding prospects to closing deals, ", { b: "Reevo may be a better fit." }, " While Attio focuses on building a central database for your relationships, Reevo builds AI directly into every stage of the sales process, so your tools, workflows, and intelligence live in one place."],
    logo: {
      viewBox: "0 0 103 26",
      paths: [
        { d: "M84.227 1.038h-4.235v4.235h4.235V1.038Z" },
        { d: "M67.742 11.91h-3.718v6.88c0 .574.142.994.429 1.257.287.266.706.42 1.257.464.55.021 1.235.012 2.052-.032v3.87c-2.89.331-4.951.066-6.187-.793-1.212-.881-1.819-2.47-1.819-4.764v-6.88H56.88V7.807h2.877V4.466l4.268-1.29V7.81h6.596V4.468l4.267-1.29v4.634h3.738v4.103h-3.738v6.881c0 .574.142.993.43 1.257.286.266.706.42 1.256.464a22.7 22.7 0 0 0 2.05-.033v3.87c-2.89.332-4.95.066-6.186-.792-1.213-.882-1.82-2.47-1.82-4.764v-6.88H67.74l.002-.009Z", evenOdd: true },
        { d: "M84.248 7.804H79.98v16.543h4.267V7.804Z" },
        { d: "M94.302 7.375a8.701 8.701 0 0 0-8.7 8.702 8.7 8.7 0 1 0 17.4 0 8.7 8.7 0 0 0-8.7-8.702Zm-.016 13.302a4.617 4.617 0 0 1 0-9.231A4.614 4.614 0 0 1 98.9 16.06a4.614 4.614 0 0 1-4.614 4.616ZM51.286 7.771v.919a8.701 8.701 0 0 0-13.296 7.387 8.701 8.701 0 0 0 13.297 7.387v.918h4.234V7.772h-4.235Zm-4.611 12.906a4.617 4.617 0 0 1 0-9.231 4.596 4.596 0 0 1 4.611 4.539v.152a4.612 4.612 0 0 1-4.611 4.538v.002Z", evenOdd: true },
        { d: "m30.647 17.782-2.587-4.14-.015-.025-.205-.325a2.091 2.091 0 0 0-1.778-.99l-4.167-.013-.29.466-4.98 7.968-.275.441 2.086 3.334c.385.62 1.051.99 1.784.99h5.84c.72 0 1.401-.38 1.782-.988l.206-.33.01-.013 2.59-4.146a2.106 2.106 0 0 0 0-2.229h-.001Zm-.79 1.735-2.59 4.146c-.012.019-.025.034-.037.05a.35.35 0 0 1-.56-.052l-2.59-4.146a1.164 1.164 0 0 1-.133-.299 1.2 1.2 0 0 1 0-.639c.029-.102.073-.204.13-.296l2.587-4.142.006-.01a.327.327 0 0 1 .206-.148c.027-.008.05-.01.07-.014h.028c.06 0 .208.02.3.17l2.587 4.14a1.17 1.17 0 0 1 0 1.24h-.003ZM22.991 7.764a2.114 2.114 0 0 0 0-2.228l-2.587-4.14-.215-.349A2.092 2.092 0 0 0 18.405.06h-5.84c-.73 0-1.396.37-1.784.989L.323 17.785a2.09 2.09 0 0 0-.002 2.227l2.805 4.49c.387.62 1.053.988 1.782.988h5.84c.733 0 1.4-.37 1.784-.99l.214-.338v-.004l.004-.008 2.084-3.334 6.179-9.887 1.974-3.163.004-.002Zm-.61-1.114c0 .214-.06.43-.18.62L11.956 23.665a.35.35 0 0 1-.3.165.353.353 0 0 1-.3-.165l-2.59-4.148a1.175 1.175 0 0 1 0-1.238L19.011 1.89a.349.349 0 0 1 .3-.168c.06 0 .208.017.302.169L22.2 6.03c.122.19.181.406.181.62Z" },
      ],
    },
    quick: [
      ["Best for", "Full-funnel sales execution", "Customizable, collaborative CRM"],
      ["System of record (i.e., CRM)", "Built-in CRM + sales workflow tools", "Primary CRM platform + workflows"],
      ["AI capabilities", "Faster, all-knowing AI that provides insights and automation across the platform", "AI-assisted data enrichment and workflow automation, but no AI copilot"],
      ["Ideal team", "SMB & mid-market sales teams", "Startups to mid-market teams needing flexible CRM structure"],
    ],
    reasonsHeadline: "Why do customers choose Reevo over Attio?",
    reasonsBody: ["All of your sales activities, from the first cold email to the closed deal, happen in Reevo without having to bolt on prospecting, sequencing, or quoting tools. With Attio, you’ll need to integrate multiple third-party apps for outreach, calling, and pipeline automation."],
    reasons: [
      ["Covers the full sales motion", "While Attio gives you a strong CRM foundation, Reevo takes you from lead generation to signed contract with built-in prospecting, outreach, scheduling, and CPQ."],
      ["Fewer tools, faster action", "Reevo replaces a patchwork of vendors—sequence tools, dialers, meeting prep, quoting, and CRM—so teams can get moving quickly without juggling multiple integrations."],
      ["Embedded AI that drives action", "Reevo’s AI connects the dots across every stage, spotting trends in conversations, surfacing objections, tracking feature requests, and preparing reps before every meeting."],
    ],
    features: [
      {
        name: "Prospecting",
        rows: [
          ["Built-in prospecting database", true, false],
          ["Intent signals & enrichment", true, false],
          ["Research agent", true, false],
        ],
      },
      {
        name: "Email & sequences",
        rows: [
          ["Automated email sequences", true, true],
          ["Smart email composer", true, true],
          ["LinkedIn automation", true, true],
        ],
      },
      {
        name: "Scheduling & dialer",
        rows: [
          ["Built-in scheduler with routing logic", true, false],
          ["Outbound/inbound dialer", true, false],
          ["Voicemail", true, false],
        ],
      },
      {
        name: "Call intelligence",
        rows: [
          ["Call recording & transcription", true, true],
          ["Call outlines against MEDICC sales framework", true, true],
          ["Sentiment & topic tracking", true, true],
          ["Shareable snippets", true, true],
          ["Smart trackers", true, true],
        ],
      },
      {
        name: "AI assist & prep",
        rows: [
          ["Sales AI assistant", true, true],
          ["Pre-meeting prep summaries", true, true],
          ["Auto action item capture", true, true],
        ],
      },
      {
        name: "CRM & pipeline",
        rows: [
          ["Native CRM", true, true],
          ["Auto-pipeline stage movement based on conversational cues", true, false],
          ["Native CPQ & quote generation", true, false],
          ["Native discount & approval workflows", true, false],
        ],
      },
      {
        name: "Reporting",
        rows: [
          ["Custom reports & dashboards", true, true],
          ["Formula fields & reporting datasets", true, true],
        ],
      },
      {
        name: "Integrations",
        rows: [
          ["Slack, Zoom, Google, Teams, public APIs, HubSpot (Reevo does not sync to SFDC)", true, true],
        ],
      },
    ],
  },
  fireflies: {
    name: "Fireflies",
    title: "Reevo: The best Fireflies alternative",
    description: "Fireflies offers reliable meeting transcription and note-taking, but if you’re looking to drive action across the entire sales cycle from finding prospects to closing deals, Reevo may be the better choice.",
    intro: ["Fireflies offers reliable meeting transcription and note-taking, but if you’re looking to drive action across the entire sales cycle from finding prospects to closing deals, ", { b: "Reevo may be the better choice." }, " Fireflies bolts AI onto meeting data, while Reevo was built AI-first, with every feature designed to serve its intelligence."],
    logo: {
      viewBox: "0 0 96 19.8",
      paths: [
        { d: "M0 14.3c0 1.5.6 2.9 1.6 3.9 1.1 1 2.5 1.6 3.9 1.6h.9v-12H0v6.5ZM6.5 6.5V0H0v6.5h6.5zM7.7 7.8h6.5v6.5H7.7zM17.3.9h-.1c-.3-.2-.5-.3-.8-.4C15.7.1 15 0 14.2 0H7.7v6.5h12.1v-.9c0-1.5-.6-2.9-1.6-3.9-.3-.3-.5-.5-.9-.7ZM38.7 8.5V7.3H37v8.4h1.7v-4.4c0-.9.2-1.4.5-1.8.4-.3.9-.5 1.6-.5h.4V7.2c-.6 0-1.1.1-1.5.4-.4.2-.8.6-1 1ZM48.2 7.7c-.6-.3-1.3-.5-2.1-.5s-1.6.2-2.2.5c-.6.4-1.1.9-1.5 1.5-.3.6-.5 1.4-.5 2.3 0 .9.2 1.6.5 2.3.3.6.9 1.2 1.5 1.5.6.4 1.4.5 2.2.5s1.8-.2 2.5-.7c.7-.5 1.1-1.1 1.4-1.9h-1.9c-.4.8-1 1.2-2 1.2s-1.2-.2-1.6-.6c-.4-.4-.7-.9-.7-1.6h6.4v-.9c0-.8-.2-1.5-.5-2.1-.3-.6-.8-1.1-1.4-1.5Zm-4.5 3.1c0-.6.3-1.2.8-1.5.4-.4.9-.6 1.5-.6s1.2.2 1.7.6c.4.4.7.9.7 1.5h-4.6ZM34.1 4c-.3 0-.6.1-.8.3-.2.2-.3.5-.3.8 0 .3.1.6.3.8.2.2.5.3.8.3.3 0 .6-.1.8-.3.2-.2.3-.5.3-.8s-.1-.6-.3-.8c-.2-.2-.5-.3-.8-.3ZM30.5 6.7c0-.5.1-.8.3-1 .2-.2.6-.3 1.1-.3V4c-1.1 0-1.9.2-2.4.7-.5.4-.8 1.1-.8 2.1v.6h-1v1.4h1v7h1.7v-7H32V7.4h-1.6v-.6ZM33.2 7.3h1.7v8.4h-1.7zM94.9 6.2c.3 0 .6-.1.8-.3.2-.2.3-.5.3-.8s-.1-.6-.3-.8c-.2-.2-.5-.3-.8-.3s-.6.1-.8.3c-.2.2-.3.5-.3.8 0 .3.1.6.3.8.2.2.5.3.8.3ZM81.3 13.6c-.3 0-.6.1-.8.3-.2.2-.3.5-.3.8 0 .3.1.6.3.8.2.2.5.3.8.3.3 0 .6-.1.8-.3.2-.2.3-.5.3-.8s-.1-.6-.3-.8c-.2-.2-.5-.3-.8-.3ZM90.3 8.5c-.3-.4-.7-.7-1.2-1-.5-.3-1.1-.4-1.7-.4-1.4 0-2.8.8-3.4 2.1-.3.6-.5 1.4-.5 2.2 0 .8.2 1.6.5 2.3.3.6.8 1.2 1.4 1.6.6.4 1.3.6 2 .5.6 0 1.2-.1 1.7-.4s.9-.6 1.2-1v1.2H92V7.3h-1.7v1.2Zm-.4 4.5c-.2.4-.5.8-.9 1-.4.2-.8.3-1.2.3s-.9-.1-1.2-.3c-.4-.2-.7-.6-.9-1-.2-.4-.4-.9-.4-1.5s.1-1.1.4-1.5c.2-.4.6-.7.9-1 .4-.2.8-.3 1.2-.3.4 0 .9.1 1.2.3.4.2.7.6.9 1 .2.4.4.9.4 1.5s-.1 1.1-.4 1.5ZM94 7.3h1.7v8.4H94zM77.6 11.3c-.4-.2-.9-.3-1.5-.5-.5-.1-.8-.2-1-.3-.2 0-.4-.2-.6-.4-.2-.2-.2-.3-.2-.6s.1-.5.4-.7c.2-.2.6-.3 1-.3s.8.1 1.1.3c.3.2.4.5.5.9H79c0-.8-.4-1.5-.9-2-.6-.5-1.3-.7-2.3-.7s-1.2.1-1.7.3c-.5.2-.9.5-1.1.9-.3.4-.4.8-.4 1.2s.1 1 .4 1.3c.3.3.6.6 1 .7.5.2 1 .4 1.5.5.6.2 1.1.3 1.4.5.3.2.5.4.5.7s-.1.5-.4.7c-.3.2-.6.3-1.1.3s-.9-.1-1.2-.3c-.3-.2-.5-.5-.5-.9h-1.8c0 .5.2 1 .5 1.4.3.4.7.7 1.2 1 .5.2 1.1.3 1.8.3s1.2-.1 1.7-.3c.5-.2.9-.5 1.1-.9s.4-.8.4-1.3-.2-1-.4-1.3c-.3-.3-.6-.6-1-.7ZM94.9 6.2zM60.9 4c-.3 0-.6.1-.8.3-.2.2-.3.5-.3.8 0 .3.1.6.3.8.2.2.5.3.8.3.3 0 .6-.1.8-.3.2-.2.3-.5.3-.8s-.1-.6-.3-.8c-.2-.2-.5-.3-.8-.3ZM60 7.3h1.7v8.4H60zM69.4 7.7c-.6-.3-1.3-.5-2.1-.5s-1.6.2-2.2.5c-.6.4-1.1.9-1.5 1.5-.3.6-.5 1.4-.5 2.3s.2 1.6.5 2.3c.3.6.9 1.2 1.5 1.5.6.4 1.4.5 2.2.5s1.8-.2 2.5-.7c.7-.5 1.1-1.1 1.4-1.9h-1.9c-.4.8-1 1.2-2 1.2s-1.2-.2-1.6-.6c-.4-.4-.7-.9-.7-1.6h6.4v-.9c0-.8-.2-1.5-.5-2.1-.3-.6-.8-1.1-1.4-1.5ZM65 10.8c0-.6.3-1.2.8-1.5.4-.4.9-.6 1.5-.6s1.2.2 1.7.6c.4.4.7.9.7 1.5h-4.6ZM56.3 4.4H58v11.3h-1.7zM53.5 6.7c0-.5.1-.8.3-1 .2-.2.6-.3 1.1-.3V4c-1.1 0-1.9.2-2.4.7-.5.4-.8 1.1-.8 2.1v.6h-1v1.4h1v7h1.7v-7H55V7.4h-1.6v-.6Z" },
      ],
    },
    quick: [
      ["Best for", "Full-funnel sales execution", "Meeting transcription & note-taking"],
      ["System of record", "Built-in CRM + sales workflow tools", "Integrates with external CRMs"],
      ["AI capabilities", "Faster, all-knowing AI that connects insights and drives action across the platform", "Meeting summarization & basic insights"],
      ["Ideal team", "SMB & mid-market sales teams", "Any team needing meeting notes"],
    ],
    reasonsHeadline: "Why do customers choose Reevo over Outreach?",
    reasonsBody: ["With Reevo, your meeting insights are just one piece of a connected sales engine. Instead of living in a separate app, every conversation is tied to the right account, contact, and opportunity record automatically. Fireflies can capture notes, but it can’t turn them into pipeline movement without a lot of manual work and extra tools."],
    reasons: [
      ["Covers the full sales motion", "Fireflies helps after the meeting. Reevo supports the whole journey from identifying the right leads, to booking the meeting, to managing and closing the deal."],
      ["Fewer tools, faster ramp-up", "Reevo replaces multiple vendors: a prospecting database, sequence tool, dialer, scheduler, meeting recorder, CRM, and CPQ system. That means one login, less context-switching, and faster onboarding."],
      ["Embedded AI that drives action", "Reevo’s AI is built for sales velocity. It connects insights across all your calls, emails, and deals to spot trends, surface objections, and recommend next steps. It even preps you before every call so you can walk in ready to win."],
    ],
    features: [
      {
        name: "Prospecting",
        rows: [
          ["Built-in prospecting database", true, false],
          ["Intent signals & enrichment", true, false],
          ["Research agent", true, false],
        ],
      },
      {
        name: "Email & Sequences",
        rows: [
          ["Automated email sequences", true, false],
          ["Smart email composer", true, false],
          ["LinkedIn automation", true, false],
        ],
      },
      {
        name: "Scheduling & Dialer",
        rows: [
          ["Built-in scheduler with routing logic", true, false],
          ["Outbound/inbound dialer", true, false],
          ["Voicemail", true, false],
        ],
      },
      {
        name: "Call Intelligence",
        rows: [
          ["Call recording & transcription", true, true],
          ["Call outlines against MEDICC sales framework", true, false],
          ["Sentiment & topic tracking", true, true],
          ["Shareable snippets", true, true],
          ["Smart trackers", true, true],
        ],
      },
      {
        name: "AI Assist & Prep",
        rows: [
          ["Sales AI Assistant", true, false],
          ["Pre-meeting prep summaries", true, false],
          ["Auto action item capture", true, true],
        ],
      },
      {
        name: "CRM & Pipeline",
        rows: [
          ["Native CRM", true, false],
          ["Auto-pipeline stage movement based on conversational cues", true, false],
          ["CPQ & quote generation", true, false],
          ["Discount & approval workflows", true, false],
        ],
      },
      {
        name: "Reporting",
        rows: [
          ["Custom reports & dashboards", true, false],
          ["Formula fields & reporting datasets", true, false],
        ],
      },
      {
        name: "Integrations",
        rows: [
          ["Slack, Zoom, Google, Teams, public APIs, HubSpot (Reevo does not sync to SFDC)", true, true],
        ],
      },
    ],
  },
  gong: {
    name: "Gong",
    title: "Reevo: The best Gong alternative",
    description: "Gong delivers powerful conversation intelligence, but if you're looking to drive action across the full sales cycle from prospecting to pipeline, Reevo may be a better fit.",
    intro: ["Gong delivers powerful conversation intelligence, but if you're looking to drive action across the full sales cycle from prospecting to pipeline, ", { b: "Reevo may be a better fit." }, " Traditional platforms, like Gong, sell you features, then sprinkle in AI to keep up. Meanwhile, Reevo sells you the future: AI at the core, with features that serve its intelligence."],
    logo: {
      viewBox: "0 0 117 42",
      paths: [
        { d: "M36.981 18.057H25.848c-.614 0-1.093.682-.888 1.228l2.664 6.894c.137.273-.136.614-.478.614l-3.415-.205c-.137 0-.273.068-.41.205l-2.595 3.754c-.137.204-.41.273-.683.136l-3.962-2.662c-.136-.136-.341-.136-.546 0l-5.464 3.686c-.342.273-.82-.068-.683-.478l1.57-5.46a.464.464 0 0 0-.273-.546l-2.868-1.16c-.274-.137-.41-.478-.205-.683l2.527-3.14a.415.415 0 0 0 0-.545l-2.117-3.071c-.205-.273 0-.683.341-.683l3.347-.273c.273 0 .41-.205.41-.478l-.273-4.64c0-.342.341-.547.614-.478l4.098 1.706c.205.068.41 0 .547-.137l2.868-3.14c.205-.272.615-.204.752.137l1.707 4.368a.904.904 0 0 0 1.366.41l6.694-4.982c.751-.546.273-1.775-.683-1.638l-4.303.546c-.205 0-.41-.069-.478-.273L22.706 1.13c-.273-.614-1.024-.75-1.502-.273l-5.055 5.46a.531.531 0 0 1-.546.136L8.978 3.656c-.615-.273-1.23.137-1.298.82L7.407 11.3c0 .273-.205.41-.41.41l-6.079.41c-.683.067-1.093.818-.683 1.432l4.03 5.938a.415.415 0 0 1 0 .546l-4.098 4.71c-.342.34-.137 1.091.41 1.296L5.29 28.09a.464.464 0 0 1 .273.546l-3.005 11.67c-.205.82.75 1.434 1.434.956l11.27-8.054c.136-.136.341-.136.546 0l5.122 3.618c.41.273 1.025.204 1.298-.273l3.21-4.914c.069-.137.274-.205.41-.205l7.65.955c.615.069 1.23-.41 1.025-1.023l-3.21-8.259a.505.505 0 0 1 .273-.614l5.805-2.73c.82-.41.547-1.706-.41-1.706Z" },
        { d: "M116.689 18.057h-8.606c-.136 0-.341.136-.341.341v3.822c0 .137.136.341.341.341h3.689c.205 0 .341.137.341.342 0 1.979-.41 5.528-4.03 5.528-2.937 0-4.098-3.55-4.098-7.644 0-4.914 1.23-7.917 3.893-7.917 1.981 0 2.596 1.638 2.801 2.252.068.137.136.205.273.205h4.508c.205 0 .341-.137.341-.341-.205-2.457-2.254-6.757-7.786-6.757-3.893 0-7.513 2.389-8.674 8.19V8.91a.147.147 0 0 0-.137-.136h-4.78a.147.147 0 0 0-.138.136v13.377c0 .137-.204.205-.273.069L87.798 8.843c0-.068-.068-.068-.137-.068h-4.303a.147.147 0 0 0-.136.136v7.508c-1.571-4.778-5.806-8.19-11.27-8.19-6.147 0-10.723 4.231-11.748 9.896h-8.606a.147.147 0 0 0-.136.137v4.095c0 .068.068.136.136.136h4.03c.068 0 .137.068.137.137 0 1.91-.342 5.664-4.03 5.664-2.937 0-4.098-3.549-4.098-7.644 0-4.914 1.23-7.917 3.893-7.917 2.117 0 2.664 1.911 2.8 2.39 0 .067.069.136.137.136h4.781a.147.147 0 0 0 .137-.137c-.069-2.389-2.186-6.893-7.855-6.893-4.713 0-9.016 3.48-9.016 12.421 0 6.143 2.39 12.285 9.084 12.285 4.986 0 8.128-3.822 8.811-8.463 1.503 4.914 5.806 8.463 11.406 8.463 5.396 0 9.7-3.412 11.27-8.19v7.576c0 .068.068.137.137.137h4.78a.147.147 0 0 0 .137-.137v-13.24c0-.137.205-.205.274-.069l6.215 13.31c0 .067.068.067.137.067h4.234a.147.147 0 0 0 .137-.136v-7.508c.956 4.505 3.552 8.19 8.742 8.19 5.669 0 8.948-4.982 8.948-10.442v-4.095c.205-.205 0-.341-.137-.341Zm-44.805 9.896c-3.962 0-6.762-3.071-6.762-7.37 0-4.3 2.8-7.372 6.762-7.372 3.961 0 6.761 3.071 6.761 7.371 0 4.3-2.731 7.371-6.761 7.371Z" },
      ],
    },
    quick: [
      ["Best for", "Full-funnel sales execution", "Conversational intelligence"],
      ["System of record (i.e., CRM)", "Built-in CRM + sales workflow tools", "Integrates with external CRMs"],
      ["AI capabilities", "Faster, all-knowing AI that provides insights and automation across the platform", "Conversation-level deal insights"],
      ["Ideal team", "SMB & mid-market sales teams", "Mid-market to enterprise sales teams"],
    ],
    reasonsHeadline: "Why do customers choose Reevo over Gong?",
    reasonsBody: ["All of your rich meeting data flows directly into the opportunity record with no extra effort, because Reevo is an all-in-one solution. If you're using Gong, you'll need to buy and integrate a separate CRM or system of record. Some of your Gong call data might sync to that system, but much of it won’t."],
    reasons: [
      ["Covers the full sales motion", "While Gong is a leader in post-call analysis, Reevo helps reps from the first email to the final quote with built-in prospecting, outreach, scheduling, and pipeline tools."],
      ["Pre-call research built in", "Reevo automatically prepares you for every meeting with account context, deal history, and key talking points so you walk in ready to win. Gong offers no pre-meeting prep."],
      ["Fewer tools, faster ramp-up", "Reevo combines sales tools that often require multiple vendors—a sequence tool, dialer, CPQ system, CRM, and meeting prep—reducing onboarding and switching."],
      ["Embedded AI that drives action", "Reevo’s AI is faster and more comprehensive, giving reps an edge before, during, and after every call. Unlike Gong, Reevo connects insights across conversations—spotting patterns, surfacing objections, flagging risks, and tracking feature requests that span emails, calls, and meetings."],
    ],
    features: [
      {
        name: "Prospecting",
        rows: [
          ["Built-in prospecting database", true, false],
          ["Enrichment", true, false],
          ["Research agent", true, false],
          ["Domain purchasing & mailbox warm-up", true, false],
        ],
      },
      {
        name: "Email & Sequences",
        rows: [
          ["Automated email sequences", true, true],
          ["Smart email composer", true, true],
        ],
      },
      {
        name: "Scheduling & Dialer",
        rows: [
          ["Built-in scheduler with routing logic", true, true],
          ["Outbound/inbound dialer", true, true],
          ["Voicemail", true, true],
        ],
      },
      {
        name: "Call Intelligence",
        rows: [
          ["Call recording & transcription", true, true],
          ["Sentiment & topic tracking", true, true],
          ["Shareable snippets", true, true],
          ["Smart trackers", true, true],
        ],
      },
      {
        name: "AI Assist & Prep",
        rows: [
          ["Sales AI Assistant", true, true],
          ["Pre-meeting prep summaries", true, false],
          ["Auto action item capture", true, true],
        ],
      },
      {
        name: "CRM & Pipeline",
        rows: [
          ["Native CRM", true, false],
          ["Auto-pipeline stage movement based on conversational queues", true, false],
          ["CPQ & quote generation (Beta)", true, false],
        ],
      },
      {
        name: "Reporting",
        rows: [
          ["Custom reports & dashboards", true, true],
          ["Formula fields & reporting datasets", true, false],
        ],
      },
      {
        name: "Integrations",
        rows: [
          ["Slack, Zoom, Google, public APIs, Hubspot", true, true],
        ],
      },
    ],
  },
  hubspot: {
    name: "HubSpot",
    title: "Reevo: The best Hubspot alternative",
    description: "HubSpot is a powerful inbound marketing and CRM platform, but if you’re looking for a unified, AI-native system designed to run your entire sales motion from finding leads to closing deals, Reevo may be a better fit.",
    intro: ["HubSpot is a powerful inbound marketing and CRM platform, but if you’re looking for a unified, AI-native system designed to run your entire sales motion from finding leads to closing deals, ", { b: "Reevo may be a better fit." }, " While HubSpot was built for marketers and later expanded into sales, Reevo was designed from day one to be the modern revenue operating system with AI at the core and features built to act on its intelligence."],
    logo: {
      viewBox: "0 0 1255.82 355.99",
      paths: [
        { d: "M136.01 201.48H43.79v97.14H0V58.93h43.79v100.42h92.22V58.93h43.78v239.69h-43.78v-97.14zM319.91 221.14c0 19.96-16.26 36.21-36.22 36.21s-36.21-16.24-36.21-36.21V118.48h-41.47v102.66c0 42.83 34.85 77.67 77.68 77.67s77.67-34.84 77.67-77.67V118.48h-41.45v102.66ZM627.6 129.05c0-21.05 13.93-27.72 29.18-27.72 12.28 0 28.53 9.35 39.14 20.71l27.19-32.06c-13.59-18.36-41.12-31.05-63.67-31.05-45.12 0-77.63 26.38-77.63 70.13 0 81.14 99.19 55.42 99.19 100.84 0 14.01-13.6 26.37-29.18 26.37-24.55 0-32.52-12.02-43.79-24.71l-30.19 31.38c19.25 23.71 43.13 35.74 71.66 35.74 42.79 0 77.29-26.71 77.29-68.46 0-90.15-99.18-62.1-99.18-101.16ZM1241.21 260.33c-24.54 0-31.5-10.61-31.5-26.87v-71.98h38.14V125h-38.14V76.9l-42.12 18.91v146.62c0 37.49 25.86 56.4 61.34 56.4 5.31 0 12.61-.34 16.6-1.33l10.29-37.81c-4.64.32-9.95.65-14.61.65ZM477.96 119.68c-20.57 0-34.92 5.97-48.79 19.58v-78.9h-41.6v146.23c0 54.73 39.57 92.22 84.04 92.22 49.43 0 92.73-38.15 92.73-89.56s-39.93-89.57-86.38-89.57Zm-.26 137.27c-26.06 0-47.18-21.12-47.18-47.18s21.12-47.18 47.18-47.18 47.18 21.12 47.18 47.18-21.12 47.18-47.18 47.18ZM929.59 207.09c0-51.41-43.31-89.56-92.73-89.56-44.46 0-84.04 37.49-84.04 92.22v146.23h41.6v-78.91c13.87 13.61 28.22 19.58 48.79 19.58 46.45 0 86.38-38.81 86.38-89.57Zm-39.46-.51c0 26.06-21.12 47.18-47.18 47.18s-47.18-21.12-47.18-47.18 21.12-47.18 47.18-47.18 47.18 21.12 47.18 47.18Z" },
        { d: "M1064.01 115.52V73.73c10.91-5.15 18.55-16.19 18.55-28.99v-.97c0-17.67-14.46-32.13-32.13-32.13h-.96c-17.67 0-32.13 14.46-32.13 32.13v.97c0 12.81 7.64 23.84 18.55 28.99v41.79c-16.24 2.51-31.08 9.21-43.32 19.06L877.84 45.33c.75-2.91 1.28-5.9 1.29-9.04C879.14 16.27 862.94.03 842.92 0c-20.02-.03-36.26 16.18-36.29 36.2-.02 20.02 16.18 36.26 36.2 36.29 6.52 0 12.56-1.84 17.85-4.85l112.86 87.79c-9.6 14.49-15.22 31.84-15.22 50.52s6.18 37.65 16.62 52.53l-34.32 34.32c-2.71-.81-5.53-1.38-8.51-1.38-16.45 0-29.78 13.33-29.78 29.78s13.34 29.78 29.78 29.78 29.78-13.33 29.78-29.78c0-2.98-.57-5.8-1.38-8.51l33.95-33.95c15.41 11.76 34.6 18.83 55.49 18.83 50.6 0 91.62-41.02 91.62-91.62 0-45.81-33.65-83.65-77.56-90.43Zm-14.07 137.4c-25.94 0-46.98-21.03-46.98-46.97s21.03-46.97 46.98-46.97 46.97 21.03 46.97 46.97-21.03 46.97-46.97 46.97Z" },
      ],
    },
    quick: [
      ["Best for", "Full-funnel sales execution", "Marketing automation & CRM"],
      ["System of record (i.e., CRM)", "Built-in CRM + sales workflow tools", "CRM with sales & marketing hubs"],
      ["AI capabilities", "Faster, all-knowing AI that drives insights and automation across the sales cycle", "AI-assisted content and CRM recommendations"],
      ["Ideal team", "SMB & mid-market sales teams", "Marketing-led teams and sales teams using inbound"],
    ],
    reasonsHeadline: "Why do customers choose Reevo over HubSpot?",
    reasonsBody: ["All of your rich meeting data flows directly into the opportunity record with no extra effort, because Reevo is an all-in-one solution. If you're using Gong, you'll need to buy and integrate a separate CRM or system of record. Some of your Gong call data might sync to that system, but much of it won’t."],
    reasons: [
      ["Built for outbound and inbound sales", "HubSpot is a leader in inbound marketing and CRM, but outbound sales is often an afterthought. Reevo is designed to cover the full sales motion from prospecting, outreach, scheduling, to pipeline management so sellers can start conversations, not just respond to them."],
      ["AI that works across every stage", "Reevo’s embedded AI connects insights across accounts, conversations, and deals to spot trends, surface objections, and track requests, so reps are always a step ahead. HubSpot’s AI focuses mainly on content generation, chat assistant, and lead scoring."],
      ["Fewer tools, faster action", "Reevo combines what often takes multiple HubSpot hubs, third-party add-ons, and integrations: a prospecting database, sales engagement tools, dialer, meeting prep and follow-up assistance, CPQ, and CRM—reducing ramp time and tool sprawl."],
    ],
    accent: "#f96a1a",
    callout: {
      img: "/assets/images/compare/hubspot.png",
      alt: "HubSpot logo",
      text: "HubSpot was built in a different era—long before AI was at the center of how go-to-market teams work. To get close to what modern teams need, you end up in a constant cycle of buying add-ons, stacking integrations, or paying for higher and higher tiers just to unlock basic functionality. Even then, the experience is fragmented, and the AI is bolted on after the fact. Reevo flips that model: it was purpose-built in the AI era, so the capabilities you need—prospecting, outreach, pre-meeting prep, call intelligence, pipeline management, and insights that connect across conversations—are included out of the box, in one unified platform.",
    },
  },
  outreach: {
    name: "Outreach",
    title: "Reevo: The best Outreach alternative",
    description: "Outreach is a leader in sales engagement, but if you want to run the entire revenue motion—from finding leads to closing deals—Reevo is built for that.",
    intro: ["Outreach is a leader in sales engagement, but if you want to run the entire revenue motion—from finding leads to closing deals—", { b: "Reevo is built for that." }, " Legacy platforms like Outreach add AI around their engagement tools, while Reevo starts with AI at the core, then builds every feature to serve it."],
    logo: {
      viewBox: "0 0 158 30",
      paths: [
        { d: "M84 25zM53 8.6c-1.5-.8-3.2-1.2-5.1-1.2s-3.5.4-5.1 1.2c-1.5.8-2.7 1.9-3.6 3.4-.9 1.4-1.3 3-1.3 4.7s.4 3.3 1.3 4.8c.9 1.4 2.1 2.6 3.6 3.4 1.5.8 3.2 1.3 5.1 1.3s3.5-.4 5.1-1.3c1.5-.8 2.7-2 3.6-3.4.9-1.4 1.3-3 1.3-4.8s-.4-3.3-1.3-4.7c-.9-1.4-2.1-2.6-3.6-3.4Zm.4 11.3c-.5.9-1.3 1.7-2.3 2.3-.9.6-2 .8-3.1.8s-2.2-.3-3.2-.8-1.8-1.3-2.3-2.3c-.6-1-.9-2-.9-3.2s.3-2.2.9-3.1c.6-.9 1.4-1.7 2.3-2.2 1-.5 2.1-.8 3.2-.8s2.2.3 3.1.8c1 .5 1.7 1.3 2.3 2.2.6.9.8 2 .8 3.1s-.3 2.2-.8 3.2ZM69.8 11.9v7.9c0 1.7-1.3 3.2-3.1 3.2s-3.1-1.4-3.1-3.2v-7.9h-3.4v7.8c0 4.6 3.3 6.3 6.6 6.3s6.6-1.7 6.6-6.3v-7.8H70ZM156.6 13.3c-.9-1-2.2-1.4-3.9-1.4-2.5 0-4.2 1-5.2 2.8V6.5H144v19.3h3.5v-6.9c0-1.2.3-2.1 1-2.9.7-.7 1.6-1.1 2.8-1.1 1 0 1.8.3 2.3.8.6.6.9 1.3.9 2.3v7.7h3.5V17c0-1.7-.5-3-1.4-3.9ZM123.3 14.2c-.5-.7-1.2-1.4-2-1.8-.8-.4-1.8-.6-2.8-.6s-2.5.3-3.5.9c-1 .6-1.8 1.4-2.4 2.5-.6 1.1-.9 2.3-.9 3.7s.3 2.7.9 3.7c.6 1.1 1.4 1.9 2.4 2.5 1 .6 2.2.9 3.6.9s2-.2 2.8-.6c.8-.4 1.5-1 2-1.8v2.2h3.5V11.9h-3.5v2.2Zm0 5.2c-.1 1.1-.5 2-1.3 2.7-.7.7-1.7 1-2.8 1s-2.2-.4-2.9-1.2c-.7-.8-1.1-1.8-1.1-3.1s.4-2.3 1.1-3.1c.7-.8 1.7-1.2 2.9-1.2s2 .3 2.8 1c.7.7 1.1 1.6 1.3 2.7v1ZM103.1 11.8c-1.4 0-2.7.3-3.8.9-1.1.6-2 1.5-2.6 2.5-.6 1.1-.9 2.3-.9 3.7s.3 2.6.9 3.7c.6 1.1 1.5 1.9 2.6 2.5 1.1.6 2.4.9 3.9.9s2.4-.2 3.4-.6c1-.4 1.9-1 2.6-1.8l-1.9-1.9c-.5.5-1.1.9-1.7 1.2-.7.3-1.4.4-2.1.4-1 0-1.9-.3-2.7-.8-.7-.6-1.2-1.3-1.4-2.3h10.5v-1c0-2.3-.6-4.1-1.7-5.3-1.1-1.3-2.9-1.9-5.1-1.9Zm-3.8 6c.2-1 .6-1.9 1.3-2.5.7-.6 1.5-.9 2.6-.9s2 .3 2.6.9c.7.6 1 1.4 1 2.4h-7.5ZM81.2 23c-.5 0-.9-.1-1.1-.4-.2-.3-.4-.7-.4-1.4v-6.3h4.1v-2.5h-4.1V8.2l-3.4.4v13.2c0 1.4.4 2.4 1.2 3.1.8.7 1.8 1.1 3 1.1s2.4-.3 3.6-1l-.8-2.6c-.8.4-1.5.6-2 .6ZM136.4 23.1c-1.2 0-2.1-.4-2.8-1.1-.7-.8-1.1-1.8-1.1-3s.4-2.2 1.1-3c.7-.8 1.7-1.1 2.8-1.1 1.5 0 2.8.5 3.7 1.5l2.1-2c-.6-.8-1.5-1.4-2.5-1.9-1-.4-2.2-.7-3.5-.7s-2.7.3-3.8.9c-1.1.6-2 1.4-2.6 2.5-.6 1.1-.9 2.3-.9 3.7s.3 2.6.9 3.7c.6 1.1 1.5 1.9 2.5 2.5 1.1.6 2.3.9 3.8.9s2.6-.2 3.7-.7c1-.5 1.9-1.2 2.5-2.1l-2.2-1.7c-.9 1.1-2.1 1.6-3.8 1.6ZM92.1 12.6c-.8.5-1.5 1.2-2 2.1V12h-3.5v13.9h3.5v-6.7c0-1.3.4-2.3 1.3-3.1.9-.8 2.1-1.1 3.5-1v-3.3c-1.1 0-2.1.3-2.9.7ZM14.3 0c-5 0-8.8 1.2-11 3.4C.9 5.7 0 8.5 0 11.6c0 5 2.6 10.4 6.3 14 1 .9 4.2 3.8 8.5 3.8s7.7-2.6 9.7-4.6c4-3.9 7.6-10.6 7.6-14.9s-1.1-4.1-2-5C26.6 1.5 19.2 0 14.3 0Zm6.2 17.6c-1.7 1.6-3.3 2.2-4.8 2.2s-3.1-.7-4.1-1.7c-1.1-1-2-2.8-2-4.5s.7-3 1.6-3.9c1.1-1 2.7-1.8 5.1-1.8s3.6.4 5.2 2c1 1 1.2 2.2 1.2 3s-.4 3.1-2.1 4.7Z" },
      ],
    },
    quick: [
      ["Best for", "Full-funnel sales execution", "Sales engagement & sequence management"],
      ["System of record", "Built-in CRM + sales workflow tools", "Integrates with external CRMs"],
      ["AI capabilities", "Faster, all-knowing AI that drives insights and automation across the platform", "AI assists in engagement optimization"],
      ["Ideal team", "SMB & mid-market sales teams", "Mid-market to enterprise SDR/BDR teams"],
    ],
    reasonsHeadline: "Why do customers choose Reevo over Outreach?",
    reasonsBody: ["With Reevo, every stage of the sales cycle lives in one place, from identifying prospects to sending quotes. Outreach focuses on engagement, meaning you’ll need multiple other tools to manage prospecting, CRM, pipeline, and quoting."],
    reasons: [
      ["One platform for the whole sales motion", "Outreach is powerful for outbound sequences, but Reevo also handles prospecting, research, calling, scheduling, pipeline management, quoting, and approvals—natively."],
      ["Fewer tools, faster execution", "Reevo replaces multiple vendors—sequence tool, dialer, CRM, CPQ, meeting prep—reducing cost, integrations, and onboarding time."],
      ["AI that connects the dots", "Reevo’s AI understands your pipeline end-to-end, spotting buying signals, surfacing objections, and preparing reps before meetings. It doesn’t just optimize sends, it accelerates the entire sales cycle."],
    ],
    features: [
      {
        name: "Prospecting",
        rows: [
          ["Built-in prospecting database", true, false],
          ["Intent signals & enrichment", true, false],
          ["Research agent", true, false],
        ],
      },
      {
        name: "Email & Sequences",
        rows: [
          ["Automated email sequences", true, true],
          ["Smart email composer", true, true],
          ["LinkedIn automation", true, false],
        ],
      },
      {
        name: "Scheduling & Dialer",
        rows: [
          ["Built-in scheduler with routing logic", true, true],
          ["Outbound/inbound dialer", true, true],
          ["Voicemail", true, true],
        ],
      },
      {
        name: "Call Intelligence",
        rows: [
          ["Call recording & transcription", true, true],
          ["Call outlines against MEDICC sales framework", true, false],
          ["Sentiment & topic tracking", true, true],
          ["Shareable snippets", true, true],
          ["Smart trackers", true, true],
        ],
      },
      {
        name: "AI Assist & Prep",
        rows: [
          ["Sales AI Assistant", true, true],
          ["Pre-meeting prep summaries", true, false],
          ["Auto action item capture", true, false],
        ],
      },
      {
        name: "CRM & Pipeline",
        rows: [
          ["Native CRM", true, false],
          ["Auto-pipeline stage movement based on conversational cues", true, false],
          ["CPQ & quote generation", true, false],
          ["Discount & approval workflows", true, false],
        ],
      },
      {
        name: "Reporting",
        rows: [
          ["Custom reports & dashboards", true, true],
          ["Formula fields & reporting datasets", true, false],
        ],
      },
      {
        name: "Integrations",
        rows: [
          ["Slack, Zoom, Google, Teams, public APIs, HubSpot (no SFDC sync)", true, true],
        ],
      },
    ],
  },
  salesforce: {
    name: "Salesforce",
    title: "Reevo: The best Salesforce alternative",
    description: "Salesforce has been the gold standard for CRM for over two decades, but it was built for a different era when manual data entry, endless customization, and a complex ecosystem of add-ons were the norm.",
    intro: ["Salesforce has been the gold standard for CRM for over two decades, but it was built for a different era when manual data entry, endless customization, and a complex ecosystem of add-ons were the norm. ", { b: "Reevo takes a different approach:" }, " AI at the core, an all-in-one sales execution platform, and clean data without the administrative burden. With Reevo, you don’t just store records—you accelerate deals."],
    logo: {
      viewBox: "0 0 92 64",
      paths: [
        { d: "M59.2 27.9c-.3-.5-.8-.7-1.5-.7s-1.2.2-1.5.7c-.3.5-.5 1.2-.5 2.1s.2 1.6.5 2.1.8.7 1.5.7 1.2-.2 1.5-.7c.3-.5.5-1.2.5-2.1 0-.9-.2-1.6-.5-2.1ZM23 30.6c-.3.2-.5.6-.5 1s0 .5.2.7l.3.3s.5.4 1.5.3c.8 0 1.4-.2 1.4-.2v-2.4s-.7-.1-1.4-.1c-1.1 0-1.5.4-1.5.4ZM36.4 27.2c-.7 0-1.2.3-1.5.8-.2.3-.4.8-.4 1.2h3.8c0-.5-.1-.9-.3-1.2-.3-.5-.8-.8-1.5-.8ZM78.8 27.2c-.7 0-1.2.3-1.5.8-.2.3-.4.8-.4 1.2h3.8c0-.5-.1-.9-.3-1.2-.3-.5-.8-.8-1.5-.8Z" },
        { d: "M72 8.7c-2.8 0-5.5.6-8 1.7-2.8-5-8.1-8.4-14.1-8.4s-8.6 1.9-11.6 5C35.1 2.7 30 0 24.2 0 14.4 0 6.5 7.9 6.5 17.7s.5 4.9 1.5 7C3.3 27.5.3 32.4.3 38.2c0 8.5 6.8 15.4 15.3 15.4s2.1-.1 3.1-.3c2.3 6.3 8.6 10.8 15.4 10.8s12.6-4.1 15.1-10c1.9.9 4 1.5 6.3 1.5 5.4 0 10.1-3 12.6-7.4 1.2.3 2.5.4 3.9.4 10.9 0 19.7-8.9 19.7-19.9S82.9 8.8 72 8.8ZM19.9 31.8c0 1.6-1.2 2.6-3 2.6s-1.8-.1-2.7-.6c-.2-.1-.4-.2-.5-.3 0 0-.1 0 0-.2l.4-1c0-.2.2-.1.2 0 0 0 .2.1.3.2 1.1.7 2.1.7 2.4.7.8 0 1.3-.4 1.3-1 0-.7-.8-.9-1.7-1.2h-.2c-1.2-.4-2.6-.9-2.6-2.5 0-1.5 1.2-2.5 2.9-2.5h.2c1 0 2 .3 2.7.7 0 0 .1.1 0 .2 0 0-.3.9-.4 1 0 .2-.2 0-.2 0-.6-.3-1.6-.6-2.4-.6s-1.2.4-1.2.9c0 .7.8.9 1.7 1.2h.2c1.2.4 2.5 1 2.5 2.5Zm7.7 1.9s0 .1-.1.2h-.4c-.2 0-.8.2-1.3.3-.5 0-1.1.1-1.6.1s-1 0-1.4-.1c-.4 0-.8-.3-1.1-.5-.3-.2-.5-.5-.7-.8-.2-.3-.2-.8-.2-1.2s0-.9.3-1.2c.2-.4.5-.6.8-.9.3-.2.7-.4 1.1-.5.4-.1.9-.2 1.3-.2h.8s.4 0 .9.1v-.2c0-.7-.2-1-.4-1.3-.3-.2-.7-.3-1.3-.3 0 0-1.3 0-2.3.5h-.2l-.4-1v-.2c.5-.4 1.6-.6 1.6-.6.4 0 1-.1 1.4-.1 1.1 0 1.9.2 2.4.7.6.5.9 1.3.9 2.3v4.8Zm3.5.3s0 .2-.1.2h-1.4s-.1 0-.1-.2V22.7s0-.2.1-.2H31s.1 0 .1.2V34Zm8.8-3.6c0 .1-.2.1-.2.1h-5.3c0 .8.2 1.4.6 1.8s1 .6 1.8.6c1.3 0 1.8-.2 2.2-.4h.2l.3 1v.2c-.3.2-1.1.5-2.7.5s-1.4-.1-1.9-.3c-.5-.2-1-.5-1.3-.9-.3-.4-.6-.8-.8-1.3-.2-.5-.2-1.1-.2-1.7s0-1.2.2-1.7.4-1 .7-1.4c.3-.4.7-.7 1.2-.9.5-.2 1.1-.3 1.8-.3s1.1.1 1.5.3c.3.2.7.4 1 .8.2.2.6.7.7 1.2.3 1.2.2 2.2.2 2.3Zm1.6 3.3c-.2-.1-.3-.2-.5-.3 0 0-.1 0 0-.2l.4-1c0-.2.2 0 .2 0s.2.1.3.2c1.1.7 2.1.7 2.4.7.8 0 1.3-.4 1.3-1 0-.7-.8-.9-1.7-1.2h-.2c-1.2-.4-2.6-.9-2.6-2.5 0-1.5 1.2-2.5 2.9-2.5h.2c1 0 2 .3 2.7.7 0 0 .1.1 0 .2 0 0-.3.9-.4 1 0 .2-.2 0-.2 0-.6-.3-1.6-.6-2.4-.6s-1.2.4-1.2.9c0 .7.8.9 1.7 1.2h.2c1.2.4 2.5 1 2.5 2.5 0 1.6-1.2 2.6-3 2.6s-1.8-.1-2.7-.6Zm12-6.5c0 .2-.2.2-.2.2h-1.8l-1.2 6.8c-.1.7-.3 1.3-.5 1.8s-.4.8-.7 1.2c-.3.3-.6.5-1 .7s-.8.2-1.3.2H46c-.2 0-.3 0-.5-.1 0 0-.1-.1 0-.2 0-.1.3-1 .4-1.1 0-.1.2 0 .2 0H47.4c.2 0 .3-.2.5-.4l.4-.8c.1-.3.2-.8.3-1.3l1.2-6.6h-1.2c-.1 0-.2 0-.2-.2l.2-1.1c0-.2.2-.2.2-.2H50v-.4c.2-1.1.6-1.9 1.1-2.4.5-.5 1.3-.8 2.2-.8h.7c.2 0 .3 0 .5.1s.1 0 0 .2l-.4 1.1s0 .1-.2 0H52.6c-.2 0-.3.2-.4.3-.1.1-.3.3-.4.6-.2.6-.3 1.2-.3 1.2h1.7c.1 0 .2 0 .2.2l-.2 1.1Zm7.8 4.5c-.1.5-.4 1-.7 1.4-.3.4-.7.7-1.2.9-.5.2-1 .3-1.7.3s-1.2-.1-1.7-.3c-.5-.2-.9-.5-1.2-.9s-.6-.8-.7-1.4c-.1-.5-.2-1.1-.2-1.7s0-1.2.2-1.7.4-1 .7-1.4.7-.7 1.2-.9c.5-.2 1-.3 1.7-.3s1.2.1 1.7.3c.5.2.9.5 1.2.9s.6.8.7 1.4c.2.5.2 1.1.2 1.7s0 1.2-.2 1.7Zm6.5-5.5c0 .1-.3.9-.4 1.1 0 0 0 .2-.2.1H65.9c-.2 0-.5.2-.7.4s-.3.5-.5.8c-.1.3-.2.9-.2 1.4v4s0 .2-.2.2h-1.4s-.2 0-.2-.2v-7.9s0-.2.1-.2h1.4s.1 0 .1.2v.6c.2-.3.6-.5.9-.7.3-.2.7-.3 1.4-.2.3 0 .8.1.9.2 0 0 .1 0 0 .2Zm6.7 7.7c-.6.2-1.4.4-2.2.4-1.4 0-2.4-.4-3.1-1.2s-1-1.8-1-3.1 0-1.2.3-1.7.4-1 .8-1.4c.3-.4.8-.7 1.3-.9.5-.2 1.1-.3 1.8-.3h1.2c.4 0 .8.2 1 .3 0 0 .1 0 .1.2-.2.4-.2.7-.4 1.1 0 .2-.2.1-.2.1-.5-.2-1-.2-1.7-.2s-1.4.2-1.7.8-.6 1.2-.6 2.1c0 1 .2 1.7.7 2.1.4.4 1 .7 1.8.7h.9c.3 0 .5-.1.7-.2h.2l.4 1.1v.2Zm7.8-3.5c0 .1-.1.1-.1.1h-5.3c0 .8.2 1.4.6 1.8.4.4 1 .6 1.8.6 1.3 0 1.8-.2 2.2-.4h.2l.4 1v.2c-.3.2-1.1.5-2.7.5s-1.4-.1-1.9-.3c-.5-.2-1-.5-1.3-.9-.3-.4-.6-.8-.8-1.3-.2-.5-.2-1.1-.2-1.7s0-1.2.2-1.7.4-1 .7-1.4c.3-.4.7-.7 1.2-.9.5-.2 1.1-.3 1.8-.3s1.1.1 1.5.3c.3.2.7.4 1 .8.2.2.6.7.7 1.2.3 1.2.2 2.2.2 2.3Z" },
      ],
    },
    quick: [
      ["Best for", "Full-funnel sales execution", "CRM and extensible app platform"],
      ["System of record (i.e., CRM)", "Built-in CRM + sales workflow tools", "CRM only; requires separate tools for sales engagement"],
      ["AI capabilities", "Faster, all-knowing AI that provides insights and automation across the platform", "AI features via add-ons (Einstein) layered onto existing workflows"],
      ["Ideal team", "SMB & mid-market sales teams", "Mid-market to enterprise teams with admin resources"],
    ],
    reasonsHeadline: "Why do customers choose Reevo over Salesforce?",
    reasonsBody: ["All of your sales workflows—prospecting, outreach, scheduling, pipeline management—live in one place with Reevo. With Salesforce, the CRM is just the starting point: you’ll need to buy, integrate, and maintain multiple sales engagement tools to execute your full motion."],
    reasons: [
      ["Covers the full sales motion", "Salesforce is a powerful system of record, but Reevo helps reps from the first email to the signed contract with built-in prospecting, engagement, meeting prep, and pipeline tools."],
      ["Fewer tools, faster ramp-up", "Reevo replaces a patchwork of apps: sequence tools, dialers, CPQ systems, and analytics platforms. That means lower costs, simpler onboarding, and no integration headaches."],
      ["Embedded AI that drives action", "Reevo’s AI is native and ever-present—spotting trends across conversations, enriching leads, and preparing reps before every meeting. With Salesforce, AI lives in a separate layer (Einstein), requiring configuration and extra spend."],
    ],
    accent: "#2044b2",
    callout: {
      img: "/assets/images/compare/salesforce.png",
      alt: "Salesforce logo",
      text: "Salesforce was built in a different era—long before AI was at the center of how go-to-market teams work. To get close to what modern teams need, you end up in a constant cycle of buying add-ons, stacking integrations, or paying for higher and higher tiers just to unlock basic functionality. Even then, the experience is fragmented, and the AI is bolted on after the fact. Reevo flips that model: it was purpose-built in the AI era, so the capabilities you need—prospecting, outreach, pre-meeting prep, call intelligence, pipeline management, and insights that connect across conversations—are included out of the box, in one unified platform.",
    },
  },
}

export function getCompetitor(slug) {
  const key = String(slug || '').toLowerCase()
  return COMPETITORS[key] || COMPETITORS[DEFAULT_COMPETITOR]
}
