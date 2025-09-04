'use client';

import { useState } from 'react';
import {
  FaEdit,
  FaTrashAlt,
  FaPlusCircle,
  FaEgg,
  FaFileExcel,
  FaFilePdf,
  FaSearch,
} from 'react-icons/fa';
import Modal from '@/components/ModalTelur';
import { format } from 'date-fns';
import { id as localeID } from 'date-fns/locale';

const dummyData = [
  { id: 1, tanggal: "2025-09-04", jumlah: 320, kualitas: "Baik", kandang: "A1" },
  { id: 2, tanggal: "2025-09-03", jumlah: 280, kualitas: "Sedang", kandang: "B1" },
  { id: 3, tanggal: "2025-09-02", jumlah: 350, kualitas: "Baik", kandang: "A2" },
];

export default function ManajemenTelurPage() {
  const [dataTelur, setDataTelur] = useState(dummyData);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [filterTanggal, setFilterTanggal] = useState("today");

  const today = new Date();
  const formattedToday = format(today, "yyyy-MM-dd");

  const filterByCycle = (data) => {
    if (filterTanggal === "today") {
      return data.tanggal === formattedToday;
    } else if (filterTanggal === "yesterday") {
      const yesterday = format(new Date(today.setDate(today.getDate() - 1)), "yyyy-MM-dd");
      return data.tanggal === yesterday;
    } else if (filterTanggal === "2daysago") {
      const twoDaysAgo = format(new Date(today.setDate(today.getDate() - 1)), "yyyy-MM-dd");
      return data.tanggal === twoDaysAgo;
    } else {
      return true; // tampilkan semua
    }
  };

  const filteredData = dataTelur
    .filter((item) =>
      item.tanggal.includes(search) ||
      item.kualitas.toLowerCase().includes(search.toLowerCase()) ||
      item.kandang.toLowerCase().includes(search.toLowerCase())
    )
    .filter(filterByCycle);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-green-800 flex items-center gap-2">
            <FaEgg className="text-yellow-500" /> Manajemen Telur
          </h1>
          <p className="text-gray-600 text-sm">Data produksi telur harian Fanatis Farm</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => alert("Export Excel")}
            className="flex items-center gap-2 px-3 py-1.5 border text-green-700 border-green-600 rounded-lg hover:bg-green-100 text-sm"
          >
            <FaFileExcel />
            Excel
          </button>
          <button
            onClick={() => alert("Export PDF")}
            className="flex items-center gap-2 px-3 py-1.5 border text-red-600 border-red-500 rounded-lg hover:bg-red-50 text-sm"
          >
            <FaFilePdf />
            PDF
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition"
          >
            <FaPlusCircle />
            Tambah Data
          </button>
        </div>
      </div>

      {/* Filter per siklus dan pencarian */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="filterTanggal" className="text-sm font-medium text-gray-700">
            Tampilkan:
          </label>
          <select
            id="filterTanggal"
            value={filterTanggal}
            onChange={(e) => setFilterTanggal(e.target.value)}
            className="border border-gray-300 rounded-md text-sm px-3 py-1 focus:ring-green-500 focus:border-green-500"
          >
            <option value="today">Hari Ini</option>
            <option value="yesterday">Kemarin</option>
            <option value="2daysago">2 Hari Lalu</option>
            <option value="all">Semua Data</option>
          </select>
        </div>

        <div className="relative max-w-sm w-full">
          <input
            type="text"
            placeholder="Cari tanggal / kualitas / kandang..."
            className="w-full border pl-10 pr-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-green-500 border-gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
        </div>
      </div>

      {/* Tabel Data */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow border text-sm border-gray-200">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="px-4 py-3 text-left">Tanggal</th>
              <th className="px-4 py-3 text-left">Kandang</th>
              <th className="px-4 py-3 text-left">Jumlah (Butir)</th>
              <th className="px-4 py-3 text-left">Kualitas</th>
              <th className="px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((data) => (
                <tr key={data.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{data.tanggal}</td>
                  <td className="px-4 py-3">{data.kandang}</td>
                  <td className="px-4 py-3">{data.jumlah} Butir</td>
                  <td className="px-4 py-3">{data.kualitas}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah/Edit */}
      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
