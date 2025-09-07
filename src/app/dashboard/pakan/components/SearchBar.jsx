'use client';

import { FaSearch } from "react-icons/fa";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="relative max-w-md w-full">
      <input
        type="text"
        placeholder="🔍 Cari nama / jenis / deskripsi..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-lg border-gray-300 text-sm bg-gray-50 focus:ring-2 focus:ring-green-500"
      />
      <FaSearch className="absolute top-3 left-3 text-gray-400" />
    </div>
  );
}
