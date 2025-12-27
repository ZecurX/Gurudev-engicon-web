'use client';

import React, { useState, useEffect } from 'react';
import '../app/styles/Header.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Header Component - Client Component
 * Professional navigation bar for infrastructure company
 * Includes scroll behavior and mobile responsiveness
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleCtaClick = () => {
    if (pathname === '/') {
      scrollToSection('contact');
    } else {
      window.location.href = '/#contact';
    }
  };

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => {
    // On the home page, prevent navigation and smoothly scroll to the section
    if (pathname === '/') {
      event.preventDefault();
      scrollToSection(sectionId);
    } else {
      // Let the anchor navigate to the homepage with the hash
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      {/* Top Bar */}
      <div className="header-top">
        <div className="header-top-container">
          <div className="header-top-left">
            <span className="top-info">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +91 7033592001
            </span>
            <span className="top-info">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              parmodsinghbhagalpur@gmail.com
            </span>
          </div>
          <div className="header-top-right">
            <span className="top-info">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Mon - Sat: 9:00 AM - 6:00 PM
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="header-main">
        <div className="header-container">
          <a
            href="/#home"
            className="logo"
            onClick={(event) => handleNavClick(event, 'home')}
          >
            <img src="/logo.png" alt="Gurudev Engicon" className="logo-img" />
          </a>

          <button
            className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-links">
              <li>
                <a
                  href="/#home"
                  className="nav-link"
                  onClick={(event) => handleNavClick(event, 'home')}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="nav-link"
                  onClick={(event) => handleNavClick(event, 'services')}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/#projects"
                  className="nav-link"
                  onClick={(event) => handleNavClick(event, 'projects')}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/#clients"
                  className="nav-link"
                  onClick={(event) => handleNavClick(event, 'clients')}
                >
                  Clients
                </a>
              </li>
              <li>
                <a
                  href="/#about"
                  className="nav-link"
                  onClick={(event) => handleNavClick(event, 'about')}
                >
                  About Us
                </a>
              </li>
              <li>
                <Link href="/gallery" className="nav-link">
                  Gallery
                </Link>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="nav-link"
                  onClick={(event) => handleNavClick(event, 'contact')}
                >
                  Contact
                </a>
              </li>
            </ul>
            <button className="header-cta" onClick={handleCtaClick}>
              Request Quote
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
