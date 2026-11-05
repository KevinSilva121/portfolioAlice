import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { compactNavbarHeight } from '../utils/scroll';
import SectionLink from './SectionLink';
import './Navbar.css';

// Seções da home rolam sem mudar o endereço (SectionLink); só o Blog troca a URL.
const NAV_ITEMS = [
  { section: 'home', label: 'Início' },
  { section: 'about', label: 'Sobre' },
  { section: 'expertise', label: 'Áreas de Atuação' },
  { section: 'blog', label: 'Blog', to: '/blog' },
  { section: 'contact-form', label: 'Contato', className: 'contacto-link' },
];

const SPY_SECTIONS = ['home', 'about', 'expertise', 'contact-form'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [spySection, setSpySection] = useState(null);
  const { pathname } = useLocation();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (!isHome) return;
      // Destaca no menu a seção que ocupa o meio da área visível (abaixo do menu),
      // o mesmo ponto em que o clique centraliza o conteúdo.
      const navbar = compactNavbarHeight();
      const middle = navbar + (window.innerHeight - navbar) / 2;
      let current = null;
      for (const id of SPY_SECTIONS) {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        if (rect && rect.top <= middle && rect.bottom > middle) current = id;
      }
      setSpySection(current);
    };
    const frame = requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHome]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const isActive = (item) => {
    if (item.section === 'blog') return pathname.startsWith('/blog');
    return isHome && spySection === item.section;
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container nav-container">
        <SectionLink section="home" className="nav-logo" onClick={closeMenu}>
          Alice <span>Camargo</span>
        </SectionLink>

        <nav id="menu-principal" className={`nav-menu ${menuOpen ? 'open' : ''}`} aria-label="Menu principal">
          {NAV_ITEMS.map((item) => {
            const className = [item.className, isActive(item) ? 'active' : ''].filter(Boolean).join(' ') || undefined;
            return item.to ? (
              <Link key={item.section} to={item.to} onClick={closeMenu} className={className}>
                {item.label}
              </Link>
            ) : (
              <SectionLink key={item.section} section={item.section} onClick={closeMenu} className={className}>
                {item.label}
              </SectionLink>
            );
          })}
        </nav>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
