"use client";

import { useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PakanTable from "./components/PakanTable";

// 🟢 Pindahkan ke atas
const dummyPakanObat = [
  {
    id: 1,
    nama: "Pakan Konsentrat 511",
    jenis: "Pakan",
    stok: 50,
    deskripsi: "Digunakan untuk bebek petelur dewasa. Berikan 110g per ekor/hari.",
  },
  {
    id: 2,
    nama: "Antibiotik Neo-Terramycin",
    jenis: "Obat",
    stok: 15,
    deskripsi: "Untuk mengatasi infeksi saluran pernapasan. Dicampur ke air minum.",
  },
  {
    id: 3,
    nama: "Jagung Giling",
    jenis: "Pakan",
    stok: 80,
    deskripsi: "Sumber energi utama pakan campuran. Diberikan 40% dari total pakan.",
  },
];

export default function ManajemenPakanPage() {
  const [data, setData] = useState(dummyPakanObat); // ✅ sekarang tidak error
  const [search, setSearch] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.jenis.toLowerCase().includes(search.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Header />
      <SearchBar search={search} setSearch={setSearch} />
      <PakanTable data={filteredData} />
    </div>
  );
}
