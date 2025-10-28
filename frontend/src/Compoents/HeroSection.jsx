import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

// ✅ Replace with your local assets or Unsplash URLs
import hampi from "../assets/Hampi-temple.jpg";
import kundamundi from "../assets/Kundamundi.jpg";
import mysore from "../assets/Mysore-place.jpg";
import chariot from "../assets/Stone-Chariot-Hampi-heritage-land.jpg";
import waterfall from "../assets/Waterfall.jpg";

function HeroSection() {
  const images = [hampi, kundamundi, mysore, chariot, waterfall];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const nextIndex = (currentIndex + 1) % images.length;

  // 🔁 Smooth background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsFading(false);
      }, 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* --- Background transitions --- */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isFading ? 0 : 1,
          transform: "scale(1.05)",
          transition: "opacity 1s ease-in-out, transform 10s ease-in-out",
        }}
      ></div>

      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${images[nextIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isFading ? 1 : 0,
          transform: "scale(1)",
          transition: "opacity 1s ease-in-out, transform 10s ease-in-out",
        }}
      ></div>

      {/* --- Overlay --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 backdrop-blur-[1px]"></div>

      {/* --- Floating glows for style --- */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-pink-500/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full animate-pulse"></div>

      {/* --- Content --- */}
      <div className="relative z-10 text-center px-6">
        <motion.h1
          className="text-5xl md:text-8xl font-extrabold tracking-wide leading-tight drop-shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
        >
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">Karnataka</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-3xl mt-6 font-light text-gray-200 tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          One State, Many Worlds — Where Tradition Meets Adventure
        </motion.p>

        <motion.div
          className="mx-auto mt-8 w-32 h-1 bg-gradient-to-r from-pink-500 to-blue-600 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1 }}
        ></motion.div>

        {/* --- Buttons --- */}
        <motion.div
          className="flex justify-center gap-5 mt-10 flex-wrap"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(0,0,255,0.5)" }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold flex items-center gap-2 shadow-md hover:shadow-cyan-400/50 transition-all"
          >
            Explore Now <FaArrowRight />
          </motion.a>

          <motion.a
            href="#"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(255,255,255,0.3)" }}
            className="px-8 py-3 rounded-full border border-gray-300/40 backdrop-blur-md bg-white/10 text-white font-semibold hover:bg-white/20 transition-all"
          >
            Plan Your Trip
          </motion.a>
        </motion.div>
      </div>

      {/* --- Scroll indicator --- */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-sm tracking-wider flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="opacity-80">Scroll Down</span>
        <div className="w-[2px] h-8 bg-gradient-to-b from-white/60 to-transparent rounded-full"></div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
