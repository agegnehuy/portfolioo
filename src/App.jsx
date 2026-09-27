import PropTypes from "prop-types";
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Footer from "./components/Footer";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ArticlePage, FAQPage, HomeAdditions, InsightsPage, TestimonialsSection, PrivacyPage, ProcessPage, ServiceDetailPage, ServicesPage, TermsPage } from "./Pages/BriefPages";

const Portofolio = lazy(() => import("./Pages/Portofolio"));
const ContactPage = lazy(() => import("./Pages/Contact"));
const ProjectDetails = lazy(() => import("./components/ProjectDetail"));
const WelcomeScreen = lazy(() => import("./Pages/WelcomeScreen"));
const NotFoundPage = lazy(() => import("./Pages/404"));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "auto" });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}

const SiteLayout = ({ children }) => <><Navbar />{children}<Footer /></>;

const LandingPage = ({ showWelcome, setShowWelcome }) => <>
  <SiteLayout><main id="main-content"><Home /><About /><HomeAdditions /><TestimonialsSection /><Suspense fallback={<div className="h-20" aria-label="Loading portfolio content" />}><Portofolio /><ContactPage /></Suspense></main></SiteLayout>
  <AnimatePresence>{showWelcome && <Suspense fallback={null}><WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} /></Suspense>}</AnimatePresence>
</>;

const ProjectPageLayout = () => <SiteLayout><main id="main-content"><Suspense fallback={<div className="min-h-screen" />}><ProjectDetails /></Suspense></main></SiteLayout>;
const PublicPage = ({ children }) => <SiteLayout>{children}</SiteLayout>;
SiteLayout.propTypes = { children: PropTypes.node.isRequired };
LandingPage.propTypes = { showWelcome: PropTypes.bool.isRequired, setShowWelcome: PropTypes.func.isRequired };
PublicPage.propTypes = { children: PropTypes.node.isRequired };

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  return <HelmetProvider>
    <div className="pointer-events-none"><AnimatedBackground /></div>
    <BrowserRouter>
      <a href="#main-content" className="fixed left-3 top-3 z-[100] -translate-y-24 focus:translate-y-0 rounded-lg bg-white px-4 py-2 text-black transition">Skip to main content</a>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:slug" element={<ProjectPageLayout />} />
        <Route path="/services" element={<PublicPage><ServicesPage /></PublicPage>} />
        <Route path="/services/:slug" element={<PublicPage><ServiceDetailPage /></PublicPage>} />
        <Route path="/process" element={<PublicPage><ProcessPage /></PublicPage>} />
        <Route path="/insights" element={<PublicPage><InsightsPage /></PublicPage>} />
        <Route path="/insights/:slug" element={<PublicPage><ArticlePage /></PublicPage>} />
        <Route path="/faq" element={<PublicPage><FAQPage /></PublicPage>} />
        <Route path="/privacy" element={<PublicPage><PrivacyPage /></PublicPage>} />
        <Route path="/terms" element={<PublicPage><TermsPage /></PublicPage>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<Suspense fallback={null}><NotFoundPage /></Suspense>} />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>;
}
export default App;
