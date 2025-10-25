import Navbar from '../Compoents/Navbar.jsx'
import Footer from '../Compoents/Footer.jsx'
import BestAgency from '../Compoents/BestAgency.jsx'
import Card from '../Compoents/Card.jsx'
import HeroSection from '../Compoents/HeroSection.jsx'

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BestAgency />
      <Card/>
      <Footer />
    </>
  )
}

export default Home