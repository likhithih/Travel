import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';

const Booking = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData || {};

  // Parse duration to extract days (e.g., "3 Nights - 9 Days" -> 9)
  const parseDays = (duration) => {
    const match = duration.match(/(\d+)\s*Days?/i);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Parse price (e.g., "₹589.00" -> 589)
  const parsePrice = (price) => {
    const match = price.match(/₹?(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const [formData, setFormData] = useState({
    username: bookingData.name || '',
    email: bookingData.email || '',
    days: parseDays(bookingData.duration || ''),
    persons: '',
    destination: bookingData.location || '',
    bookingDate: ''
  });

  useEffect(() => {
    if (bookingData.name && bookingData.email) {
      setFormData(prev => ({
        ...prev,
        username: bookingData.name,
        email: bookingData.email,
        days: parseDays(bookingData.duration || ''),
        destination: bookingData.location || ''
      }));
    }
  }, [bookingData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send to backend or log
    console.log('Booking data:', { ...formData, ...bookingData });
    alert('Booking submitted!');
  };

  // Use parsed price per person, total = price * persons
  const packagePrice = parsePrice(bookingData.price || '0');
  const totalPrice = packagePrice * (formData.persons || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Destination Details Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={bookingData.img}
          alt={bookingData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{bookingData.title}</h1>
            <p className="text-lg md:text-xl">{bookingData.location}</p>
          </div>
        </div>
      </div>

      {/* Package Details */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Package Details</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {bookingData.desc}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <FiStar className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-gray-700">{bookingData.rating} {bookingData.reviews}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700">{bookingData.duration}</span>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-800">{bookingData.price}</p>
                  <p className="text-sm text-blue-600">Per Person</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Category:</p>
                  <p className="text-sm font-semibold text-gray-800">{bookingData.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto transform transition-all duration-300 hover:scale-105">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Booking</h2>
            <p className="text-gray-600">Enter your details to confirm</p>
          </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Booking Date</label>
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Days</label>
            <input
              type="number"
              name="days"
              value={formData.days}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Persons</label>
            <input
              type="number"
              name="persons"
              value={formData.persons}
              onChange={handleChange}
              placeholder="Enter number of persons"
              min="1"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-lg font-semibold text-blue-800 text-center">
              Total Price: <span className="text-2xl">₹{totalPrice}</span>
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 font-semibold text-lg shadow-lg"
          >
            Book Now
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
