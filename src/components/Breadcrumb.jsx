import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Trilha de navegação visível (Início › Blog › Artigo). A mesma trilha vai para o Google em JSON-LD.
export default function Breadcrumb({ items }) {
  if (!items || items.length < 2) return null;
  return (
    <nav className="breadcrumb" aria-label="Você está em">
      <ol>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path}>
              {last ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <>
                  <Link to={item.path}>{item.name}</Link>
                  <ChevronRight size={14} aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
