'use client';

import { useState } from 'react';
import { format, parseISO, isWithinInterval } from 'date-fns';
import { id } from 'date-fns/locale';
import { FaChartLine, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

export default function KeuanganPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [data, setData] = useState([
    {
      id: 1,
      tanggal: '2025-09-09',
      jenis: 'pemasukan',
      deskripsi: 'Penjualan telur ke Toko Ayam Jaya',
      nominal: 300000,
    },
    {
      id: 2,
      tanggal: '2025-09-08',
      jenis: 'pengeluaran',
      deskripsi: 'Pembelian pakan',
      nominal: 120000,
    },
    {
      id: 3,
      tanggal: '2025-09-08',
      jenis: 'pengeluaran',
      deskripsi: 'Obat bebek',
      nominal: 50000,
    },
  ]);

  const filtered = data.filter((item) => {
    if (!startDate || !endDate) return true;
    const tanggal = parseISO(item.tanggal);
    return isWithinInterval(tanggal, {
      start: parseISO(startDate),
      end: parseISO(endDate),
    });
  });

  const pemasukan = filtered
    .filter((item) => item.jenis === 'pemasukan')
    .reduce((sum, item) => sum + item.nominal, 0);

  const pengeluaran = filtered
    .filter((item) => item.jenis === 'pengeluaran')
    .reduce((sum, item) => sum + item.nominal, 0);

  const saldo = pemasukan - pengeluaran;

  const handleDelete = (id) => {
    if (confirm('Hapus data ini?')) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2">
        <FaChartLine />
        Laporan Keuangan
      </h1>

      {/* Filter Tanggal */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm">Dari:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">Sampai:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input"
          />
        </div>
      </div>

      {/* Ringkasan Keuangan */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-100 text-green-800 p-4 rounded shadow">
          <p className="text-sm">Total Pemasukan</p>
          <h3 className="text-xl font-bold">Rp{pemasukan.toLocaleString()}</h3>
        </div>
        <div className="bg-red-100 text-red-800 p-4 rounded shadow">
          <p className="text-sm">Total Pengeluaran</p>
          <h3 className="text-xl font-bold">Rp{pengeluaran.toLocaleString()}</h3>
        </div>
        <div className="bg-blue-100 text-blue-800 p-4 rounded shadow">
          <p className="text-sm">Saldo Akhir</p>
          <h3 className="text-xl font-bold">Rp{saldo.toLocaleString()}</h3>
        </div>
      </div>

      {/* Tabel Transaksi */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-green-600 text-white text-left text-sm">
            <tr>
              <th className="p-3">Tanggal</th>
              <th className="p-3">Jenis</th>
              <th className="p-3">Deskripsi</th>
              <th className="p-3">Nominal</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr
                key={item.id}
                className="border-b text-sm text-gray-700 hover:bg-gray-50"
              >
                <td className="p-3">
                  {format(parseISO(item.tanggal), 'dd MMMM yyyy', { locale: id })}
                </td>
                <td className="p-3 capitalize">{item.jenis}</td>
                <td className="p-3">{item.deskripsi}</td>
                <td className={`p-3 font-semibold ${item.jenis === 'pemasukan' ? 'text-green-700' : 'text-red-600'}`}>
                  Rp{item.nominal.toLocaleString()}
                </td>
                <td className="p-3 flex gap-2">
                  <button className="text-blue-600 text-sm flex items-center gap-1 hover:underline">
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 text-sm flex items-center gap-1 hover:underline"
                  >
                    <FaTrash /> Hapus
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 py-4">
                  Tidak ada transaksi pada rentang tanggal tersebut.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
