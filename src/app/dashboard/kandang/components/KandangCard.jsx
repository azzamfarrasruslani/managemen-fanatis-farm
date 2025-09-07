"use client";

import {
  FaEgg,
  FaCalendarAlt,
  FaDrumstickBite,
  FaWarehouse,
  FaHome,
  FaDove,
} from "react-icons/fa";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";

export default function KandangCard({ kandang }) {
  const isAktif = kandang.status.toLowerCase() === "aktif";
  const isBertelur = kandang.status_telur.toLowerCase() === "bertelur";

  const tanggalFormatted = format(
    new Date(kandang.tanggal_masuk),
    "dd MMMM yyyy",
    { locale: localeID }
  );

  return (
    <div className="relative bg-white border border-gray-100 rounded-xl p-6 shadow-md overflow-hidden transition duration-300">
      {/* Siluet ikon warehouse besar di kanan bawah */}
      <div className="absolute bottom-[-20px] right-[-20px] opacity-10 z-0">
        <FaWarehouse className="text-green-400 text-[180px]" />
      </div>

      {/* Konten utama dengan z-index lebih tinggi */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <FaHome className="text-green-800 text-xl" />
            <h2 className="text-2xl font-extrabold text-green-800">
              {kandang.nama_kandang}
            </h2>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold ${
              isAktif ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
            }`}
          >
            {isAktif ? "Aktif" : "Nonaktif"}
          </span>
        </div>

        {/* Jenis Bebek */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <FaDove className="text-green-500" />
          <span>
            <strong>Jenis Bebek:</strong>{" "}
            <span className="text-gray-800 font-medium">{kandang.jenis_bebek}</span>
          </span>
        </div>

        {/* Info detail */}
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FaDrumstickBite className="text-green-600" />
            <span>
              <strong>Jumlah Bebek:</strong>{" "}
              <span className="font-semibold">{kandang.jumlah_bebek} Ekor</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaEgg className={isBertelur ? "text-yellow-500" : "text-gray-300"} />
            <span>
              <strong>Status Telur:</strong>{" "}
              <span
                className={`font-semibold ${
                  isBertelur ? "text-yellow-700" : "text-gray-500"
                }`}
              >
                {kandang.status_telur}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            <span>
              <strong>Tanggal Masuk:</strong>{" "}
              <span className="font-semibold">{tanggalFormatted}</span>
            </span>
          </div>
        </div>

        {/* Tombol aksi */}
        <div className="mt-6 flex justify-end gap-4">
          <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Edit
          </button>
          <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition">
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
