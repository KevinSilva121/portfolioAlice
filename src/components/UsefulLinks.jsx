import { ExternalLink, ShieldCheck, Scale, FileText, Landmark, Users, BookOpen } from 'lucide-react';
import './UsefulLinks.css';

const UsefulLinks = () => {
  const links = [
    {
      title: 'Tribunal de Justiça (TJSP)',
      description: 'Acompanhamento de processos civis, criminais e de família no Estado de São Paulo.',
      url: 'https://esaj.tjsp.jus.br/cpopg/open.do',
      icon: <Landmark size={32} />
    },
    {
      title: 'Meu INSS',
      description: 'Portal oficial para consulta de benefícios, extratos e agendamentos previdenciários.',
      url: 'https://meu.inss.gov.br/',
      icon: <ShieldCheck size={32} />
    },
    {
      title: 'Tribunal Superior do Trabalho',
      description: 'Consultas relacionadas aos direitos e jurisprudências das relações trabalhistas (TST).',
      url: 'https://www.tst.jus.br/',
      icon: <Scale size={32} />
    },
    {
      title: 'Consulta OAB/SP',
      description: 'Verifique a regularidade e os dados de inscrição dos profissionais da advocacia.',
      url: 'https://www.oabsp.org.br/',
      icon: <FileText size={32} />
    },
    {
      title: 'Superior Tribunal de Justiça',
      description: 'Corte de uniformização da lei federal. Consulta processual abrangente (STJ).',
      url: 'https://www.stj.jus.br/',
      icon: <Users size={32} />
    },
    {
      title: 'Jusbrasil',
      description: 'Blog jurídico com artigos, jurisprudências e notícias sobre direito para cidadãos e profissionais.',
      url: 'https://www.jusbrasil.com.br/',
      icon: <BookOpen size={32} />
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
                {link.icon}
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
