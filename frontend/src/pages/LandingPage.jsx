import React from 'react';
import { motion } from 'framer-motion';
import EarthAnimation from '../Compoents/Three/EarthAnimation';
import { FaPlane, FaMapMarkerAlt, FaCamera, FaStar } from 'react-icons/fa';
import hampi from '../assets/Hampi-temple.jpg';
import mysore from '../assets/Mysore-place.jpg';
import kundamundi from '../assets/Kundamundi.jpg';
import waterfall from '../assets/Waterfall.jpg';
import Landing_Navbar from '../Compoents/Landing_Navbar';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <>
      {/* <Landing_Navbar /> */}
      <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
        {/* Hero Section */}
        <motion.section
          className="relative min-h-screen flex items-center justify-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >

          <div className="relative z-10 text-center px-4">
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 bg-linear-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Explore Karnataka
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Discover the magic of Karnataka - from ancient temples to pristine beaches, your adventure awaits.
            </motion.p>
            <motion.button
              className="bg-linear-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to='/login'>Start Your Journey</Link>
            </motion.button>
          </div>
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaMapMarkerAlt className="text-4xl text-yellow-400" />
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="py-20 px-4 bg-linear-to-br from-blue-50 via-white to-pink-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
              variants={fadeInUp}
            >
              Why Choose Karnataka?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <FaPlane />, title: 'Seamless Travel', desc: 'Easy bookings and hassle-free journeys' },
                { icon: <FaCamera />, title: 'Unforgettable Memories', desc: 'Capture moments in breathtaking locations' },
                { icon: <FaStar />, title: 'Top-Rated Experiences', desc: 'Trusted by thousands of travelers' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-6xl text-blue-600 mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Destinations Preview */}
        <motion.section
          className="py-20 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-16"
              variants={fadeInUp}
            >
              Popular Destinations
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Hampi', image: hampi },
                { name: 'Mysore', image: mysore },
                { name: 'Kundamundi', image: kundamundi },
                { name: 'Waterfalls', image: waterfall },
              ].map((dest, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-xl group cursor-pointer"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="py-20 px-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Explore?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Join thousands of travelers who have discovered the wonders of Karnataka.
            </p>
            <motion.button
              className="bg-linear-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to='/login'> Book Your Trip Now</Link>
            </motion.button>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="py-8 px-4 text-center text-gray-400">
          <p>&copy; 2024 Travels Karnataka. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
