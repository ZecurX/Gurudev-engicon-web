/**
 * TypeScript Type Definitions
 * Gurudev Engicon Private Limited - Next.js Application
 */

// Service types
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  galleryLink: string;
}

// Project types
export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  status: 'Completed' | 'Ongoing' | 'Planning';
  image: string; 
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  href: string;
}
