"use client";

import { useState } from "react";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";
import Modal from "@/components/ModalTelur";
import TelurHeader from "./components/TelurHeader";
import TelurFilterBar from "./components/TelurFilterBar";
import TelurTable from "./components/TelurTable";
import StatistikRingkasan from "./components/StatistikRingkasan";

const dummyData = [
  {
    id: 1,
    tanggal: "2025-09-04",
    jumlah: 320,
    kualitas: "Baik",
    kandang: "A1",
  },
  {
    id: 2,
    tanggal: "2025-09-03",
    jumlah: 280,
    kualitas: "Sedang",
    kandang: "B1",
  },
  {
    id: 3,
    tanggal: "2025-09-02",
    jumlah: 350,
    kualitas: "Baik",
    kandang: "A2",
  },
];

export default function ManajemenTelurPage() {
  const [dataTelur, setDataTelur] = useState(dummyData);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [filterTanggal, setFilterTanggal] = useState("today");

  const today = new Date();
  const formattedToday = format(today, "yyyy-MM-dd");

  // ======== 🔢 Perhitungan Statistik ========
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const dataBulanIni = dataTelur.filter((item) => {
    const tgl = new Date(item.tanggal);
    return tgl >= startOfMonth && tgl <= today;
  });

  const totalBulanIni = dataBulanIni.reduce(
    (sum, item) => sum + item.jumlah,
    0
  );

  const dataHariIni = dataTelur.find((item) => item.tanggal === formattedToday);
  const jumlahHariIni = dataHariIni?.jumlah || 0;

  const formattedYesterday = format(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
    "yyyy-MM-dd"
  );
  const dataKemarin = dataTelur.find(
    (item) => item.tanggal === formattedYesterday
  );
  const jumlahKemarin = dataKemarin?.jumlah || 0;

  const uniqueTanggalBulanIni = [
    ...new Set(dataBulanIni.map((item) => item.tanggal)),
  ];
  const rataRataPerHari =
    uniqueTanggalBulanIni.length > 0
      ? Math.round(totalBulanIni / uniqueTanggalBulanIni.length)
      : 0;

  // ======== 🔍 Filter Pencarian dan Tanggal ========
  const filterByCycle = (data) => {
    const dataDate = new Date(data.tanggal);
    const now = new Date();

    if (filterTanggal === "today") {
      return data.tanggal === formattedToday;
    } else if (filterTanggal === "yesterday") {
      const yesterday = format(
        new Date(now.setDate(now.getDate() - 1)),
        "yyyy-MM-dd"
      );
      return data.tanggal === yesterday;
    } else if (filterTanggal === "2daysago") {
      const twoDaysAgo = format(
        new Date(now.setDate(now.getDate() - 2)),
        "yyyy-MM-dd"
      );
      return data.tanggal === twoDaysAgo;
    } else if (filterTanggal === "last7days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
      return dataDate >= sevenDaysAgo && dataDate <= new Date();
    } else {
      return true;
    }
  };

  const filteredData = dataTelur
    .filter(
      (item) =>
        item.tanggal.includes(search) ||
        item.kualitas.toLowerCase().includes(search.toLowerCase()) ||
        item.kandang.toLowerCase().includes(search.toLowerCase())
    )
    .filter(filterByCycle);

  return (
    <div className="space-y-6">
      {/* ======= Header & Tombol Tambah ======= */}
      <TelurHeader
        onTambah={() => setModalOpen(true)}
        dataTelur={filteredData}
      />
      {/* ======= Ringkasan Statistik ======= */}
      <StatistikRingkasan
        totalBulanIni={totalBulanIni}
        jumlahHariIni={jumlahHariIni}
        jumlahKemarin={jumlahKemarin}
        rataRataPerHari={rataRataPerHari}
      />

      {/* ======= Filter & Table ======= */}
      <TelurFilterBar
        search={search}
        setSearch={setSearch}
        filterTanggal={filterTanggal}
        setFilterTanggal={setFilterTanggal}
      />
      <TelurTable data={filteredData} />

      {/* ======= Modal Tambah Data ======= */}
      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </div>
  );
}

// Komponen StatBox (kotak kecil info)
function StatBox({ title, value }) {
  return (
    <div className="bg-green-50 rounded-xl p-4 shadow-sm">
      <h4 className="text-sm text-gray-500 font-medium">{title}</h4>
      <p className="text-2xl font-bold text-green-700">{value}</p>
    </div>
  );
}
