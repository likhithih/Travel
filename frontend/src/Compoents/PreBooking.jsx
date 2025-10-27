import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiMapPin, FiStar, FiCalendar, FiUsers } from 'react-icons/fi';

const PreBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardData = location.state?.cardData || {};

  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    // Combine card data with user input and navigate to booking
    const bookingData = {
      ...cardData,
      ...formData
    };
    navigate('/booking', { state: { bookingData } });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Hero Section with Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={cardData.img}
          alt={cardData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{cardData.title}</h1>
            <p className="text-xl md:text-2xl drop-shadow-lg">{cardData.location}</p>
          </div>
        </div>
      </div>

      {/* Package Details */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* Package Info */}
            <div className="md:w-2/3 p-8">
              <div className="flex items-center mb-4">
                <FiMapPin className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-gray-600">{cardData.location}</span>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4">{cardData.title}</h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {cardData.desc}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <FiCalendar className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-gray-700">{cardData.duration}</span>
                </div>
                <div className="flex items-center">
                  <FiStar className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="text-gray-700">{cardData.rating} {cardData.reviews}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-blue-800">{cardData.price}</p>
                    <p className="text-sm text-blue-600">Per Person</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Package Includes:</p>
                    <ul className="text-sm text-gray-600 mt-1">
                      <li>• Accommodation</li>
                      <li>• Meals</li>
                      <li>• Guided Tours</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="md:w-1/3 bg-gray-50 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Book This Package</h3>

              <form onSubmit={handlePayNow} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-linear-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-lg hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 font-semibold text-lg shadow-lg"
                  >
                    Book Now - {cardData.price}
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Secure payment powered by razorpay
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreBooking;
