"use client";
import {
  FaDollarSign,
  FaEgg,
  FaChartLine,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import StatCard from "./StatCard";

export default function StatistikGrid({ dataTelur }) {
  const today = new Date();

  // Hitung total produksi telur hari ini
  const jumlahTelurHariIni = dataTelur
    .filter(
      (item) => new Date(item.tanggal).toDateString() === today.toDateString()
    )
    .reduce((sum, item) => sum + item.jumlah, 0);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Penghasilan"
        value="Rp170.000"
        subtitle="Hari Ini"
        icon={<FaDollarSign />}
        color="green"
      />
      <StatCard
        title="Produksi Telur"
        value={`${jumlahTelurHariIni} Butir`}
        subtitle="Hari Ini"
        icon={<FaEgg />}
        color="yellow"
      />
      <StatCard
        title="Telur Terjual"
        value="600 Butir"
        subtitle="Hari Ini"
        icon={<FaChartLine />}
        color="emerald"
      />
      <StatCard
        title="Rata-rata Harga Telur"
        value="Rp2.800 / Butir"
        subtitle="Per Butir"
        icon={<FaUsers />}
        color="lime"
      />
    </div>
  );
}
