'use client';

import { FaSearch } from "react-icons/fa";

export default function PakanFilterBar({ search, setSearch, filterJenis, setFilterJenis }) {
  const jenisOptions = ["All", "Pakan", "Obat"];

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

      {/* Dropdown filter jenis */}
      <select
        value={filterJenis}
        onChange={(e) => setFilterJenis(e.target.value)}
        className="text-sm px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50 text-green-800 font-medium transition"
      >
        {jenisOptions.map((jenis) => (
          <option key={jenis} value={jenis}>
            {jenis === "All" ? "Semua Jenis" : jenis}
          </option>
        ))}
      </select>
    </div>
  );
}
