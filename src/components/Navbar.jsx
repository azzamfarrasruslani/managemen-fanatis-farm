'use client';

import { useState } from "react";
import { FaBell, FaSearch, FaPlus, FaMoon, FaSun } from "react-icons/fa";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <nav className="w-full bg-white shadow-sm h-16 flex items-center justify-end px-4 sm:px-6 border-b">
      <div className="flex items-center gap-4">

    

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Cari data..."
            className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
        </div>

        {/* Notifikasi */}
        <button className="relative text-gray-600 hover:text-green-600 transition text-lg">
          <FaBell />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        {/* Toggle Mode */}
        <button
          onClick={toggleDarkMode}
          className="text-gray-600 hover:text-green-600 transition text-lg"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}
