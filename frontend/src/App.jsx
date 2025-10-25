
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
import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
