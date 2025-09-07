'use client';

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { supabase } from "@/lib/supabaseClient";
import ModalTelur from "./components/ModalTelur";
import TelurHeader from "./components/TelurHeader";
import TelurFilterBar from "./components/TelurFilterBar";
import TelurTable from "./components/TelurTable";
import StatistikRingkasan from "./components/StatistikRingkasan";

export default function ManajemenTelurPage() {
  const [dataTelur, setDataTelur] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const today = new Date();
  const [filterBulan, setFilterBulan] = useState(today.getMonth());
  const [filterTahun, setFilterTahun] = useState(today.getFullYear());

  const formattedToday = format(today, "yyyy-MM-dd");

  // Fetch data telur dari Supabase
  const fetchTelur = async () => {
    const { data, error } = await supabase
      .from("telur")
      .select("*, kandang:kandang_id(nama_kandang)")
      .order("tanggal", { ascending: false });
    if (error) console.log(error);
    else setDataTelur(data);
  };

  useEffect(() => {
    fetchTelur();
  }, []);

  // ===== Handler Simpan Modal Banyak Data =====
  const handleSaveModal = () => {
    fetchTelur();
  };

  // Filter data untuk table
  const filteredData = dataTelur
    .filter(
      (item) =>
        item.tanggal.includes(search) ||
        item.kualitas.toLowerCase().includes(search.toLowerCase()) ||
        item.kandang?.nama_kandang.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => {
      const tgl = new Date(item.tanggal);
      return (
        tgl.getMonth() === Number(filterBulan) &&
        tgl.getFullYear() === Number(filterTahun)
      );
    });

  return (
    <div className="space-y-6">
      <TelurHeader onTambah={() => setModalOpen(true)} dataTelur={filteredData} />
      <StatistikRingkasan dataTelur={filteredData} />
      <TelurFilterBar
        search={search}
        setSearch={setSearch}
        filterBulan={filterBulan}
        setFilterBulan={setFilterBulan}
        filterTahun={filterTahun}
        setFilterTahun={setFilterTahun}
      />
      <TelurTable data={filteredData} filterBulan={filterBulan} filterTahun={filterTahun} />

      {modalOpen && (
        <ModalTelur
          onClose={() => setModalOpen(false)}
          onSave={handleSaveModal}
        />
      )}
    </div>
  );
}
