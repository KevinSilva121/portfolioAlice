import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavClick = (section) => {
    setMenuOpen(false);
    if (!isHome) {
      navigate('/');
      // Aguarda o componente da página inicial carregar antes de rolar a tela
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Helper para renderizar os botões dinamicamente dependendo da rota atual
  const NavItem = ({ to, children, className = '' }) => {
    if (to === 'blog') {
      return <RouterLink to="/blog" onClick={() => setMenuOpen(false)} className={className}>{children}</RouterLink>;
    }
    
    if (isHome) {
      return (
        <ScrollLink to={to} spy={true} smooth={true} offset={-70} duration={500} onClick={() => setMenuOpen(false)} className={className}>
          {children}
        </ScrollLink>
      );
    }

    return (
      <span onClick={() => handleNavClick(to)} className={`nav-span ${className}`} style={{cursor: 'pointer'}}>
        {children}
      </span>
    );
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container nav-container">
        <RouterLink to="/" className="nav-logo" onClick={() => window.scrollTo(0, 0)}>
          Alice <span>Camargo</span>
        </RouterLink>
        
        <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <NavItem to="home">Início</NavItem>
          <NavItem to="about">Sobre</NavItem>
          <NavItem to="expertise">Áreas de Atuação</NavItem>
          <NavItem to="blog">Blog</NavItem>
          <NavItem to="footer" className="contacto-link">Contato</NavItem>
        </nav>

        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
