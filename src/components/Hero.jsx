import { Link } from 'react-scroll';
import { Scale, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <motion.div 
        className="hero-background-image"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      ></motion.div>
      <div className="hero-overlay"></div>
      
      {/* Animated glowing particles */}
      <div className="particles-container">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              opacity: 0,
              y: Math.random() * 100 + "vh",
              x: Math.random() * 100 + "vw",
            }}
            animate={{
              opacity: [0, Math.random() * 0.5 + 0.2, 0],
              y: [Math.random() * 100 + "vh", Math.random() * 100 + "vh"],
              x: [Math.random() * 100 + "vw", Math.random() * 100 + "vw"],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
            }}
          />
        ))}
      </div>

      <div className="container hero-content">
        <div className="hero-badge animate-on-scroll">
          <Scale size={16} /> Advocacia e Consultoria Jurídica | OAB/SP 529.641
        </div>
        
        <h1 className="hero-title animate-on-scroll" style={{ animationDelay: '0.2s' }}>
          Protegendo seus direitos,<br />
          <span className="hero-highlight">construindo soluções.</span>
        </h1>
        
        <p className="hero-subtitle animate-on-scroll" style={{ animationDelay: '0.4s' }}>
          Atendimento humanizado e estratégico em Direito do Trabalho, Previdenciário, Cível e de Família.
        </p>
        
        <div className="hero-actions animate-on-scroll" style={{ animationDelay: '0.6s' }}>
          <Link to="contact-form" smooth={true} offset={-120} duration={500} className="btn btn-primary">
            Solicite uma análise do seu caso <ChevronRight size={18} />
          </Link>
          <Link to="expertise" smooth={true} offset={-120} duration={500} className="btn btn-outline">
            Conheça as Áreas de Atuação
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
