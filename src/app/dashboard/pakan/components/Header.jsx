'use client';

import { FaPlusCircle } from "react-icons/fa";
import { LuWheat } from "react-icons/lu";

export default function Header({ onTambah }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 className="text-2xl font-bold text-green-800 flex items-center gap-2">
          <LuWheat className="text-green-600" /> Manajemen Pakan & Obat
        </h1>
        <p className="text-gray-600 text-sm">
          Kelola stok dan informasi penggunaan pakan serta obat bebek Fanatis Farm.
        </p>
      </div>
      <button
        onClick={onTambah}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition"
      >
        <FaPlusCircle /> Tambah Item
      </button>
    </div>
  );
}
