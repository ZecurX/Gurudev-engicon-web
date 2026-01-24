import React from 'react';
import { ScrollButton } from './ScrollButton';
import '../app/styles/Hero.css';

/**
 * Hero Component - Server Component
 * Professional infrastructure hero with strong messaging
 * Emphasizes trust, expertise, and large-scale project capability
 */
const Hero: React.FC = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>

      {/* Decorative Lines */}
      <div className="hero-lines">
        <div className="hero-line hero-line-1"></div>
        <div className="hero-line hero-line-2"></div>
        <div className="hero-line hero-line-3"></div>
      </div>

      {/* Decorative Circles */}
      <div className="hero-decoration">
        <div className="decoration-circle decoration-circle-1"></div>
        <div className="decoration-circle decoration-circle-2"></div>
        <div className="decoration-circle decoration-circle-3"></div>
        <div className="decoration-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 0V4l3 2 3-2v3m0 0v1a3 3 0 0 0 6 0V7M6 21V10m6 11V10m6 11V10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-badge">
            Trusted Infrastructure Partner Since 2012
          </span>

          <div className="hero-tags">
            <span className="hero-tag">Highways & Expressways</span>
            <span className="hero-tag">Bridges & Flyovers</span>
            <span className="hero-tag">Urban Mobility</span>
          </div>

          <h1 className="hero-title">
            Building India&apos;s Future
            <span className="title-highlight">Infrastructure</span>
          </h1>
          <p className="hero-description">
            Gurudev Engicon Private Limited delivers large-scale infrastructure
            projects including highways, flyovers, and bridges with precision
            engineering, unwavering quality standards, and a commitment to
            on-time delivery.
          </p>

          <div className="hero-highlights">
            <div className="highlight-item">
              <div className="highlight-icon" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M4 11h16" strokeLinecap="round" />
                  <path d="M6 7h12M8 3h8" strokeLinecap="round" />
                  <path d="M6 11v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6" />
                </svg>
              </div>
              <div>
                <p className="highlight-title">EPC & Turnkey Delivery</p>
                <p className="highlight-sub">
                  Integrated engineering, procurement, and execution teams
                </p>
              </div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    d="M8 13l2 2 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="highlight-title">QA/QC First</p>
                <p className="highlight-sub">
                  ISO-certified quality frameworks and site audits
                </p>
              </div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-3.5L6 21l1.5-7.5L2 9h7z" />
                </svg>
              </div>
              <div>
                <p className="highlight-title">Safety-First Sites</p>
                <p className="highlight-sub">
                  Zero-harm targets with trained on-ground teams
                </p>
              </div>
            </div>
          </div>

          <div className="hero-actions">
            <ScrollButton className="hero-cta-primary" targetId="projects">
              View Our Projects
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10H16M16 10L11 5M16 10L11 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ScrollButton>
            <ScrollButton className="hero-cta-secondary" targetId="contact">
              Get a Quote
            </ScrollButton>
            <ScrollButton className="hero-cta-ghost" targetId="services">
              Capability Deck
            </ScrollButton>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-value">12+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-divider"></div>
            <div className="hero-stat">
              <span className="stat-value">₹100Cr+</span>
              <span className="stat-label">Project Value</span>
            </div>
          </div>
        </div>

        <aside className="hero-aside" aria-label="Project pipeline">
          <div className="aside-header">
            <span className="aside-pill">Current pipeline</span>
            <p className="aside-title">
              Roads, bridges, and mobility corridors in execution
            </p>
          </div>
          <div className="aside-grid">
            <div className="aside-card">
              <p className="aside-label">Active Sites</p>
              <p className="aside-value">08</p>
              <p className="aside-sub">Across Bihar & Jharkhand</p>
            </div>
            <div className="aside-card">
              <p className="aside-label">On-Time Index</p>
              <p className="aside-value">98%</p>
              <p className="aside-sub">Deliveries this fiscal</p>
            </div>
            <div className="aside-card">
              <p className="aside-label">Safety Score</p>
              <p className="aside-value">0 LTI</p>
              <p className="aside-sub">Lost time incidents</p>
            </div>
          </div>
          <div className="aside-footer">
            <div className="aside-badge">Govt. & PPP expertise</div>
            <div className="aside-badge">Design & Build</div>
          </div>
        </aside>
      </div>

      {/* Trust Indicators */}
      <div className="hero-trust-bar">
        <div className="trust-container">
          <div className="trust-item">
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
            <span>ISO Certified</span>
          </div>
          <div className="trust-item">
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
            <span>Government Approved Contractor</span>
          </div>
          <div className="trust-item">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Safety Compliant</span>
          </div>
          <div className="trust-item">
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
            <span>On-Time Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
