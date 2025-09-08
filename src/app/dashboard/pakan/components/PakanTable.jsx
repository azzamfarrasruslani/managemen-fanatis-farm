"use client";

import { FaPills, FaLeaf, FaEdit, FaTrashAlt } from "react-icons/fa";
import { LuWheat } from "react-icons/lu";

// Fungsi untuk ikon jenis
const getJenisIcon = (jenis) =>
  jenis === "Pakan" ? (
    <LuWheat className="text-green-600 mr-1" />
  ) : (
    <FaPills className="text-yellow-600 mr-1" />
  );

// Fungsi untuk status stok
const getStatusBadge = (stok) => {
  if (stok === 0) return "Habis";
  if (stok <= 10) return "Hampir Habis";
  return "Tersedia";
};

const getStatusColor = (status) => {
  switch (status) {
    case "Habis":
      return "bg-red-100 text-red-700";
    case "Hampir Habis":
      return "bg-yellow-100 text-yellow-800";
    case "Tersedia":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function PakanTable({ data }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
      <table className="min-w-full bg-white divide-y divide-gray-200 text-sm">
        <thead className="bg-green-600 text-white text-left">
          <tr>
            <th className="px-6 py-3 font-semibold">Nama Item</th>
            <th className="px-6 py-3 font-semibold">Jenis</th>
            <th className="px-6 py-3 font-semibold">Stok</th>
            <th className="px-6 py-3 font-semibold">Satuan</th>
            <th className="px-6 py-3 font-semibold">Kadaluarsa</th>
            <th className="px-6 py-3 font-semibold">Status</th>
            <th className="px-6 py-3 font-semibold">Supplier</th>
            <th className="px-6 py-3 font-semibold">Kategori</th>
            <th className="px-6 py-3 font-semibold">Deskripsi</th>
            <th className="px-6 py-3 font-semibold">Aksi</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 text-gray-700">
          {data.length > 0 ? (
            data.map((item) => {
              const status = getStatusBadge(item.stok);
              return (
                <tr key={item.id} className="hover:bg-green-50 transition">
                  <td className="px-6 py-4 font-medium">{item.nama}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        item.jenis === "Pakan"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {getJenisIcon(item.jenis)}
                      {item.jenis}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-center">
                    {item.stok}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.satuan || "-"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.kadaluarsa || "-"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        status
                      )}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.supplier || "-"}</td>
                  <td className="px-6 py-4">{item.kategori || "-"}</td>
                  <td
                    className="px-6 py-4 text-gray-600"
                    title={item.deskripsi}
                  >
                    {item.deskripsi.length > 50
                      ? item.deskripsi.slice(0, 50) + "..."
                      : item.deskripsi}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:text-blue-800 transition">
                        <FaEdit />
                      </button>
                      <button className="p-2 text-red-600 hover:text-red-800 transition">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-6 text-gray-500">
                Tidak ada data ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
