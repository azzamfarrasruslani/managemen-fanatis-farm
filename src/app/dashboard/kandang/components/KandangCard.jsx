'use client';

import { FaCheckCircle, FaTimesCircle, FaEgg, FaCalendarAlt, FaDrumstickBite } from "react-icons/fa";

export default function KandangCard({ kandang }) {
  const isAktif = kandang.status.toLowerCase() === "aktif";
  const isBertelur = kandang.status_telur.toLowerCase() === "bertelur";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition duration-300">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-green-700">{kandang.nama_kandang}</h2>
        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold ${
            isAktif ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
          }`}
        >
          {kandang.status}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-3 italic">{kandang.jenis_bebek}</p>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <FaDrumstickBite className="text-green-500" />
          <span><strong>Jumlah Bebek:</strong> {kandang.jumlah_bebek} Ekor</span>
        </div>

        <div className="flex items-center gap-2">
          <FaEgg className={isBertelur ? 'text-yellow-600' : 'text-gray-400'} />
          <span>
            <strong>Status Telur:</strong>{" "}
            <span className={isBertelur ? 'text-yellow-700 font-medium' : 'text-gray-500'}>
              {kandang.status_telur}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" />
          <span><strong>Masuk:</strong> {kandang.tanggal_masuk}</span>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="mt-5 flex justify-end gap-3">
        <button className="px-4 py-1.5 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition">
          Edit
        </button>
        <button className="px-4 py-1.5 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition">
          Hapus
        </button>
      </div>
    </div>
  );
}
