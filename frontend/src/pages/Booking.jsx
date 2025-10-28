import React, { useState } from "react";

const booking = () => {
  const [tripType, setTripType] = useState("roundtrip");

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2VhfGVufDB8MHwwfHx8MA%3D%3D&?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="bg-black/70 text-white p-8 rounded-2xl w-[90%] max-w-4xl backdrop-blur-md shadow-lg">
        {/* Trip Type */}
        <div className="flex space-x-6 mb-6">
          {["roundtrip", "oneway", "multicity"].map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                value={type}
                checked={tripType === type}
                onChange={(e) => setTripType(e.target.value)}
                className="accent-red-500"
              />
              <span className="capitalize">{type === "oneway" ? "One way" : type === "multicity" ? "Multi-City" : "Roundtrip"}</span>
            </label>
          ))}
        </div>

        {/* Input Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Flying from"
            className="p-3 rounded-full bg-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            placeholder="Flying to"
            className="p-3 rounded-full bg-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <input
            type="date"
            placeholder="Departing"
            className="p-3 rounded-full bg-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {tripType === "roundtrip" && (
            <input
              type="date"
              placeholder="Returning"
              className="p-3 rounded-full bg-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center justify-between bg-white/10 rounded-full px-4 py-2">
            <span>Adults (18+)</span>
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="w-16 bg-transparent text-center outline-none"
            />
          </div>
          <div className="flex items-center justify-between bg-white/10 rounded-full px-4 py-2">
            <span>Children (0–17)</span>
            <input
              type="number"
              min="0"
              defaultValue="0"
              className="w-16 bg-transparent text-center outline-none"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <select className="p-3 rounded-full bg-white/10 w-1/2 focus:outline-none focus:ring-2 focus:ring-red-500">
            <option>Economy class</option>
            <option>Business class</option>
            <option>First class</option>
          </select>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full ml-4 transition">
            Show Flights
          </button>
        </div>
      </div>
    </div>
  );
};

export default booking;
