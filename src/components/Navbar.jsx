import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-scroll';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="nav-logo">
          Alice <span>Camargo</span>
        </a>
        
        <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="home" spy={true} smooth={true} offset={-70} duration={500} onClick={() => setMenuOpen(false)}>Início</Link>
          <Link to="about" spy={true} smooth={true} offset={-70} duration={500} onClick={() => setMenuOpen(false)}>Sobre</Link>
          <Link to="expertise" spy={true} smooth={true} offset={-70} duration={500} onClick={() => setMenuOpen(false)}>Áreas de Atuação</Link>
          <Link to="faq" spy={true} smooth={true} offset={-70} duration={500} onClick={() => setMenuOpen(false)}>Dúvidas Frequentes</Link>
          <Link to="footer" spy={true} smooth={true} offset={-70} duration={500} className="contacto-link" onClick={() => setMenuOpen(false)}>Contato</Link>
        </nav>

        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
