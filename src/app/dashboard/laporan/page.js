'use client';

import { useState } from 'react';
import { format, parseISO, isWithinInterval } from 'date-fns';
import { id } from 'date-fns/locale';
import { FaListAlt } from 'react-icons/fa';

export default function LaporanProduksiPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const dataProduksi = [
    { tanggal: '2025-09-07', jumlah: 180 },
    { tanggal: '2025-09-08', jumlah: 200 },
    { tanggal: '2025-09-09', jumlah: 160 },
    { tanggal: '2025-09-10', jumlah: 190 },
  ];

  const filteredData = dataProduksi.filter((item) => {
    if (!startDate || !endDate) return true;
    const tanggal = parseISO(item.tanggal);
    return isWithinInterval(tanggal, {
      start: parseISO(startDate),
      end: parseISO(endDate),
    });
  });

  const totalTelur = filteredData.reduce((sum, item) => sum + item.jumlah, 0);
  const rataRata = filteredData.length
    ? (totalTelur / filteredData.length).toFixed(2)
    : 0;

  // Misal jumlah bebek tetap = 300
  const kualitasProduksi = ((rataRata / 300) * 100).toFixed(1);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2">
        <FaListAlt />
        Laporan Produksi
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

      {/* Statistik Ringkasan */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-100 text-green-800 p-4 rounded shadow">
          <p className="text-sm">Total Produksi</p>
          <h3 className="text-xl font-bold">{totalTelur} butir</h3>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow">
          <p className="text-sm">Rata-rata / Hari</p>
          <h3 className="text-xl font-bold">{rataRata} butir</h3>
        </div>
        <div className="bg-blue-100 text-blue-800 p-4 rounded shadow">
          <p className="text-sm">Kualitas Produksi</p>
          <h3 className="text-xl font-bold">{kualitasProduksi}%</h3>
        </div>
      </div>

      {/* Tabel Data Produksi */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-green-600 text-white text-left text-sm">
            <tr>
              <th className="p-3">Tanggal</th>
              <th className="p-3">Jumlah Produksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.tanggal}
                className="border-b text-sm text-gray-700 hover:bg-gray-50"
              >
                <td className="p-3">
                  {format(parseISO(item.tanggal), 'dd MMMM yyyy', {
                    locale: id,
                  })}
                </td>
                <td className="p-3">{item.jumlah} butir</td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center text-gray-400 py-4">
                  Tidak ada data pada rentang waktu tersebut.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
