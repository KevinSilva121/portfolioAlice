import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="container footer-content animate-on-scroll">
        <div className="footer-col brand-col">
          <h2 className="footer-logo">
            Alice <span>Camargo</span>
          </h2>
          <p className="footer-desc">
            Advocacia dedicada, ética e estratégica em Taubaté e região. Agende uma consulta para proteger seus direitos.
          </p>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/alice-gabriela-camargo-93ba7819a/" target="_blank" rel="noopener noreferrer" className="social-icon">
              In
            </a>
          </div>
        </div>
        
        <div className="footer-col contact-col">
          <h3 className="footer-title">Contato Direto</h3>
          <ul className="contact-list">
            <li>
              <MapPin size={20} className="icon" />
              <span>Taubaté, São Paulo, Brasil</span>
            </li>
            <li>
              <Mail size={20} className="icon" />
              <a href="mailto:alicegabrielacamargo@adv.oabsp.org.br">Contato via E-mail</a>
            </li>
            <li className="whatsapp-line">
              <MessageCircle size={20} className="icon" />
              <a href="https://wa.me/5512997748723?text=Olá Dra. Alice! Gostaria de agendar uma consulta." target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                Fale pelo WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Alice Gabriela Camargo. Todos os direitos reservados. OAB/SP 529.641</p>
          <p className="developer-credit">Desenvolvido por <span>InnovateApps Co.</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
