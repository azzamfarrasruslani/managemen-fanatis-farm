'use client';

import { useState } from "react";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";

import ModalTelur from "./components/ModalTelur";
import TelurHeader from "./components/TelurHeader";
import TelurFilterBar from "./components/TelurFilterBar";
import TelurTable from "./components/TelurTable";
import StatistikRingkasan from "./components/StatistikRingkasan";

// ======= Data Dummy =======
const dummyData = [
  { id: 1, tanggal: "2025-09-04", jumlah: 320, kualitas: "Baik", kandang: "A1" },
  { id: 2, tanggal: "2025-09-03", jumlah: 280, kualitas: "Sedang", kandang: "B1" },
  { id: 3, tanggal: "2025-09-02", jumlah: 350, kualitas: "Baik", kandang: "A2" },
  { id: 4, tanggal: "2025-08-15", jumlah: 300, kualitas: "Sedang", kandang: "A1" },
];

export default function ManajemenTelurPage() {
  const [dataTelur, setDataTelur] = useState(dummyData);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const today = new Date();
  const [filterBulan, setFilterBulan] = useState(today.getMonth());
  const [filterTahun, setFilterTahun] = useState(today.getFullYear());

  const formattedToday = format(today, "yyyy-MM-dd");

  // ===== Statistik =====
  const startOfMonth = new Date(filterTahun, filterBulan, 1);
  const endOfMonth = new Date(filterTahun, Number(filterBulan) + 1, 0);

  const dataBulanIni = dataTelur.filter((item) => {
    const tgl = new Date(item.tanggal);
    return tgl >= startOfMonth && tgl <= endOfMonth;
  });

  const totalBulanIni = dataBulanIni.reduce((sum, item) => sum + item.jumlah, 0);
  const dataHariIni = dataTelur.find((item) => item.tanggal === formattedToday);
  const jumlahHariIni = dataHariIni?.jumlah || 0;

  const formattedYesterday = format(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
    "yyyy-MM-dd"
  );
  const dataKemarin = dataTelur.find((item) => item.tanggal === formattedYesterday);
  const jumlahKemarin = dataKemarin?.jumlah || 0;

  const uniqueTanggalBulanIni = [...new Set(dataBulanIni.map((item) => item.tanggal))];
  const rataRataPerHari =
    uniqueTanggalBulanIni.length > 0
      ? Math.round(totalBulanIni / uniqueTanggalBulanIni.length)
      : 0;

  // ===== Filter Pencarian dan Bulan/Tahun =====
  const filteredData = dataTelur
    .filter(
      (item) =>
        item.tanggal.includes(search) ||
        item.kualitas.toLowerCase().includes(search.toLowerCase()) ||
        item.kandang.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => {
      const tgl = new Date(item.tanggal);
      return (
        tgl.getMonth() === Number(filterBulan) &&
        tgl.getFullYear() === Number(filterTahun)
      );
    });

  // ===== Handler Simpan Modal Banyak Data =====
  const handleSaveModal = (rows) => {
    // Tambahkan setiap baris sebagai data baru, beri id unik
    const newData = rows.map((row, idx) => ({
      id: dataTelur.length + idx + 1,
      tanggal: row.tanggal,
      jumlah: Number(row.jumlah),
      kualitas: row.kualitas,
      kandang: row.kandang,
    }));
    setDataTelur([...dataTelur, ...newData]);
  };

  return (
    <div className="space-y-6">
      {/* ===== Header & Tombol Tambah ===== */}
      <TelurHeader onTambah={() => setModalOpen(true)} dataTelur={filteredData} />

      {/* ===== Ringkasan Statistik ===== */}
      <StatistikRingkasan
        totalBulanIni={totalBulanIni}
        jumlahHariIni={jumlahHariIni}
        jumlahKemarin={jumlahKemarin}
        rataRataPerHari={rataRataPerHari}
      />

      {/* ===== Filter & Table ===== */}
      <TelurFilterBar
        search={search}
        setSearch={setSearch}
        filterBulan={filterBulan}
        setFilterBulan={setFilterBulan}
        filterTahun={filterTahun}
        setFilterTahun={setFilterTahun}
      />
      <TelurTable data={filteredData} filterBulan={filterBulan} filterTahun={filterTahun} />

      {/* ===== Modal Tambah Data Banyak ===== */}
      {modalOpen && (
        <ModalTelur
          onClose={() => setModalOpen(false)}
          onSave={handleSaveModal}
        />
      )}
    </div>
  );
}

// ===== StatBox (kotak info) =====
export function StatBox({ title, value }) {
  return (
    <div className="bg-green-50 rounded-xl p-4 shadow-sm">
      <h4 className="text-sm text-gray-500 font-medium">{title}</h4>
      <p className="text-2xl font-bold text-green-700">{value}</p>
    </div>
  );
}
