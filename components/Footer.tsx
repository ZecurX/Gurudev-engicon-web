import React from 'react';
import '../app/styles/Footer.css';

/**
 * Footer Component - Server Component
 * Professional footer with company info, services, and credentials
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const services = [
    'Highway Construction',
    'Flyover Construction',
    'Bridge Construction',
    'Road Infrastructure',
  ];

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-container">
          {/* Company Info */}
          <div className="footer-section footer-brand">
            <img
              src="/logo.png"
              alt="Gurudev Engicon"
              className="footer-logo"
            />
            <p className="footer-tagline">
              Building India&apos;s infrastructure with precision engineering,
              quality construction, and unwavering commitment to excellence.
            </p>
            <div className="footer-certifications">
              <span className="cert-badge">ISO 9001:2015</span>
              <span className="cert-badge">Class I Contractor</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4>Our Services</h4>
            <ul className="footer-links">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#services">{service}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  OLAPUR, PIRPAITY KAHALGAON
                  <br />
                  Bhagalpur, Bihar - 813209
                </span>
              </div>
              <div className="contact-item">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+91 8046055690</span>
              </div>
              <div className="contact-item">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>PRAMODSINGHBHAGALPUR@GMAIL.COM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <p className="copyright">
            &copy; {currentYear}{' '}
            <strong>Gurudev Engicon Private Limited</strong>. All Rights
            Reserved.
          </p>
          <p className="developer">
            Developed by{' '}
            <a
              href="https://zecurx.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>ZecurX</strong>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
