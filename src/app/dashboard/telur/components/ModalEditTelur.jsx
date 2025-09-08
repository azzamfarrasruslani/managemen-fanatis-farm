'use client';

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ModalEditTelur({ data, onClose, onEdit }) {
  const [item, setItem] = useState(null);
  const [jumlahBebek, setJumlahBebek] = useState(1); // default 1
  const [loading, setLoading] = useState(true);

  // Ambil data terbaru dari database saat modal dibuka
  useEffect(() => {
    if (!data) return;

    const fetchKandang = async () => {
      setLoading(true);
      let bebek = 1;

      if (data.kandang?.id) {
        const { data: kandangData, error } = await supabase
          .from("kandang")
          .select("jumlah_bebek")
          .eq("id", data.kandang.id)
          .single();

        if (!error && kandangData) {
          bebek = kandangData.jumlah_bebek || 1;
        }
      }

      setJumlahBebek(bebek);

      setItem({
        jumlah: data.jumlah ?? "",
        persentase_telur: ((data.jumlah ?? 0) / bebek * 100).toFixed(2),
        keterangan: data.keterangan ?? "",
        tanggal: data.tanggal ?? "",
        kandang: data.kandang ?? { id: "", nama_kandang: "-", jumlah_bebek: bebek },
        id: data.id,
      });

      setLoading(false);
    };

    fetchKandang();
  }, [data]);

  const handleChange = (field, value) => {
    if (!item) return;
    let newItem = { ...item, [field]: value };

    if (field === "jumlah") {
      const jumlahNum = Number(value) || 0;
      newItem.persentase_telur = ((jumlahNum / jumlahBebek) * 100).toFixed(2);
    }

    setItem(newItem);
  };

  const handleSave = async () => {
    if (!item) return;
    await onEdit(item);
    onClose();
  };

  if (loading || !item) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-xl p-6 shadow-xl">
          Memuat data...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl text-black p-6 w-full max-w-md shadow-xl space-y-4">
        <h2 className="text-xl font-bold text-green-700">Edit Data Telur</h2>

        <p className="text-sm text-gray-700">
          <span className="font-medium">Kandang:</span> {item?.kandang?.nama_kandang || "-"}
        </p>

        <div>
          <label className="text-sm font-medium text-gray-700">Jumlah Telur</label>
          <input
            type="number"
            min={0}
            value={item.jumlah ?? ""}
            onChange={e => handleChange("jumlah", e.target.value)}
            placeholder="Masukkan jumlah telur"
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Persentase Telur (%)</label>
          <input
            type="number"
            value={item.persentase_telur ?? 0}
            readOnly
            placeholder="Persentase otomatis"
            className="w-full border rounded px-2 py-1 bg-gray-100"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Keterangan</label>
          <input
            type="text"
            value={item.keterangan ?? ""}
            onChange={e => handleChange("keterangan", e.target.value)}
            placeholder="Misal: Semua sehat"
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Tanggal</label>
          <input
            type="date"
            value={item.tanggal ?? ""}
            onChange={e => handleChange("tanggal", e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
