import { use } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, MapPin, Video, ShieldCheck } from 'lucide-react';
import {
  loadDoc, getArea, getAreaTitle, areaPath, servicePath, servicesInArea, postsInArea,
} from '../content';
import { SITE, whatsappLink } from '../config/site';
import PageHeader from '../components/PageHeader';
import Prose from '../components/Prose';
import FaqList from '../components/FaqList';
import CtaBox from '../components/CtaBox';
import PostCard from '../components/PostCard';
import '../components/Page.css';

// Página de área de atuação (/direito-trabalhista) ou de serviço (/direito-previdenciario/bpc-loas).
export default function LandingPage({ collection, slug }) {
  const doc = use(loadDoc(collection, slug));
  const isService = collection === 'servicos';
  const areaSlug = isService ? doc.area : doc.slug;
  const area = getArea(areaSlug);
  const siblings = servicesInArea(areaSlug).filter((s) => s.slug !== doc.slug);
  const articles = postsInArea(areaSlug).slice(0, 3);
  const message = doc.whatsapp || `Olá Dra. Alice! Gostaria de orientação sobre ${doc.title}.`;

  return (
    <main className="blog-page-container landing-page">
      <PageHeader
        eyebrow={isService ? getAreaTitle(areaSlug) : 'Área de atuação'}
        title={doc.headline || doc.title}
        subtitle={doc.intro}
      >
        <div className="page-header-actions">
          <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <MessageCircle size={18} aria-hidden="true" /> Conversar pelo WhatsApp
          </a>
          <Link to="/contato" className="btn btn-outline">Outras formas de contato</Link>
        </div>
      </PageHeader>

      <div className="container landing-layout">
        <div className="landing-main">
          <Prose html={doc.html} />
          <FaqList items={doc.faqs} title={`Perguntas frequentes sobre ${doc.title}`} whatsappContext={doc.title} />
        </div>

        <aside className="landing-aside">
          <div className="aside-card">
            <h2 className="aside-title">Atendimento</h2>
            <ul className="aside-list">
              <li><MapPin size={18} aria-hidden="true" /> Presencial com agendamento em Taubaté e região</li>
              <li><Video size={18} aria-hidden="true" /> Online em todo o Brasil</li>
              <li><ShieldCheck size={18} aria-hidden="true" /> Dra. {SITE.lawyer} · {SITE.oab}</li>
            </ul>
            <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-primary aside-btn">
              <MessageCircle size={18} aria-hidden="true" /> WhatsApp
            </a>
          </div>

          {(siblings.length > 0 || isService) && (
            <nav className="aside-card" aria-label={`Temas de ${area?.title || getAreaTitle(areaSlug)}`}>
              <h2 className="aside-title">{isService ? 'Veja também' : 'Temas desta área'}</h2>
              <ul className="aside-links">
                {siblings.map((s) => (
                  <li key={s.slug}><Link to={servicePath(s)}>{s.title}</Link></li>
                ))}
                {isService && area && (
                  <li><Link to={areaPath(areaSlug)}>{area.title}: visão geral <ArrowRight size={14} aria-hidden="true" /></Link></li>
                )}
              </ul>
            </nav>
          )}
        </aside>
      </div>

      <div className="container">
        {articles.length > 0 && (
          <section className="related-posts" aria-labelledby="artigos-relacionados">
            <h2 id="artigos-relacionados" className="page-section-title">Artigos sobre {getAreaTitle(areaSlug)}</h2>
            <div className="related-grid">
              {articles.map((post) => <PostCard key={post.slug} post={post} />)}
            </div>
          </section>
        )}

        <CtaBox title="Quer conversar sobre o seu caso?" message={message} />
      </div>
    </main>
  );
}
