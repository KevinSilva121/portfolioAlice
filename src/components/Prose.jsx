import { useNavigate } from 'react-router-dom';
import '../pages/BlogPost.css';

// Texto vindo do Markdown (HTML gerado no build). Links internos navegam sem recarregar a página.
export default function Prose({ html, className = '' }) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    const link = event.target.closest('a');
    if (!link || link.target === '_blank' || event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('/') || href.startsWith('//')) return;
    event.preventDefault();
    navigate(href);
  };

  return (
    // O clique é delegado aos <a> de dentro (que já são acessíveis por teclado).
    <div className={`post-body ${className}`} onClick={handleClick} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
