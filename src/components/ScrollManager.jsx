import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToAnchor, scrollToSection } from '../utils/scroll';

// Controla a rolagem ao trocar de página:
// - página nova: volta ao topo;
// - home vinda de outra página por um link de seção (SectionLink): rola até a seção, endereço fica "/";
// - home aberta com #âncora (link antigo/compartilhado, ex.: /#contact-form): rola até a seção e tira
//   o # do endereço, para a home não mostrar nomes de seção na URL;
// - outras páginas com #âncora (sumário dos artigos): leva o subtítulo para logo abaixo do menu.
export default function ScrollManager() {
  const { pathname, search, hash, key, state } = useLocation();
  const target = state?.section || (hash ? decodeURIComponent(hash.slice(1)) : null);

  useEffect(() => {
    if (!target) {
      window.scrollTo(0, 0);
      return;
    }
    const isHome = pathname === '/';
    // Dois quadros de espera: garante que a página nova já foi montada e medida.
    let second;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        if (isHome) {
          scrollToSection(target);
          if (hash) window.history.replaceState(window.history.state, '', pathname + search);
        } else {
          scrollToAnchor(target);
        }
      });
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [pathname, search, hash, key, target]);

  return null;
}
