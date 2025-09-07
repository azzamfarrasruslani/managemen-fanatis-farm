'use client';

import { useState } from "react";
import ModalEditTelur from "./ModalEditTelur"; // path sesuai lokasi file baru

export default function TelurTable({ data, onEdit, onDelete }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState(null);

  if (!data || data.length === 0)
    return <p className="text-gray-500">Tidak ada data</p>;

  const tanggalList = Array.from(new Set(data.map((item) => item.tanggal)))
    .sort((a, b) => b.localeCompare(a));

  const kandangList = Array.from(
    new Set(data.map((item) => item.kandang?.nama_kandang || "Tidak Diketahui"))
  ).sort();

  const dataPerTanggal = tanggalList.map((tanggal) => {
    const items = data.filter((item) => item.tanggal === tanggal);
    const jumlahPerKandang = Object.fromEntries(kandangList.map((k) => [k, "-"]));
    const kualitasList = [];

    items.forEach((item) => {
      const namaKandang = item.kandang?.nama_kandang || "Tidak Diketahui";
      jumlahPerKandang[namaKandang] = item.jumlah;
      kualitasList.push(`${namaKandang}: ${item.kualitas}`);
    });

    return { tanggal, jumlahPerKandang, keterangan: kualitasList.join(", ") || "-", items };
  });

  const handleOpenModal = (row) => {
    setModalRowData(row.items);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300">
        <div className="px-4 py-3 font-semibold text-lg text-gray-800 bg-green-100 rounded-t-xl border-b border-gray-300">
          Data Telur
        </div>

        <table className="min-w-full divide-y divide-gray-300 bg-white border-collapse">
          <thead className="bg-green-600 text-white text-sm sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 border-r border-green-700 text-left whitespace-nowrap">Tanggal</th>
              {kandangList.map((kandang) => (
                <th key={kandang} className="px-4 py-3 border-r border-green-700 text-left whitespace-nowrap">
                  {kandang} (butir)
                </th>
              ))}
              <th className="px-4 py-3 border-r border-green-700 text-left whitespace-nowrap">Keterangan</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {dataPerTanggal.map((row, idx) => (
              <tr key={idx} className={`transition duration-200 ${idx % 2 === 0 ? "bg-green-50" : "bg-white"} hover:bg-green-100`}>
                <td className="px-4 py-3 border-r border-gray-300">{row.tanggal}</td>
                {kandangList.map((kandang) => (
                  <td key={kandang} className="px-4 py-3 border-r border-gray-300 text-center font-medium">
                    {row.jumlahPerKandang[kandang]}
                  </td>
                ))}
                <td className="px-4 py-3 border-r border-gray-300 text-sm text-gray-600">{row.keterangan}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => handleOpenModal(row)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                  >
                    Edit/Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <ModalEditTelur
          data={modalRowData}
          onClose={handleCloseModal}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </>
  );
}
