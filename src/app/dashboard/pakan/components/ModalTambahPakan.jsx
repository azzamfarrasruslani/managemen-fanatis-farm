'use client';

import { useState } from "react";

export default function ModalTambahPakan({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    nama: "",
    jenis: "Pakan",
    stok: "", // string untuk input numeric
    satuan: "kg",
    hargaperunit: "", // string untuk input numeric
    kadaluarsa: "",
    status: "Tersedia",
    supplier: "",
    kategori: "",
    deskripsi: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // konversi numeric sebelum dikirim ke server
    const payload = {
      ...form,
      stok: Number(form.stok),
      hargaperunit: Number(form.hargaperunit),
    };

    try {
      const res = await fetch("/api/pakan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        const err = await res.json();
        alert(`Error: ${err.error || "Gagal menambahkan data"}`);
      }
    } catch (error) {
      console.error("POST pakan error:", error);
      alert("Gagal menambahkan data, silakan coba lagi.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Tambah Pakan / Obat</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Nama */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nama Item</label>
            <input
              type="text"
              placeholder="Nama pakan atau obat"
              required
              className="w-full p-2 border rounded text-gray-800 focus:ring-2 focus:ring-green-400"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
            />
          </div>

          {/* Grid 2 kolom: Jenis + Supplier */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Jenis</label>
              <select
                value={form.jenis}
                onChange={(e) => setForm({ ...form, jenis: e.target.value })}
                className="w-full p-2 border rounded text-gray-800 focus:ring-2 focus:ring-green-400"
              >
                <option value="Pakan">Pakan</option>
                <option value="Obat">Obat</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Supplier</label>
              <input
                type="text"
                placeholder="Nama supplier"
                className="w-full p-2 border rounded text-gray-800 focus:ring-2 focus:ring-green-400"
                value={form.supplier}
                onChange={(e) => setForm({ ...form, supplier: e.target.value })}
              />
            </div>
          </div>

          {/* Grid 2 kolom: Stok + Satuan */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Stok</label>
              <input
                type="number"
                placeholder="Jumlah stok"
                className="w-full p-2 border rounded text-gray-800 focus:ring-2 focus:ring-green-400"
                value={form.stok}
                onChange={(e) => setForm({ ...form, stok: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Satuan</label>
              <input
                type="text"
                placeholder="kg, botol, dsb."
                className="w-full p-2 border rounded text-gray-800 focus:ring-2 focus:ring-green-400"
                value={form.satuan}
                onChange={(e) => setForm({ ...form, satuan: e.target.value })}
              />
            </div>
          </div>

          {/* Grid 2 kolom: Harga + Kadaluarsa */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Harga / Unit</label>
              <input
                type="number"
                placeholder="Harga per unit"
                className="w-full p-2 border rounded text-gray-800 focus:ring-2 focus:ring-green-400"
                value={form.hargaperunit}
                onChange={(e) => setForm({ ...form, hargaperunit: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Kadaluarsa</label>
              <input
                type="date"
                className="w-full p-2 border rounded text-gray-800 focus:ring-2 focus:ring-green-400"
                value={form.kadaluarsa}
                onChange={(e) => setForm({ ...form, kadaluarsa: e.target.value })}
              />
            </div>
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Kategori</label>
            <input
              type="text"
              placeholder="Contoh: Bebek Dewasa"
              className="w-full p-2 border rounded text-gray-800 focus:ring-2 focus:ring-green-400"
              value={form.kategori}
              onChange={(e) => setForm({ ...form, kategori: e.target.value })}
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Deskripsi</label>
            <textarea
              placeholder="Deskripsi singkat"
              className="w-full p-2 border rounded text-gray-800 focus:ring-2 focus:ring-green-400"
              value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            />
          </div>

          {/* Tombol */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
