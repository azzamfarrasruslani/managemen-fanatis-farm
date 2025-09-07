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

// WAJIB
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ChartPenghasilan() {
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
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Grafik Penghasilan Telur Bulanan
      </h2>
      <Line data={dataPenghasilan} />
    </div>
  );
}
