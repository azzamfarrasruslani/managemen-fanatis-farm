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

  // Ambil data telur
  const fetchTelur = async () => {
    const { data, error } = await supabase
      .from("telur")
      .select("*, kandang:kandang_id(id, nama_kandang, jumlah_bebek)")
      .order("tanggal", { ascending: false });
    if (!error && data) setDataTelur(data);
  };

  // Ambil daftar kandang
  const fetchKandang = async () => {
    const { data, error } = await supabase.from("kandang").select("*");
    if (!error && data) setKandangList(data);
  };

  useEffect(() => {
    fetchTelur();
    fetchKandang();
    setModalOpen(false); // reset modal awal
  }, []);

  const handleSaveModal = () => {
    fetchTelur();
    setModalOpen(false);
  };

  const handleEdit = async (item) => {
    if (!item) return; // safety check

    const { error } = await supabase
      .from("telur")
      .update({
        jumlah: Number(item.jumlah) || 0,
        persentase_telur: Number(item.persentase_telur) || 0,
        keterangan: item.keterangan || "",
        tanggal: item.tanggal || new Date().toISOString().slice(0,10),
        kandang_id: Number(item.kandang?.id) || null,
      })
      .eq("id", item.id);

    if (!error) fetchTelur();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("telur").delete().eq("id", id);
    if (!error) fetchTelur();
  };

  const filteredData = dataTelur.filter((item) => {
    const tgl = new Date(item.tanggal);
    const bulanMatch = tgl.getMonth() === Number(filterBulan);
    const tahunMatch = tgl.getFullYear() === Number(filterTahun);
    const kandangMatch =
      filterKandang === "all" || item.kandang?.id === Number(filterKandang);
    const searchMatch =
      item.tanggal.includes(search) ||
      (item.keterangan &&
        item.keterangan.toLowerCase().includes(search.toLowerCase())) ||
      item.kandang?.nama_kandang.toLowerCase().includes(search.toLowerCase());
    return bulanMatch && tahunMatch && kandangMatch && searchMatch;
  });

  return (
    <div className="space-y-6">
      <TelurHeader
        onTambah={() => setModalOpen(true)}
        dataTelur={filteredData}
      />
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

      {/* Modal tambah telur */}
      {modalOpen && (
        <ModalTambahTelur
          key={modalOpen ? "open" : "closed"}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveModal}
        />
      )}
    </div>
  );
}
