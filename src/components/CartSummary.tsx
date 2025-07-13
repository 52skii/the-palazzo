// /src/components/CartSummary.tsx

import React from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const CartSummary = () => {
  const { cart, total, increaseQuantity, decreaseQuantity, clearCart } = useCart();

  if (cart.length === 0) return null;

  return (
    <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">🛒 Your Cart</h3>
      <ul className="space-y-4">
        {cart.map((item, index) => (
          <li key={index} className="flex items-center gap-4">
            <Image
              src={item.image}
              alt={item.name}
              width={60}
              height={60}
              className="rounded-md"
            />
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">MWK {item.price.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  className="bg-gray-300 px-2 rounded"
                  onClick={() => decreaseQuantity(item.name)}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  className="bg-gray-300 px-2 rounded"
                  onClick={() => increaseQuantity(item.name)}
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-right font-medium text-gray-700">
              MWK {(item.price * item.quantity).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right">
        <p className="text-lg font-bold text-gray-800">Total: MWK {total.toLocaleString()}</p>
        <button
          onClick={clearCart}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
