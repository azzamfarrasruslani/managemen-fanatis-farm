'use client';

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { FaEdit, FaTrash, FaEgg } from "react-icons/fa";
import ModalEditTelur from "./ModalEditTelur";
import ModalHapusTelur from "./ModalHapusTelur";

export default function TelurTable({ data, onEdit, onDelete }) {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalHapus, setModalHapus] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  if (!data || data.length === 0)
    return <p className="text-gray-500 text-center mt-10">Tidak ada data telur</p>;

  return (
    <>
      <div className="text-sm text-gray-700 mb-4 font-medium">
        Menampilkan <span className="font-bold">{data.length}</span> data telur
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300 bg-white border-collapse">
          <thead className="bg-green-600 text-white text-sm sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left whitespace-nowrap">Tanggal</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Kandang</th>
              <th className="px-4 py-3 text-center whitespace-nowrap">Jumlah</th>
              <th className="px-4 py-3 text-center whitespace-nowrap">Persentase</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Keterangan</th>
              <th className="px-4 py-3 text-center whitespace-nowrap">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {data.map((item, idx) => {
              const tanggalObj = parseISO(item.tanggal);
              const hari = format(tanggalObj, 'EEE', { locale: id });
              const tanggalFormatted = format(tanggalObj, 'dd MMM yyyy', { locale: id });

              // Warna baris alternate
              const rowBg = idx % 2 === 0 ? "bg-green-50" : "bg-white";

              return (
                <tr
                  key={idx}
                  className={`transition duration-300 ${rowBg} hover:bg-green-100 hover:shadow-md`}
                >
                  {/* Tanggal */}
                  <td className="px-4 py-3 border-r border-gray-300">
                    <div className="text-xs text-gray-500">{hari}</div>
                    <div className="mt-1 font-semibold text-gray-800">{tanggalFormatted}</div>
                  </td>

                  {/* Kandang */}
                  <td className="px-4 py-3 border-r border-gray-300 font-medium text-gray-700">
                    {item.kandang?.nama_kandang || "Tidak diketahui"}
                  </td>

                  {/* Jumlah telur */}
                  <td className="px-4 py-3 border-r border-gray-300 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-semibold text-sm">
                     <FaEgg className="text-yellow-500" /> {item.jumlah}
                    </span>
                  </td>

                  {/* Persentase telur */}
                  <td className="px-4 py-3 border-r border-gray-300 text-center">
                    <span className={`inline-block px-2 py-1 rounded-full font-semibold text-sm
                      ${item.persentase_telur >= 80 ? "bg-green-100 text-green-800" :
                        item.persentase_telur >= 50 ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"}
                    `}>
                      {item.persentase_telur}%
                    </span>
                  </td>

                  {/* Keterangan */}
                  <td className="px-4 py-3 border-r border-gray-300 text-gray-600">
                    {item.keterangan || "-"}
                  </td>

                  {/* Aksi */}
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    <button
                      onClick={() => { setSelectedItem(item); setModalEdit(true); }}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs font-medium transition-all duration-200"
                      title="Edit data telur"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => { setSelectedItem(item); setModalHapus(true); }}
                      className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs font-medium transition-all duration-200"
                      title="Hapus data telur"
                    >
                      <FaTrash /> Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Edit */}
      {modalEdit && selectedItem && (
        <ModalEditTelur
          data={selectedItem}
          onClose={() => setModalEdit(false)}
          onEdit={onEdit}
        />
      )}

      {/* Modal Hapus */}
      {modalHapus && selectedItem && (
        <ModalHapusTelur
          item={selectedItem}
          onClose={() => setModalHapus(false)}
          onDelete={onDelete}
        />
      )}
    </>
  );
}
