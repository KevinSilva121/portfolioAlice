import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildHead } from './head';

// Atualiza título, descrição, canônica, Open Graph e JSON-LD ao trocar de página no navegador.
// No primeiro carregamento essas tags já vêm prontas no HTML gerado no build.
export default function HeadManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, tags } = buildHead(pathname);
    document.title = title;
    document.head.querySelectorAll('[data-head]').forEach((el) => el.remove());
    for (const { tag, attrs, content } of tags) {
      const el = document.createElement(tag);
      for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
      if (content) el.textContent = content;
      el.setAttribute('data-head', '');
      document.head.appendChild(el);
    }
  }, [pathname]);

  return null;
}
