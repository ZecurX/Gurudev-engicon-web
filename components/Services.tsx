import React from 'react';
import type { Service } from '@/lib/types';
import '../app/styles/Services.css';

/**
 * Services Component - Server Component
 * Showcase of company's core service offerings
 * Data is typed and rendered server-side for better SEO
 */
const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: 1,
      title: 'Construction of Highways',
      description: 'High-quality road infrastructure built for durability and efficiency',
      icon: '',
      features: [
        'Highway design & alignment planning',
        'Pavement construction & resurfacing',
        'Drainage & safety infrastructure',
        'Traffic management systems'
      ]
    },
    {
      id: 2,
      title: 'Construction of Flyovers',
      description: 'Advanced elevated structures for smooth urban mobility',
      icon: '',
      features: [
        'RCC & PSC flyover construction',
        'Foundation & piling works',
          'Structural load analysis',
         'Urban traffic flow optimization'
      ]
    },
    {
      id: 3,
      title: 'Construction of Bridges',
      description: 'Strong and reliable bridge solutions for all terrains',
      icon: '',
      features: [
        'Bridge design & engineering',
        'Pre-stressed concrete structures',
        'River crossing & foundation works',
        'Safety inspections & quality control'
      ]
    },
    {
      id: 4,
      title: 'Mega Highways and Road Construction',
      description: 'Large-scale infrastructure projects executed with precision',
      icon: '',
      features: [
        'Expressway & corridor development',
        'Heavy earthwork & grading',
        'Advanced machinery deployment',
        'Project execution & compliance management'
      ]
    }
  ];

  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="title-underline"></div>
        <p className="section-subtitle">
          From planning to completion, we&apos;re with you every step of the way
        </p>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>
                    <span className="check-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
