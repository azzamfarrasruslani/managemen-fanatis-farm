'use client';

import { useState } from 'react';
import {
  FaDrumstickBite,
  FaWarehouse,
  FaCheckCircle,
  FaEgg
} from 'react-icons/fa';

import KandangHeader from './components/KandangHeader';
import StatCard from './components/StatCard';
import KandangCard from './components/KandangCard';

const dummyKandang = [
  {
    id: 1,
    nama_kandang: "Kandang 1",
    jumlah_bebek: 77,
    status: "Aktif",
    status_telur: "Bertelur",
    jenis_bebek: "Mojosari",
    tanggal_masuk: "2025-01-29",
  },
  {
    id: 2,
    nama_kandang: "Kandang 2",
    jumlah_bebek: 65,
    status: "Tidak Aktif",
    status_telur: "Tidak Bertelur",
    jenis_bebek: "Alabio",
    tanggal_masuk: "2025-02-10",
  },
];

export default function KandangPage() {
  const totalKandang = dummyKandang.length;
  const totalBebek = dummyKandang.reduce((acc, curr) => acc + curr.jumlah_bebek, 0);
  const aktifKandang = dummyKandang.filter(k => k.status === 'Aktif').length;
  const kandangBertelur = dummyKandang.filter(k => k.status_telur === 'Bertelur').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <KandangHeader onTambah={() => alert("Form tambah data akan muncul")} />

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Kandang"
          value={totalKandang}
          icon={<FaWarehouse />}
          color="green"
        />
        <StatCard
          title="Jumlah Bebek"
          value={`${totalBebek} Ekor`}
          icon={<FaDrumstickBite />}
          color="lime"
        />
        <StatCard
          title="Kandang Aktif"
          value={`${aktifKandang} Kandang`}
          icon={<FaCheckCircle />}
          color="emerald"
        />
        <StatCard
          title="Kandang Bertelur"
          value={`${kandangBertelur} Kandang`}
          icon={<FaEgg />}
          color="yellow"
        />
      </div>

      {/* Kartu Kandang */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {dummyKandang.map((kandang) => (
          <KandangCard key={kandang.id} kandang={kandang} />
        ))}
      </div>
    </div>
  );
}
