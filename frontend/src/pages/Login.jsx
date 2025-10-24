import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { auth, provider, signInWithPopup } from "../firebaseConfig";
import { useState, useEffect } from "react";

const travelImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1526779259212-1235d11b8b0c?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1549887534-33d0f7c8cf28?auto=format&fit=crop&w=700&q=80",
];

export default function Login() {
  const [user, setUser] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Change carousel image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % travelImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* Overlay with subtle floating animation */}
      <motion.div
        className="absolute inset-0 bg-black/40"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col md:flex-row w-full max-w-4xl bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Left Carousel */}
        <div className="md:w-1/2 h-64 md:h-auto relative">
          <AnimatePresence>
            <motion.img
              key={currentImage}
              src={travelImages[currentImage]}
              alt="Travel"
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center bg-gray-50/70 backdrop-blur-sm">
          {/* NEW LOGIN HEADING */}
          <motion.h1
            className="text-4xl font-extrabold mb-4 text-gray-800 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Login
          </motion.h1>

          {/* Subheading */}
          <motion.h2
            className="text-2xl font-bold mb-6 text-gray-800 text-center"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Explore the World 🌎
          </motion.h2>

          {/* Email Input */}
          <motion.div
            className="flex items-center mb-4 border border-gray-400 rounded-lg px-3"
            whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <input
              className="w-full outline-none py-2.5 text-gray-900 placeholder-gray-800"
              type="email"
              placeholder="Email"
              required
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            className="flex items-center mb-4 border border-gray-400 rounded-lg px-3"
            whileFocus={{ scale: 1.02, borderColor: "#3a34fe" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <input
              className="w-full outline-none py-2.5 text-gray-900 placeholder-gray-800"
              type="password"
              placeholder="Password"
              required
            />
          </motion.div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <input id="remember" type="checkbox" className="accent-blue-500" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(59,130,246,0.4)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full mb-3 bg-blue-500 hover:bg-blue-600 transition-all py-2.5 rounded-lg text-white font-semibold shadow-md"
          >
            Log In
          </motion.button>

          {/* Google Sign-In Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-100 transition-all py-2.5 rounded-lg font-medium text-gray-700 shadow-md"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </motion.button>

          {/* Footer */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline font-medium">
              Sign up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
