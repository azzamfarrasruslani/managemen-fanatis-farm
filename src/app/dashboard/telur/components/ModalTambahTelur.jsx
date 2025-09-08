'use client';

import { useState, useEffect } from "react";
import axios from "axios";

export default function ModalTambahTelur({ onClose, onSave }) {
  const [rows, setRows] = useState([{ tanggal: "", jumlah: "", persentase_telur: 0, keterangan: "", kandang_id: "" }]);
  const [kandangOptions, setKandangOptions] = useState([]);

  // Fetch data kandang dari Supabase
  useEffect(() => {
    const fetchKandang = async () => {
      try {
        const res = await axios.get("/api/kandang"); // pastikan route /api/kandang sudah ada
        setKandangOptions(res.data);
      } catch (err) {
        console.error("Gagal fetch kandang:", err);
      }
    };
    fetchKandang();
  }, []);

  const addRow = () => setRows([...rows, { tanggal: "", jumlah: "", persentase_telur: 0, keterangan: "", kandang_id: "" }]);
  const removeRow = (index) => setRows(rows.filter((_, i) => i !== index));

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;

    // Update persentase otomatis jika jumlah berubah
    if (field === "jumlah" || field === "kandang_id") {
      const kandang = kandangOptions.find(k => k.id === Number(newRows[index].kandang_id));
      const jumlahBebek = kandang?.jumlah_bebek || 1;
      const jumlah = Number(newRows[index].jumlah) || 0;
      newRows[index].persentase_telur = ((jumlah / jumlahBebek) * 100).toFixed(2);
    }

    setRows(newRows);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rowsToInsert = rows.map(item => ({
        tanggal: item.tanggal,
        jumlah: Number(item.jumlah),
        persentase_telur: Number(item.persentase_telur),
        keterangan: item.keterangan,
        kandang_id: Number(item.kandang_id),
      }));

      console.log("rows to insert:", rowsToInsert);

      await axios.post("/api/telur", rowsToInsert);

      onSave && onSave();
      onClose && onClose();
    } catch (err) {
      console.error("Gagal tambah data telur:", err.response?.data || err.message || err);
      alert(err.response?.data?.error || "Terjadi kesalahan saat menambahkan data!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-3xl shadow-xl space-y-4 overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg sm:text-xl font-bold text-green-700 text-center sm:text-left">
          Tambah Data Telur
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {rows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-2 sm:gap-3 items-end">
              <div className="col-span-12 sm:col-span-3">
                <label>Tanggal</label>
                <input type="date" value={row.tanggal} onChange={e => handleChange(idx, "tanggal", e.target.value)} className="w-full border px-3 py-2 rounded-lg" required/>
              </div>
              <div className="col-span-12 sm:col-span-2">
                <label>Jumlah Telur</label>
                <input type="number" min={0} value={row.jumlah} onChange={e => handleChange(idx, "jumlah", e.target.value)} className="w-full border px-3 py-2 rounded-lg" required/>
              </div>
              <div className="col-span-12 sm:col-span-2">
                <label>Persentase (%)</label>
                <input type="number" value={row.persentase_telur} readOnly className="w-full border px-3 py-2 rounded-lg bg-gray-100"/>
              </div>
              <div className="col-span-12 sm:col-span-3">
                <label>Keterangan</label>
                <input type="text" value={row.keterangan} onChange={e => handleChange(idx, "keterangan", e.target.value)} className="w-full border px-3 py-2 rounded-lg" placeholder="Misal: Semua sehat"/>
              </div>
              <div className="col-span-12 sm:col-span-2">
                <label>Kandang</label>
                <select value={row.kandang_id} onChange={e => handleChange(idx, "kandang_id", e.target.value)} className="w-full border px-3 py-2 rounded-lg" required>
                  <option value="">Pilih Kandang</option>
                  {kandangOptions.map(k => <option key={k.id} value={k.id}>{k.nama_kandang} ({k.jumlah_bebek} bebek)</option>)}
                </select>
              </div>
              <div className="col-span-12 flex justify-end mt-1">
                {rows.length > 1 && <button type="button" onClick={() => removeRow(idx)} className="text-red-500 font-bold text-xl">×</button>}
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-4">
            <button type="button" onClick={addRow} className="px-4 py-2 border text-green-700 rounded-lg hover:bg-green-50 w-full sm:w-auto">+ Tambah Baris</button>
            <div className="flex gap-2 w-full sm:w-auto">
              <button type="button" onClick={onClose} className="px-4 py-2 border text-gray-600 rounded-lg hover:bg-gray-100 flex-1 sm:flex-none">Batal</button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex-1 sm:flex-none">Simpan Semua</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
