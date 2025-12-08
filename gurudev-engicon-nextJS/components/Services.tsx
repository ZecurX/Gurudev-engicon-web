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
      title: 'Engineering Services',
      description: 'Complete engineering solutions across multiple disciplines',
      icon: '',
      features: [
        'Structural Engineering',
        'MEP Design',
        'Project Planning',
        'Technical Consultation'
      ]
    },
    {
      id: 2,
      title: 'Infrastructure Development',
      description: 'Creating durable infrastructure that supports long-term growth',
      icon: '',
      features: [
        'Road & Highway Construction',
        'Bridge Engineering',
        'Urban Development',
        'Water Supply Systems'
      ]
    },
    {
      id: 3,
      title: 'Construction Management',
      description: 'Full project execution and on-site management from start to finish',
      icon: '',
      features: [
        'Project Coordination',
        'Quality Control',
        'Safety Management',
        'Timeline Optimization'
      ]
    },
    {
      id: 4,
      title: 'Consultancy',
      description: 'Expert guidance to help you navigate complex engineering challenges',
      icon: '',
      features: [
        'Feasibility Studies',
        'Technical Audits',
        'Risk Assessment',
        'Regulatory Compliance'
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
