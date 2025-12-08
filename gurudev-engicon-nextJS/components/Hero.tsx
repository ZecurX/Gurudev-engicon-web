import React from 'react';
import { ScrollButton } from './ScrollButton';
import '../app/styles/Hero.css';

/**
 * Hero Component - Server Component
 * Modern split-layout hero section with image and content
 * Uses ScrollButton client component for interactive elements
 */
const Hero: React.FC = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">Premium Engineering Solutions</div>
          <h1 className="hero-title">Shaping future through excellence</h1>
          <p className="hero-description">
            We developed landmark infrastructure projects that deliver lasting value 
            to investors and communities.
          </p>
          <ScrollButton className="hero-cta">
            View All Services
            <svg className="cta-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ScrollButton>
          
          <div className="hero-stats">
            <div className="stat-badge">
              <div className="stat-number">15+</div>
              <div className="stat-label">years of experience</div>
            </div>
            <button className="watch-button">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5 3.5L12 8L5 12.5V3.5Z"/>
              </svg>
              Watch
            </button>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="image-wrapper">
            <div className="image-placeholder">
              <span>Landmark Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
