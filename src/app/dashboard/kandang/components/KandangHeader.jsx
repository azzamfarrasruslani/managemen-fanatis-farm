'use client';

import { FaPlusCircle, FaWarehouse } from 'react-icons/fa';

export default function KandangHeader({ onTambah }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-green-800 flex items-center gap-2">
          <FaWarehouse className="text-green-500" />
          Manajemen Kandang
        </h1>
        <p className="text-gray-600 text-sm">
          Kelola informasi kandang dan populasi bebek
        </p>
      </div>
      <button
        onClick={onTambah}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition"
      >
        <FaPlusCircle /> Tambah Data
      </button>
    </div>
  );
}
