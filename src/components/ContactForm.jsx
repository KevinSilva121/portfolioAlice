import { Mail, MapPin, Send } from 'lucide-react';
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
                <Mail className="method-icon" />
                <div>
                  <h4>E-mail</h4>
                  <p>alicegabrielacamargo@adv.oabsp.org.br</p>
                </div>
              </div>
              <div className="method">
                <MapPin className="method-icon" />
                <div>
                  <h4>Atendimento</h4>
                  <p>Taubaté, SP | Consultas Online</p>
                </div>
              </div>
            </div>
          </div>

          <form
            className="form-content"
            action="https://formsubmit.co/alicegabrielacamargo@adv.oabsp.org.br"
            method="POST"
          >
            {/* Configurações do FormSubmit */}
            <input type="hidden" name="_subject" value="Nova mensagem pelo site - Portfólio Jurídico" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input
              type="hidden"
              name="_autoresponse"
              value="Sua mensagem foi recebida! Em breve entraremos em contato. Atenciosamente, Alice Gabriela Camargo."
            />
            {/* Honeypot anti-spam */}
            <input type="text" name="_honey" style={{ display: 'none' }} />

            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                required
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

            <button type="submit" className="btn btn-primary submit-btn">
              Enviar Mensagem <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
