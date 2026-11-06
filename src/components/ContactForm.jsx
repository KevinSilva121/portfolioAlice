import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, MapPin, Phone, Send, MessageCircle, AlertTriangle } from 'lucide-react';
import { SITE, CONTACT_FORM, whatsappLink } from '../config/site';
import './ContactForm.css';

// Monta a mesma mensagem para WhatsApp/e-mail quando o envio pelo formulário falha.
function fallbackText({ name, phone, message }) {
  return [
    'Olá Dra. Alice!',
    name && `Meu nome é ${name}.`,
    phone && `Telefone: ${phone}.`,
    message,
  ].filter(Boolean).join(' ');
}

const ContactForm = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const [draft, setDraft] = useState(null);

  // Envio em segundo plano: se o serviço de formulário demorar ou falhar, a pessoa não fica presa
  // numa tela de erro; aparece a opção de mandar o mesmo texto por WhatsApp ou e-mail.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.elements._honey.value) return; // robô de spam

    const data = new FormData(form);
    const values = { name: data.get('name'), phone: data.get('phone'), message: data.get('message') };
    setDraft(values);
    setStatus('sending');

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), CONTACT_FORM.timeoutMs);
    try {
      const response = await fetch(CONTACT_FORM.endpoint, {
        method: 'POST',
        body: new URLSearchParams(data),
        headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
        signal: controller.signal,
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok !== true) throw new Error(result.error || `HTTP ${response.status}`);
      navigate('/obrigado');
    } catch {
      setStatus('error');
    } finally {
      clearTimeout(timer);
    }
  };

  const sending = status === 'sending';
  const text = draft ? fallbackText(draft) : '';

  return (
    <section id="contact-form" className="section contact-form-section">
      <div className="container">
        <div className="contact-form-wrapper animate-on-scroll">
          <div className="form-info">
            <h2 className="section-title text-left">Fale Conosco</h2>
            <p className="form-subtitle">Sua causa merece atenção especializada e tratamento humanizado. Preencha seus dados preliminares e nossa equipe jurídica entrará em contato para agendar uma consulta.</p>

            <div className="form-contact-methods">
              <div className="method">
                <Mail className="method-icon" aria-hidden="true" />
                <div>
                  <h3>E-mail</h3>
                  <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
                </div>
              </div>
              <div className="method">
                <Phone className="method-icon" aria-hidden="true" />
                <div>
                  <h3>Telefone / WhatsApp</h3>
                  <p><a href={`tel:${SITE.phoneE164}`}>{SITE.phoneDisplay}</a></p>
                </div>
              </div>
              <div className="method">
                <MapPin className="method-icon" aria-hidden="true" />
                <div>
                  <h3>Atendimento</h3>
                  <p>Taubaté e região (com agendamento) | Online em todo o Brasil</p>
                </div>
              </div>
            </div>
          </div>

          <form
            className="form-content"
            action={CONTACT_FORM.endpoint}
            method="POST"
            onSubmit={handleSubmit}
          >
            {/* Página de onde o contato foi enviado (aparece no e-mail para a Dra. Alice) */}
            <input type="hidden" name="page" value={pathname} />
            {/* Honeypot anti-spam */}
            <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                autoComplete="name"
                placeholder="Como prefere ser chamado?"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefone / WhatsApp</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  autoComplete="tel"
                  placeholder="(12) 90000-0000"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Sua Mensagem</label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
                placeholder="Descreva brevemente sua situação para nossa análise prévia..."
              ></textarea>
            </div>

            <p className="form-privacy">
              Seus dados são usados apenas para responder ao seu contato. Saiba mais na{' '}
              <Link to="/privacidade">Política de Privacidade</Link>.
            </p>

            <button type="submit" className="btn btn-primary submit-btn" disabled={sending} aria-busy={sending}>
              {sending ? 'Enviando...' : <>Enviar Mensagem <Send size={18} aria-hidden="true" /></>}
            </button>

            {status === 'error' && (
              <div className="form-fallback" role="alert">
                <p className="form-fallback-title">
                  <AlertTriangle size={18} aria-hidden="true" /> Não conseguimos enviar pelo formulário agora.
                </p>
                <p>Para não perder seu contato, envie a mesma mensagem por um destes canais (o texto já vai preenchido):</p>
                <div className="form-fallback-actions">
                  <a href={whatsappLink(text)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <MessageCircle size={18} aria-hidden="true" /> Enviar pelo WhatsApp
                  </a>
                  <a
                    href={`mailto:${SITE.email}?subject=${encodeURIComponent('Contato pelo site')}&body=${encodeURIComponent(text)}`}
                    className="btn btn-outline"
                  >
                    <Mail size={18} aria-hidden="true" /> Enviar por e-mail
                  </a>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
