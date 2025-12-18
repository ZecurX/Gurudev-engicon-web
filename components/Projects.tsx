import React from 'react';
import type { Project } from '@/lib/types';
import '../app/styles/Projects.css';

/**
 * Projects Component - Server Component
 * Professional portfolio showcase of infrastructure projects
 */
const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'National Highway Construction - NH-31',
      category: 'Highway',
      description:
        'Construction of 45km stretch of National Highway connecting major industrial zones with high-quality asphalt pavement and modern drainage systems.',
      status: 'Completed',
      image: '/images/image7.png',
    },
    {
      id: 2,
      title: 'Urban Flyover Project - Bhagalpur',
      category: 'Flyover',
      description:
        'Multi-lane elevated flyover reducing urban congestion, featuring pre-stressed concrete design and integrated traffic management.',
      status: 'Completed',
      image: '/images/image6.png',
    },
    {
      id: 3,
      title: 'River Bridge Construction',
      category: 'Bridge',
      description:
        'Construction of major river crossing bridge with deep pile foundations, designed for heavy traffic loads and seismic resistance.',
      status: 'Completed',
      image: '/images/image8.png',
    },
    {
      id: 4,
      title: 'State Highway Expansion',
      category: 'Highway',
      description:
        'Widening and strengthening of existing state highway to four-lane configuration with improved safety features.',
      status: 'Ongoing',
      image: '/images/images5.png',
    },
  ];

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <div className="projects-header">
          <span className="section-label">Our Portfolio</span>
          <h2 className="projects-title">Featured Projects</h2>
          <p className="projects-subtitle">
            A selection of our completed and ongoing infrastructure projects
            demonstrating our capabilities and commitment to excellence.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <a href="#contact" className="project-link">
                  Request Details
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
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
          ))}
        </div>

        <div className="projects-stats">
          <div className="project-stat-item">
            <span className="stat-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </span>
            <span className="stat-value">500+ KM</span>
            <span className="stat-label">Road Length Constructed</span>
          </div>
          <div className="project-stat-item">
            <span className="stat-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
              </svg>
            </span>
            <span className="stat-value">15+</span>
            <span className="stat-label">Bridges & Flyovers</span>
          </div>
          <div className="project-stat-item">
            <span className="stat-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
            <span className="stat-value">Zero</span>
            <span className="stat-label">Safety Incidents</span>
          </div>
          <div className="project-stat-item">
            <span className="stat-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
            <span className="stat-value">98%</span>
            <span className="stat-label">On-Time Completion</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
