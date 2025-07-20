// components/Navbar.tsx
"use client";
import React from "react";

const links = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Menu", id: "menu" },
  { label: "Order", id: "order" },
  { label: "Events", id: "events" },
  { label: "Reservations", id: "reservations" },
  { label: "Reviews", id: "reviews" },
  { label: "Admin", id: "admin" },
];

const Navbar = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1
          className="text-lg font-bold cursor-pointer text-yellow-700"
          onClick={() => scrollTo("hero")}
        >
          The Palazzo
        </h1>
        <div className="flex gap-4">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm text-gray-700 hover:text-yellow-600"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
