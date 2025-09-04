"use client";

import {
  FaEgg,
  FaDollarSign,
  FaLeaf,
  FaCloudSun,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Dummy data grafik bulanan
  const dataTelurBulanan = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep"],
    datasets: [
      {
        label: "Produksi Telur (Butir)",
        data: [1200, 1400, 1350, 1600, 1800, 1500, 1700, 1650, 1900],
        borderColor: "rgb(234,179,8)",
        backgroundColor: "rgba(234,179,8,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const dataPenghasilan = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep"],
    datasets: [
      {
        label: "Penghasilan Telur (Rp)",
        data: [2400000, 2800000, 2700000, 3200000, 3600000, 3000000, 3400000, 3300000, 3800000],
        borderColor: "rgb(34,197,94)",
        backgroundColor: "rgba(34,197,94,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Header Tanggal & Cuaca */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-green-700">Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Selamat datang kembali di Fanatis Farm
          </p>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-white border border-green-200 px-5 py-2.5 rounded-xl shadow-sm text-green-800">
          <div className="flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full w-8 h-8 text-lg shadow-inner">
            <FaCloudSun />
          </div>
          <div className="flex flex-col leading-tight text-sm">
            <span className="font-semibold">{today}</span>
            <span className="text-green-600">☀️ Cuaca Cerah</span>
          </div>
        </div>
      </div>

      {/* Statistik Kartu */}
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
          title="Penghasilan Telur"
          value="Rp3.450.000"
          icon={<FaDollarSign />}
          color="lime"
        />
      </div>

      {/* Grafik Produksi Telur Bulanan */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Grafik Produksi Telur Bulanan
        </h2>
        <Line data={dataTelurBulanan} />
      </div>

      {/* Grafik Penghasilan Telur Bulanan */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Grafik Penghasilan Telur Bulanan
        </h2>
        <Line data={dataPenghasilan} />
      </div>
    </div>
  );
}

// Komponen Kartu Statistik
function StatCard({ title, value, icon, color = "gray" }) {
  const bgColor = {
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    emerald: "bg-emerald-100 text-emerald-800",
    lime: "bg-lime-100 text-lime-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition duration-300 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`h-12 w-12 flex items-center justify-center rounded-full text-xl ${bgColor[color]}`}
        >
          {icon}
        </div>
      </div>
      <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
