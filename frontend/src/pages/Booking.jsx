import React, { useState, useEffect } from "react";
import HampiTemple from "../assets/Hampi-temple.jpg";
import Kundamundi from "../assets/Kundamundi.jpg";

const BookingPage = ({ bookingData = {} }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = bookingData.images || [
    "/Navbar-bg-logo.png",
    HampiTemple,
    Kundamundi,

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Top Section */}
      <div
        className="relative text-center py-24 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white overflow-hidden"
        style={{
          backgroundImage: `url(${HampiTemple})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold mb-6 drop-shadow-2xl tracking-wider animate-fade-in">
            Booking
          </h1>
          <p className="text-2xl italic drop-shadow-xl font-light animate-slide-up">
            "Your adventure starts here"
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Image Carousel */}
        <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
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
        </div>

        {/* Right Column - Booking Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden transform transition-all duration-300 hover:scale-105">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center relative z-10">Complete Your Booking</h2>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {/* Username */}
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
            />

            {/* Booking Date */}
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
            />

            {/* Number of Persons */}
            <input
              type="number"
              name="persons"
              value={formData.persons}
              onChange={handleChange}
              min="1"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
            />

            {/* Package Dropdown */}
            <select
              name="packageType"
              value={formData.packageType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
            >
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
              <option value="Luxury">Luxury</option>
            </select>

            {/* Destination (readonly) */}
            <input
              type="text"
              name="destination"
              value={formData.destination}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
            />

            {/* Total Price */}
            <div className="bg-gradient-to-r from-purple-200 via-blue-200 to-indigo-200 p-4 rounded-xl text-center font-semibold text-blue-800 shadow-inner">
              Total Price: <span className="text-2xl">₹{totalPrice}</span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-purple-600 hover:to-indigo-700 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
