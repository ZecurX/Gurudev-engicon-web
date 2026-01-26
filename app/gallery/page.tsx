'use client';

import { useRef, useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './gallery.css';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  width: number;
  height: number;
}

interface GalleryData {
  highways: GalleryImage[];
  flyovers: GalleryImage[];
  bridges: GalleryImage[];
  roads: GalleryImage[];
  buildings: GalleryImage[];
}

interface Project {
  name: string;
  description: string;
  images: GalleryImage[];
  thumbnail: string;
}

export default function GalleryPage() {
  // scroll refs
  const buildingRef = useRef<HTMLDivElement>(null);
  const highwayRef = useRef<HTMLDivElement>(null);
  const flyoverRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);

  // gallery state
  const [gallery, setGallery] = useState<GalleryData>({
    highways: [],
    flyovers: [],
    bridges: [],
    roads: [],
    buildings: [],
  });

  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // scroll handler
  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: 'left' | 'right'
  ) => {
    if (!ref.current) return;

    ref.current.scrollBy({
      left: direction === 'left' ? -380 : 380,
      behavior: 'smooth',
    });
  };

  // fetch gallery data
  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((galleryData) => {
        setGallery(galleryData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch failed:', err);
        setLoading(false);
      });
  }, []);

  // Modal handlers
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev < selectedProject.images.length - 1 ? prev + 1 : 0
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev > 0 ? prev - 1 : selectedProject.images.length - 1
      );
    }
  };

  // Group images by project (title) - reusable for all categories
  const groupImagesByProject = (images: GalleryImage[]): Project[] => {
    const projectMap = new Map<string, GalleryImage[]>();

    images.forEach((image) => {
      const projectName = image.title || 'Untitled Project';
      if (!projectMap.has(projectName)) {
        projectMap.set(projectName, []);
      }
      projectMap.get(projectName)!.push(image);
    });

    return Array.from(projectMap.entries()).map(([name, imgs]) => {
      let description = imgs[0]?.description || '';

      // Manual overrides for specific projects
      if (name.includes('Rasalpur Police Station')) {
        description = 'This police station was built by Gurudev Engicon in December 2023. Its inauguration was done by SSP Anand Kumar on 12th Jan 2024. This project was assigned under Bihar Police Bhawan Nirmaan Nigam.';
      } else if (name.includes('Baranti Police Station')) {
        description = 'This police station was built by Gurudev Engicon in April 2024. Its inauguration was done by SHO Manoj Kumar on 30th August 2024. This project was assigned under Bihar Police Bhawan Nirmaan Nigam.';
      }

      return {
        name,
        description,
        images: imgs,
        thumbnail: imgs[0]?.url || '',
      };
    });
  };

  const buildingProjects = groupImagesByProject(gallery.buildings);

  // Render upcoming services section with preview images
  const renderUpcomingSection = (
    title: string,
    id: string,
    images: GalleryImage[],
    scrollRef: React.RefObject<HTMLDivElement | null>
  ) => {
    const projects = groupImagesByProject(images);

    // If no images, show empty placeholder
    if (projects.length === 0) {
      return (
        <section className="gallery-section" id={id}>
          <div className="section-header">
            <h2 className="section-heading">{title}</h2>
            <span className="section-badge upcoming">Coming Soon</span>
          </div>
          <div className="wip-container">
            <div className="wip-icon">🏗️</div>
            <h3 className="wip-title">Projects Coming Soon</h3>
            <p className="wip-text">
              We&apos;re preparing to showcase our {title.toLowerCase()} projects.
            </p>
          </div>
        </section>
      );
    }

    return (
      <section className="gallery-section" id={id}>
        <div className="section-header">
          <h2 className="section-heading">{title}</h2>
          <span className="section-badge upcoming">Coming Soon</span>
        </div>

        <div className="scroll-wrapper">
          <button
            className="scroll-btn left"
            onClick={() => scroll(scrollRef, 'left')}
            aria-label="Scroll left"
          >
            ❮
          </button>

          <div className="gallery-horizontal" ref={scrollRef}>
            {projects.map((project, index) => (
              <div className="gallery-card upcoming-card" key={index}>
                <div className="image-container">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="upcoming-overlay">
                    <span className="upcoming-badge">Coming Soon</span>
                  </div>
                  {project.images.length > 1 && (
                    <div className="project-image-count">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <span>{project.images.length}</span>
                    </div>
                  )}
                </div>
                <div className="gallery-content">
                  <h3>{project.name}</h3>
                  {project.description && <p>{project.description}</p>}
                </div>
              </div>
            ))}
          </div>

          <button
            className="scroll-btn right"
            onClick={() => scroll(scrollRef, 'right')}
            aria-label="Scroll right"
          >
            ❯
          </button>
        </div>
      </section>
    );
  };

  // Render building projects section
  const renderBuildingSection = () => {
    if (buildingProjects.length === 0) return null;

    return (
      <section className="gallery-section" id="building-gallery">
        <div className="section-header">
          <h2 className="section-heading">Building Construction</h2>
          <span className="section-count">{buildingProjects.length} Projects</span>
        </div>

        <div className="scroll-wrapper">
          <button
            className="scroll-btn left"
            onClick={() => scroll(buildingRef, 'left')}
            aria-label="Scroll left"
          >
            ❮
          </button>

          <div className="gallery-horizontal" ref={buildingRef}>
            {buildingProjects.map((project, index) => (
              <div
                className="gallery-card project-card"
                key={index}
                onClick={() => openProjectModal(project)}
              >
                <div className="image-container">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="image-overlay" />
                  <div className="project-image-count">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>{project.images.length}</span>
                  </div>
                </div>
                <div className="gallery-content">
                  <h3>{project.name}</h3>
                  {project.description && <p>{project.description}</p>}
                  <span className="view-project-btn">View Gallery</span>
                </div>
              </div>
            ))}
          </div>

          <button
            className="scroll-btn right"
            onClick={() => scroll(buildingRef, 'right')}
            aria-label="Scroll right"
          >
            ❯
          </button>
        </div>
      </section>
    );
  };

  if (loading) {
    return (
      <div className="gallery-page">
        <Header />
        <div className="gallery-hero">
          <h1 className="gallery-title">Project Gallery</h1>
          <p className="gallery-subtitle">
            Explore our portfolio of infrastructure projects
          </p>
        </div>
        <main className="gallery-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading gallery...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <Header />

      {/* Hero Section */}
      <div className="gallery-hero">
        <h1 className="gallery-title">Project Gallery</h1>
        <p className="gallery-subtitle">
          Explore our portfolio of infrastructure projects showcasing
          excellence in engineering and construction
        </p>

        <div className="gallery-categories">
          <a href="#building-gallery" className="category-pill">
            Buildings
          </a>
          <a href="#highway-gallery" className="category-pill">
            Highways
          </a>
          <a href="#flyover-gallery" className="category-pill">
            Flyovers
          </a>
          <a href="#bridge-gallery" className="category-pill">
            Bridges
          </a>
          <a href="#road-gallery" className="category-pill">
            Roads
          </a>
        </div>
      </div>

      <main className="gallery-container">
        {/* Building Construction - Active Section */}
        {renderBuildingSection()}

        {/* Upcoming Services Sections */}
        {renderUpcomingSection('Highway Construction', 'highway-gallery', gallery.highways, highwayRef)}
        {renderUpcomingSection('Flyover Construction', 'flyover-gallery', gallery.flyovers, flyoverRef)}
        {renderUpcomingSection('Bridge Construction', 'bridge-gallery', gallery.bridges, bridgeRef)}
        {renderUpcomingSection('Road Infrastructure', 'road-gallery', gallery.roads, roadRef)}

        {buildingProjects.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">📷</div>
            <h4>Gallery Coming Soon</h4>
            <p>Our project gallery is being updated. Check back shortly.</p>
          </div>
        )}
      </main>

      {/* Project Modal */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeModal}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>

            <div className="modal-header">
              <h2>{selectedProject.name}</h2>
              <span className="modal-image-counter">
                {currentImageIndex + 1} / {selectedProject.images.length}
              </span>
            </div>

            <div className="modal-image-container">
              {selectedProject.images.length > 1 && (
                <button className="modal-nav prev" onClick={prevImage}>
                  ❮
                </button>
              )}

              <img
                src={selectedProject.images[currentImageIndex].url}
                alt={selectedProject.images[currentImageIndex].title}
                className="modal-image"
              />

              {selectedProject.images.length > 1 && (
                <button className="modal-nav next" onClick={nextImage}>
                  ❯
                </button>
              )}
            </div>

            {selectedProject.images.length > 1 && (
              <div className="modal-thumbnails">
                {selectedProject.images.map((img, index) => (
                  <div
                    key={img.id}
                    className={`modal-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={img.url} alt={img.title} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
