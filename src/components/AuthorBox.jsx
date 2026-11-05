import { Link } from 'react-router-dom';
import { SITE } from '../config/site';
import alice480 from '../assets/img/alice-480.webp';

// Autoria em cada artigo: em tema jurídico o Google valoriza saber quem escreveu e com que qualificação.
export default function AuthorBox() {
  return (
    <aside className="author-box" aria-label="Sobre a autora">
      <img src={alice480} alt="" width="96" height="96" loading="lazy" decoding="async" className="author-photo" />
      <div>
        <p className="author-label">Escrito por</p>
        <p className="author-name">Dra. {SITE.lawyer}</p>
        <p className="author-bio">
          Advogada ({SITE.oab}), graduada pela {SITE.university}. Atua em Direito do Trabalho, Previdenciário, Cível e de Família,
          online em todo o Brasil e presencialmente em Taubaté e região.
        </p>
        <Link to="/sobre" className="text-link">Conheça a trajetória da Dra. Alice</Link>
      </div>
    </aside>
  );
}
