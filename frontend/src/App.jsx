
import { FaCaretDown } from 'react-icons/fa'
import './App.css'
import HeroSection from './Compoents/HeroSection'
import Navbar from './Compoents/Navbar'
import Login from './pages/Login'
import Card from './Compoents/Card'
import TopDestination from './Compoents/TopDestination'
import BestAgency from './Compoents/BestAgency'
import Footer from './Compoents/Footer'
import Signup from './pages/Signup'

function App() {


  return (
    <>
      <Navbar/>
      <HeroSection/>
      <Card/>
      <TopDestination/>
      <BestAgency/>
      <Login/>
      {/* <Signup/> */}
      <Footer/>
    </>
  )
}

export default App
