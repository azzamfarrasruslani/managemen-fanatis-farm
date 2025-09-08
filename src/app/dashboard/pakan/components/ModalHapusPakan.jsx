'use client';

export default function ModalHapusPakan({ item, onClose, onSuccess }) {
  const handleHapus = async () => {
    const res = await fetch("/api/pakan", {
      method: "DELETE",
      body: JSON.stringify({ id: item.id }),
    });
    if (res.ok) {
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Hapus Pakan / Obat</h2>
        <p className="mb-6">Apakah anda yakin ingin menghapus <b>{item.nama}</b>?</p>
        <div className="flex justify-center gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Batal</button>
          <button onClick={handleHapus} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Hapus</button>
        </div>
      </div>
    </div>
  );
}
