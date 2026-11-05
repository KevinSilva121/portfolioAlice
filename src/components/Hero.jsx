import { Scale, ChevronRight } from 'lucide-react';
import SectionLink from './SectionLink';
import { m as Motion } from 'framer-motion';
import { useIsClient } from '../hooks/useClient';
import heroBackground from '../assets/img/bg-law.webp';
import './Hero.css';

// Partículas sorteadas uma vez por visita, só no navegador (no HTML do build não existem,
// para não haver diferença entre o HTML gerado e o que o React monta).
let particleCache;
function getParticles() {
  if (!particleCache) {
    particleCache = Array.from({ length: 25 }, () => ({
      size: Math.random() * 4 + 1,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      peak: Math.random() * 0.5 + 0.2,
      path: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 10,
    }));
  }
  return particleCache;
}

const Hero = () => {
  const isClient = useIsClient();

  return (
    <section id="home" className="hero">
      <Motion.div
        className="hero-background-image"
        style={{ backgroundImage: `url(${heroBackground})` }}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      ></Motion.div>
      <div className="hero-overlay"></div>

      {/* Animated glowing particles */}
      <div className="particles-container" aria-hidden="true">
        {isClient && getParticles().map((p, i) => (
          <Motion.div
            key={i}
            className="particle"
            initial={{ opacity: 0, y: p.startY + "vh", x: p.startX + "vw" }}
            animate={{
              opacity: [0, p.peak, 0],
              y: [p.path[0] + "vh", p.path[1] + "vh"],
              x: [p.path[2] + "vw", p.path[3] + "vw"],
            }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }}
            style={{ width: p.size + "px", height: p.size + "px" }}
          />
        ))}
      </div>

      <div className="container hero-content">
        <div className="hero-badge hero-reveal">
          <Scale size={16} /> Advocacia e Consultoria Jurídica | OAB/SP 529.641
        </div>

        <h1 className="hero-title hero-reveal" style={{ animationDelay: '0.2s' }}>
          Protegendo seus direitos,<br />
          <span className="hero-highlight">construindo soluções.</span>
        </h1>

        <p className="hero-subtitle hero-reveal" style={{ animationDelay: '0.4s' }}>
          Atendimento humanizado e estratégico em Direito do Trabalho, Previdenciário, Cível e de Família.
        </p>

        <div className="hero-actions hero-reveal" style={{ animationDelay: '0.6s' }}>
          <SectionLink section="contact-form" className="btn btn-primary">
            Solicite uma análise do seu caso <ChevronRight size={18} />
          </SectionLink>
          <SectionLink section="expertise" className="btn btn-outline">
            Conheça as Áreas de Atuação
          </SectionLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
