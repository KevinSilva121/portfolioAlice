import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SITE, whatsappLink } from '../config/site';
import { areas, areaPath } from '../content';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="container footer-content animate-on-scroll">
        <div className="footer-col brand-col">
          <p className="footer-logo">
            Alice <span>Camargo</span>
          </p>
          <p className="footer-desc">
            Advocacia dedicada, ética e estratégica em Taubaté e região, com atendimento online em todo o Brasil. Agende uma consulta para proteger seus direitos.
          </p>
          <div className="social-links">
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn da Dra. Alice Camargo">
              In
            </a>
            <a href={SITE.googleProfile} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Perfil da Dra. Alice Camargo no Google">
              G
            </a>
          </div>
        </div>

        {areas.length > 0 && (
          <nav className="footer-col" aria-label="Áreas de atuação">
            <h2 className="footer-title">Áreas de Atuação</h2>
            <ul className="footer-links">
              {areas.map((area) => (
                <li key={area.slug}>
                  <Link to={areaPath(area.slug)}>{area.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <nav className="footer-col" aria-label="Institucional">
          <h2 className="footer-title">Institucional</h2>
          <ul className="footer-links">
            <li><Link to="/sobre">Sobre a Dra. Alice</Link></li>
            <li><Link to="/blog">Blog Jurídico</Link></li>
            <li><Link to="/contato">Contato</Link></li>
            <li><Link to="/privacidade">Política de Privacidade</Link></li>
          </ul>
        </nav>

        <div className="footer-col contact-col">
          <h2 className="footer-title">Contato Direto</h2>
          <ul className="contact-list">
            <li>
              <MapPin size={20} className="icon" aria-hidden="true" />
              <span>Taubaté e região (SP) · Online em todo o Brasil</span>
            </li>
            <li>
              <Phone size={20} className="icon" aria-hidden="true" />
              <a href={`tel:${SITE.phoneE164}`}>{SITE.phoneDisplay}</a>
            </li>
            <li>
              <Mail size={20} className="icon" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`}>Contato via E-mail</a>
            </li>
            <li className="whatsapp-line">
              <MessageCircle size={20} className="icon" aria-hidden="true" />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                Fale pelo WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p suppressHydrationWarning>&copy; {new Date().getFullYear()} Alice Gabriela Camargo. Todos os direitos reservados. OAB/SP 529.641</p>
          <p className="developer-credit">
            Desenvolvido por{' '}
            <a href="https://innovateapps.com.br/" target="_blank" rel="noopener">InnovateApps Co.</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
