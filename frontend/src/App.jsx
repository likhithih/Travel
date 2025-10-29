import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import BookingStatus from "./pages/BookingStatus";
import ProtectedRoute from "./Compoents/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Destination from "./pages/Destination";
import About from "./pages/About";
import PackageDetails from "./pages/PackageDetails";

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
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-status" element={<ProtectedRoute><BookingStatus /></ProtectedRoute>} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/package-details" element={<PackageDetails />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
