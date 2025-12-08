import React from 'react';
import '../app/styles/Footer.css';

/**
 * Footer Component - Server Component
 * Company information, links, and copyright
 * Server-rendered with dynamic year calculation
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <h3>builderz</h3>
            <p className="footer-description">
              We are creators of transformative spaces that inspire, innovate, and endure.
            </p>
          </div>

          <div className="footer-section">
            <h4>Home</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Why Chose Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#projects">Our Team</a></li>
              <li><a href="#projects">Solutions</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">News & Updates</a></li>
              <li><a href="#contact">Contacts</a></li>
            </ul>
          </div>

          <div className="footer-section footer-contact-section">
            <h4 className="footer-contact-phone">+(880) 1934 0695</h4>
            <p className="footer-contact-email">builderz@example.com</p>
            <div className="footer-social-links">
              <a href="#" aria-label="Facebook">Facebook</a>
              <a href="#" aria-label="Instagram">Instagram</a>
              <a href="#" aria-label="YouTube">Youtube</a>
              <a href="#" aria-label="Twitter">Twitter</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright-text">&copy; {currentYear} <strong>builderz</strong>. All Rights Reserved</p>
          <p className="footer-developer">Developed by <strong>Jafar</strong></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
