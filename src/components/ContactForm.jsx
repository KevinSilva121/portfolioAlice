import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { SITE, SITE_URL } from '../config/site';
import './ContactForm.css';

const ContactForm = () => {
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
            action={`https://formsubmit.co/${SITE.email}`}
            method="POST"
          >
            {/* Configurações do FormSubmit */}
            <input type="hidden" name="_subject" value="Nova mensagem pelo site - Portfólio Jurídico" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value={`${SITE_URL}/obrigado`} />
            <input
              type="hidden"
              name="_autoresponse"
              value="Sua mensagem foi recebida! Em breve entraremos em contato. Atenciosamente, Alice Gabriela Camargo."
            />
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

            <button type="submit" className="btn btn-primary submit-btn">
              Enviar Mensagem <Send size={18} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
