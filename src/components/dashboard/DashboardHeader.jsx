"use client";
import { FaCloudSun } from "react-icons/fa";

export default function DashboardHeader({ email }) {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      {/* Kiri: Judul & Email */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-green-700">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Selamat datang kembali di <span className="font-semibold">Fanatis Farm</span>
        </p>
        {email && (
          <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full w-fit shadow-sm border border-green-200">
            👤 Login sebagai: <span className="font-semibold">{email}</span>
          </span>
        )}
      </div>

      {/* Kanan: Informasi Cuaca */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-white border border-yellow-200 shadow-sm">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 shadow-inner text-2xl">
          <FaCloudSun />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm text-gray-700 font-semibold">{today}</span>
          <span className="text-yellow-600 text-sm">☀️ Cuaca Cerah</span>
        </div>
      </div>
    </div>
  );
}
