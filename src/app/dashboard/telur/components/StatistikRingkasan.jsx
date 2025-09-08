"use client";

import { FaCalendarAlt, FaEgg, FaChartLine, FaWarehouse } from "react-icons/fa";

export default function StatistikRingkasan({ dataTelur }) {
  const today = new Date();
  const monthName = today.toLocaleString("id-ID", { month: "long" });
  const dateString = today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Total Bulan Ini
  const totalBulanIni = dataTelur
    .filter((item) => new Date(item.tanggal).getMonth() === today.getMonth())
    .reduce((sum, item) => sum + item.jumlah, 0);

  // Jumlah Hari Ini
  const telurHariIni = dataTelur.filter(
    (item) => new Date(item.tanggal).toDateString() === today.toDateString()
  );
  const jumlahHariIni = telurHariIni.reduce(
    (sum, item) => sum + item.jumlah,
    0
  );

  // Persentase telur hari ini berdasarkan jumlah bebek di kandang
  const totalBebekHariIni = telurHariIni.reduce(
    (sum, item) => sum + (item.kandang?.jumlah_bebek || 0),
    0
  );
  const persentaseHariIni =
    totalBebekHariIni > 0
      ? ((jumlahHariIni / totalBebekHariIni) * 100).toFixed(2)
      : 0;

  // Kandang Terproduktif
  const kandangMap = {};
  dataTelur.forEach((item) => {
    const kName = item.kandang?.nama_kandang || "Tidak diketahui";
    if (!kandangMap[kName]) kandangMap[kName] = 0;
    kandangMap[kName] += item.jumlah;
  });
  const kandangTerproduktif =
    Object.entries(kandangMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatBox
        title="Total Bulan Ini"
        value={`${totalBulanIni} Butir`}
        subtitle={`Periode: ${monthName}`}
        icon={<FaCalendarAlt />}
        color="green"
      />
      <StatBox
        title="Produksi Hari Ini"
        value={`${jumlahHariIni} Butir`}
        subtitle={`Tanggal: ${dateString}`}
        icon={<FaEgg />}
        color="yellow"
      />
      <StatBox
        title="Persentase Telur Hari Ini"
        value={`${persentaseHariIni}%`}
        subtitle="Dari total bebek yang bertelur"
        icon={<FaChartLine />}
        color="emerald"
      />
      <StatBox
        title="Kandang Terproduktif"
        value={kandangTerproduktif}
        subtitle="Berdasarkan jumlah telur"
        icon={<FaWarehouse />}
        color="lime"
      />
    </div>
  );
}

function StatBox({ title, value, subtitle, icon, color = "gray" }) {
  const bgColor = {
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    emerald: "bg-emerald-100 text-emerald-800",
    lime: "bg-lime-100 text-lime-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center gap-3">
      <div
        className={`h-12 w-12 flex items-center justify-center rounded-lg text-2xl ${bgColor[color]}`}
      >
        {icon}
      </div>
      <div className="text-center sm:text-left">
        <h4 className="text-sm text-gray-600 font-medium">{title}</h4>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}
