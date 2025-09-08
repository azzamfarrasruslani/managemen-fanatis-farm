'use client';

import { useState, useEffect } from "react";
import Header from "./components/Header";
import PakanFilterBar from "./components/PakanFilterBar";
import PakanTable from "./components/PakanTable";
import ModalEditPakan from "./components/ModalEditPakan";
import ModalHapusPakan from "./components/ModalHapusPakan";
import ModalTambahPakan from "./components/ModalTambahPakan";
import ModalPakaiPakan from "./components/ModalPakaiPakan";

export default function ManajemenPakanPage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterJenis, setFilterJenis] = useState("All");

  const [modalTambah, setModalTambah] = useState(false);
  const [modalEdit, setModalEdit] = useState(null);
  const [modalHapus, setModalHapus] = useState(null);
  const [modalPakai, setModalPakai] = useState(null);

  // Fetch data dari API
  const fetchData = async () => {
    const res = await fetch("/api/pakan");
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter(item => {
    const matchesSearch =
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
      item.supplier.toLowerCase().includes(search.toLowerCase());

    const matchesJenis = filterJenis === "All" ? true : item.jenis === filterJenis;
    return matchesSearch && matchesJenis;
  });

  return (
    <div className="space-y-6 p-5">
      <Header onTambah={() => setModalTambah(true)} />
      <PakanFilterBar search={search} setSearch={setSearch} filterJenis={filterJenis} setFilterJenis={setFilterJenis} />
      <PakanTable
        data={filteredData}
        onEdit={setModalEdit}
        onDelete={setModalHapus}
        onPakaiPakan={setModalPakai}
      />

      {modalTambah && <ModalTambahPakan onClose={() => setModalTambah(false)} onSuccess={fetchData} />}
      {modalEdit && <ModalEditPakan item={modalEdit} onClose={() => setModalEdit(null)} onSuccess={fetchData} />}
      {modalHapus && <ModalHapusPakan item={modalHapus} onClose={() => setModalHapus(null)} onSuccess={fetchData} />}
      {modalPakai && <ModalPakaiPakan item={modalPakai} onClose={() => setModalPakai(null)} onSuccess={fetchData} />}
    </div>
  );
}
