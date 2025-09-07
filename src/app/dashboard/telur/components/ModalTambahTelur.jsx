'use client';

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ModalTambahTelur({ onClose, onSave }) {
  const [rows, setRows] = useState([
    { tanggal: "", jumlah: "", kualitas: "Baik", kandang: "" },
  ]);
  const [kandangOptions, setKandangOptions] = useState([]);

  // Ambil daftar kandang dari Supabase
  const fetchKandang = async () => {
    const { data, error } = await supabase
      .from("kandang")
      .select("id, nama_kandang");
    if (!error) setKandangOptions(data);
  };

  useEffect(() => {
    fetchKandang();
  }, []);

  const addRow = () => {
    setRows([...rows, { tanggal: "", jumlah: "", kualitas: "Baik", kandang: "" }]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simpan ke Supabase
    const { error } = await supabase.from("telur").insert(
      rows.map(item => ({
        tanggal: item.tanggal,
        jumlah: Number(item.jumlah),
        kualitas: item.kualitas,
        kandang_id: item.kandang,
      }))
    );

    if (!error) {
      const totalTelur = rows.reduce((sum, item) => sum + Number(item.jumlah), 0);

      // Kirim notifikasi ke API route Telegram
      const message = `🐣 Data Telur Baru Masuk\nTanggal: ${new Date().toLocaleDateString()}\nTotal Telur: ${totalTelur} butir`;

      try {
        await fetch("/api/telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });
      } catch (err) {
        console.error("Telegram API error:", err);
      }

      onSave && onSave();
      onClose && onClose();
    } else {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl shadow-xl space-y-4 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold text-green-700">Tambah Data Telur (Banyak)</h2>
        <form className="space-y-4 text-black" onSubmit={handleSubmit}>
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
                <select
                  value={row.kandang}
                  onChange={(e) => handleChange(idx, "kandang", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  required
                >
                  <option value="">Pilih Kandang</option>
                  {kandangOptions.map((k) => (
                    <option key={k.id} value={k.id}>{k.nama_kandang}</option>
                  ))}
                </select>
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
