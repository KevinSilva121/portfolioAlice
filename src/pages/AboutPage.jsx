import { use } from 'react';
import { Award, Briefcase, GraduationCap, MapPin } from 'lucide-react';
import { loadDoc, areas, areaPath } from '../content';
import { SITE } from '../config/site';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Prose from '../components/Prose';
import CtaBox from '../components/CtaBox';
import alice480 from '../assets/img/alice-480.webp';
import alice800 from '../assets/img/alice-800.webp';
import '../components/About.css';
import '../components/Page.css';

export default function AboutPage() {
  const doc = use(loadDoc('paginas', 'sobre'));

  return (
    <main className="blog-page-container about-page">
      <PageHeader title={doc.headline || doc.title} subtitle={doc.intro} />

      <div className="container about-page-grid">
        <div className="about-image-wrapper about-page-photo">
          <div className="image-frame">
            <img
              src={alice800}
              srcSet={`${alice480} 480w, ${alice800} 800w`}
              sizes="(max-width: 768px) 90vw, 420px"
              width="800"
              height="800"
              alt={`Dra. ${SITE.lawyer}, advogada ${SITE.oab}`}
              className="about-image"
            />
          </div>
        </div>

        <div>
          <ul className="about-highlights about-page-facts">
            <li className="highlight-item">
              <div className="highlight-icon"><Award size={24} aria-hidden="true" /></div>
              <div>
                <h2>Inscrição na OAB</h2>
                <p>
                  {SITE.oab}.{' '}
                  <a href="https://cna.oab.org.br/" target="_blank" rel="noopener noreferrer" className="text-link">
                    Consulte no Cadastro Nacional dos Advogados
                  </a>
                </p>
              </div>
            </li>
            <li className="highlight-item">
              <div className="highlight-icon"><GraduationCap size={24} aria-hidden="true" /></div>
              <div>
                <h2>Formação</h2>
                <p>Graduação em Direito pela {SITE.university}. Certificação em Compliance Trabalhista (jan/2026).</p>
              </div>
            </li>
            <li className="highlight-item">
              <div className="highlight-icon"><Briefcase size={24} aria-hidden="true" /></div>
              <div>
                <h2>Áreas de atuação</h2>
                <p>
                  {areas.length
                    ? areas.map((area, i) => (
                        <span key={area.slug}>
                          {i > 0 && (i === areas.length - 1 ? ' e ' : ', ')}
                          <Link to={areaPath(area.slug)} className="text-link">{area.title}</Link>
                        </span>
                      ))
                    : 'Direito do Trabalho, Previdenciário, Cível e de Família'}
                  .
                </p>
              </div>
            </li>
            <li className="highlight-item">
              <div className="highlight-icon"><MapPin size={24} aria-hidden="true" /></div>
              <div>
                <h2>Atendimento</h2>
                <p>Presencial, com agendamento, em Taubaté e região. Online em todo o Brasil.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="container page-narrow">
        <Prose html={doc.html} />
        <CtaBox title="Vamos conversar sobre o seu caso?" />
      </div>
    </main>
  );
}
