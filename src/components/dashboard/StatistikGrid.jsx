"use client";
import { FaDollarSign, FaEgg, FaLeaf, FaFeatherAlt } from "react-icons/fa";
import StatCard from "./StatCard";

export default function StatistikGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Penghasilan Hari Ini"
        value="Rp170.000"
        icon={<FaDollarSign />}
        color="green"
      />
      <StatCard
        title="Produksi Telur Hari Ini"
        value="850 Butir"
        icon={<FaEgg />}
        color="yellow"
      />
      <StatCard
        title="Pakan Terpakai"
        value="18 Kg"
        icon={<FaLeaf />}
        color="emerald"
      />
      <StatCard
        title="Jumlah Bebek Aktif"
        value="230 Ekor"
        icon={<FaFeatherAlt />}
        color="lime"
      />
    </div>
  );
}
