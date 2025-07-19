import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CustomerReviews from '@/components/CustomerReviews';
import LoginForm from '@/components/LoginForm';
import EventForm from '@/components/EventForm';
import UpcomingEvents from '@/components/UpcomingEvents';
import EventList from '@/components/EventList';
import CartSummary from '@/components/CartSummary';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import CartToggleButton from '@/components/CartToggleButton';
import Lightbox from '@/components/Lightbox'; // ✅ 1. Import Lightbox

export default function Home() {
  const { addToCart } = useCart();
  const [isCartOpen, setCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // ✅ 2. State for Lightbox

  return (
    <>
      <Navbar />

      {/* Hero */}
      <main id="hero" className="relative h-screen w-full overflow-hidden">
        <Image
          src="https://i.postimg.cc/QCfmsHv8/Coming-June-2024-JPG.jpg"
          alt="Hero"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
        <div className="relative z-20 flex items-center justify-center h-full text-center px-4">
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
            Luxury Redefined
          </h1>
        </div>
      </main>

      {/* About */}
      <section id="about" className="bg-white py-12 px-4 text-center" data-aos="fade-up">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-600 text-lg">…</p>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-gray-100 py-12 px-4" data-aos="fade-up">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              'https://i.postimg.cc/0QyG28vc/Our-buffets-Something…jpg',
              'https://i.postimg.cc/SRwcrCMv/…jpg',
              'https://i.postimg.cc/PxVWCBrh/…jpg',
              'https://i.postimg.cc/fWF7Dnrf/…jpg',
            ].map((src, i) => (
              <div key={i} className="cursor-pointer" data-aos="zoom-in">
                <Image
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  width={300}
                  height={200}
                  className="rounded-lg shadow-lg object-cover"
                  onClick={() => setSelectedImage(src)} // ✅ 3. Open Lightbox on click
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ 4. Render Lightbox if active */}
      {selectedImage && (
        <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}

      {/* Menus - updated */}
      <section id="menus" className="bg-white py-12 px-4" data-aos="fade-up">
        <div className="max-w-6xl mx-auto overflow-x-auto scrollbar-hide">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Menus</h2>
          <div className="flex gap-4 px-2 w-max">
            {[
              'https://i.postimg.cc/bNT22m7C/…-1.png',
              'https://i.postimg.cc/X7Qpvp5t/…png',
              'https://i.postimg.cc/XqnYjbYV/…png',
              'https://i.postimg.cc/wTfjpn8p/…png',
            ].map((src, i) => (
              <div key={i} className="flex-none w-64">
                <Image
                  src={src}
                  alt={`Menu ${i + 1}`}
                  width={256}
                  height={256}
                  className="rounded-lg shadow-md object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <UpcomingEvents />

      {/* Order Online */}
      <section id="order" className="bg-gray-100 py-12 px-4" data-aos="fade-up">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Order Online</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'Burger & Fries', price: 'MWK 17,000', src: 'https://i.postimg.cc/4xjj9...' },
              { name: 'Braii Platter', price: 'MWK 60,000', src: 'https://i.postimg.cc/vBB0p1...' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md w-64">
                <Image src={item.src} alt={item.name} width={256} height={160} className="rounded-md mb-4" />
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.price}</p>
                <button
                  onClick={() => addToCart({
                    name: item.name,
                    price: Number(item.price.replace(/\D/g, '')),
                    image: item.src,
                  })}
                  className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Payment Simulation */}
          <div className="mt-8 text-center space-y-4">
            {/* Simulated payment buttons */}
          </div>

          <CartSummary />
        </div>
      </section>

      {/* Admin Sections */}
      <EventForm />
      <EventList />

      {/* Customer Reviews */}
      <section id="reviews" data-aos="fade-up">
        <CustomerReviews />
      </section>

      {/* Reservation - new */}
      <section id="reservation" className="bg-white py-12 px-4" data-aos="fade-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Reservations</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Name" className="p-3 border rounded-md" />
            <input type="email" placeholder="Email" className="p-3 border rounded-md" />
            <input type="date" className="p-3 border rounded-md md:col-span-2" />
            <textarea placeholder="Special Requests" className="p-3 border rounded-md md:col-span-2"></textarea>
            <button type="submit" className="bg-yellow-600 text-white py-3 px-6 rounded-md md:col-span-2">
              Submit
            </button>
          </form>
        </div>
      </section>

      <LoginForm />

      {/* Cart Drawer and Toggle */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
      <CartToggleButton onClick={() => setCartOpen(true)} />
    </>
  );
}
