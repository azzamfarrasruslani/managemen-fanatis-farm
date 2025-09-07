"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function KandangFormModal({
  closeModal,
  editData,
  refreshData,
}) {
  const [form, setForm] = useState({
    nama_kandang: "",
    jumlah_bebek: 0,
    status: "Aktif",
    status_telur: "Bertelur",
    jenis_bebek: "",
    tanggal_masuk: "",
  });

  const modalRef = useRef();

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  // Close jika klik di luar form
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editData) {
      const { error } = await supabase
        .from("kandang")
        .update(form)
        .eq("id", editData.id);
      if (error) console.log(error);
    } else {
      const { error } = await supabase.from("kandang").insert([form]);
      if (error) console.log(error);
    }
    refreshData();
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form
        ref={modalRef}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md space-y-4 "
      >
        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
          {editData ? "Edit Kandang" : "Tambah Kandang"}
        </h2>

        <div className="space-y-2 text-black">
          <label className="font-medium text-gray-700">Nama Kandang</label>
          <input
            type="text"
            name="nama_kandang"
            placeholder="Contoh: Kandang 1"
            value={form.nama_kandang}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium text-gray-700">Jumlah Bebek</label>
          <input
            type="number"
            name="jumlah_bebek"
            placeholder="Contoh: 50"
            value={form.jumlah_bebek}
            onChange={handleChange}
            required
            className="w-full border text-black border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium text-gray-700">Status Kandang</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border text-black border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
            <option value="Aktif">Aktif</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="font-medium text-gray-700">Status Telur</label>
          <select
            name="status_telur"
            value={form.status_telur}
            onChange={handleChange}
            className="w-full border text-black border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
            <option value="Bertelur">Bertelur</option>
            <option value="Tidak Bertelur">Tidak Bertelur</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="font-medium text-gray-700">Jenis Bebek</label>
          <input
            type="text"
            name="jenis_bebek"
            placeholder="Contoh: Mojosari"
            value={form.jenis_bebek}
            onChange={handleChange}
            required
            className="w-full border text-black border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium text-gray-700">Tanggal Masuk</label>
          <input
            type="date"
            name="tanggal_masuk"
            value={form.tanggal_masuk}
            onChange={handleChange}
            required
            className="w-full border text-black border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2  text-white bg-red-500 rounded  transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            {editData ? "Simpan" : "Tambah"}
          </button>
        </div>
      </form>
    </div>
  );
}
