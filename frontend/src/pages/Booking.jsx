import React, { useState, useEffect } from "react";
import Flowers from "../assets/Bookings/Flowers.avif";
import IdiDosha from "../assets/Bookings/Idi-dosha.jpg";
import Meduwada from "../assets/Bookings/Meduwada.jpg";

const BookingPage = ({ bookingData = {} }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = bookingData.images || [
    Flowers,
    IdiDosha,
    Meduwada,
  ];

  const parseDays = (duration) => {
    const match = duration.match(/(\d+)\s*Days?/i);
    return match ? parseInt(match[1], 10) : 0;
  };

  const parsePrice = (price) => {
    const match = price.match(/₹?(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const [formData, setFormData] = useState({
    username: bookingData.name || "",
    email: bookingData.email || "",
    days: parseDays(bookingData.duration || ""),
    persons: 1,
    destination: bookingData.location || "",
    bookingDate: "",
    packageType: "Standard",
  });

  const packagePrice = parsePrice(bookingData.price || "0");
  const totalPrice = packagePrice * formData.persons;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", { ...formData, ...bookingData });
    alert("Booking submitted!");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Hero Section */}
      <div className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 text-white py-24 text-center relative overflow-hidden">
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg animate-fade-in">Booking</h1>
        <p className="text-2xl italic mb-4 drop-shadow animate-slide-up">"Your adventure starts here"</p>
        <div className="w-24 h-1 mx-auto bg-white rounded-full animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left Column - Image Carousel */}
        <div className="w-full md:w-1/2 relative overflow-hidden">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Slide ${idx + 1}`}
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                idx === currentImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30"></div>
        </div>

        {/* Right Column - Booking Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-white animate-slide-in-right">
          <form className="md:w-96 w-80 flex flex-col space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 text-center">Complete Booking</h2>
            <p className="text-sm text-gray-500 text-center">Fill in your details to confirm your trip</p>

            {/* Name */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition-all duration-300"
              />
            </div>

            {/* Booking Date */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Choose Date of Booking</label>
              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition-all duration-300"
              />
            </div>

            {/* Number of Persons */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Number of Persons</label>
              <input
                type="number"
                name="persons"
                value={formData.persons}
                onChange={handleChange}
                min="1"
                required
                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition-all duration-300"
              />
            </div>

            {/* Package Type */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Package Type</label>
              <select
                name="packageType"
                value={formData.packageType}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition-all duration-300"
              >
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>

            {/* Destination */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                disabled
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Total Price */}
            <div className="w-full bg-indigo-100 text-indigo-800 p-3 rounded-xl text-center font-semibold">
              Total Price: ₹{totalPrice}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition-colors"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>

      {/* Tailwind custom animations */}
      <style>
        {`
          @keyframes slide-in-right {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .animate-slide-in-right {
            animation: slide-in-right 0.7s ease-out forwards;
          }
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in { animation: fade-in 1s ease-out forwards; }
          @keyframes slide-up {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-up { animation: slide-up 1s ease-out forwards; }
        `}
      </style>
    </div>
  );
};

export default BookingPage;
