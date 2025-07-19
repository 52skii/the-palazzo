// components/CartToggleButton.tsx
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const CartToggleButton = ({ onClick }: { onClick: () => void }) => {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg z-50 hover:bg-gray-800"
    >
      <FiShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartToggleButton;
