"use client";

import { useState } from "react";
import {
  FaPills,
  FaPlusCircle,
  FaLeaf,
  FaTrashAlt,
  FaEdit,
  FaSearch,
} from "react-icons/fa";

const dummyPakanObat = [
  {
    id: 1,
    nama: "Pakan Konsentrat 511",
    jenis: "Pakan",
    stok: 50,
    deskripsi: "Digunakan untuk bebek petelur dewasa. Berikan 110g per ekor/hari.",
  },
  {
    id: 2,
    nama: "Antibiotik Neo-Terramycin",
    jenis: "Obat",
    stok: 15,
    deskripsi: "Untuk mengatasi infeksi saluran pernapasan. Dicampur ke air minum.",
  },
  {
    id: 3,
    nama: "Jagung Giling",
    jenis: "Pakan",
    stok: 80,
    deskripsi: "Sumber energi utama pakan campuran. Diberikan 40% dari total pakan.",
  },
];

export default function ManajemenPakanPage() {
  const [data, setData] = useState(dummyPakanObat);
  const [search, setSearch] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.jenis.toLowerCase().includes(search.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-green-800 flex items-center gap-2">
            <FaLeaf className="text-green-600" /> Manajemen Pakan & Obat
          </h1>
          <p className="text-gray-600 text-sm">
            Kelola stok dan informasi penggunaan pakan serta obat bebek Fanatis Farm.
          </p>
        </div>
        <button
          onClick={() => alert("Tambah Data")}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition"
        >
          <FaPlusCircle /> Tambah Item
        </button>
      </div>

      {/* Pencarian */}
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

      {/* Tabel Data */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white divide-y divide-gray-200 text-sm">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Nama Item</th>
              <th className="px-6 py-3 text-left font-semibold">Jenis</th>
              <th className="px-6 py-3 text-left font-semibold">Stok</th>
              <th className="px-6 py-3 text-left font-semibold">Deskripsi</th>
              <th className="px-6 py-3 text-left font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-green-50 transition">
                  <td className="px-6 py-4">{item.nama}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.jenis === "Pakan"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.jenis}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.stok} Unit</td>
                  <td className="px-6 py-4">{item.deskripsi}</td>
                  <td className="px-6 py-4">
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
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
