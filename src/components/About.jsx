import { Link } from 'react-router-dom';
import { Award, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import alice480 from '../assets/img/alice-480.webp';
import alice800 from '../assets/img/alice-800.webp';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">A Profissional</h2>
        <p className="section-subtitle animate-on-scroll">Conheça o perfil da advogada que irá defender os seus interesses com dedicação e excelência.</p>
        
        <div className="about-grid">
          <div className="about-image-wrapper animate-on-scroll">
            <div className="image-frame">
              {/* Foto otimizada (WebP) gerada por scripts/optimize-images.js a partir de public/alice.png */}
              <img
                src={alice800}
                srcSet={`${alice480} 480w, ${alice800} 800w`}
                sizes="(max-width: 768px) 90vw, 560px"
                width="800"
                height="800"
                loading="lazy"
                decoding="async"
                alt="Dra. Alice Gabriela Camargo, advogada OAB/SP 529.641"
                className="about-image"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div className="image-placeholder" style={{ display: 'none', backgroundColor: '#334155', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', fontFamily: 'Playfair Display' }}>
                <h3>A. C.</h3>
              </div>
            </div>
            <div className="experience-badge">
              <span className="badge-number">5+</span>
              <span className="badge-text">Anos na<br />Área Jurídica</span>
            </div>
          </div>
          
          <div className="about-content animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <h3 className="about-heading">Dra. Alice Gabriela Camargo</h3>
            <p className="about-oab">OAB/SP 529.641 | Taubaté, São Paulo, Brasil</p>
            
            <p className="about-text">
              Minha atuação pauta-se no atendimento humanizado, entendendo que cada caso é único e que por trás de cada processo existe uma história. Busco entregar não apenas uma solução jurídica, mas segurança e tranquilidade para meus clientes.
            </p>
            
            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon"><GraduationCap size={24} /></div>
                <div>
                  <h4>Bacharel e Especialista</h4>
                  <p>Graduação pela Universidade de Taubaté (UNITAU).</p>
                </div>
              </div>
              
              <div className="highlight-item">
                <div className="highlight-icon"><Briefcase size={24} /></div>
                <div>
                  <h4>Atuação Multidisciplinar</h4>
                  <p>Direito do Trabalho, Previdenciário, Cível e de Família.</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon"><Award size={24} /></div>
                <div>
                  <h4>Certificada e Aprovada</h4>
                  <p>Exame da Ordem (mar/2025) e Compliance Trabalhista (jan/2026).</p>
                </div>
              </div>
            </div>

            <Link to="/sobre" className="text-link about-more">
              Conheça a trajetória da Dra. Alice <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
