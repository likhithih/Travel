import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaPlus,
  FaMapMarkerAlt,
  FaStar,
  FaEye,
  FaFilter
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock destination data
  const [destinations, setDestinations] = useState([
    {
      id: 1,
      name: 'Paris, France',
      category: 'Europe',
      description: 'The City of Light, known for its art, fashion, gastronomy and culture.',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFyaXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500',
      rating: 4.8,
      price: 1200,
      duration: '7 days',
      popular: true
    },
    {
      id: 2,
      name: 'Tokyo, Japan',
      category: 'Asia',
      description: 'A bustling metropolis where traditional culture meets cutting-edge technology.',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
      rating: 4.9,
      price: 1800,
      duration: '10 days',
      popular: true
    },
    {
      id: 3,
      name: 'New York, USA',
      category: 'North America',
      description: 'The city that never sleeps, offering endless entertainment and cultural experiences.',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400',
      rating: 4.6,
      price: 1500,
      duration: '8 days',
      popular: false
    },
    {
      id: 4,
      name: 'Bali, Indonesia',
      category: 'Asia',
      description: 'Tropical paradise with beautiful beaches, temples, and rich cultural heritage.',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400',
      rating: 4.7,
      price: 900,
      duration: '6 days',
      popular: true
    },
    {
      id: 5,
      name: 'London, UK',
      category: 'Europe',
      description: 'Historic city with world-class museums, theaters, and iconic landmarks.',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400',
      rating: 4.5,
      price: 1300,
      duration: '7 days',
      popular: false
    },
    {
      id: 6,
      name: 'Dubai, UAE',
      category: 'Middle East',
      description: 'Modern luxury destination with stunning architecture and desert adventures.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400',
      rating: 4.4,
      price: 1600,
      duration: '5 days',
      popular: true
    }
  ]);

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || destination.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewDestination = (destination) => {
    setSelectedDestination(destination);
    setShowModal(true);
  };

  const handleEditDestination = (destination) => {
    // Handle edit functionality
    console.log('Edit destination:', destination);
  };

  const handleDeleteDestination = (destinationId) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      setDestinations(destinations.filter(dest => dest.id !== destinationId));
    }
  };

  const categories = ['all', ...new Set(destinations.map(dest => dest.category))];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Destination Management</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage travel destinations and packages</p>
              </div>
              <Link to='/add-destination'>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
                <FaPlus className="mr-2" />
                Add Destination
              </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredDestinations.length} of {destinations.length} destinations
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <div key={destination.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="relative h-48">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  {destination.popular && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Popular
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center">
                    <FaStar className="text-yellow-400 mr-1" size={10} />
                    {destination.rating}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{destination.name}</h3>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                      {destination.category}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                    {destination.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-1" size={12} />
                      {destination.duration}
                    </div>
                    <div className="font-semibold text-green-600 dark:text-green-400">
                      ₹{destination.price}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDestination(destination)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        title="View Details"
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        onClick={() => handleEditDestination(destination)}
                        className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                        title="Edit Destination"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteDestination(destination.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Delete Destination"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Destination Details Modal */}
      {showModal && selectedDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedDestination.name}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <img
                src={selectedDestination.image}
                alt={selectedDestination.name}
                className="w-full h-64 object-cover rounded-lg"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Destination Details</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Category:</span> {selectedDestination.category}</p>
                    <p><span className="font-medium">Duration:</span> {selectedDestination.duration}</p>
                    <p><span className="font-medium">Rating:</span> {selectedDestination.rating} ⭐</p>
                    <p><span className="font-medium">Price:</span> ₹{selectedDestination.price}</p>
                    <p><span className="font-medium">Popular:</span> {selectedDestination.popular ? 'Yes' : 'No'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Description</h4>
                  <p className="text-gray-600 dark:text-gray-400">{selectedDestination.description}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Close
              </button>
              <button
                onClick={() => handleEditDestination(selectedDestination)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit Destination
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Destinations;
