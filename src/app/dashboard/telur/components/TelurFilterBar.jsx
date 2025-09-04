'use client';

import { FaSearch } from "react-icons/fa";

export default function TelurFilterBar({
  search,
  setSearch,
  filterTanggal,
  setFilterTanggal,
}) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center gap-3">
        <label htmlFor="filterTanggal" className="text-sm font-semibold text-gray-800">
          Tampilkan data:
        </label>
        <select
          id="filterTanggal"
          value={filterTanggal}
          onChange={(e) => setFilterTanggal(e.target.value)}
          className="text-sm px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50 text-green-800 font-medium transition"
        >
          <option value="today">📆 Hari Ini</option>
          <option value="yesterday">📅 Kemarin</option>
          <option value="2daysago">📆 2 Hari Lalu</option>
          <option value="last7days">🗓️ 1 Minggu Terakhir</option>
          <option value="all">📂 Semua Data</option>
        </select>
      </div>

      <div className="relative w-full md:w-80">
        <input
          type="text"
          placeholder="🔍 Cari tanggal / kualitas / kandang..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 text-sm text-gray-800 bg-gray-50 placeholder:text-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute top-3 left-3 text-gray-400 text-sm" />
      </div>
    </div>
  );
}
