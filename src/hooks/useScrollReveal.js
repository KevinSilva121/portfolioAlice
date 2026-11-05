import { useEffect } from 'react';

// Animação de entrada (.animate-on-scroll -> .is-visible) em qualquer página.
// Antes só a home ativava isso, e o rodapé ficava invisível nas outras páginas.
// O MutationObserver pega elementos que aparecem depois (troca de página, conteúdo carregado).
export default function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 },
    );

    const scan = () => {
      document.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach((el) => observer.observe(el));
    };
    scan();

    const mutations = new MutationObserver(scan);
    mutations.observe(document.getElementById('root'), { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
}
