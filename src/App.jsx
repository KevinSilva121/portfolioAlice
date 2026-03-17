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
import './App.css';

function App() {
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
    <div className="app-wrapper">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <FAQ />
        <UsefulLinks />
        <ContactForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default App;
