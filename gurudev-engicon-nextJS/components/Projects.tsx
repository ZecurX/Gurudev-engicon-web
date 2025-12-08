import React from 'react';
import type { Project } from '@/lib/types';
import '../app/styles/Projects.css';

/**
 * Projects Component - Server Component
 * Portfolio showcase with grid layout
 * Rendered server-side for optimal SEO and performance
 */
const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'Metro Rail Extension',
      category: 'Infrastructure',
      description: 'Urban metro railway construction and station development with modern facilities and sustainable design.',
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Corporate Tech Park',
      category: 'Commercial',
      description: 'Multi-story office complex with modern amenities, green spaces, and smart building technology.',
      status: 'Ongoing'
    },
    {
      id: 3,
      title: 'Highway Expansion Project',
      category: 'Transportation',
      description: 'Six-lane highway construction with advanced drainage systems and safety infrastructure.',
      status: 'Completed'
    }
  ];

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <div className="projects-badge">FEATURED WORKS</div>
        <h2 className="projects-title">Discover some of our projects</h2>
        
        <div className="projects-list">
          {projects.map((project, index) => (
            <div key={project.id} className={`project-card-horizontal ${index % 2 === 1 ? 'reverse' : ''}`}>
              <div className="project-image-large">
                <div className="image-placeholder-large">
                  <span>{project.category}</span>
                </div>
              </div>
              <div className="project-info-card">
                <span className={`project-badge ${project.status.toLowerCase()}`}>
                  {project.status}
                </span>
                <h3 className="project-name">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <button className="project-cta">
                  <span>View More</span>
                  <svg className="arrow-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="projects-footer">
          <button className="view-all-btn">
            VIEW ALL
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
