import React from 'react';
import type { Service } from '@/lib/types';
import '../app/styles/Services.css';

/**
 * Services Component - Server Component
 * Professional showcase of infrastructure services
 */
const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: 1,
      title: 'Highway Construction',
      description:
        'Complete highway development from planning to execution, delivering durable road infrastructure that connects regions and drives economic growth.',
      icon: '🛣️',
      features: [
        'National & State Highway construction',
        'Expressway & corridor development',
        'Pavement construction & resurfacing',
        'Drainage & safety infrastructure',
        'Traffic management systems',
      ],
    },
    {
      id: 2,
      title: 'Flyover Construction',
      description:
        'Advanced elevated structures engineered for smooth urban mobility and reduced traffic congestion in growing cities.',
      icon: '🌉',
      features: [
        'RCC & PSC flyover construction',
        'Foundation & piling works',
        'Structural load analysis & design',
        'Urban traffic flow optimization',
        'Seismic-resistant engineering',
      ],
    },
    {
      id: 3,
      title: 'Bridge Construction',
      description:
        'Robust bridge solutions designed for all terrains, ensuring safe passage across rivers, valleys, and challenging landscapes.',
      icon: '🏗️',
      features: [
        'Pre-stressed concrete bridges',
        'River crossing & deep foundation',
        'Box culvert construction',
        'Rehabilitation & strengthening',
        'Quality testing & inspections',
      ],
    },
    {
      id: 4,
      title: 'Road Infrastructure',
      description:
        'Comprehensive road development including rural roads, urban arteries, and industrial access roads with complete infrastructure.',
      icon: '🚧',
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
