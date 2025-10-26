import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Bookings from './pages/Bookings'
import Destinations from './pages/Destinations'
import AddDestination from './pages/AddDestination'

function App() {

  return (
    <Routes >
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/add-destination" element={<AddDestination />} />
    </Routes>
  )
}

export default App
