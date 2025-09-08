'use client';

import { useState, useEffect } from "react";

export default function ModalPakaiPakan({ item, onClose, onSuccess }) {
  const [jumlah, setJumlah] = useState(0);
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  const [kandangId, setKandangId] = useState("");
  const [kandangList, setKandangList] = useState([]);

  // Fetch daftar kandang
  useEffect(() => {
    const fetchKandang = async () => {
      try {
        const res = await fetch("/api/kandang");
        const data = await res.json();
        setKandangList(data);
        if (data.length > 0) setKandangId(data[0].id); // default pilih kandang pertama
      } catch (err) {
        console.error("Gagal fetch kandang:", err);
      }
    };
    fetchKandang();
  }, []);

  const handlePakai = async () => {
    if (!kandangId) return alert("Pilih kandang!");
    if (jumlah <= 0) return alert("Jumlah harus lebih dari 0");

    const sisa = item.stok - jumlah;
    if (sisa < 0) return alert("Stok tidak cukup!");

    // Update stok pakan
    const resUpdate = await fetch("/api/pakan", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, stok: sisa }),
    });

    if (!resUpdate.ok) return alert("Gagal update stok pakan");

    // Hitung total harga
    const hargaTotal = jumlah * item.hargaperunit;

    // Insert log_pakan
    const resLog = await fetch("/api/log_pakan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kandang_id: kandangId,
        pakan_id: item.id,
        jumlah,
        harga_total: hargaTotal,
        tanggal_penggunaan: tanggal,
      }),
    });

    if (!resLog.ok) {
      const err = await resLog.json();
      return alert(`Gagal menyimpan log pakan: ${err.error || "Server error"}`);
    }

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 text-black rounded-xl w-full max-w-sm shadow-lg space-y-3">
        <h2 className="text-xl font-semibold">Gunakan Pakan</h2>

        <p>Pakan: <b>{item.nama}</b></p>

        <label className="block text-sm font-medium text-gray-700">Jumlah dipakai</label>
        <input
          type="number"
          placeholder="Jumlah dipakai"
          className="w-full p-2 border rounded"
          value={jumlah}
          onChange={(e) => setJumlah(Number(e.target.value))}
        />

        <label className="block text-sm font-medium text-gray-700">Tanggal Penggunaan</label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700">Pilih Kandang</label>
        <select
          className="w-full p-2 border rounded"
          value={kandangId || ""}
          onChange={(e) => setKandangId(Number(e.target.value))}
        >
          {(kandangList || []).map((k) => (
            <option key={k.id} value={k.id}>
              {k.nama_kandang}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3 mt-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Batal</button>
          <button onClick={handlePakai} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Gunakan</button>
        </div>
      </div>
    </div>
  );
}
