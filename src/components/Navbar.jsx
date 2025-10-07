import React from "react";

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <h4 className="text-center">This Items Available</h4>
      <ul className="flex flex-wrap justify-center gap-6 md:gap-10 text-gray-700 font-semibold text-sm md:text-base">
        <li className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
          Cars
        </li>
        <li className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
          Bike
        </li>
        <li className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
          Mobile Phones
        </li>
        <li className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
          Electronics
        </li>
        <li className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
          Property
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
