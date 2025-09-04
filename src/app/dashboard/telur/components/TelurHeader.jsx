'use client';

import { FaEgg, FaFileExcel, FaFilePdf, FaPlusCircle } from "react-icons/fa";
import { exportTelurToPDF } from "@/utils/exportPDF";
import { exportTelurToExcel } from "@/utils/exportExcel";

export default function TelurHeader({ onTambah, dataTelur }) {
  const handleExportPDF = () => {
    exportTelurToPDF(dataTelur);
  };

  const handleExportExcel = () => {
    exportTelurToExcel(dataTelur);
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 className="text-2xl font-bold text-green-800 flex items-center gap-2">
          <FaEgg className="text-yellow-500" /> Manajemen Telur
        </h1>
        <p className="text-gray-600 text-sm">
          Data produksi telur harian Fanatis Farm
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleExportExcel}
          className="flex items-center gap-2 px-3 py-1.5 border text-green-700 border-green-600 rounded-lg hover:bg-green-100 text-sm"
        >
          <FaFileExcel /> Excel
        </button>
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-3 py-1.5 border text-red-600 border-red-500 rounded-lg hover:bg-red-50 text-sm"
        >
          <FaFilePdf /> PDF
        </button>
        <button
          onClick={onTambah}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition"
        >
          <FaPlusCircle /> Tambah Data
        </button>
      </div>
    </div>
  );
}
