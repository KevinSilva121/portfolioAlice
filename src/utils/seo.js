import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SITE_URL = 'https://advalicecamargo.com.br';
const DEFAULT_TITLE = 'Alice Gabriela Camargo - Advocacia Especializada';

// URL canônica em todas as rotas. O site também responde em *.web.app e
// *.firebaseapp.com (domínios padrão do Firebase) e em variações como /blog/;
// a canônica diz ao Google que a versão oficial é sempre o domínio próprio.
export function CanonicalUrl() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = SITE_URL + path;
  }, [pathname]);

  return null;
}

function addMeta(name, content) {
  const meta = document.createElement('meta');
  meta.name = name;
  meta.content = content;
  document.head.appendChild(meta);
  return meta;
}

// Título e descrição por página. Ao sair da página volta ao padrão da home
// (título original, sem descrição), então a home não muda nada.
export function usePageMeta({ title, description, noindex = false }) {
  useEffect(() => {
    document.title = title ? `${title} | Alice Camargo Advocacia` : DEFAULT_TITLE;
    const added = [];
    if (description) added.push(addMeta('description', description));
    if (noindex) added.push(addMeta('robots', 'noindex'));

    return () => {
      document.title = DEFAULT_TITLE;
      added.forEach((meta) => meta.remove());
    };
  }, [title, description, noindex]);
}
