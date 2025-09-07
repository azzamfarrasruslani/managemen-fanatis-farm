"use client";

import { FaCalendarAlt, FaSun, FaHistory, FaChartLine } from "react-icons/fa";

export default function StatistikRingkasan({
  totalBulanIni,
  jumlahHariIni,
  jumlahKemarin,
  rataRataPerHari,
}) {
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

// Komponen StatBox di file yang sama
function StatBox({ title, value, icon, color = "gray" }) {
  const bgColor = {
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    emerald: "bg-emerald-100 text-emerald-800",
    lime: "bg-lime-100 text-lime-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="bg-white border-green-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`h-10 w-10 flex items-center justify-center rounded-lg text-xl ${bgColor[color]}`}
        >
          {icon}
        </div>
        <h4 className="text-sm text-gray-600 font-medium">{title}</h4>
      </div>
      <p className="text-2xl font-bold text-green-700">{value}</p>
    </div>
  );
}
