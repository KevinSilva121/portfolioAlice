import { use } from 'react';
import { loadDoc } from '../content';
import PageHeader from '../components/PageHeader';
import Prose from '../components/Prose';
import '../components/Page.css';

// Página de texto simples a partir de src/content/paginas/<slug>.md (ex.: Política de Privacidade).
export default function DocPage({ slug }) {
  const doc = use(loadDoc('paginas', slug));
  return (
    <main className="blog-page-container">
      <PageHeader title={doc.headline || doc.title} subtitle={doc.intro} />
      <div className="container page-narrow">
        <Prose html={doc.html} />
      </div>
    </main>
  );
}
