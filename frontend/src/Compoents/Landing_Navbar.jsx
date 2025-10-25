import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Landing_Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="shrink-0"
          >
            <Link to="/" className="flex items-center">
              <img
                src="/Navbar-Wh-logo-bd.png"
                alt="Travels Karnataka Logo"
                className="h-10 w-auto"
              />
            </Link>
          </motion.div>

          {/* Login Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-full text-indigo-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Login
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Landing_Navbar;
