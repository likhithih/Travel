import React from 'react'

function Navbar() {
  return (
    <div>
        <header className="bg-white bg-opacity-5 text-white shadow-lg hidden md:block">
      <div className="container mx-auto flex items-center h-24">
        <a href="#" className="flex items-center justify-center">
          <img
            className="h-16"
            src="/Navbar-Wh-logo-bd.png"
            alt="logo"
          />
          <span className="ml-4 uppercase font-black leading-tight">
            clara
            <br />
            thella
          </span>
        </a>

        <nav className="contents font-semibold text-base lg:text-black">
          <ul className="mx-auto flex items-center">
            <li className="p-5 xl:p-8 active">
              <a href="#">
                <span>Destination</span>
              </a>
            </li>
            <li className="p-5 xl:p-8">
              <a href="#">
                <span>Hotels</span>
              </a>
            </li>
            <li className="p-5 xl:p-8">
              <a href="#">
                <span>Booking</span>
              </a>
            </li>
            <li className="p-5 xl:p-8">
              <a href="#">
                <span>Flights</span>
              </a>
            </li>
            <li className="p-5 xl:p-8">
              <a href="#">
                <span>Contact Us</span>
              </a>
            </li>
          </ul>
        </nav>

        <button className="border border-black rounded-full font-bold px-8 py-2 text-black">
          Login
        </button>
      </div>
    </header>
    </div>
  )
}

export default Navbar;