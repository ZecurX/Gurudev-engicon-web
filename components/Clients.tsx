import React from 'react';
import '../app/styles/Clients.css';

/**
 * Clients Component - Server Component
 * Showcase of key clients, partners, and government associations
 */
const Clients: React.FC = () => {
  const clients = [
    { name: 'NHAI', fullName: 'National Highways Authority of India' },
    { name: 'PWD', fullName: 'Public Works Department' },
    { name: 'BSRDCL', fullName: 'Bihar State Road Development Corporation' },
    { name: 'PMGSY', fullName: 'Pradhan Mantri Gram Sadak Yojana' },
  ];

  const certifications = [
    {
      title: 'ISO 9001:2015',
      description: 'Quality Management System',
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Safety Certified',
      description: 'Workplace Safety Standards',
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: 'GST Registered',
      description: 'Government Registered Entity',
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M7 8h10M7 12h10M7 16h6" />
        </svg>
      ),
    },
    {
      title: 'Class I Contractor',
      description: 'Registered with PWD Bihar',
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
  ];

  return (
    <section className="clients" id="clients">
      <div className="clients-container">
        {/* Clients Section */}
        <div className="clients-section">
          <span className="section-label">Our Partners</span>
          <h2 className="clients-title">Trusted by Government Bodies</h2>
          <p className="clients-subtitle">
            We are proud to partner with leading government organizations in
            delivering critical infrastructure projects across Bihar and beyond.
          </p>

          <div className="clients-grid">
            {clients.map((client, index) => (
              <div key={index} className="client-card">
                <span className="client-name">{client.name}</span>
                <span className="client-full-name">{client.fullName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="certifications-section">
          <h3 className="cert-title">Certifications & Registrations</h3>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div key={index} className="cert-card">
                <span className="cert-icon">{cert.icon}</span>
                <div className="cert-content">
                  <h4>{cert.title}</h4>
                  <p>{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="why-choose-section">
          <div className="why-choose-content">
            <h3>Why Choose Gurudev Engicon?</h3>
            <ul className="why-list">
              <li>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Experienced team with 12+ years in infrastructure development
              </li>
              <li>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Modern equipment and advanced construction methodologies
              </li>
              <li>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Strong safety record with zero major incidents
              </li>
              <li>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Commitment to quality and timely project delivery
              </li>
              <li>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Financial stability and resource capability for large projects
              </li>
            </ul>
          </div>
          <div className="why-choose-cta">
            <h4>Ready to Discuss Your Project?</h4>
            <p>
              Let our team help you plan and execute your next infrastructure
              project.
            </p>
            <a href="#contact" className="cta-button">
              Contact Our Team
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10H16M16 10L11 5M16 10L11 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
