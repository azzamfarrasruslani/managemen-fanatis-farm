'use client';

import { FaSearch } from "react-icons/fa";

export default function TelurFilterBar({
  search,
  setSearch,
  filterBulan,
  setFilterBulan,
  filterTahun,
  setFilterTahun,
}) {
  // Array bulan dan tahun
  const bulanList = [
    { value: "0", label: "Januari" },
    { value: "1", label: "Februari" },
    { value: "2", label: "Maret" },
    { value: "3", label: "April" },
    { value: "4", label: "Mei" },
    { value: "5", label: "Juni" },
    { value: "6", label: "Juli" },
    { value: "7", label: "Agustus" },
    { value: "8", label: "September" },
    { value: "9", label: "Oktober" },
    { value: "10", label: "November" },
    { value: "11", label: "Desember" },
  ];

  const tahunList = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center gap-3">
        <label className="text-sm font-semibold text-gray-800">Bulan:</label>
        <select
          value={filterBulan}
          onChange={(e) => setFilterBulan(e.target.value)}
          className="text-sm px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50 text-green-800 font-medium transition"
        >
          {bulanList.map((b) => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>

        <label className="text-sm font-semibold text-gray-800">Tahun:</label>
        <select
          value={filterTahun}
          onChange={(e) => setFilterTahun(e.target.value)}
          className="text-sm px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50 text-green-800 font-medium transition"
        >
          {tahunList.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
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
