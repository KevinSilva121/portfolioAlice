import { Link } from 'react-router-dom';
import { areas, areaPath } from '../content';
import '../components/Page.css';

// Página 404. No build vira dist/404.html, que o Firebase entrega com status 404 de verdade.
export default function NotFound() {
  return (
    <main className="status-page">
      <p className="status-code">404</p>
      <h1>Página não encontrada</h1>
      <p>O endereço que você acessou não existe ou mudou. Veja alguns caminhos:</p>
      <div className="status-actions">
        <Link to="/" className="btn btn-primary">Página inicial</Link>
        <Link to="/blog" className="btn btn-outline">Blog jurídico</Link>
        <Link to="/contato" className="btn btn-outline">Contato</Link>
      </div>
      {areas.length > 0 && (
        <ul className="status-links">
          {areas.map((area) => (
            <li key={area.slug}><Link to={areaPath(area.slug)}>{area.title}</Link></li>
          ))}
        </ul>
      )}
    </main>
  );
}
