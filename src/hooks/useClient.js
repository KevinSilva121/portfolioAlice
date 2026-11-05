import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

// false no build (HTML estático) e durante a hidratação; true depois que o site "acorda" no navegador.
// Evita diferença entre o HTML do servidor e o do navegador em coisas que só existem no cliente.
export function useIsClient() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

// Media query reativa (false no build).
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
