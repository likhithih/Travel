import Navbar from '../Compoents/Navbar.jsx'
import Footer from '../Compoents/Footer.jsx'
import BestAgency from '../Compoents/BestAgency.jsx'
import Card from '../Compoents/Card.jsx'
import HeroSection from '../Compoents/HeroSection.jsx'
import { useTheme } from '../Compoents/ThemeContext'
import hampi from '../assets/Hampi-temple.jpg'
import mysore from '../assets/Mysore-place.jpg'
import kundamundi from '../assets/Kundamundi.jpg'
import waterfall from '../assets/Waterfall.jpg'

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
      <div className={`py-12 px-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <h2 className={`text-4xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Top Pick Packages</h2>
        <Card cardsData={sampleCards} />
      </div>
      <Footer />
    </>
  )
}

export default Home
