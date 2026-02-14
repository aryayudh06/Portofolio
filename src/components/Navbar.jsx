import React, { useState, useEffect } from 'react';
import { navLinks } from '../data/portfolio';
import './Navbar.css';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation">
      <button
        type="button"
        className="navbar__toggle"
        aria-expanded={menuOpen}
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
      <ul className={`navbar__list ${menuOpen ? 'navbar__list--open' : ''}`}>
        {navLinks.map(({ label, href }) => (
          <li key={href}>
            <a href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
