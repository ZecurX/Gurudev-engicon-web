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

export default function GalleryPage() {
  // scroll refs
  const highwayRef = useRef<HTMLDivElement>(null);
  const flyoverRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);

  // gallery state
  const [gallery, setGallery] = useState<GalleryData>({
    highways: [],
    flyovers: [],
    bridges: [],
    roads: [],
    buildings: [],
  });

  const [loading, setLoading] = useState(true);

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

  // Render gallery section
  const renderSection = (
    title: string,
    images: GalleryImage[],
    ref: React.RefObject<HTMLDivElement | null>,
    id: string
  ) => {
    if (images.length === 0) return null;

    return (
      <section className="gallery-section" id={id}>
        <div className="section-header">
          <h2 className="section-heading">{title}</h2>
        </div>

        <div className="scroll-wrapper">
          <button
            className="scroll-btn left"
            onClick={() => scroll(ref, 'left')}
            aria-label="Scroll left"
          >
            ❮
          </button>

          <div className="gallery-horizontal" ref={ref}>
            {images.map((item) => (
              <div className="gallery-card" key={item.id}>
                <div className="image-container">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="image-overlay" />
                </div>
                <div className="gallery-content">
                  <h3>{item.title}</h3>
                  {item.description && <p>{item.description}</p>}
                </div>
              </div>
            ))}
          </div>

          <button
            className="scroll-btn right"
            onClick={() => scroll(ref, 'right')}
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

  const totalProjects =
    gallery.buildings.length +
    gallery.highways.length +
    gallery.flyovers.length +
    gallery.bridges.length +
    gallery.roads.length;

  return (
    <div className="gallery-page">
      <Header />

      {/* Hero Section */}
      <div className="gallery-hero">
        <h1 className="gallery-title">Project Gallery</h1>
        <p className="gallery-subtitle">
          Explore our portfolio of infrastructure
          projects showcasing our expertise in construction excellence
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
        {renderSection(
          'Building Construction',
          gallery.buildings,
          buildingRef,
          'building-gallery'
        )}
        {renderSection(
          'Highway Construction',
          gallery.highways,
          highwayRef,
          'highway-gallery'
        )}
        {renderSection(
          'Flyover Construction',
          gallery.flyovers,
          flyoverRef,
          'flyover-gallery'
        )}
        {renderSection(
          'Bridge Construction',
          gallery.bridges,
          bridgeRef,
          'bridge-gallery'
        )}
        {renderSection(
          'Road Infrastructure',
          gallery.roads,
          roadRef,
          'road-gallery'
        )}

        {totalProjects === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">📷</div>
            <h4>No Projects Yet</h4>
            <p>Project images will appear here once uploaded.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
