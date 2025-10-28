import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa'; // For hamburger menu icons and theme toggle
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      <header className={`${isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-white/0'} text-white fixed top-0 left-0 right-0 z-50 transition-all duration-300`}>
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
                <Link to={'/home'} className="text-lg font-medium text-gray-200 hover:text-lime-400 transition-colors duration-300 relative group px-3 py-2 rounded-md hover:bg-lime-400/10">
                  <span>Home</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to={'/about'} className="text-lg font-medium text-gray-200 hover:text-lime-400 transition-colors duration-300 relative group px-3 py-2 rounded-md hover:bg-lime-400/10">
                  <span>About</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to={'/destination'} className="text-lg font-medium text-gray-200 hover:text-lime-400 transition-colors duration-300 relative group px-3 py-2 rounded-md hover:bg-lime-400/10">
                  <span>Destinations</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to={'/booking'} className="text-lg font-medium text-gray-200 hover:text-lime-400 transition-colors duration-300 relative group px-3 py-2 rounded-md hover:bg-lime-400/10">
                  <span>Booking</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              {/* <li>
                <a href="Contact" className="text-lg font-medium text-gray-200 hover:text-lime-400 transition-colors duration-300 relative group">
                  <span>Contact Us</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li> */}
            </ul>
          </nav>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="hidden md:block text-white text-2xl focus:outline-none mr-4"
            aria-label="Toggle theme"
          >
            {darkMode ? <FaSun /> : <FaMoon  />}
          </button>

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
                <Link to={'/about'} className="text-lg font-medium text-gray-200 hover:text-lime-400 transition-colors duration-300" onClick={toggleMenu}>
                  About
                </Link>
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
                <button
                  onClick={() => {
                    toggleTheme();
                    toggleMenu();
                  }}
                  className="text-lg font-medium text-gray-200 hover:text-lime-400 transition-colors duration-300"
                >
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
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
