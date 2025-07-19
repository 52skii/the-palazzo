// components/CartDrawer.tsx
import React from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, increaseQuantity, decreaseQuantity, clearCart, total } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button className="text-xl font-bold" onClick={onClose}>
          ×
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="p-4 text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="p-4 space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-2">
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded"
              />
              <div className="flex-1 ml-2">
                <h4 className="text-sm font-semibold">{item.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => decreaseQuantity(index)}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => increaseQuantity(index)}
                  >
                    +
                  </button>
                </div>
              </div>
              <span className="text-sm font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="border-t pt-4 text-right font-bold text-lg">
            Total: ${total.toFixed(2)}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={clearCart}
              className="text-sm bg-red-100 text-red-600 px-4 py-2 rounded"
            >
              Clear
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 text-sm rounded"
              onClick={() => alert("Simulated payment")}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
