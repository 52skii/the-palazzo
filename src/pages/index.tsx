import React from "react";
import Navbar from "@/components/Navbar";
import CustomerReviews from "@/components/CustomerReviews";
import LoginForm from "@/components/LoginForm";
import EventForm from "@/components/EventForm";
import UpcomingEvents from "@/components/UpcomingEvents";
import EventList from "@/components/EventList";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
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

      {/* About Us */}
      <section id="about" className="bg-white py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            The Palazzo is open! Located in Kabula Hill. We have dishes from different cultures and meals that are full of flavour. Come on over and have the Palazzo experience! We look forward to hosting you!
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "https://i.postimg.cc/vBB0p1WM/fb0ee62cf7b1e30498d2fc47a856a3e3.webp",
              "https://i.postimg.cc/4xjj9Sy6/60a7c48faae5bd703d73364563226537.webp",
              "https://i.postimg.cc/0QyG28vc/Our-buffets-Something-we-do-very-often-but-haven-t-shared-enough-Hearty-delicious-dishes-prepar.jpg",
            ].map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Gallery ${index + 1}`}
                width={500}
                height={300}
                className="rounded-lg shadow-lg object-cover w-full h-64"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Menus */}
      <section id="menus" className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">Our Menus</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {[
              "https://i.postimg.cc/bNT22m7C/file-000000006ac461f98a58a424deaf2c7e-1.png",
              "https://i.postimg.cc/X7Qpvp5t/file-000000007de861f9ad0f420fd4bb4afc.png",
              "https://i.postimg.cc/XqnYjbYV/file-000000004d2061f98e8cf2d447dc6910.png",
              "https://i.postimg.cc/wTfjpn8p/file-00000000b03861f99d0c4277ed32f0a8.png",
            ].map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Menu ${index + 1}`}
                width={500}
                height={500}
                className="rounded-lg shadow-md w-full h-auto object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Online Ordering */}
      <section id="order" className="bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Order Online</h2>
          <p className="text-gray-600 mb-8">
            Browse our menu and order your favorite meals for delivery or pickup. Secure payment and delivery integrations coming soon.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                name: "Burger & Fries",
                price: "MWK 17,000",
                src: "https://i.postimg.cc/4xjj9Sy6/60a7c48faae5bd703d73364563226537.webp",
              },
              {
                name: "Braii Platter",
                price: "MWK 60,000",
                src: "https://i.postimg.cc/vBB0p1WM/fb0ee62cf7b1e30498d2fc47a856a3e3.webp",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md w-64">
                <Image
                  src={item.src}
                  alt={item.name}
                  width={256}
                  height={160}
                  className="rounded-md mb-4 h-40 w-full object-cover"
                />
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.price}</p>
                <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-6">Delivery & payment options coming soon.</p>
        </div>
      </section>

      {/* Event Hosting */}
      <section id="events" className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Host Your Events with Us</h2>
          <p className="text-gray-600 mb-8">
            Whether it&apos;s a birthday, wedding, or corporate event, The Palazzo is the perfect venue to make your moments unforgettable.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "https://i.postimg.cc/zXSbysfh/A-birthday-celebration-at-The-Palazzo-We-love-hosting-you-and-have-packages-to-suit-all-your-wishes.jpg",
              "https://i.postimg.cc/Vv9hQfW4/Our-first-Valentines-day-dinner-Lets-just-say-it-was-an-evening-full-of-love-smiles-and-laughter.jpg",
              "https://i.postimg.cc/8zz09VJB/Our-first-Valentines-day-dinner-Lets-just-say-it-was-an-evening-full-of-love-smiles-and-laughter.jpg",
            ].map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Event ${index + 1}`}
                width={500}
                height={300}
                className="rounded-lg shadow-lg object-cover w-full h-64"
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Our first Valentine&apos;s day dinner&mdash;Let&rsquo;s just say it was an evening full of love, smiles, and laughter.
          </p>
        </div>
      </section>

      {/* Reservations */}
      <section id="reservation" className="bg-gray-100 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Make a Reservation</h2>
          <p className="text-gray-600 mb-8">
            Reserve your table in advance to enjoy a seamless dining experience at The Palazzo.
          </p>
          <form className="space-y-6 text-left">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input type="text" placeholder="Your name" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input type="email" placeholder="your@email.com" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date</label>
                <input type="date" className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Time</label>
                <input type="time" className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Guests</label>
              <input type="number" min="1" max="20" placeholder="Number of guests" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <button type="submit" className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700">Book Now</button>
          </form>
        </div>
      </section>

      {/* Admin Event Controls */}
      <EventForm />
      <UpcomingEvents />
      <EventList />

      {/* Customer Reviews */}
      <section id="reviews">
        <CustomerReviews />
      </section>

      {/* Admin Login */}
      <LoginForm />
    </>
  );
}
