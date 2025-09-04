'use client';

export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
      <div className="text-green-600 bg-green-100 p-3 rounded-full text-xl">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h3 className="text-lg font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
}
