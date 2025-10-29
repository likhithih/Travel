import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const cardData = location.state?.bookingData;

  const [people, setPeople] = useState(1);
  const [travelDate, setTravelDate] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!cardData) {
      navigate("/destination");
    }
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: "",
    });
  }, [cardData, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    // Validate required fields
    if (!formData.name.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    if (!travelDate) {
      toast.error("Please select a travel date");
      return;
    }
    if (people < 1) {
      toast.error("Please select at least 1 traveler");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to continue");
        navigate("/login");
        return;
      }

      const bookingData = {
        destinationId: cardData._id,
        packageName: cardData.title,
        travelDate,
        travelers: people,
        totalAmount: Math.round(totalPrice),
        specialRequests: specialRequests || ""
      };

      const response = await axios.post("http://localhost:4000/bookings", bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.status === 201) {
        toast.success("Booking created successfully! Status: Pending");
        navigate("/booking-status");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || "Failed to create booking");
    } finally {
      setIsLoading(false);
    }
  };

  if (!cardData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">
        No package selected. Redirecting...
      </div>
    );
  }

  const basePrice = parseFloat(
    cardData.price.replace("₹", "").replace(",", "")
  );
  const subtotal = basePrice * people;
  const gst = subtotal * 0.1;
  const totalPrice = subtotal + gst;

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#0a0e2a] via-[#0f1845] to-[#0a0e2a] text-white p-6"
    >
      <motion.div
        className="bg-[#10183a]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#c8a951]/20 w-[90%] max-w-4xl p-10"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Header */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#c8a951]"
          variants={fadeInUp}
        >
          Confirm Your Booking
        </motion.h2>

        {/* Destination Info */}
        <motion.div
          className="mb-8 p-5 bg-[#141c3a]/60 rounded-2xl border border-[#c8a951]/20"
          variants={fadeInUp}
        >
          <h3 className="text-2xl font-semibold mb-3 text-[#e5c875]">
            {cardData.title}
          </h3>
          <div className="space-y-1 text-sm text-gray-300">
            <p>📍 {cardData.location}</p>
            <p>🕓 Duration: {cardData.duration}</p>
            <p>💰 Base Price: {cardData.price} per person</p>
          </div>
        </motion.div>

        {/* User Details */}
        <motion.div
          className="grid md:grid-cols-2 gap-4 mb-8"
          variants={fadeInUp}
        >
          {["name", "email", "phone"].map((field, idx) => (
            <input
              key={idx}
              type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              placeholder={
                field === "name"
                  ? "Full Name"
                  : field === "email"
                  ? "Email Address"
                  : "Phone Number"
              }
              className="p-3 rounded-xl bg-[#1a244d]/60 border border-[#c8a951]/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#c8a951]/40 transition-all"
            />
          ))}
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="p-3 rounded-xl bg-[#1a244d]/60 border border-[#c8a951]/20 text-white focus:outline-none focus:ring-2 focus:ring-[#c8a951]/40 transition-all"
          />
        </motion.div>

        {/* People */}
        <motion.div className="mb-8" variants={fadeInUp}>
          <div className="flex items-center justify-between bg-[#1a244d]/60 rounded-xl px-5 py-3 border border-[#c8a951]/20 w-fit">
            <span className="font-medium text-[#e5c875]">👥 People</span>
            <input
              type="number"
              min="1"
              value={people}
              onChange={(e) => setPeople(parseInt(e.target.value) || 1)}
              className="w-16 bg-transparent text-center outline-none text-white ml-4"
            />
          </div>
        </motion.div>

        {/* Special Requests */}
        <motion.div className="mb-8" variants={fadeInUp}>
          <label className="block text-sm font-medium mb-2 text-[#e5c875]">Special Requests (Optional)</label>
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="Any special requirements or requests..."
            className="w-full p-3 rounded-xl bg-[#1a244d]/60 border border-[#c8a951]/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#c8a951]/40 transition-all resize-none"
            rows="3"
          />
        </motion.div>

        {/* Price Summary */}
        <motion.div
          className="mt-6 p-5 bg-[#141c3a]/60 rounded-2xl border border-[#c8a951]/20"
          variants={fadeInUp}
        >
          <h4 className="text-lg font-semibold mb-3 text-[#e5c875]">
            💵 Price Summary
          </h4>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Base Price per Person:</span>
              <span>{cardData.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Number of People:</span>
              <span>{people}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (10%):</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t border-[#c8a951]/20 pt-2 text-[#e5c875]">
              <span>Total Price:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        {/* Button */}
        <motion.button
          className="mt-8 w-full py-3 rounded-full font-semibold text-[#0a0e2a] bg-[#c8a951] hover:bg-[#d6b85c] transition-all duration-300 shadow-md"
          variants={fadeInUp}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          disabled={isLoading}
          onClick={handlePayment}
        >
          {isLoading ? "Processing..." : "Confirm Booking"}
        </motion.button>
      </motion.div>
    </div>
  );
}
