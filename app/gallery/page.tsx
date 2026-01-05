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
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };

  // fetch gallery data
  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data: GalleryData) => {
        setGallery(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Gallery fetch failed:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="gallery-page">
        <Header />
        <main className="gallery-container">
          <p style={{ textAlign: 'center' }}>Loading gallery...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <Header />

      <main className="gallery-container">
        <h1 className="gallery-title">Project Highlights</h1>
        <p className="gallery-subtitle">
          A glimpse of our completed and ongoing infrastructure projects
        </p>

        {/* BUILDING */}
        <section className="gallery-section">
          <h2 className="section-heading">Building Construction</h2>

          <div className="scroll-wrapper">
            <button
              className="scroll-btn left"
              onClick={() => scroll(buildingRef, 'left')}
            >
              ❮
            </button>

            <div className="gallery-horizontal" ref={buildingRef}>
              {gallery.buildings.map((item) => (
                <div className="gallery-card" key={item.id}>
                  <img
                    src={item.url}
                    alt={item.title}
                    className="gallery-image"
                  />
                  <div className="gallery-content">
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="scroll-btn right"
              onClick={() => scroll(buildingRef, 'right')}
            >
              ❯
            </button>
          </div>
        </section>

        {/* HIGHWAY */}
        <section className="gallery-section">
          <h2 className="section-heading">Highway Construction</h2>

          <div className="scroll-wrapper">
            <button
              className="scroll-btn left"
              onClick={() => scroll(highwayRef, 'left')}
            >
              ❮
            </button>

            <div className="gallery-horizontal" ref={highwayRef}>
              {gallery.highways.map((item) => (
                <div className="gallery-card" key={item.id}>
                  <img
                    src={item.url}
                    alt={item.title}
                    className="gallery-image"
                  />
                  <div className="gallery-content">
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="scroll-btn right"
              onClick={() => scroll(highwayRef, 'right')}
            >
              ❯
            </button>
          </div>
        </section>

        {/* FLYOVER */}
        <section className="gallery-section">
          <h2 className="section-heading">Flyover Construction</h2>

          <div className="scroll-wrapper">
            <button
              className="scroll-btn left"
              onClick={() => scroll(flyoverRef, 'left')}
            >
              ❮
            </button>

            <div className="gallery-horizontal" ref={flyoverRef}>
              {gallery.flyovers.map((item) => (
                <div className="gallery-card" key={item.id}>
                  <img
                    src={item.url}
                    alt={item.title}
                    className="gallery-image"
                  />
                  <div className="gallery-content">
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="scroll-btn right"
              onClick={() => scroll(flyoverRef, 'right')}
            >
              ❯
            </button>
          </div>
        </section>

        {/* BRIDGE */}
        <section className="gallery-section">
          <h2 className="section-heading">Bridge Construction</h2>

          <div className="scroll-wrapper">
            <button
              className="scroll-btn left"
              onClick={() => scroll(bridgeRef, 'left')}
            >
              ❮
            </button>

            <div className="gallery-horizontal" ref={bridgeRef}>
              {gallery.bridges.map((item) => (
                <div className="gallery-card" key={item.id}>
                  <img
                    src={item.url}
                    alt={item.title}
                    className="gallery-image"
                  />
                  <div className="gallery-content">
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="scroll-btn right"
              onClick={() => scroll(bridgeRef, 'right')}
            >
              ❯
            </button>
          </div>
        </section>

        {/* ROAD */}
        <section className="gallery-section">
          <h2 className="section-heading">Road Infrastructure</h2>

          <div className="scroll-wrapper">
            <button
              className="scroll-btn left"
              onClick={() => scroll(roadRef, 'left')}
            >
              ❮
            </button>

            <div className="gallery-horizontal" ref={roadRef}>
              {gallery.roads.map((item) => (
                <div className="gallery-card" key={item.id}>
                  <img
                    src={item.url}
                    alt={item.title}
                    className="gallery-image"
                  />
                  <div className="gallery-content">
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="scroll-btn right"
              onClick={() => scroll(roadRef, 'right')}
            >
              ❯
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
