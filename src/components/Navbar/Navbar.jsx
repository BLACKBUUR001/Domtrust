import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <img src="/assets/logos/domtrust-logo-icon-white.png" alt="DomTrust" />
          <span className="nav-logo-text">Domtrust</span>
        </Link>

        <ul className="nav-links">
          <li><NavLink to="/" end>Accueil</NavLink></li>
          <li><NavLink to="/services">Services</NavLink></li>
          <li><NavLink to="/a-propos">À propos</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><NavLink to="/contact" className="nav-cta">Rejoindre la liste →</NavLink></li>
        </ul>

        <button
          className={`nav-burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`nav-mobile-overlay${menuOpen ? ' open' : ''}`}>
        <NavLink to="/" end onClick={closeMenu}>Accueil</NavLink>
        <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
        <NavLink to="/a-propos" onClick={closeMenu}>À propos</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        <NavLink to="/contact" className="nav-cta-mobile" onClick={closeMenu}>
          Rejoindre la liste →
        </NavLink>
      </div>
    </>
  );
}
