import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // For hamburger menu icons
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      <header className="bg-white/10 backdrop-blur-md text-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-20 px-4">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3">
            <img
              className="h-12 w-auto"
              src="/Navbar-bg-logo.png"
              alt="logo"
            />
            
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex">
            <ul className="flex items-center space-x-8">
              <li>
                <a href="#" className="text-lg font-medium text-gray-200 hover:text-lime-400 transition-colors duration-300 relative group">
                  <span>Home</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-medium text-gray-200 hover:text-lime-400 transition-colors duration-300 relative group">
                  <span>About</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-medium text-gray-200 hover:text-lime-400 transition-colors duration-300 relative group">
                  <span>Destinations</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a href="/booking" className="text-lg font-medium text-gray-200 hover:text-lime-400 transition-colors duration-300 relative group">
                  <span>Booking</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              {/* <li>
                <a href="Contact" className="text-lg font-medium text-gray-200 hover:text-lime-400 transition-colors duration-300 relative group">
                  <span>Contact Us</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li> */}
            </ul>
          </nav>

          {/* Logout Button */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hidden md:block bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="hidden md:block bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Login
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden bg-white/20 backdrop-blur-md">
            <ul className="flex flex-col items-center space-y-4 py-6">
              <li>
                <a href="#" className="text-lg font-medium text-gray-200 hover:text-lime-400 transition-colors duration-300" onClick={toggleMenu}>
                  Destination
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-medium text-gray-200 hover:text-lime-400 transition-colors duration-300" onClick={toggleMenu}>
                  Hotels
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-medium text-gray-200 hover:text-lime-400 transition-colors duration-300" onClick={toggleMenu}>
                  Booking
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-medium text-gray-200 hover:text-lime-400 transition-colors duration-300" onClick={toggleMenu}>
                  Flights
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-medium text-gray-200 hover:text-lime-400 transition-colors duration-300" onClick={toggleMenu}>
                  Contact Us
                </a>
              </li>
              <li>
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate('/login');
                      toggleMenu();
                    }}
                    className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default Navbar;
