'use client';

import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function TelurTable({ data, onEdit, onDelete }) {
  if (!data || data.length === 0) return <p className="text-gray-500">Tidak ada data</p>;

  // Ambil daftar tanggal unik
  const tanggalList = Array.from(new Set(data.map((item) => item.tanggal))).sort((a, b) => b.localeCompare(a));

  // Ambil daftar kandang unik
  const kandangList = Array.from(new Set(data.map((item) => item.kandang))).sort();

  // Ambil bulan & tahun dari tanggal pertama
  const firstTanggal = tanggalList[0];
  const bulanTahunLabel = format(new Date(firstTanggal), "MMMM yyyy", { locale: id });

  // Susun data per tanggal
  const dataPerTanggal = tanggalList.map((tanggal) => {
    const items = data.filter((item) => item.tanggal === tanggal);
    const jumlahPerKandang = Object.fromEntries(kandangList.map((k) => [k, "-"]));
    const kualitasList = [];

    items.forEach((item) => {
      jumlahPerKandang[item.kandang] = item.jumlah;
      kualitasList.push(`${item.kandang}: ${item.kualitas}`);
    });

    return {
      tanggal,
      jumlahPerKandang,
      keterangan: kualitasList.join(", ") || "-",
      items, // sertakan semua item untuk aksi
    };
  });

  return (
    <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
      {/* Header bulan dan tahun */}
      <div className="px-4 py-3 font-semibold text-lg text-gray-800 bg-gray-100 rounded-t-xl border-b border-gray-300">
        Data Telur - {bulanTahunLabel}
      </div>

      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-green-600 text-white text-sm sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 text-left whitespace-nowrap">Tanggal</th>
            {kandangList.map((kandang) => (
              <th key={kandang} className="px-4 py-3 text-left whitespace-nowrap">{kandang} (butir)</th>
            ))}
            <th className="px-4 py-3 text-left whitespace-nowrap">Keterangan</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {dataPerTanggal.map((row, index) => (
            <tr key={index} className="hover:bg-green-50 transition duration-200">
              <td className="px-4 py-3">{format(new Date(row.tanggal), "dd", { locale: id })}</td>
              {kandangList.map((kandang) => (
                <td key={kandang} className="px-4 py-3">{row.jumlahPerKandang[kandang]}</td>
              ))}
              <td className="px-4 py-3">{row.keterangan}</td>
              <td className="px-4 py-3 flex gap-2">
                <button
                  onClick={() => onEdit && onEdit(row.items)}
                  className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete && onDelete(row.items)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
