'use client';

import { useState } from "react";

import Header from "./components/Header";
import PakanFilterBar from "./components/PakanFilterBar";
import PakanTable from "./components/PakanTable";

const dummyPakanObat = [
  {
    id: 1,
    nama: "Pakan Konsentrat 511",
    jenis: "Pakan",
    stok: 50,
    satuan: "kg",
    hargaPerUnit: 12000, // harga per kg
    kadaluarsa: "2025-12-31",
    status: "Tersedia",
    supplier: "PT Pakan Sejahtera",
    kategori: "Bebek Dewasa",
    deskripsi: "Digunakan untuk bebek petelur dewasa. Berikan 110g per ekor/hari.",
  },
  {
    id: 2,
    nama: "Antibiotik Neo-Terramycin",
    jenis: "Obat",
    stok: 15,
    satuan: "botol",
    hargaPerUnit: 45000, // harga per botol
    kadaluarsa: "2026-01-15",
    status: "Tersedia",
    supplier: "PT Medika Farma",
    kategori: "Pengobatan",
    deskripsi: "Untuk mengatasi infeksi saluran pernapasan. Dicampur ke air minum.",
  },
  {
    id: 3,
    nama: "Jagung Giling",
    jenis: "Pakan",
    stok: 80,
    satuan: "kg",
    hargaPerUnit: 8000, // harga per kg
    kadaluarsa: "2025-11-30",
    status: "Tersedia",
    supplier: "Petani Lokal",
    kategori: "Bebek Dewasa",
    deskripsi: "Sumber energi utama pakan campuran. Diberikan 40% dari total pakan.",
  },
];


export default function ManajemenPakanPage() {
  const [data, setData] = useState(dummyPakanObat);
  const [search, setSearch] = useState("");
  const [filterJenis, setFilterJenis] = useState("All"); // ✅ tambahkan state filterJenis

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
      item.supplier.toLowerCase().includes(search.toLowerCase());

    const matchesJenis =
      filterJenis === "All" ? true : item.jenis === filterJenis;

    return matchesSearch && matchesJenis;
  });

  return (
    <div className="space-y-6">
      <Header />
      <PakanFilterBar
        search={search}
        setSearch={setSearch}
        filterJenis={filterJenis}
        setFilterJenis={setFilterJenis}
      />
      <PakanTable data={filteredData} />
    </div>
  );
}
