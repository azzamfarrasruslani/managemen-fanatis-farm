'use client';

import { FaPills, FaLeaf, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

export default function PakanTable({ data, onEdit, onDelete, onAddStok, onPakaiPakan }) {
  const getJenisIcon = (jenis) =>
    jenis === "Pakan" ? (
      <FaLeaf className="text-green-600 mr-1" />
    ) : (
      <FaPills className="text-yellow-600 mr-1" />
    );

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(number);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full bg-white divide-y divide-gray-200 text-sm">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left font-semibold">Nama Item</th>
            <th className="px-6 py-3 text-left font-semibold">Jenis</th>
            <th className="px-6 py-3 text-left font-semibold">Stok</th>
            <th className="px-6 py-3 text-left font-semibold">Harga / Unit</th>
            <th className="px-6 py-3 text-left font-semibold">Deskripsi</th>
            <th className="px-6 py-3 text-left font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-700">
          {data.length > 0 ? (
            data.map((item) => (
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
                <td className="px-6 py-4 flex items-center gap-2">
                  <span className="font-semibold">{item.stok}</span>
                  <span className="text-gray-500 text-xs">{item.satuan}</span>
                </td>
                <td className="px-6 py-4 font-medium">{formatRupiah(Number(item.hargaperunit) || 0)}</td>

                <td className="px-6 py-4 text-gray-600">{item.deskripsi}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onPakaiPakan(item)} className="p-2 text-green-600 hover:text-green-800 transition" title="Pakai Pakan">
                      <FaPlus />
                    </button>
                    <button onClick={() => onEdit(item)} className="p-2 text-blue-600 hover:text-blue-800 transition" title="Edit">
                      <FaEdit />
                    </button>
                    <button onClick={() => onDelete(item)} className="p-2 text-red-600 hover:text-red-800 transition" title="Hapus">
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                Tidak ada data ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
