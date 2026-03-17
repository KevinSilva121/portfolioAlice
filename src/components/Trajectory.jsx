import './Trajectory.css';

const Trajectory = () => {
  const experiences = [
    {
      title: 'Advogada Autônoma',
      company: 'Brasil',
      date: 'Março de 2025 - Momento',
      desc: 'Atuação autônoma especializada na resolução de litígios e assessoria em Direito do Trabalho, Família e áreas conexas, com foco na advocacia extrajudicial e consultiva.'
    },
    {
      title: 'Serviços Jurídicos',
      company: 'Revisa Vale - Assessoria Financeira',
      date: 'Janeiro 2023 - Novembro 2025',
      desc: 'Atendimento ao cliente em alto nível e condução de processos em prestação de serviços na esfera do Direito Civil.'
    },
    {
      title: 'Estagiária Jurídica',
      company: 'L. G. Bueno Sociedade de Advogados',
      date: 'Julho 2021 - Julho 2022',
      desc: 'Assistência jurídica na elaboração de peças, controle de prazos e acompanhamento de processos nos tribunais.'
    },
    {
      title: 'Estagiária',
      company: 'Prefeitura de Pindamonhangaba',
      date: 'Janeiro 2019 - Dezembro 2019',
      desc: 'Vivência no setor público, focado no atendimento ao cidadão e rotinas administrativas.'
    }
  ];

  return (
    <section id="trajectory" className="section trajectory-section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Trajetória Profissional</h2>
        <p className="section-subtitle animate-on-scroll">Uma jornada consolidada pela experiência e constante aperfeiçoamento.</p>
        
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div className="timeline-item animate-on-scroll" key={index} style={{ animationDelay: `${0.1 * index}s` }}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">{exp.date}</span>
                <h3 className="timeline-title">{exp.title}</h3>
                <h4 className="timeline-company">{exp.company}</h4>
                <p className="timeline-desc">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trajectory;
