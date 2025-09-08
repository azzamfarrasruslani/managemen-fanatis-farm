'use client';

import { useState, useEffect } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";

export default function ModalPakaiPakan({ item, onClose, onSuccess }) {
  const [kandangList, setKandangList] = useState([]);
  const [barisData, setBarisData] = useState([
    {
      jumlah: 0,
      tanggal: new Date().toISOString().slice(0, 10),
      kandang_id: "",
    },
  ]);

  // Ambil data kandang saat awal
  useEffect(() => {
    const fetchKandang = async () => {
      try {
        const res = await fetch("/api/kandang");
        const data = await res.json();
        setKandangList(data);
        // Set default kandang di setiap baris
        setBarisData((prev) =>
          prev.map((baris) => ({
            ...baris,
            kandang_id: data[0]?.id || "",
          }))
        );
      } catch (err) {
        console.error("Gagal fetch kandang:", err);
      }
    };
    fetchKandang();
  }, []);

  // Tambahkan baris input baru
  const tambahBaris = () => {
    setBarisData((prev) => [
      ...prev,
      {
        jumlah: 0,
        tanggal: new Date().toISOString().slice(0, 10),
        kandang_id: kandangList[0]?.id || "",
      },
    ]);
  };

  // Hapus baris input
  const hapusBaris = (index) => {
    if (barisData.length === 1) return; // Minimal 1 baris
    const newData = [...barisData];
    newData.splice(index, 1);
    setBarisData(newData);
  };

  // Update isi input
  const updateBaris = (index, field, value) => {
    const updated = [...barisData];
    updated[index][field] = value;
    setBarisData(updated);
  };

  // Simpan semua data
  const handleSimpan = async () => {
    let totalPakai = 0;

    for (let i = 0; i < barisData.length; i++) {
      const { jumlah, kandang_id, tanggal } = barisData[i];

      if (!kandang_id || jumlah <= 0) {
        alert(`Baris ${i + 1}: Data tidak valid`);
        return;
      }

      totalPakai += jumlah;
    }

    const sisa = item.stok - totalPakai;
    if (sisa < 0) {
      return alert("Stok tidak cukup!");
    }

    // Update stok pakan
    const resUpdate = await fetch("/api/pakan", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, stok: sisa }),
    });

    if (!resUpdate.ok) return alert("Gagal update stok pakan");

    // Simpan log per baris
    for (const baris of barisData) {
      const harga_total = baris.jumlah * item.hargaperunit;

      const resLog = await fetch("/api/log_pakan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kandang_id: baris.kandang_id,
          pakan_id: item.id,
          jumlah: baris.jumlah,
          harga_total,
          tanggal_penggunaan: baris.tanggal,
        }),
      });

      if (!resLog.ok) {
        const err = await resLog.json();
        return alert(`Gagal menyimpan log pakan: ${err.error || "Server error"}`);
      }
    }

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 overflow-auto">
      <div className="bg-white text-black p-6 rounded-xl w-full max-w-3xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Gunakan Pakan: <span className="text-green-700">{item.nama}</span></h2>

        {/* Form Input Grid */}
        <div className="space-y-4">
          {barisData.map((baris, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center border p-4 rounded relative bg-gray-50"
            >
              <div>
                <label className="text-sm">Jumlah</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={baris.jumlah}
                  onChange={(e) => updateBaris(index, "jumlah", Number(e.target.value))}
                />
              </div>

              <div>
                <label className="text-sm">Tanggal</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={baris.tanggal}
                  onChange={(e) => updateBaris(index, "tanggal", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm">Kandang</label>
                <select
                  className="w-full p-2 border rounded"
                  value={baris.kandang_id}
                  onChange={(e) => updateBaris(index, "kandang_id", Number(e.target.value))}
                >
                  {kandangList.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.nama_kandang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center pt-6">
                <button
                  onClick={() => hapusBaris(index)}
                  className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Tambah Baris */}
        <div className="mt-4">
          <button
            onClick={tambahBaris}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded text-sm"
          >
            <FaPlus /> Tambah Baris
          </button>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Batal
          </button>
          <button
            onClick={handleSimpan}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Simpan Semua
          </button>
        </div>
      </div>
    </div>
  );
}
