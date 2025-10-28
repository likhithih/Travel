import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import PreBooking from "./pages/PreBooking";
import ProtectedRoute from "./Compoents/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Destination from "./pages/Destination";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/pre-booking" element={<PreBooking />} />
        <Route path="/destination" element={<Destination />} />
      </Routes>
    </>
  );
}

export default App;
