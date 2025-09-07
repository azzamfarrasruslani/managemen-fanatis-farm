'use client';

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import ModalTambahTelur from "./components/ModalTambahTelur";
import TelurHeader from "./components/TelurHeader";
import TelurFilterBar from "./components/TelurFilterBar";
import TelurTable from "./components/TelurTable";
import StatistikRingkasan from "./components/StatistikRingkasan";

export default function ManajemenTelurPage() {
  const [dataTelur, setDataTelur] = useState([]);
  const [kandangList, setKandangList] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [filterBulan, setFilterBulan] = useState(new Date().getMonth());
  const [filterTahun, setFilterTahun] = useState(new Date().getFullYear());
  const [filterKandang, setFilterKandang] = useState("all");

  // Ambil data telur beserta id dan nama kandang
  const fetchTelur = async () => {
    const { data, error } = await supabase
      .from("telur")
      .select("*, kandang:kandang_id(id, nama_kandang)")
      .order("tanggal", { ascending: false });
    if (!error) setDataTelur(data);
  };

  const fetchKandang = async () => {
    const { data, error } = await supabase.from("kandang").select("*");
    if (!error) setKandangList(data);
  };

  useEffect(() => {
    fetchTelur();
    fetchKandang();
  }, []);

  const handleSaveModal = () => { fetchTelur(); };

  const handleEdit = async (item) => {
    const { error } = await supabase
      .from("telur")
      .update({
        jumlah: item.jumlah,
        kualitas: item.kualitas,
        tanggal: item.tanggal
      })
      .eq("id", item.id);
    if (!error) fetchTelur();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("telur")
      .delete()
      .eq("id", id);
    if (!error) fetchTelur();
  };

  // Filter data sesuai bulan, tahun, kandang, dan search
  const filteredData = dataTelur.filter(item => {
    const tgl = new Date(item.tanggal);
    const bulanMatch = tgl.getMonth() === Number(filterBulan);
    const tahunMatch = tgl.getFullYear() === Number(filterTahun);
    const kandangMatch =
      filterKandang === "all" ||
      item.kandang?.id === Number(filterKandang);
    const searchMatch =
      item.tanggal.includes(search) ||
      item.kualitas.toLowerCase().includes(search.toLowerCase()) ||
      item.kandang?.nama_kandang.toLowerCase().includes(search.toLowerCase());
    return bulanMatch && tahunMatch && kandangMatch && searchMatch;
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
        filterKandang={filterKandang}
        setFilterKandang={setFilterKandang}
        kandangList={kandangList}
      />
      <TelurTable
        data={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {modalOpen && (
        <ModalTambahTelur
          onClose={() => setModalOpen(false)}
          onSave={handleSaveModal}
        />
      )}
    </div>
  );
}
