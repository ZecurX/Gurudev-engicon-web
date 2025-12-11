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
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#contact">Contacts</a></li>
            </ul>
          </div>

          <div className="footer-section footer-contact-section">
            <h4 className="footer-contact-phone">+(080)46055690</h4>
            <p className="footer-contact-email">info@gurudevengicon.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright-text">&copy; {currentYear} <strong>Gurudev Engicon Privite Limited</strong>. All Rights Reserved</p>
          <p className="footer-developer">Developed by <strong>ZecurX</strong></p>
        </div>
      </div>
    </footer> 
  );
};

export default Footer;
