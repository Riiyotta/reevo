import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
const About = lazy(() => import('./pages/About.jsx'))
const AppsMobile = lazy(() => import('./pages/AppsMobile.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const BotForSlackSetup = lazy(() => import('./pages/BotForSlackSetup.jsx'))
const Careers = lazy(() => import('./pages/Careers.jsx'))
const Compare = lazy(() => import('./pages/Compare.jsx'))
const GetStarted = lazy(() => import('./pages/GetStarted.jsx'))
const Integrations = lazy(() => import('./pages/Integrations.jsx'))
const Newsletter = lazy(() => import('./pages/Newsletter.jsx'))
const Partners = lazy(() => import('./pages/Partners.jsx'))
const Pricing = lazy(() => import('./pages/Pricing.jsx'))
const ProductTour = lazy(() => import('./pages/ProductTour.jsx'))
const ProductFind = lazy(() => import('./pages/ProductFind.jsx'))
const ProductConnect = lazy(() => import('./pages/ProductConnect.jsx'))
const ProductSell = lazy(() => import('./pages/ProductSell.jsx'))
const ProductManage = lazy(() => import('./pages/ProductManage.jsx'))
const ProductFoundation = lazy(() => import('./pages/ProductFoundation.jsx'))
const ReleaseNotes = lazy(() => import('./pages/ReleaseNotes.jsx'))
const Startups = lazy(() => import('./pages/Startups.jsx'))
const StartupsApply = lazy(() => import('./pages/StartupsApply.jsx'))
const ZoomSetup = lazy(() => import('./pages/ZoomSetup.jsx'))

// Document titles by route. Compare and blog-post pages set their own from data.
const TITLES = {
  '/': 'Reevo | The AI-Native Sales Platform',
  '/about': 'About Reevo | A CRM so complete you can retire your sales stack',
  '/careers': 'Careers at Reevo | Build the Future of Revenue Technology',
  '/partners': 'Partner with Reevo | Reevo',
  '/startups': 'Startup Program | Build Your GTM Stack with Reevo',
  '/startups-apply-now': 'Reevo for Startups | Reevo',
  '/newsletter': 'The GTM Source Newsletter | Sales & Revenue Insights',
  '/release-notes': "Reevo's release notes: new features and releases | Reevo",
  '/apps/mobile': 'Mobile CRM App for Sales Teams | Reevo',
  '/bot-for-slack-setup': 'Reevo Bot for Slack',
  '/zoom-setup': 'Connect Reevo to Zoom',
  '/pricing': 'Reevo Pricing & Plans | Core, Pro & Enterprise',
  '/blog': 'Insights & News | Reevo',
  '/get-started': 'Get Started | Reevo',
  '/product-tour': 'Reevo Product Tour | See the AI-Native Sales Platform',
  '/integrations': 'Integrate 1,300+ tools and sell faster | Reevo',
  '/products/find': 'B2B Sales Prospecting & Data Enrichment Software | Reevo',
  '/products/connect': 'Sales Engagement Platform & Sequencing Software | Reevo',
  '/products/sell': 'Conversation Intelligence Software for Sales | Reevo',
  '/products/manage': 'Sales Forecasting & Pipeline Management Software | Reevo',
  '/products/foundation': 'AI-Native CRM & Sales Automation Software | Reevo',
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PageTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/'
    if (TITLES[path]) document.title = TITLES[path]
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageTitle />
      <Navbar />
      <Suspense fallback={<main className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/apps/mobile" element={<AppsMobile />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/bot-for-slack-setup" element={<BotForSlackSetup />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/compare/:competitor" element={<Compare />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/product-tour" element={<ProductTour />} />
          <Route path="/products/find" element={<ProductFind />} />
          <Route path="/products/connect" element={<ProductConnect />} />
          <Route path="/products/sell" element={<ProductSell />} />
          <Route path="/products/manage" element={<ProductManage />} />
          <Route path="/products/foundation" element={<ProductFoundation />} />
          <Route path="/release-notes" element={<ReleaseNotes />} />
          <Route path="/startups" element={<Startups />} />
          <Route path="/startups-apply-now" element={<StartupsApply />} />
          <Route path="/zoom-setup" element={<ZoomSetup />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}
