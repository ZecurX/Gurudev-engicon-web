import React from 'react';
import '../app/styles/About.css';

/**
 * About Component - Server Component
 * Company overview emphasizing trust, expertise, and track record
 */
const About: React.FC = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-grid">
          <div className="about-content">
            <span className="section-label">About Our Company</span>
            <h2 className="about-title">
              Building Infrastructure That Stands the Test of Time
            </h2>
            <p className="about-text">
              Gurudev Engicon Private Limited is a trusted name in India&apos;s
              infrastructure development sector. Established in 2012, we have
              consistently delivered large-scale highway, flyover, and bridge
              construction projects with precision, quality, and commitment to
              timelines.
            </p>
            <p className="about-text">
              Our experienced team of civil engineers, project managers, and
              skilled workforce brings together decades of collective expertise.
              We leverage modern construction methodologies, state-of-the-art
              equipment, and rigorous quality control processes to ensure every
              project meets the highest standards.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div className="highlight-content">
                  <h4>Government Approved</h4>
                  <p>
                    Registered contractor with PWD and NHAI for infrastructure
                    projects
                  </p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="highlight-content">
                  <h4>Quality Certified</h4>
                  <p>ISO 9001:2015 certified for quality management systems</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="highlight-content">
                  <h4>On-Time Delivery</h4>
                  <p>98% project completion rate within scheduled timelines</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-stats-panel">
            <div className="stats-card">
              <div className="stat-item">
                <span className="stat-number">12+</span>
                <span className="stat-label">Years of Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">₹100Cr+</span>
                <span className="stat-label">Project Value Delivered</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">200+</span>
                <span className="stat-label">Skilled Professionals</span>
              </div>
            </div>

            <div className="mission-card">
              <h3>Our Mission</h3>
              <p>
                To contribute to India&apos;s infrastructure growth by
                delivering world-class construction projects that connect
                communities, drive economic development, and stand as testaments
                to engineering excellence for generations to come.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
