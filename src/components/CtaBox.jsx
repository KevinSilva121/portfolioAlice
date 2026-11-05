import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { SITE, whatsappLink } from '../config/site';

// Chamada para contato sóbria (Provimento 205/2021 da OAB: informativa, sem promessa de resultado).
export default function CtaBox({
  title = 'Precisa de orientação sobre o seu caso?',
  text = `A ${SITE.lawyerShort} atende online em todo o Brasil e presencialmente, com agendamento, em Taubaté e região.`,
  message,
}) {
  return (
    <aside className="cta-box animate-on-scroll" aria-label="Contato">
      <div>
        <h2 className="cta-box-title">{title}</h2>
        <p className="cta-box-text">{text}</p>
      </div>
      <div className="cta-box-actions">
        <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          <MessageCircle size={18} aria-hidden="true" /> Conversar pelo WhatsApp
        </a>
        <Link to="/contato" className="btn btn-outline">Outras formas de contato</Link>
      </div>
    </aside>
  );
}
