"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";   // <-- Import Header
import Footer from "@/components/Footer";   // <-- Import Footer

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images || data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <Header />

      {/* CONTENT */}
      <main className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img: any) => (
          <img
            key={img._id}
            src={img.image_url}
            alt="Gallery image"
            className="rounded-lg shadow w-full h-64 object-cover"
          />
        ))}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
