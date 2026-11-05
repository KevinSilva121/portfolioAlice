import { MessageCircle, Phone, Mail, MapPin, Video } from 'lucide-react';
import { SITE, whatsappLink } from '../config/site';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import '../components/Page.css';

export default function ContactPage() {
  return (
    <main className="blog-page-container contact-page">
      <PageHeader
        title={<>Fale com a <span>Dra. Alice</span></>}
        subtitle="Escolha o canal que preferir. O atendimento é presencial, com agendamento, em Taubaté e região, e online para todo o Brasil."
      />

      <div className="container">
        <ul className="contact-cards">
          <li className="contact-card">
            <MessageCircle size={28} aria-hidden="true" />
            <h2>WhatsApp</h2>
            <p>O jeito mais rápido de falar com a Dra. Alice.</p>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Abrir conversa</a>
          </li>
          <li className="contact-card">
            <Phone size={28} aria-hidden="true" />
            <h2>Telefone</h2>
            <p>{SITE.phoneDisplay}</p>
            <a href={`tel:${SITE.phoneE164}`} className="btn btn-outline">Ligar</a>
          </li>
          <li className="contact-card">
            <Mail size={28} aria-hidden="true" />
            <h2>E-mail</h2>
            <p className="contact-card-email">{SITE.email}</p>
            <a href={`mailto:${SITE.email}`} className="btn btn-outline">Enviar e-mail</a>
          </li>
          <li className="contact-card">
            <MapPin size={28} aria-hidden="true" />
            <h2>Atendimento</h2>
            <p>
              Presencial com agendamento em Taubaté e região <br />
              <Video size={14} aria-hidden="true" /> Online em todo o Brasil
            </p>
          </li>
        </ul>
      </div>

      <ContactForm />
    </main>
  );
}
