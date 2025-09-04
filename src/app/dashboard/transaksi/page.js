'use client';

import { useState } from 'react';
import { FaListAlt, FaSearch } from 'react-icons/fa';
import NotaPDFButton from './components/NotaPDFButton';

const dummyTransaksi = [
  {
    id: 1,
    tanggal: '2025-09-04',
    pelanggan: 'Rina Kusuma',
    jenis: 'Pembelian Telur',
    jumlah: 150,
    harga_satuan: 3000,
    total: 450000,
    status: 'Selesai',
  },
  {
    id: 2,
    tanggal: '2025-09-03',
    pelanggan: 'Andi Firmansyah',
    jenis: 'Penjualan Pakan',
    jumlah: 3,
    harga_satuan: 20000,
    total: 60000,
    status: 'Selesai',
  },
];

export default function TransaksiPage() {
  const [search, setSearch] = useState('');

  const filteredTransaksi = dummyTransaksi.filter((trx) =>
    trx.pelanggan.toLowerCase().includes(search.toLowerCase()) ||
    trx.jenis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-green-800 flex items-center gap-2">
            <FaListAlt className="text-green-600" />
            Data Transaksi
          </h1>
          <p className="text-sm text-gray-600">Riwayat transaksi penjualan & pembelian</p>
        </div>
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm shadow">
          + Tambah Transaksi
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <input
          type="text"
          placeholder="Cari pelanggan / jenis..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
      </div>

      {/* Tabel Transaksi */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Tanggal</th>
              <th className="px-4 py-3 text-left">Pelanggan</th>
              <th className="px-4 py-3 text-left">Jenis</th>
              <th className="px-4 py-3 text-left">Jumlah</th>
              <th className="px-4 py-3 text-left">Harga</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Nota</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {filteredTransaksi.length > 0 ? (
              filteredTransaksi.map((trx) => (
                <tr key={trx.id} className="hover:bg-green-50 transition">
                  <td className="px-4 py-3">{trx.tanggal}</td>
                  <td className="px-4 py-3">{trx.pelanggan}</td>
                  <td className="px-4 py-3">{trx.jenis}</td>
                  <td className="px-4 py-3">{trx.jumlah}</td>
                  <td className="px-4 py-3">Rp{trx.harga_satuan.toLocaleString()}</td>
                  <td className="px-4 py-3 font-semibold text-green-600">
                    Rp{trx.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{trx.status}</td>
                  <td className="px-4 py-3">
                    <NotaPDFButton transaksi={trx} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  Tidak ada data transaksi ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
