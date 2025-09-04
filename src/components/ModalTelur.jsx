'use client';

export default function Modal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl space-y-4">
        <h2 className="text-xl font-bold text-green-700">Tambah Data Telur</h2>
        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Tanggal</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Jumlah Telur</label>
            <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Misal: 320" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Kualitas</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Baik</option>
              <option>Sedang</option>
              <option>Buruk</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
