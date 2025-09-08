"use client";

// StatCard.jsx
export default function StatCard({ title, value, icon, color = "green", subtitle }) {
  const bgColor = {
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    emerald: "bg-emerald-100 text-emerald-800",
    lime: "bg-lime-100 text-lime-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm flex items-center gap-4">
      {/* Icon */}
      <div className={`h-12 w-12 flex items-center justify-center rounded-lg text-2xl ${bgColor[color]}`}>
        {icon}
      </div>

      {/* Text Content */}
      <div className="flex flex-col">
        <span className="text-sm text-gray-600 font-medium">{title}</span>
        <span className="text-xl font-bold text-gray-800">{value}</span>
        {subtitle && <span className="text-xs text-gray-400">{subtitle}</span>}
      </div>
    </div>
  );
}
