import { useState } from 'react';
import { Send, Mail, MapPin } from 'lucide-react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;
    
    // Formata o assunto e o corpo do e-mail
    const subject = encodeURIComponent(`Contato pelo site - ${name}`);
    const body = encodeURIComponent(`Você recebeu uma nova mensagem através do seu Portfólio Jurídico:\n\nNome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\n\nMensagem:\n${message}`);
    
    // Com site no Github pages, abrimos o email padrão do usuário
    window.location.href = `mailto:alicegabrielacamargo@adv.oabsp.org.br?subject=${subject}&body=${body}`;
  };

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
          
          <form className="form-content" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Como prefere ser chamado?" />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="seu@email.com" />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Telefone / WhatsApp</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="(12) 90000-0000" />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Sua Mensagem</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="5" placeholder="Descreva brevemente sua situação para nossa análise prévia..."></textarea>
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
