// /src/context/CartContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  increaseQuantity: (name: string) => void;
  decreaseQuantity: (name: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load from localStorage on first mount
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Sync with localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (name: string) => {
    setCart((prev) =>
      prev.map((i) =>
        i.name === name ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decreaseQuantity = (name: string) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.name === name ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
