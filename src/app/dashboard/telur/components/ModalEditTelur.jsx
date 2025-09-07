'use client';

import { useState, useEffect } from "react";

export default function ModalEditTelur({ data, onClose, onEdit, onDelete }) {
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    if (data) setModalData(data.map(item => ({ ...item })));
  }, [data]);

  const handleChange = (index, field, value) => {
    const newData = [...modalData];
    newData[index][field] = value;
    setModalData(newData);
  };

  const handleSave = (index) => {
    onEdit && onEdit([modalData[index]]);
  };

  const handleDelete = (index) => {
    onDelete && onDelete([modalData[index]]);
    setModalData(modalData.filter((_, i) => i !== index));
  };

  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl shadow-xl space-y-4 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold text-green-700">Edit/Hapus Data Telur</h2>

        {modalData.map((item, idx) => (
          <div key={idx} className="grid grid-cols-5 gap-2 items-center border-b py-2">
            <span>{item.kandang?.nama_kandang || "Tidak Diketahui"}</span>
            <input
              type="number"
              className="border rounded px-2 py-1"
              value={item.jumlah}
              onChange={(e) => handleChange(idx, "jumlah", Number(e.target.value))}
            />
            <select
              className="border rounded px-2 py-1"
              value={item.kualitas}
              onChange={(e) => handleChange(idx, "kualitas", e.target.value)}
            >
              <option>Baik</option>
              <option>Sedang</option>
              <option>Buruk</option>
            </select>
            <span>{item.tanggal}</span>
            <div className="flex gap-1">
              <button
                onClick={() => handleSave(idx)}
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
              >
                Simpan
              </button>
              <button
                onClick={() => handleDelete(idx)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Batal</button>
        </div>
      </div>
    </div>
  );
}
