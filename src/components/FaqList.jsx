import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { whatsappLink } from '../config/site';
import './FAQ.css';

// Acordeão de perguntas (mesmo visual do FAQ da home). O texto das respostas fica no HTML,
// então o Google lê tudo mesmo com as respostas fechadas.
export default function FaqList({ items, title, whatsappContext }) {
  const [openIndex, setOpenIndex] = useState(null);
  if (!items || items.length === 0) return null;

  return (
    <section className="page-faq" aria-labelledby="perguntas-frequentes">
      <h2 id="perguntas-frequentes" className="page-section-title">{title || 'Perguntas frequentes'}</h2>
      <div className="faq-container page-faq-list">
        {items.map((faq, index) => {
          const open = openIndex === index;
          const answerId = `faq-resposta-${index}`;
          return (
            <div key={faq.q} className={`faq-item ${open ? 'active' : ''}`}>
              <h3 className="faq-heading">
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={open}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`faq-icon ${open ? 'rotate' : ''}`} size={20} aria-hidden="true" />
                </button>
              </h3>
              <div
                id={answerId}
                className="faq-answer-wrapper"
                style={{ maxHeight: open ? '500px' : '0', opacity: open ? 1 : 0 }}
              >
                <div className="faq-answer">
                  <p>{faq.a}</p>
                  {whatsappContext && (
                    <a
                      href={whatsappLink(`Olá Dra. Alice! Li no seu site sobre ${whatsappContext} e gostaria de orientação: ${faq.q}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="faq-whatsapp-link"
                      tabIndex={open ? 0 : -1}
                    >
                      <MessageCircle size={16} aria-hidden="true" /> Quero conversar sobre isso
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
