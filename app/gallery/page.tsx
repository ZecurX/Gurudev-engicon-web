"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./gallery.css";

const galleryImages = [
  {
    id: 1,
    image: "/images/images5.png",
    title: "Highway Construction",
    description: "Modern infrastructure development.",
  },
  {
    id: 2,
    image: "/images/image6.png",
    title: "Heavy Machinery",
    description: "Advanced equipment for large-scale projects.",
  },
  {
    id: 3,
    image: "/images/image7.png",
    title: "Structural Engineering",
    description: "Strong foundations and smart execution.",
  },
  {
    id: 4,
    image: "/images/image8.png",
    title: "Building Projects",
    description: "Residential and commercial construction.",
  },
];

export default function GalleryPage() {
  return (
    <div className="gallery-page">
      <Header />

      <main className="gallery-container">
        <h1 className="gallery-title">Our Gallery</h1>
        <p className="gallery-subtitle">
          A glimpse of our completed and ongoing projects
        </p>

        <div className="gallery-grid">
          {galleryImages.map((item) => (
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
      </main>

      <Footer />
    </div>
  );
}
