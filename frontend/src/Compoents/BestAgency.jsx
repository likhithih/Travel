import React from "react";
import { FaRegStar } from 'react-icons/fa6';
import { FiExternalLink } from 'react-icons/fi';
import { useTheme } from './ThemeContext';
// import { Star, ExternalLink } from "lucide-react";

export default function BestAgency() {
  const { darkMode } = useTheme();
  return (
    <section className={`${darkMode ? 'bg-gray-900' : 'bg-green-50'} py-16 px-6 md:px-20 lg:px-32 flex flex-col md:flex-row items-center justify-between gap-12`}>
      {/* Left Content */}
      <div className="md:w-1/2 space-y-6">
        <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Why We’re Best Agency
        </h2>
        <h3 className={`text-2xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Welcome to <span className="text-blue-600">Travels Karnataka Agency</span> – Your Gateway to Unforgettable Journeys!
        </h3>
        <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Travels Karnataka Agency is a trusted name in the travel industry, offering seamless
          travel planning, personalized itineraries, and unforgettable adventures.
          With years of experience and a network of global partners, we ensure a
          hassle-free and memorable journey for every traveler.
        </p>

        <a
          href="#"
          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
        >
          About More Travel Karnataka <FiExternalLink size={16} />
        </a>

        {/* Rating Box */}
        <div className={`flex items-center gap-8 mt-6 rounded-2xl p-4 shadow-sm w-fit ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-400/40'}`}>
          {/* Tripadvisor */}
          <div className="flex items-center gap-3 border-r pr-6">
            <div className="text-2xl font-semibold">4.6</div>
            <div>
              <div className="flex items-center gap-1 text-black-600 font-semibold">
                <span>Tripadvisor</span>
              </div>
              <div className="flex text-green-500">
                {[...Array(6)].map((_, i) => (
                  <FaRegStar key={i} size={12} fill="green" stroke="green" />
                ))}
              </div>
            </div>
          </div>

          {/* Trustpilot */}
          <div className="flex items-center gap-3">
            <div className="text-2xl font-semibold">4.5</div>
            <div>
              <div className="flex items-center gap-1 text-black-600 font-semibold">
               <span>Trustpilot</span>
              </div>
              <div className="flex text-green-500">
                {[...Array(5)].map((_, i) => (
                  <FaRegStar key={i} size={12} fill="green" stroke="green" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Images */}
      <div className="md:w-1/2 grid grid-cols-2 gap-4">
        <img
          src="/Images/Bird.avif"
          alt="Sky adventure"
          className="rounded-2xl shadow-lg w-full h-[200px] object-cover"
        />
        <img
          src="/Images/Temple.avif"
          alt="Skating"
          className="rounded-2xl shadow-lg w-full h-[200px] object-cover"
        />
        <img
          src="/Images/Boating.avif"
          alt="Boating"
          className="rounded-2xl shadow-lg w-full h-[200px] object-cover col-span-2"
        />
      </div>
    </section>
  );
}
