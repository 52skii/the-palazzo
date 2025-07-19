// /src/components/Modal.tsx
import React from 'react';

interface ModalProps {
  image: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ image, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <button
        className="absolute top-4 right-6 text-white text-3xl font-bold z-50 hover:text-red-400"
        onClick={onClose}
      >
        &times;
      </button>
      <img
        src={image}
        alt="Preview"
        className="max-w-[90%] max-h-[90%] object-contain"
      />
    </div>
  );
};

export default Modal;
