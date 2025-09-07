'use client';

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaEdit, FaTrash, FaCircle } from "react-icons/fa";
import ModalEditTelur from "./ModalEditTelur";
import ModalHapusTelur from "./ModalHapusTelur";

export default function TelurTable({ data, onEdit, onDelete }) {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalHapus, setModalHapus] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  if (!data || data.length === 0)
    return <p className="text-gray-500 text-center mt-10">Tidak ada data telur</p>;

  // Badge warna berdasarkan kualitas
  const getBadgeColor = (kualitas) => {
    switch (kualitas.toLowerCase()) {
      case "baik": return "bg-green-200 text-green-900";
      case "sedang": return "bg-yellow-200 text-yellow-900";
      case "buruk": return "bg-red-200 text-red-900";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  // Ikon kualitas
  const getKualitasIcon = (kualitas) => {
    switch (kualitas.toLowerCase()) {
      case "baik": return <FaCheckCircle className="inline text-green-700" />;
      case "sedang": return <FaExclamationTriangle className="inline text-yellow-700" />;
      case "buruk": return <FaTimesCircle className="inline text-red-700" />;
      default: return null;
    }
  };

  return (
    <>
      {/* Indikator jumlah data */}
      <div className="text-sm text-gray-700 mb-2">
        Menampilkan {data.length} data
      </div>

      {/* Tabel responsif */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300 bg-white border-collapse">
          <thead className="bg-green-600 text-white text-sm sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left whitespace-nowrap">Tanggal</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Kandang</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Jumlah</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Kualitas</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {data.map((item, idx) => {
              const tanggalObj = parseISO(item.tanggal);
              const hari = format(tanggalObj, 'EEE', { locale: id });
              const tanggalFormatted = format(tanggalObj, 'dd MMM yyyy', { locale: id });

              return (
                <tr
                  key={idx}
                  className={`transition duration-300 ${idx % 2 === 0 ? "bg-green-50" : "bg-white"} hover:bg-green-100 hover:shadow-md`}
                >
                  {/* Tanggal */}
                  <td className="px-4 py-3 border-r border-gray-300">
                    <div className="text-xs text-gray-500">{hari}</div>
                    <div className="mt-1 text-gray-800 font-semibold text-sm">{tanggalFormatted}</div>
                  </td>

                  {/* Kandang */}
                  <td
                    className="px-4 py-3 border-r border-gray-300 font-medium"
                    title={`Kandang: ${item.kandang?.nama_kandang || "Tidak diketahui"}`}
                  >
                    {item.kandang?.nama_kandang || "Tidak diketahui"}
                  </td>

                  {/* Jumlah telur */}
                  <td className="px-4 py-3 border-r border-gray-300 text-center font-semibold text-green-700 flex items-center justify-center gap-1">
                    <FaCircle className="text-yellow-600" /> {item.jumlah}
                  </td>

                  {/* Kualitas */}
                  <td className="px-4 py-3 border-r border-gray-300 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getBadgeColor(item.kualitas)} flex items-center justify-center gap-1`}
                      title={`Kualitas: ${item.kualitas}`}
                    >
                      {getKualitasIcon(item.kualitas)} {item.kualitas}
                    </span>
                  </td>

                  {/* Aksi */}
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    <button
                      onClick={() => { setSelectedItem(item); setModalEdit(true); }}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs transition-all duration-200"
                      title="Edit data telur"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => { setSelectedItem(item); setModalHapus(true); }}
                      className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs transition-all duration-200"
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

      {/* Modal */}
      {modalEdit && selectedItem && (
        <ModalEditTelur
          data={[selectedItem]}
          onClose={() => setModalEdit(false)}
          onEdit={onEdit}
        />
      )}

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
