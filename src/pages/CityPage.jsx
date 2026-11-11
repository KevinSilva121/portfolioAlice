import { use } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Video, ShieldCheck } from 'lucide-react';
import { loadDoc, areas, areaPath, cities, cityPath, getPost, getRecentPosts } from '../content';
import { SITE, whatsappLink } from '../config/site';
import PageHeader from '../components/PageHeader';
import Prose from '../components/Prose';
import FaqList from '../components/FaqList';
import CtaBox from '../components/CtaBox';
import PostCard from '../components/PostCard';
import '../components/Page.css';

// Página de atendimento por cidade (/advogada-taubate, /advogada-sao-jose-dos-campos...).
// Mesmo layout das páginas de área: texto, perguntas frequentes, cartão de atendimento e artigos.
export default function CityPage({ slug }) {
  const doc = use(loadDoc('cidades', slug));
  const message = doc.whatsapp || `Olá Dra. Alice! Sou de ${doc.city} e gostaria de orientação jurídica.`;
  const otherCities = cities.filter((c) => c.slug !== doc.slug);
  const picked = (doc.posts || []).map(getPost).filter(Boolean);
  const articles = (picked.length ? picked : getRecentPosts(3)).slice(0, 3);

  return (
    <main className="blog-page-container landing-page">
      <PageHeader eyebrow={`Atendimento em ${doc.city}`} title={doc.headline || doc.title} subtitle={doc.intro}>
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
          <FaqList items={doc.faqs} title={`Perguntas frequentes: ${doc.title}`} whatsappContext={doc.title} />
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

          {areas.length > 0 && (
            <nav className="aside-card" aria-label="Áreas de atuação">
              <h2 className="aside-title">Áreas de atuação</h2>
              <ul className="aside-links">
                {areas.map((a) => (
                  <li key={a.slug}><Link to={areaPath(a.slug)}>{a.title}</Link></li>
                ))}
              </ul>
            </nav>
          )}

          {otherCities.length > 0 && (
            <nav className="aside-card" aria-label="Atendimento por cidade">
              <h2 className="aside-title">Atendimento por cidade</h2>
              <ul className="aside-links">
                {otherCities.map((c) => (
                  <li key={c.slug}><Link to={cityPath(c.slug)}>{c.title}</Link></li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </div>

      <div className="container">
        {articles.length > 0 && (
          <section className="related-posts" aria-labelledby="artigos-relacionados">
            <h2 id="artigos-relacionados" className="page-section-title">Artigos para quem é de {doc.city}</h2>
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
