"use client";
import React from "react";

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-yellow-700 cursor-pointer" onClick={() => scrollToSection("hero")}>
          The Palazzo
        </h1>
        <div className="space-x-4 text-sm md:text-base text-gray-700">
          <button onClick={() => scrollToSection("about")} className="hover:text-yellow-600">About</button>
          <button onClick={() => scrollToSection("gallery")} className="hover:text-yellow-600">Gallery</button>
          <button onClick={() => scrollToSection("menus")} className="hover:text-yellow-600">Menus</button>
          <button onClick={() => scrollToSection("order")} className="hover:text-yellow-600">Order</button>
          <button onClick={() => scrollToSection("events")} className="hover:text-yellow-600">Events</button>
          <button onClick={() => scrollToSection("reviews")} className="hover:text-yellow-600">Reviews</button>
          <button onClick={() => scrollToSection("reservation")} className="hover:text-yellow-600">Reserve</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
