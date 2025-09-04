'use client';

import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function TelurTable({ data }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-green-600 text-white text-sm sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left font-semibold tracking-wide">Tanggal</th>
            <th className="px-6 py-3 text-left font-semibold tracking-wide">Kandang</th>
            <th className="px-6 py-3 text-left font-semibold tracking-wide">Jumlah</th>
            <th className="px-6 py-3 text-left font-semibold tracking-wide">Kualitas</th>
            <th className="px-6 py-3 text-left font-semibold tracking-wide">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-green-50 transition duration-200">
                <td className="px-6 py-4">{item.tanggal}</td>
                <td className="px-6 py-4">{item.kandang}</td>
                <td className="px-6 py-4">{item.jumlah} Butir</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.kualitas === "Baik"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.kualitas}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800 transition">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition">
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-6">
                Tidak ada data ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
