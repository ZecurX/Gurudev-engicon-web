'use client';

import React from 'react';

interface ScrollButtonProps {
  children: React.ReactNode;
  className: string;
  targetId?: string;
}

/**
 * ScrollButton Component - Client Component
 * Handles smooth scrolling to specified section
 */
export const ScrollButton: React.FC<ScrollButtonProps> = ({
  children,
  className,
  targetId = 'contact',
}) => {
  const scrollToSection = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button className={className} onClick={scrollToSection}>
      {children}
    </button>
  );
};
