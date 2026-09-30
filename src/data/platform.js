// Product columns and Foundation list shared by the home "built different" block and the /startups toolkit.
import {
  Banknote, Boxes, CalendarCheck, ChartColumn, Combine, Crown, Database, Disc, FileSearch, FolderSearch, Import, Inbox, LayoutDashboard, ListChecks, MessageCircleQuestion, MessageSquareReply, RefreshCw, SearchCheck, Signal, Speech, SquareStack, TrendingUp, UserSearch, Workflow,
} from 'lucide-react'

export const COLUMNS = [
  {
    title: 'Find', href: '/products/find', chip: 'bg-orange-3',
    items: [
      ['TAM sourcing', Combine], ['Contact enrichment', UserSearch], ['Company enrichment', FolderSearch],
      ['Intent signals', Signal, true], ['Lead scoring', Crown, true],
    ],
  },
  {
    title: 'Connect', href: '/products/connect', chip: 'bg-pink-3',
    items: [
      ['Domain purchase', Banknote], ['Inbox warming', Inbox], ['Sequence & dial', SquareStack],
      ['Smart scheduler', CalendarCheck], ['Reply tracking', MessageSquareReply],
    ],
  },
  {
    title: 'Sell', href: '/products/sell', chip: 'bg-green-3',
    items: [['Meeting prep', FileSearch], ['Call recording', Disc], ['Transcription', SearchCheck], ['Smart task logging', ListChecks]],
  },
  {
    title: 'Manage', href: '/products/manage', chip: 'bg-yellow-3',
    items: [['Auto-deal update', RefreshCw], ['Forecasting', TrendingUp], ['Reporting', ChartColumn], ['Coaching insights', Speech]],
  },
]

export const FOUNDATION = [
  ['AI-native CRM', Database], ['Ask Reevo', MessageCircleQuestion], ['Custom objects & relationships', Boxes],
  ['Workflow automation', Workflow], ['Command center', LayoutDashboard], ['One-click migration', Import],
]
