import Navbar from '../Compoents/Navbar.jsx';
import Footer from '../Compoents/Footer.jsx';
import BestAgency from '../Compoents/BestAgency.jsx';
import Card from '../Compoents/Card.jsx';
import HeroSection from '../Compoents/HeroSection.jsx';
import { useTheme } from '../Compoents/ThemeContext';
import hampi from '../assets/Hampi-temple.jpg';
import mysore from '../assets/Mysore-place.jpg';
import kundamundi from '../assets/Kundamundi.jpg';
import waterfall from '../assets/Waterfall.jpg';

const Home = () => {
  const { darkMode } = useTheme();

  const sampleCards = [
    {
      img: hampi,
      location: 'Hampi, Karnataka',
      title: 'Ancient Hampi Ruins',
      desc: 'Explore the UNESCO World Heritage site with ancient temples and ruins.',
      rating: '4.8',
      reviews: '(125 reviews)',
      duration: '2 Days',
      price: '₹8,500'
    },
    {
      img: mysore,
      location: 'Mysore, Karnataka',
      title: 'Royal Mysore Tour',
      desc: 'Visit the magnificent Mysore Palace and experience royal heritage.',
      rating: '4.7',
      reviews: '(98 reviews)',
      duration: '3 Days',
      price: '₹12,000'
    },
    {
      img: kundamundi,
      location: 'Kundamundi, Karnataka',
      title: 'Hill Station Retreat',
      desc: 'Relax in the serene hills with breathtaking views and fresh air.',
      rating: '4.6',
      reviews: '(75 reviews)',
      duration: '2 Days',
      price: '₹6,500'
    }
  ];

  return (
    <>
      <Navbar />
      <HeroSection />
      <BestAgency />
      
      {/* Top Picks Section */}
      <div className={`py-16 px-6 md:px-12 transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
        <h2 className={`text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-tight ${darkMode ? 'text-gradient from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent' : 'text-gray-800'}`}>
          Top Pick Packages
        </h2>
        
        <Card cardsData={sampleCards} cardClassName={`transition-transform duration-300 hover:scale-105 shadow-xl rounded-2xl ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/80' : 'bg-white/80 hover:bg-green-100/80'}`} />
      </div>
      
      <Footer />
    </>
  );
}

export default Home;
