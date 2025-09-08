'use client';
import { useState } from "react";

export default function ModalPakaiPakan({ item, onClose, onSuccess }) {
  const [jumlah, setJumlah] = useState(0);

  const handlePakai = async () => {
    const sisa = item.stok - jumlah;
    if (sisa < 0) return alert("Stok tidak cukup!");

    const res = await fetch("/api/pakan", {
      method: "PUT",
      body: JSON.stringify({ ...item, stok: sisa }),
    });

    if (res.ok) {
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Gunakan Pakan</h2>
        <p className="mb-3">Pakan: <b>{item.nama}</b></p>
        <input type="number" placeholder="Jumlah dipakai" className="w-full p-2 border rounded mb-3" value={jumlah} onChange={(e)=>setJumlah(Number(e.target.value))} />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Batal</button>
          <button onClick={handlePakai} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Gunakan</button>
        </div>
      </div>
    </div>
  );
}
