'use client';

import {
  FaPills,
  FaLeaf,
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaBoxOpen,
} from 'react-icons/fa';

export default function PakanTable({ data, onEdit, onDelete, onAddStok, onPakaiPakan }) {
  const getJenisIcon = (jenis) =>
    jenis === 'Pakan' ? (
      <FaLeaf className="text-green-600 mr-1" />
    ) : (
      <FaPills className="text-yellow-600 mr-1" />
    );

  const formatRupiah = (number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);

  return (
    <div className="relative overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full bg-white divide-y divide-gray-200 text-sm">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Gunakan</th>
            <th className="px-4 py-3 text-left font-semibold">Nama Item</th>
            <th className="px-4 py-3 text-left font-semibold">Jenis</th>
            <th className="px-4 py-3 text-left font-semibold">Stok</th>
            <th className="px-4 py-3 text-left font-semibold">Harga / Unit</th>
            <th className="px-4 py-3 text-left font-semibold">Deskripsi</th>
            <th className="px-4 py-3 text-left font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-700">
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-green-50 transition">
                {/* Kolom Gunakan */}
                <td className="px-4 py-4">
                  <button
                    onClick={() => onPakaiPakan(item)}
                    className="flex items-center gap-1 px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 text-xs font-medium rounded transition"
                    title="Gunakan Pakan"
                  >
                    <FaPlus className="text-sm" />
                    <span className="hidden sm:inline">Pakai</span>
                  </button>
                </td>

                {/* Nama Item */}
                <td className="px-4 py-4 font-medium">{item.nama}</td>

                {/* Jenis */}
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      item.jenis === 'Pakan'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {getJenisIcon(item.jenis)}
                    {item.jenis}
                  </span>
                </td>

                {/* Stok */}
                <td className="px-4 py-4 flex items-center gap-2">
                  <span className="font-semibold">{item.stok}</span>
                  <span className="text-gray-500 text-xs">{item.satuan}</span>
                </td>

                {/* Harga */}
                <td className="px-4 py-4 font-medium">
                  {formatRupiah(Number(item.hargaperunit) || 0)}
                </td>

                {/* Deskripsi */}
                <td className="px-4 py-4 text-gray-600">{item.deskripsi}</td>

                {/* Aksi Langsung */}
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onAddStok(item)}
                      className="flex items-center gap-1 px-2 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-xs rounded"
                      title="Isi Stok"
                    >
                      <FaBoxOpen />
                      <span className="hidden sm:inline">Isi</span>
                    </button>
                    <button
                      onClick={() => onEdit(item)}
                      className="flex items-center gap-1 px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs rounded"
                      title="Edit"
                    >
                      <FaEdit />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="flex items-center gap-1 px-2 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-xs rounded"
                      title="Hapus"
                    >
                      <FaTrashAlt />
                      <span className="hidden sm:inline">Hapus</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500">
                Tidak ada data ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
