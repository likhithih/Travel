import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { auth, provider, signInWithPopup } from "../firebaseConfig";
import { useState } from "react";
import EarthAnimation from "../Compoents/Three/EarthAnimation";

export default function Signup() {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: ''
    }
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Signup data:', formData);
      alert('Signup successful! (This is a demo)');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      alert(`Welcome ${result.user.displayName}!`);
    } catch (error) {
      console.error(error);
      alert("Google Sign-in failed. Please try again.");
    }
  };

  return (
    <div className="h-auto flex flex-col lg:flex-row bg-slate-950 ">

      {/* Three.js Earth Animation - Left Side */}
      <div
        className="w-full lg:w-1/2 h-[1200px] lg:h-full flex items-center justify-center mb-8 lg:mb-0"
      >
        <div className="min-w-[700px] h-full max-w-md">
          <EarthAnimation />
        </div>
      </div>




      {/* Signup Form - Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="w-full lg:w-1/2 h-full flex items-start justify-center pt-8"
      >
        <div className="ml-12 mb-12 max-w-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/10">
          {/* Header */}
          <motion.h1
            className="text-4xl font-extrabold mb-4 text-white text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Sign Up
          </motion.h1>

          <motion.h2
            className="text-2xl font-bold mb-8 text-white text-center"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Join the Adventure 🌍
          </motion.h2>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Username */}
            <motion.div
              className="flex flex-col"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <label className="text-white font-medium mb-2 flex items-center gap-2">
                <FaUser className="text-blue-500" />
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                placeholder="Enter your username"
              />
              {errors.username && <span className="text-red-500 text-sm mt-1">{errors.username}</span>}
            </motion.div>

            {/* Email */}
            <motion.div
              className="flex flex-col"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label className="text-white font-medium mb-2 flex items-center gap-2">
                <FaEnvelope className="text-blue-500" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                placeholder="Enter your email"
              />
              {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
            </motion.div>

            {/* Password */}
            <motion.div
              className="flex flex-col"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <label className="text-white font-medium mb-2 flex items-center gap-2">
                <FaLock className="text-blue-500" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 w-full"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              className="flex flex-col"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <label className="text-white font-medium mb-2 flex items-center gap-2">
                <FaLock className="text-blue-500" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 w-full"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <span className="text-red-500 text-sm mt-1">{errors.confirmPassword}</span>}
            </motion.div>

            {/* Phone */}
            <motion.div
              className="flex flex-col"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <label className="text-white font-medium mb-2 flex items-center gap-2">
                <FaPhone className="text-blue-500" />
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                placeholder="Enter your phone number"
              />
              {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
            </motion.div>

            {/* Address Section */}
            <motion.div
              className="flex flex-col"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <label className="text-white font-medium mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                Address
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 w-full"
                  placeholder="Street Address"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                    placeholder="State"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="address.pincode"
                    value={formData.address.pincode}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                    placeholder="Pincode"
                  />
                  <input
                    type="text"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                    placeholder="Country"
                  />
                </div>
              </div>
            </motion.div>

            {/* Sign Up Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(59,130,246,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-500 hover:bg-blue-600 transition-all py-3 rounded-lg text-white font-semibold shadow-md"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Sign Up
            </motion.button>

            {/* Google Sign-In Button */}
            <motion.button
              type="button"
              onClick={handleGoogleSignIn}
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-100 transition-all py-3 rounded-lg font-medium text-gray-700 shadow-md"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </motion.button>

            {/* Footer */}
            <p className="text-center text-sm text-white">
              Already have an account?{" "}
              <a href="#" className="text-blue-300 hover:underline font-medium">
                Log in
              </a>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
