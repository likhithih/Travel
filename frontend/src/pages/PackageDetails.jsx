import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUtensils, FaCamera, FaBed, FaPlane, FaCheck, FaTimes,FaGem } from 'react-icons/fa';
import { useTheme } from '../Compoents/ThemeContext';
import Navbar from '../Compoents/Navbar';
import Footer from '../Compoents/Footer';
import ImagesBar from '../Compoents/ImagesBar';
import hampi from '../assets/Hampi-temple.jpg';
import mysore from '../assets/Mysore-place.jpg';
import kundamundi from '../assets/Kundamundi.jpg';
import waterfall from '../assets/Waterfall.jpg';

const PackageDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardData = location.state?.cardData || {};
  const { darkMode } = useTheme();

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

  const itinerary = [
    {
      day: 1,
      title: 'Arrival in Bengaluru & Transfer to Hampi',
      description: 'Arrive at Bengaluru airport, transfer to Hampi. Evening visit to Virupaksha Temple and Vittala Temple.',
      activities: ['Airport pickup', 'Scenic drive to Hampi', 'Temple visits'],
      meals: 'Dinner',
      accommodation: 'Heritage resort in Hampi'
    },
    {
      day: 2,
      title: 'Explore Hampi Ruins',
      description: 'Full day exploring the UNESCO World Heritage site of Hampi. Visit Lotus Mahal, Elephant Stables, and Zenana Enclosure.',
      activities: ['Guided tour of ruins', 'Coracle ride on Tungabhadra River', 'Sunset at Matanga Hill'],
      meals: 'Breakfast, Lunch, Dinner',
      accommodation: 'Heritage resort in Hampi'
    },
    {
      day: 3,
      title: 'Hampi to Mysore',
      description: 'Morning departure to Mysore. Visit Srirangapatna en route. Evening at leisure in Mysore.',
      activities: ['Drive to Mysore', 'Visit Srirangapatna Fort', 'Evening walk in Mysore'],
      meals: 'Breakfast, Lunch, Dinner',
      accommodation: 'Heritage hotel in Mysore'
    },
    {
      day: 4,
      title: 'Mysore Sightseeing',
      description: 'Explore the royal city of Mysore. Visit Mysore Palace, Chamundi Hill, and Brindavan Gardens.',
      activities: ['Mysore Palace tour', 'Chamundi Hill visit', 'Brindavan Gardens'],
      meals: 'Breakfast, Lunch, Dinner',
      accommodation: 'Heritage hotel in Mysore'
    },
    {
      day: 5,
      title: 'Mysore to Coorg',
      description: 'Drive to Coorg (Kodagu). Visit Abbey Falls and Talacauvery. Experience coffee plantation walk.',
      activities: ['Drive to Coorg', 'Abbey Falls', 'Coffee plantation tour'],
      meals: 'Breakfast, Lunch, Dinner',
      accommodation: 'Resort in Coorg'
    },
    {
      day: 6,
      title: 'Coorg Exploration',
      description: 'Visit Dubare Elephant Camp, Raja\'s Seat, and local markets. Enjoy Coorg cuisine.',
      activities: ['Dubare Elephant Camp', 'Raja\'s Seat viewpoint', 'Local market visit'],
      meals: 'Breakfast, Lunch, Dinner',
      accommodation: 'Resort in Coorg'
    },
    {
      day: 7,
      title: 'Departure from Bengaluru',
      description: 'Drive back to Bengaluru for departure flight. End of tour with sweet memories.',
      activities: ['Drive to Bengaluru', 'Airport drop'],
      meals: 'Breakfast',
      accommodation: 'N/A'
    }
  ];

  const inclusions = [
    'Accommodation in heritage hotels/resorts',
    'Daily breakfast, lunch, and dinner',
    'All transfers by private AC vehicle',
    'English-speaking guide',
    'All entry fees to monuments',
    'Mineral water during transfers',
    'GST and service charges'
  ];

  const exclusions = [
    'International/domestic airfare',
    'Personal expenses',
    'Camera fees',
    'Travel insurance',
    'Tips and gratuities',
    'Any additional activities not mentioned'
  ];

  return (
    <>
      <Navbar />
      <div className={`min-h-screen overflow-hidden mt-0 pt-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-green-50 text-black'}`}>
        {/* Hero Section */}
        <motion.section
          className="relative py-20 px-4 text-center overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              {cardData.title}
            </motion.h1>
            <motion.p
              className={`text-xl md:text-2xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              variants={fadeInUp}
            >
              {cardData.duration} | Explore Ancient Wonders & Royal Heritage
            </motion.p>
            <motion.div
              className={`flex justify-center space-x-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              variants={fadeInUp}
            >
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-cyan-400" />
                <span>{cardData.duration}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-cyan-400" />
                <span>{cardData.location}</span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2 text-cyan-400" />
                <span>Best Time: Oct - May</span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Overview Section */}
        <motion.section
          className={`py-20 px-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className={`text-4xl md:text-5xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-black'}`}
              variants={fadeInUp}
            >
              Tour Overview
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              variants={fadeInUp}
            >
              <div>
                <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Embark on a captivating journey through Karnataka's rich heritage. From the ancient ruins of Hampi to the royal palaces of Mysore and the misty hills of Coorg, this 7-day tour offers an immersive experience of South India's cultural treasures.
                </p>
                <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Discover UNESCO World Heritage sites, savor authentic cuisine, and create unforgettable memories in one of India's most diverse states.
                </p>
              </div>
              <motion.div
                className="relative"
                variants={scaleIn}
              >
                <div className={`rounded-2xl p-8 text-center shadow-2xl ${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                  <FaGem className={`text-6xl mx-auto mb-4 ${darkMode ? 'text-white' : 'text-black'}`} />
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>Heritage & Culture</h3>
                  <p className={`text-gray-600 ${darkMode ? 'text-gray-300' : ''}`}>Immerse yourself in Karnataka's ancient history</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Images Bar Section */}
        <motion.section
          className={`pt-20  px-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="max-w-6xl mx-auto">
            <ImagesBar darkMode={darkMode} />
          </div>
        </motion.section>

        {/* Itinerary Section */}
        <motion.section
          className={`py-20 px-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className={`text-4xl md:text-5xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-black'}`}
              variants={fadeInUp}
            >
              Detailed Itinerary
            </motion.h2>
            <div className="space-y-8">
              {itinerary.map((day, index) => (
                <motion.div
                  key={index}
                  className={`rounded-2xl p-8 backdrop-blur-lg border ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
                  variants={fadeInUp}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-blue-600 mb-2 md:mb-0">Day {day.day}: {day.title}</h3>
                    <div className={`flex space-x-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="flex items-center"><FaUtensils className="mr-1" /> {day.meals}</span>
                      <span className="flex items-center"><FaBed className="mr-1" /> {day.accommodation}</span>
                    </div>
                  </div>
                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{day.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>Activities:</h4>
                      <ul className={`text-sm space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {day.activities.map((activity, i) => (
                          <li key={i} className="flex items-center">
                            <FaCheck className="text-green-400 mr-2 text-xs" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Inclusions & Exclusions */}
        <motion.section
          className={`py-20 px-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className={`text-4xl md:text-5xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-black'}`}
              variants={fadeInUp}
            >
              Package Details
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                className={`rounded-2xl p-8 backdrop-blur-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
                variants={fadeInUp}
              >
                <h3 className="text-3xl font-bold text-green-400 mb-6 flex items-center">
                  <FaCheck className="mr-3" />
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {inclusions.map((item, index) => (
                    <li key={index} className={`flex items-start ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <FaCheck className="text-green-400 mr-3 mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                className={`rounded-2xl p-8 backdrop-blur-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
                variants={fadeInUp}
              >
                <h3 className="text-3xl font-bold text-red-400 mb-6 flex items-center">
                  <FaTimes className="mr-3" />
                  What's Excluded
                </h3>
                <ul className="space-y-3">
                  {exclusions.map((item, index) => (
                    <li key={index} className={`flex items-start ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <FaTimes className="text-red-400 mr-3 mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className={`py-20 px-4 text-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Ready to Book Your Adventure?
            </motion.h2>
            <motion.p
              className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              variants={fadeInUp}
            >
              Secure your spot for this unforgettable journey through Karnataka's heritage.
            </motion.p>
            <motion.button
              className="bg-blue-500 hover:bg-blue-600 text-black font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/booking', { state: { bookingData: cardData } })}
            >
              Book Now - {cardData.price} per person
            </motion.button>
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default PackageDetails;
