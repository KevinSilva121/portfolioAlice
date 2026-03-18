import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import FAQ from './components/FAQ';
import UsefulLinks from './components/UsefulLinks';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import CustomCursor from './components/CustomCursor';
import BlogSection from './components/BlogSection';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import './App.css';

// Componente para rolar a tela pro topo quando a rota muda
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout Principal (Landing Page)
const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Hero />
      <About />
      <Expertise />
      <BlogSection />
      <FAQ />
      <UsefulLinks />
      <ContactForm />
    </main>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-wrapper">
        <CustomCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}

export default App;
