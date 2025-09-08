'use client';

import { FaSearch, FaChevronDown, FaChevronUp, FaLeaf, FaPills, FaList } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

export default function PakanFilterBar({ search, setSearch, filterJenis, setFilterJenis }) {
  const jenisOptions = ["All", "Pakan", "Obat"];
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getJenisIcon = (jenis) => {
    if (jenis === "Pakan") return <FaLeaf className="inline mr-2 text-green-600" />;
    if (jenis === "Obat") return <FaPills className="inline mr-2 text-yellow-600" />;
    return <FaList className="inline mr-2 text-gray-600" />;
  };

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (jenis) => {
    setFilterJenis(jenis);
    setIsOpen(false);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 flex flex-col md:flex-row items-start md:items-center gap-4 w-full max-w-xl">
      {/* Input pencarian */}
      <div className="relative flex-1 w-full">
        <input
          type="text"
          placeholder="Cari nama / deskripsi / supplier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 text-sm text-gray-800 bg-gray-50 placeholder:text-gray-400 transition"
        />
        <FaSearch className="absolute top-2.5 left-3 text-gray-400 text-sm" />
      </div>

      {/* Custom Dropdown filter jenis */}
      <div className="relative w-48" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center px-4 py-2 text-sm bg-green-50 text-green-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 font-medium transition"
        >
          {getJenisIcon(filterJenis)}
          {filterJenis === "All" ? "Semua Jenis" : filterJenis}
          {isOpen ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
        </button>

        {isOpen && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 text-black rounded-lg mt-1 shadow-md max-h-40 overflow-auto">
            {jenisOptions.map((jenis) => (
              <li
                key={jenis}
                onClick={() => handleSelect(jenis)}
                className={`px-4 py-2 cursor-pointer hover:bg-green-100 flex items-center ${
                  filterJenis === jenis ? "bg-green-100 font-semibold" : ""
                }`}
              >
                {getJenisIcon(jenis)}
                {jenis === "All" ? "Semua Jenis" : jenis}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
