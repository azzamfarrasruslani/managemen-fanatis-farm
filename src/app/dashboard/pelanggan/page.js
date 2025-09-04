'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FaUserPlus,
  FaUserFriends,
  FaSearch,
  FaEdit,
  FaTrashAlt,
  FaEye,
} from 'react-icons/fa';

const dummyPelanggan = [
  { id: 1, nama: 'Rina Kusuma', nohp: '081234567890', alamat: 'Jl. Anggrek No. 12' },
  { id: 2, nama: 'Andi Firmansyah', nohp: '089876543210', alamat: 'Perum Green Garden' },
  { id: 3, nama: 'Siti Aminah', nohp: '087711223344', alamat: 'Desa Maju Jaya' },
];

export default function PelangganPage() {
  const [search, setSearch] = useState('');

  const filteredData = dummyPelanggan.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase()) ||
    item.nohp.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-green-800 flex items-center gap-2">
            <FaUserFriends className="text-green-500" />
            Data Pelanggan
          </h1>
          <p className="text-gray-500 text-sm">Kelola pelanggan yang terdaftar di Fanatis Farm</p>
        </div>
        <button
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium shadow-sm"
          onClick={() => alert('Fitur tambah pelanggan akan ditambahkan')}
        >
          <FaUserPlus /> Tambah Pelanggan
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="🔍 Cari nama atau nomor HP..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-white text-sm text-gray-800"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
      </div>

      {/* Tabel Data */}
      <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Nama</th>
              <th className="px-6 py-3 text-left font-semibold">No. HP</th>
              <th className="px-6 py-3 text-left font-semibold">Alamat</th>
              <th className="px-6 py-3 text-left font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 divide-y divide-gray-100">
            {filteredData.length > 0 ? (
              filteredData.map((data) => (
                <tr key={data.id} className="hover:bg-green-50 transition">
                  <td className="px-6 py-4 font-medium text-green-800">{data.nama}</td>
                  <td className="px-6 py-4">{data.nohp}</td>
                  <td className="px-6 py-4">{data.alamat}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/dashboard/pelanggan/${data.id}`}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <FaEye /> <span className="hidden sm:inline">Lihat</span>
                      </Link>
                      <button className="text-yellow-600 hover:text-yellow-800 flex items-center gap-1">
                        <FaEdit /> <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button className="text-red-600 hover:text-red-800 flex items-center gap-1">
                        <FaTrashAlt /> <span className="hidden sm:inline">Hapus</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-6">
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
