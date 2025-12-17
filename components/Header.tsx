'use client';

import React, { useState } from 'react';
import '../app/styles/Header.css';

/**
 * Header Component - Client Component
 * Navigation bar with company logo and menu items
 * Requires client-side rendering for interactive menu and scroll functionality
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src="/logo.png" alt="Company Logo" className="logo-img" />
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><a href="#home" className="nav-link" onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="#about" className="nav-link" onClick={() => scrollToSection('about')}>About Us</a></li>
            <li><a href="#services" className="nav-link" onClick={() => scrollToSection('services')}>Services</a></li>
            <li><a href="#projects" className="nav-link" onClick={() => scrollToSection('projects')}>Projects</a></li>
            <li><a href="#contact" className="nav-link" onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>
          <div className="header-actions">
            <span className="header-phone">Call Us: +08046055690</span>
            <button className="header-cta" onClick={() => scrollToSection('contact')}>
              Get In Touch
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
