// components/Lightbox.tsx
import React from "react";

interface LightboxProps {
  image: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ image, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <img
        src={image}
        alt="Full View"
        className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
      />
      <button
        className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-red-400"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
};

export default Lightbox;
