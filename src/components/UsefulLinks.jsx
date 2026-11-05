import { ExternalLink } from 'lucide-react';
import tjspIcon from '../assets/img/icons/tjsp.webp';
import inssIcon from '../assets/img/icons/inss.webp';
import tstIcon from '../assets/img/icons/tst.webp';
import oabIcon from '../assets/img/icons/oab.webp';
import stjIcon from '../assets/img/icons/stj.webp';
import jusbrasilIcon from '../assets/img/icons/jusbrasil.webp';
import './UsefulLinks.css';

const UsefulLinks = () => {
  const links = [
    {
      title: 'Tribunal de Justiça (TJSP)',
      description: 'Acompanhamento de processos civis, criminais e de família no Estado de São Paulo.',
      url: 'https://esaj.tjsp.jus.br/cpopg/open.do',
      icon: tjspIcon,
      iconBg: '#ffffff'
    },
    {
      title: 'Meu INSS',
      description: 'Portal oficial para consulta de benefícios, extratos e agendamentos previdenciários.',
      url: 'https://meu.inss.gov.br/',
      icon: inssIcon,
      iconBg: '#ffffff'
    },
    {
      title: 'Tribunal Superior do Trabalho',
      description: 'Consultas relacionadas aos direitos e jurisprudências das relações trabalhistas (TST).',
      url: 'https://www.tst.jus.br/',
      icon: tstIcon,
      iconBg: '#ffffff'
    },
    {
      title: 'Consulta OAB/SP',
      description: 'Verifique a regularidade e os dados de inscrição dos profissionais da advocacia.',
      url: 'https://www.oabsp.org.br/',
      icon: oabIcon,
      iconBg: '#ffffff'
    },
    {
      title: 'Superior Tribunal de Justiça',
      description: 'Corte de uniformização da lei federal. Consulta processual abrangente (STJ).',
      url: 'https://www.stj.jus.br/',
      icon: stjIcon,
      iconBg: '#ffffff'
    },
    {
      title: 'Jusbrasil',
      description: 'Blog jurídico com artigos, jurisprudências e notícias sobre direito para cidadãos e profissionais.',
      url: 'https://www.jusbrasil.com.br/',
      icon: jusbrasilIcon,
      iconBg: '#ffffff'
    }
  ];

  return (
    <section id="useful-links" className="section links-section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Links Úteis</h2>
        <p className="section-subtitle animate-on-scroll">
          Informação é o primeiro passo para garantir seus direitos. Acesse os canais oficiais para consultas e acompanhamentos.
        </p>

        <div className="links-grid animate-on-scroll">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="link-icon-wrapper">
                <img src={link.icon} alt="" width="82" height="82" loading="lazy" decoding="async" />
              </div>
              <div className="link-content">
                <h3 className="link-title">{link.title}</h3>
                <p className="link-desc">{link.description}</p>
              </div>
              <div className="link-action">
                <ExternalLink size={20} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UsefulLinks;
