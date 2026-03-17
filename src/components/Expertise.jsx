import { Briefcase, Scale, HeartHandshake, Users } from 'lucide-react';
import './Expertise.css';

const Expertise = () => {
  const cards = [
    {
      title: 'Direito do Trabalho',
      icon: <Briefcase size={36} />,
      desc: 'Defesa e orientação preventiva em questões trabalhistas para empregados e empregadores.',
      items: ['Reclamações trabalhistas', 'Assédio moral e sexual', 'Acidentes de trabalho', 'Consultoria preventiva']
    },
    {
      title: 'Direito Previdenciário',
      icon: <Scale size={36} />,
      desc: 'Análise e planejamento para garantir os melhores benefícios junto ao INSS.',
      items: ['Aposentadorias (tempo, idade)', 'Auxílios (doença, acidente)', 'Pensão por morte', 'Planejamento previdenciário']
    },
    {
      title: 'Direito Cível',
      icon: <HeartHandshake size={36} />,
      desc: 'Resolução de conflitos de interesses cotidianos da sociedade com responsabilidade e sigilo.',
      items: ['Indenizações', 'Contratos e negócios', 'Direitos do consumidor', 'Cobranças indevidas']
    },
    {
      title: 'Direito de Família',
      icon: <Users size={36} />,
      desc: 'Atendimento sigiloso para tratar das questões mais sensíveis no meio familiar.',
      items: ['Divórcio judicial/extrajudicial', 'Guarda e pensão alimentícia', 'Inventários', 'União estável']
    }
  ];

  return (
    <section id="expertise" className="section expertise-section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Áreas de Atuação</h2>
        <p className="section-subtitle animate-on-scroll">Assistência jurídica abrangente nas esferas que mais impactam sua vida.</p>

        <div className="expertise-grid">
          {cards.map((card, index) => (
            <div
              className="expertise-card animate-on-scroll"
              key={index}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="card-icon">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-desc">{card.desc}</p>
              <ul className="card-list">
                {card.items.map((item, id) => (
                  <li key={id}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
