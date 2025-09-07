'use client';

import { FaCalendarAlt, FaSun, FaHistory, FaChartLine } from "react-icons/fa";

export default function StatistikRingkasan({ dataTelur }) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const totalBulanIni = dataTelur
    .filter(item => new Date(item.tanggal).getMonth() === today.getMonth())
    .reduce((sum, item) => sum + item.jumlah, 0);

  const jumlahHariIni = dataTelur
    .filter(item => new Date(item.tanggal).toDateString() === today.toDateString())
    .reduce((sum, item) => sum + item.jumlah, 0);

  const jumlahKemarin = dataTelur
    .filter(item => new Date(item.tanggal).toDateString() === yesterday.toDateString())
    .reduce((sum, item) => sum + item.jumlah, 0);

  const hariDalamBulan = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const rataRataPerHari = Math.round(totalBulanIni / hariDalamBulan);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatBox
        title="Total Bulan Ini"
        value={`${totalBulanIni} Butir`}
        icon={<FaCalendarAlt />}
        color="green"
      />
      <StatBox
        title="Hari Ini"
        value={`${jumlahHariIni} Butir`}
        icon={<FaSun />}
        color="yellow"
      />
      <StatBox
        title="Kemarin"
        value={`${jumlahKemarin} Butir`}
        icon={<FaHistory />}
        color="emerald"
      />
      <StatBox
        title="Rata-rata / Hari"
        value={`${rataRataPerHari} Butir`}
        icon={<FaChartLine />}
        color="lime"
      />
    </div>
  );
}

function StatBox({ title, value, icon, color = "gray" }) {
  const bgColor = {
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    emerald: "bg-emerald-100 text-emerald-800",
    lime: "bg-lime-100 text-lime-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm flex items-center gap-3">
      <div className={`h-12 w-12 flex items-center justify-center rounded-lg text-2xl ${bgColor[color]}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-sm text-gray-600 font-medium">{title}</h4>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
