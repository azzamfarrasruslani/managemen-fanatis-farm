'use client';

import { useState } from "react";

export default function Modal({ onClose, onSave }) {
  const [rows, setRows] = useState([
    { tanggal: "", jumlah: "", kualitas: "Baik", kandang: "" },
  ]);

  // Tambah baris baru
  const addRow = () => {
    setRows([...rows, { tanggal: "", jumlah: "", kualitas: "Baik", kandang: "" }]);
  };

  // Hapus baris
  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  // Update nilai baris
  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  // Submit semua data sekaligus
  const handleSubmit = (e) => {
    e.preventDefault();
    // Kirim data ke parent
    if (onSave) onSave(rows);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl shadow-xl space-y-4 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold text-green-700">Tambah Data Telur (Banyak)</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {rows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-3 items-end">
              <div className="col-span-3">
                <label className="text-sm font-medium text-gray-700">Tanggal</label>
                <input
                  type="date"
                  value={row.tanggal}
                  onChange={(e) => handleChange(idx, "tanggal", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="col-span-3">
                <label className="text-sm font-medium text-gray-700">Jumlah Telur</label>
                <input
                  type="number"
                  min={0}
                  value={row.jumlah}
                  onChange={(e) => handleChange(idx, "jumlah", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="Misal: 320"
                  required
                />
              </div>
              <div className="col-span-3">
                <label className="text-sm font-medium text-gray-700">Kualitas</label>
                <select
                  value={row.kualitas}
                  onChange={(e) => handleChange(idx, "kualitas", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option>Baik</option>
                  <option>Sedang</option>
                  <option>Buruk</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700">Kandang</label>
                <input
                  type="text"
                  value={row.kandang}
                  onChange={(e) => handleChange(idx, "kandang", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="A1, B1..."
                  required
                />
              </div>
              <div className="col-span-1 flex justify-end">
                {rows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRow(idx)}
                    className="text-red-500 hover:text-red-700 font-bold text-xl"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={addRow}
              className="px-4 py-2 border rounded-lg text-sm text-green-700 hover:bg-green-50"
            >
              + Tambah Baris
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
              >
                Simpan Semua
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
