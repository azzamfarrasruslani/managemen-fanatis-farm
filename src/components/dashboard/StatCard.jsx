"use client";

export default function StatCard({ title, value, icon, color = "gray", subtitle }) {
  const bgColor = {
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    emerald: "bg-emerald-100 text-emerald-800",
    lime: "bg-lime-100 text-lime-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="p-5 rounded-xl bg-white shadow-sm border border-green-200">
      {/* Ikon */}
      <div className="flex items-center justify-between mb-4">
        <div
          className={`h-12 w-12 flex items-center justify-center rounded-lg text-2xl font-bold ${bgColor[color]}`}
        >
          {icon}
        </div>
      </div>

      {/* Judul */}
      <h3 className="text-sm text-gray-500 font-medium">{title}</h3>

      {/* Nilai */}
      <p className="text-2xl font-extrabold text-gray-800 tracking-tight">{value}</p>

      {/* Subtitle / Keterangan */}
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}
