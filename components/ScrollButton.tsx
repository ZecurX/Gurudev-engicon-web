'use client';

import React from 'react';

/**
 * ScrollButton Component - Client Component
 * Handles smooth scrolling to contact section
 */
export const ScrollButton: React.FC<{ children: React.ReactNode; className: string }> = ({ children, className }) => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button className={className} onClick={scrollToContact}>
      {children}
    </button>
  );
};
