import React from 'react';
import '../app/styles/Services.css';

// SVG Icons for services
const BuildingIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
  </svg>
);

const HighwayIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19L8 5M16 5l4 14M8 5h8M6 12h12M4 19h16" />
    <path d="M12 5v14" strokeDasharray="2 2" />
  </svg>
);

const FlyoverIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 18h20M4 18v-3a4 4 0 014-4h8a4 4 0 014 4v3M8 11V8M16 11V8M12 11V6" />
    <path d="M2 8h20" />
  </svg>
);

const BridgeIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 7h18M3 7v10M21 7v10M3 17h18" />
    <path d="M7 7v10M12 7v10M17 7v10" />
    <path d="M3 12h18" />
  </svg>
);

const RoadIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4l4 16M16 4l4 16M8 4h8M10 10h4M11 16h2" />
    <circle cx="12" cy="7" r="1" fill="currentColor" />
    <circle cx="12" cy="13" r="1" fill="currentColor" />
    <circle cx="12" cy="19" r="1" fill="currentColor" />
  </svg>
);

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  galleryLink: string;
  features: string[];
}

/**
 * Services Component - Server Component
 * Professional showcase of infrastructure services
 */
const Services: React.FC = () => {
  const services: ServiceItem[] = [
    {
      id: 1,
      title: 'Building Construction',
      description:
        'Professional construction of government buildings, police stations, administrative offices, and institutional structures with quality and timely delivery.',
      icon: <BuildingIcon />,
      galleryLink: '/gallery#building-gallery',
      features: [
        'Government building construction',
        'Police stations & administrative offices',
        'Institutional & public buildings',
        'Structural design & engineering',
        'Quality assurance & timely completion',
      ],
    },
    {
      id: 2,
      title: 'Highway Construction',
      description:
        'Complete highway development from planning to execution, delivering durable road infrastructure that connects regions and drives economic growth.',
      icon: <HighwayIcon />,
      galleryLink: '/gallery#highway-gallery',
      features: [
        'National & State Highway construction',
        'Expressway & corridor development',
        'Pavement construction & resurfacing',
        'Drainage & safety infrastructure',
        'Traffic management systems',
      ],
    },
    {
      id: 3,
      title: 'Flyover Construction',
      description:
        'Advanced elevated structures engineered for smooth urban mobility and reduced traffic congestion in growing cities.',
      icon: <FlyoverIcon />,
      galleryLink: '/gallery#flyover-gallery',
      features: [
        'RCC & PSC flyover construction',
        'Foundation & piling works',
        'Structural load analysis & design',
        'Urban traffic flow optimization',
        'Seismic-resistant engineering',
      ],
    },
    {
      id: 4,
      title: 'Bridge Construction',
      description:
        'Robust bridge solutions designed for all terrains, ensuring safe passage across rivers, valleys, and challenging landscapes.',
      icon: <BridgeIcon />,
      galleryLink: '/gallery#bridge-gallery',
      features: [
        'Pre-stressed concrete bridges',
        'River crossing & deep foundation',
        'Box culvert construction',
        'Rehabilitation & strengthening',
        'Quality testing & inspections',
      ],
    },
    {
      id: 5,
      title: 'Road Infrastructure',
      description:
        'Comprehensive road development including rural roads, urban arteries, and industrial access roads with complete infrastructure.',
      icon: <RoadIcon />,
      galleryLink: '/gallery#road-gallery',
      features: [
        'Rural road connectivity (PMGSY)',
        'Urban road development',
        'Industrial access roads',
        'Bituminous & concrete pavements',
        'Road marking & signage',
      ],
    },
  ];

  return (
    <section className="services" id="services">
      <div className="services-container">
        <div className="services-header">
          <span className="section-label">Our Expertise</span>
          <h2 className="services-title">Infrastructure Services</h2>
          <p className="services-subtitle">
            From highways connecting states to flyovers decongesting cities, we
            deliver infrastructure that transforms communities.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>

              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>

              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* View Gallery Button */}
              <a href={service.galleryLink} className="view-gallery-btn">
                View Gallery
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
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
          ))}
        </div>

        <div className="services-cta">
          <div className="cta-content">
            <h3>Need a Custom Solution?</h3>
            <p>
              Our engineering team can assess your project requirements and
              provide tailored infrastructure solutions.
            </p>
          </div>

          <a href="#contact" className="cta-button">
            Discuss Your Project
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
    </section>
  );
};

export default Services;
