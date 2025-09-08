'use client';

import { useEffect, useState } from "react";

export default function LogPakanPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/log_pakan");
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data log pakan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(num);

  return (
    <div className="space-y-4 p-5">
      <h1 className="text-2xl font-bold text-green-800">Log Penggunaan Pakan</h1>

      {loading ? (
        <p>Memuat data...</p>
      ) : logs.length === 0 ? (
        <p className="text-gray-500">Belum ada log pakan.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full bg-white divide-y divide-gray-200 text-sm">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Kandang</th>
                <th className="px-6 py-3 text-left font-semibold">Pakan</th>
                <th className="px-6 py-3 text-left font-semibold">Jumlah</th>
                <th className="px-6 py-3 text-left font-semibold">Harga Total</th>
                <th className="px-6 py-3 text-left font-semibold">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-green-50 transition">
                  <td className="px-6 py-4 font-medium">{log.kandang?.nama_kandang || log.kandang_id}</td>
                  <td className="px-6 py-4">{log.pakan?.nama || log.pakan_id}</td>
                  <td className="px-6 py-4">
                    {log.jumlah} {log.pakan?.satuan || "unit"}
                  </td>
                  <td className="px-6 py-4 font-medium">{formatRupiah(Number(log.harga_total) || 0)}</td>
                  <td className="px-6 py-4">{new Date(log.tanggal_penggunaan).toLocaleDateString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
