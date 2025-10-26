import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProtectedRoute from './Compoents/ProtectedRoute'
import 'react-toastify/dist/ReactToastify.css';
import Contact from './pages/Contact'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
