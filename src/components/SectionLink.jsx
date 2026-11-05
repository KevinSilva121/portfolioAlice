import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../utils/scroll';

// Link para uma seção da home (Início, Sobre, Áreas de Atuação, Contato).
// Na home: só rola até a seção, sem mudar o endereço (continua "/").
// Em outra página: volta para a home ("/", sem #) e rola até a seção.
// O href real (/#secao) continua no HTML para o Google e para "abrir em nova aba".
export default function SectionLink({ section, children, onClick, ...rest }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const href = section === 'home' ? '/' : `/#${section}`;

  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    if (pathname === '/') {
      scrollToSection(section);
    } else {
      navigate('/', { state: { section } });
    }
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
