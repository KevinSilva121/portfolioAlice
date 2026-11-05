import { useLocation } from 'react-router-dom';
import { getBreadcrumbs } from '../content';
import Breadcrumb from './Breadcrumb';
import '../pages/BlogList.css';
import './Page.css';

// Cabeçalho padrão das páginas internas (mesmo visual do topo do Blog).
export default function PageHeader({ title, subtitle, eyebrow, children }) {
  const { pathname } = useLocation();
  return (
    <header className="blog-page-header page-header">
      <div className="container">
        <Breadcrumb items={getBreadcrumbs(pathname)} />
        {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
        <h1 className="blog-page-title">{title}</h1>
        {subtitle && <p className="blog-page-subtitle">{subtitle}</p>}
        {children}
      </div>
    </header>
  );
}
