import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Booking = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData || {};

  const [formData, setFormData] = useState({
    username: bookingData.name || '',
    email: bookingData.email || '',
    package: '',
    days: '',
    persons: '',
    destination: ''
  });

  useEffect(() => {
    if (bookingData.name && bookingData.email) {
      setFormData(prev => ({
        ...prev,
        username: bookingData.name,
        email: bookingData.email
      }));
    }
  }, [bookingData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send to backend or log
    console.log('Booking data:', formData);
    alert('Booking submitted!');
  };

  // Assuming base price of 1000 per person per day
  const basePrice = 1000;
  const totalPrice = basePrice * (formData.days || 0) * (formData.persons || 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Travel Booking</h2>
          <p className="text-gray-600">Plan your perfect adventure</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Package</label>
            <select
              name="package"
              value={formData.package}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            >
              <option value="">Select Package</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Days</label>
            <input
              type="number"
              name="days"
              value={formData.days}
              onChange={handleChange}
              placeholder="Enter number of days"
              min="1"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
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
            <select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            >
              <option value="">Select Destination</option>
              <option value="Hampi">Hampi</option>
              <option value="Mysore">Mysore</option>
              <option value="Kundamundi">Kundamundi</option>
              <option value="Waterfall">Waterfall</option>
            </select>
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
  );
};

export default Booking;
