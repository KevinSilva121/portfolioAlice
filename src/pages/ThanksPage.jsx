import { Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { whatsappLink } from '../config/site';
import '../components/Page.css';

// Destino do formulário (FormSubmit `_next`). Não é indexada (noindex no <head>).
export default function ThanksPage() {
  return (
    <main className="status-page">
      <CheckCircle2 size={56} className="status-icon" aria-hidden="true" />
      <h1>Mensagem enviada!</h1>
      <p>Obrigado pelo contato. A Dra. Alice vai responder pelo e-mail ou telefone informados. Se preferir, você também pode falar pelo WhatsApp.</p>
      <div className="status-actions">
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          <MessageCircle size={18} aria-hidden="true" /> WhatsApp
        </a>
        <Link to="/blog" className="btn btn-outline">Ler artigos do blog</Link>
        <Link to="/" className="btn btn-outline">Voltar ao início</Link>
      </div>
    </main>
  );
}
