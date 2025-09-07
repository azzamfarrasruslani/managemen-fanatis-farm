"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

// WAJIB: register semua plugin chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ChartProduksiTelur() {
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

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Grafik Produksi Telur Bulanan
      </h2>
      <Line data={dataTelurBulanan} />
    </div>
  );
}
