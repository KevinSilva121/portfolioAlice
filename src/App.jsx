import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import CustomCursor from './components/CustomCursor';
import ScrollManager from './components/ScrollManager';
import PageLoading from './components/PageLoading';
import HeadManager from './seo/HeadManager';
import useScrollReveal from './hooks/useScrollReveal';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DocPage from './pages/DocPage';
import ThanksPage from './pages/ThanksPage';
import NotFound from './pages/NotFound';
import { areas, services, areaPath, servicePath, getPage } from './content';
import './App.css';

// O roteador (BrowserRouter no navegador, StaticRouter no build) fica em main.jsx / entry-server.jsx.
function App() {
  useScrollReveal();

  return (
    // LazyMotion + `m`: mesmas animações do framer-motion com bem menos JavaScript.
    <LazyMotion features={domAnimation}>
      <ScrollManager />
      <HeadManager />
      <div className="app-wrapper">
        <CustomCursor />
        <Navbar />
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            {areas.map((area) => (
              <Route key={area.slug} path={areaPath(area.slug)} element={<LandingPage collection="areas" slug={area.slug} />} />
            ))}
            {services.map((service) => (
              <Route
                key={`${service.area}/${service.slug}`}
                path={servicePath(service)}
                element={<LandingPage collection="servicos" slug={service.slug} />}
              />
            ))}
            {getPage('sobre') && <Route path="/sobre" element={<AboutPage />} />}
            {getPage('privacidade') && <Route path="/privacidade" element={<DocPage slug="privacidade" />} />}
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/obrigado" element={<ThanksPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </LazyMotion>
  );
}

export default App;
