'use client';

export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-transparent flex items-center gap-5">
      {/* Icon */}
      <div className="bg-green-100 text-green-600 p-4 rounded-full text-2xl shadow-inner">
        {icon}
      </div>

      {/* Text Content */}
      <div className="flex flex-col">
        <span className="text-sm text-green-700 font-semibold tracking-wide">
          {title}
        </span>
        <span className="text-2xl font-extrabold text-green-900 leading-tight">
          {value}
        </span>
      </div>
    </div>
  );
}
