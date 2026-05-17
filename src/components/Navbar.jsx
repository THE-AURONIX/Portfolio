import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logoTextImg from '../assets/logo_text_transperant.png';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const handleLinkClick = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  };

  useEffect(() => {
    const handleOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, []);

  return (
    <nav id="nav" ref={navRef}>
      <span className="n-logo">
        <Link to="/" className="n-logo-text">
          <img className="n-logo-text-img" src={logoTextImg} alt="AURONIX" />
        </Link>
      </span>
      <div className="n-links">
        <Link to="#about" onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}>About</Link>
        <Link to="#services" onClick={(e) => { e.preventDefault(); handleLinkClick('services'); }}>Services</Link>
        <Link to="#process" onClick={(e) => { e.preventDefault(); handleLinkClick('process'); }}>Process</Link>
        <Link to="#tech" onClick={(e) => { e.preventDefault(); handleLinkClick('tech'); }}>Stack</Link>
        <Link to="#testimonials" onClick={(e) => { e.preventDefault(); handleLinkClick('testimonials'); }}>Clients</Link>
      </div>
      <button className="n-cta" onClick={() => handleLinkClick('cta')}>Start a Project</button>
      <div className={`hamburger${menuOpen ? ' active' : ''}`} id="ham" onClick={(e) => { e.stopPropagation(); setMenuOpen(v => !v); }}>
        <span></span><span></span><span></span>
      </div>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu">
        <Link to="#about" onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}>About</Link>
        <Link to="#services" onClick={(e) => { e.preventDefault(); handleLinkClick('services'); }}>Services</Link>
        <Link to="#process" onClick={(e) => { e.preventDefault(); handleLinkClick('process'); }}>Process</Link>
        <Link to="#tech" onClick={(e) => { e.preventDefault(); handleLinkClick('tech'); }}>Stack</Link>
        <Link to="#testimonials" onClick={(e) => { e.preventDefault(); handleLinkClick('testimonials'); }}>Clients</Link>
        <Link to="#cta" className="n-cta-mobile" onClick={(e) => { e.preventDefault(); handleLinkClick('cta'); }}>Start a Project</Link>
      </div>
    </nav>
  );
}
