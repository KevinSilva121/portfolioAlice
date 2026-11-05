import Hero from '../components/Hero';
import About from '../components/About';
import Expertise from '../components/Expertise';
import FAQ from '../components/FAQ';
import UsefulLinks from '../components/UsefulLinks';
import ContactForm from '../components/ContactForm';
import BlogSection from '../components/BlogSection';

// Landing page. As animações de entrada (.animate-on-scroll) agora são ativadas no App (useScrollReveal).
export default function Home() {
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
}
