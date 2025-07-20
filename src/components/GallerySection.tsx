import React from "react";
import Image from "next/image";

const galleryImages: string[] = [
  "https://i.postimg.cc/0QyG28vc/Our-buffets-Something-we-do-very-often-but-haven-t-shared-enough-Hearty-delicious-dishes-prepar.jpg",
  "https://i.postimg.cc/SRwcrCMv/Our-buffets-Something-we-do-very-often-but-haven-t-shared-enough-Hearty-delicious-dishes-prepar.jpg",
  "https://i.postimg.cc/PxVWCBrh/Our-buffets-Something-we-do-very-often-but-haven-t-shared-enough-Hearty-delicious-dishes-prepar.jpg",
  "https://i.postimg.cc/fWF7Dnrf/Our-buffets-Something-we-do-very-often-but-haven-t-shared-enough-Hearty-delicious-dishes-prepar.jpg",
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Gallery</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((src, idx) => (
          <div
            key={idx}
            className="relative w-full h-48 cursor-pointer group overflow-hidden rounded-lg"
          >
            <Image
              src={src}
              alt={`Gallery Image ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
