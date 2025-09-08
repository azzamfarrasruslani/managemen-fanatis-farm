'use client';

export default function ModalHapusTelur({ item, onClose, onDelete }) {
  if (!item) return null;

  const handleDelete = () => {
    onDelete && onDelete(item.id);
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white text-black rounded-xl p-6 w-full max-w-sm shadow-xl space-y-4">
        <h2 className="text-xl font-bold text-red-600">Hapus Data Telur</h2>
        <p>Apakah Anda yakin ingin menghapus data telur dari kandang <strong>{item?.kandang?.nama_kandang}</strong> tanggal <strong>{item?.tanggal}</strong>?</p>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Batal</button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Hapus</button>
        </div>
      </div>
    </div>
  );
}
