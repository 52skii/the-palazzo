// components/GallerySection.tsx
import React, { useState } from "react";
import Lightbox from "./Lightbox";

const galleryImages = [
  "https://i.postimg.cc/0QyG28vc/Our-buffets-Something-we-do-very-often-but-haven-t-shared-enough-Hearty-delicious-dishes-prepar.jpg",
  "https://i.postimg.cc/SRwcrCMv/Our-buffets-Something-we-do-very-often-but-haven-t-shared-enough-Hearty-delicious-dishes-prepar.jpg",
  "https://i.postimg.cc/PxVWCBrh/Our-buffets-Something-we-do-very-often-but-haven-t-shared-enough-Hearty-delicious-dishes-prepar.jpg",
  "https://i.postimg.cc/fWF7Dnrf/Our-buffets-Something-we-do-very-often-but-haven-t-shared-enough-Hearty-delicious-dishes-prepar.jpg",
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">Gallery</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Gallery Image ${idx + 1}`}
            className="w-full h-48 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setSelectedImage(src)}
          />
        ))}
      </div>

      {selectedImage && (
        <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </section>
  );
};

export default GallerySection;
