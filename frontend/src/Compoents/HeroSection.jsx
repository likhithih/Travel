import React, { useState, useEffect } from 'react'
import hampi from '../assets/Hampi-temple.jpg'
import kundamundi from '../assets/Kundamundi.jpg'
import mysore from '../assets/Mysore-place.jpg'
import chariot from '../assets/Stone-Chariot-Hampi-heritage-land.jpg'
import waterfall from '../assets/Waterfall.jpg'
import { FaArrowRight } from 'react-icons/fa';


function HeroSection() {
  const images = [
    hampi,
    kundamundi,
    mysore,
    chariot,
    waterfall
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)

  const nextIndex = (currentIndex + 1) % images.length

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true)
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % images.length)
        setIsFading(false)
      }, 1000)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: isFading ? 0 : 1
          }}
        ></div>
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${images[nextIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: isFading ? 1 : 0
          }}
        ></div>
        <div className="relative z-10">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            {/* Left Content */}
            <div className="mx-auto place-self-center lg:col-span-12 text-center">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-8xl text-white">
               KARNATAKA
              </h1>
              <p className="max-w-2xl mb-6 font-bold text-white lg:mb-8 md:text-lg lg:text-2xl dark:text-gray-500">
                One state,Many Worlds
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                >
                  Learn more
                  <FaArrowRight/>
               
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 
                        6a1 1 0 010 1.414l-6 
                        6a1 1 0 01-1.414-1.414L14.586 
                        11H3a1 1 0 110-2h11.586l-4.293-4.293a1 
                        1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  
                </a>

                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg 
                    hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 
                    dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Speak to Nature
                </a>
              </div>
            </div>

           
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection