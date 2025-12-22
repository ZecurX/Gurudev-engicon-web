"use client";

import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./gallery.css";

const galleryData = {
  highways: [
    {
      id: 1,
      image: "/images/images5.png",
      title: "National Highway Project",
      description: "Large-scale highway construction with modern techniques.",
    },
    {
      id: 2,
      image: "/images/image6.png",
      title: "Expressway Development",
      description: "High-speed corridors for efficient transportation.",
    },
  ],

  flyovers: [
    {
      id: 3,
      image: "/images/image7.png",
      title: "Urban Flyover",
      description: "Reducing traffic congestion in city areas.",
    },
    {
      id: 4,
      image: "/images/image8.png",
      title: "Elevated Road Structure",
      description: "Advanced RCC flyover engineering.",
    },
  ],

  bridges: [
    {
      id: 5,
      image: "/images/images5.png",
      title: "River Bridge",
      description: "Strong foundations across water bodies.",
    },
    {
      id: 6,
      image: "/images/image6.png",
      title: "Concrete Bridge",
      description: "Durable and long-lasting bridge construction.",
    },
  ],

  roads: [
    {
      id: 7,
      image: "/images/image7.png",
      title: "Urban Road Project",
      description: "Smart roads with proper drainage and safety.",
    },
    {
      id: 8,
      image: "/images/image8.png",
      title: "Rural Road Connectivity",
      description: "Connecting villages with reliable roads.",
    },
  ],
};

export default function GalleryPage() {
  const highwayRef = useRef<HTMLDivElement>(null);
  const flyoverRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);

const scroll = (
  ref: React.RefObject<HTMLDivElement | null>,
  direction: "left" | "right"
) => {

    if (!ref.current) return;

    ref.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="gallery-page">
      <Header />

      <main className="gallery-container">
        <h1 className="gallery-title">Project Highlights</h1>
        <p className="gallery-subtitle">
          A glimpse of our completed and ongoing infrastructure projects
        </p>

        {/* HIGHWAY GALLERY */}
        <section className="gallery-section">
          <h2 className="section-heading">Highway Construction</h2>

          <div className="scroll-wrapper">
            <button
              className="scroll-btn left"
              onClick={() => scroll(highwayRef, "left")}
            >
              ❮
            </button>

            <div className="gallery-horizontal" ref={highwayRef}>
              {galleryData.highways.map((item) => (
                <div className="gallery-card" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-image"
                  />
                  <div className="gallery-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="scroll-btn right"
              onClick={() => scroll(highwayRef, "right")}
            >
              ❯
            </button>
          </div>
        </section>

        {/* FLYOVER GALLERY */}
        <section className="gallery-section">
          <h2 className="section-heading">Flyover Construction</h2>

          <div className="scroll-wrapper">
            <button
              className="scroll-btn left"
              onClick={() => scroll(flyoverRef, "left")}
            >
              ❮
            </button>

            <div className="gallery-horizontal" ref={flyoverRef}>
              {galleryData.flyovers.map((item) => (
                <div className="gallery-card" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-image"
                  />
                  <div className="gallery-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="scroll-btn right"
              onClick={() => scroll(flyoverRef, "right")}
            >
              ❯
            </button>
          </div>
        </section>

        {/* BRIDGE GALLERY */}
        <section className="gallery-section">
          <h2 className="section-heading">Bridge Construction</h2>

          <div className="scroll-wrapper">
            <button
              className="scroll-btn left"
              onClick={() => scroll(bridgeRef, "left")}
            >
              ❮
            </button>

            <div className="gallery-horizontal" ref={bridgeRef}>
              {galleryData.bridges.map((item) => (
                <div className="gallery-card" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-image"
                  />
                  <div className="gallery-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="scroll-btn right"
              onClick={() => scroll(bridgeRef, "right")}
            >
              ❯
            </button>
          </div>
        </section>

        {/* ROAD INFRASTRUCTURE */}
        <section className="gallery-section">
          <h2 className="section-heading">Road Infrastructure</h2>

          <div className="scroll-wrapper">
            <button
              className="scroll-btn left"
              onClick={() => scroll(roadRef, "left")}
            >
              ❮
            </button>

            <div className="gallery-horizontal" ref={roadRef}>
              {galleryData.roads.map((item) => (
                <div className="gallery-card" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-image"
                  />
                  <div className="gallery-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="scroll-btn right"
              onClick={() => scroll(roadRef, "right")}
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
