'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './gallery.css';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

interface GalleryData {
  highways: GalleryImage[];
  flyovers: GalleryImage[];
  bridges: GalleryImage[];
  roads: GalleryImage[];
}

// Fallback static data for when Cloudinary images are not available
const fallbackGalleryData: GalleryData = {
  highways: [
    {
      id: '1',
      url: '/images/images5.png',
      title: 'National Highway Project',
      description: 'Large-scale highway construction with modern techniques.',
    },
    {
      id: '2',
      url: '/images/image6.png',
      title: 'Expressway Development',
      description: 'High-speed corridors for efficient transportation.',
    },
  ],

  flyovers: [
    {
      id: '3',
      url: '/images/image7.png',
      title: 'Urban Flyover',
      description: 'Reducing traffic congestion in city areas.',
    },
    {
      id: '4',
      url: '/images/image8.png',
      title: 'Elevated Road Structure',
      description: 'Advanced RCC flyover engineering.',
    },
  ],

  bridges: [
    {
      id: '5',
      url: '/images/images5.png',
      title: 'River Bridge',
      description: 'Strong foundations across water bodies.',
    },
    {
      id: '6',
      url: '/images/image6.png',
      title: 'Concrete Bridge',
      description: 'Durable and long-lasting bridge construction.',
    },
  ],

  roads: [
    {
      id: '7',
      url: '/images/image7.png',
      title: 'Urban Road Project',
      description: 'Smart roads with proper drainage and safety.',
    },
    {
      id: '8',
      url: '/images/image8.png',
      title: 'Rural Road Connectivity',
      description: 'Connecting villages with reliable roads.',
    },
  ],
};

export default function GalleryPage() {
  const [galleryData, setGalleryData] =
    useState<GalleryData>(fallbackGalleryData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();

        // Merge Cloudinary data with fallback data
        setGalleryData({
          highways:
            data.highways?.length > 0
              ? data.highways
              : fallbackGalleryData.highways,
          flyovers:
            data.flyovers?.length > 0
              ? data.flyovers
              : fallbackGalleryData.flyovers,
          bridges:
            data.bridges?.length > 0
              ? data.bridges
              : fallbackGalleryData.bridges,
          roads:
            data.roads?.length > 0 ? data.roads : fallbackGalleryData.roads,
        });
      } catch (error) {
        console.error('Error fetching gallery data:', error);
        // Keep fallback data on error
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const renderGallerySection = (
    id: string,
    title: string,
    images: GalleryImage[]
  ) => (
    <section id={id} className="gallery-section">
      <h2 className="section-heading">{title}</h2>
      <div className="gallery-grid">
        {images.map((item) => (
          <div className="gallery-card" key={item.id}>
            <img
              src={item.url}
              alt={item.title}
              className="gallery-image"
              loading="lazy"
            />
            <div className="gallery-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="gallery-page">
      <Header />

      <main className="gallery-container">
        <h1 className="gallery-title">Project Highlights</h1>
        <p className="gallery-subtitle">
          A glimpse of our completed and ongoing infrastructure projects
        </p>

        {loading ? (
          <div className="gallery-loading">
            <div className="gallery-spinner"></div>
            <p>Loading gallery...</p>
          </div>
        ) : (
          <>
            {renderGallerySection(
              'highway-gallery',
              'Highway Construction',
              galleryData.highways
            )}
            {renderGallerySection(
              'flyover-gallery',
              'Flyover Construction',
              galleryData.flyovers
            )}
            {renderGallerySection(
              'bridge-gallery',
              'Bridge Construction',
              galleryData.bridges
            )}
            {renderGallerySection(
              'road-gallery',
              'Road Infrastructure',
              galleryData.roads
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
