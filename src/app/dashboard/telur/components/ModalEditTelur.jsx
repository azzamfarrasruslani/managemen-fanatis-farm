'use client';

import { useState, useEffect } from "react";

export default function ModalEditTelur({ data, onClose, onEdit }) {
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) setModalData(data.map(item => ({ ...item })));
  }, [data]);

  if (!modalData || modalData.length === 0) return null;

  const item = modalData[0];

  const handleChange = (field, value) => {
    setModalData([{ ...item, [field]: value }]);
  };

  const handleSave = () => {
    onEdit && onEdit(item);
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl space-y-4">
        <h2 className="text-xl font-bold text-green-700">Edit Data Telur</h2>

        <p className="text-sm text-gray-700">
          <span className="font-medium">Kandang:</span> {item?.kandang?.nama_kandang || "Tidak diketahui"}
        </p>

        <div>
          <label className="text-sm font-medium text-gray-700">Jumlah</label>
          <input
            type="number"
            value={item?.jumlah || 0}
            onChange={(e) => handleChange("jumlah", Number(e.target.value))}
            className="w-full border border-gray-300 rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Kualitas</label>
          <select
            value={item?.kualitas || "Baik"}
            onChange={(e) => handleChange("kualitas", e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
          >
            <option>Baik</option>
            <option>Sedang</option>
            <option>Buruk</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Tanggal</label>
          <input
            type="date"
            value={item?.tanggal || ""}
            onChange={(e) => handleChange("tanggal", e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Batal</button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Simpan</button>
        </div>
      </div>
    </div>
  );
}
