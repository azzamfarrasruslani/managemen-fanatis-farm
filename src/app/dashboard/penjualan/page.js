'use client';

import { useState } from 'react';
import { FaMoneyBillWave, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function PenjualanPage() {
  const [data, setData] = useState([
    {
      id: 1,
      tanggal: '2025-09-09',
      jumlah: 200,
      harga: 1500,
      pembeli: 'Toko Ayam Jaya',
      catatan: 'Pengambilan rutin mingguan',
    },
    {
      id: 2,
      tanggal: '2025-09-08',
      jumlah: 120,
      harga: 1600,
      pembeli: 'Warung Sederhana',
      catatan: '',
    },
  ]);

  const [form, setForm] = useState({
    tanggal: '',
    jumlah: '',
    harga: '',
    pembeli: '',
    catatan: '',
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      ...form,
      id: editId || Date.now(),
    };

    if (editId) {
      setData(data.map((item) => (item.id === editId ? newData : item)));
      setEditId(null);
    } else {
      setData([...data, newData]);
    }

    setForm({
      tanggal: '',
      jumlah: '',
      harga: '',
      pembeli: '',
      catatan: '',
    });
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('Yakin ingin menghapus data ini?');
    if (confirm) setData(data.filter((item) => item.id !== id));
  };

  const totalHariIni = data
    .filter((item) => item.tanggal === format(new Date(), 'yyyy-MM-dd'))
    .reduce((total, item) => total + item.jumlah * item.harga, 0);

  const totalButirHariIni = data
    .filter((item) => item.tanggal === format(new Date(), 'yyyy-MM-dd'))
    .reduce((total, item) => total + parseInt(item.jumlah), 0);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2">
        <FaMoneyBillWave />
        Penjualan Telur
      </h1>

      {/* Statistik Hari Ini */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-green-100 text-green-700 rounded-lg p-4 shadow">
          <h2 className="text-sm font-medium">Total Penjualan Hari Ini</h2>
          <p className="text-xl font-bold">Rp{totalHariIni.toLocaleString()}</p>
        </div>
        <div className="bg-yellow-100 text-yellow-700 rounded-lg p-4 shadow">
          <h2 className="text-sm font-medium">Jumlah Telur Terjual Hari Ini</h2>
          <p className="text-xl font-bold">{totalButirHariIni} butir</p>
        </div>
      </div>

      {/* Form Tambah/Edit */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-lg p-4 space-y-4 shadow"
      >
        <h2 className="text-lg font-semibold">
          {editId ? 'Edit Penjualan' : 'Tambah Penjualan'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="tanggal"
            value={form.tanggal}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="number"
            name="jumlah"
            placeholder="Jumlah (butir)"
            value={form.jumlah}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="number"
            name="harga"
            placeholder="Harga Satuan (Rp)"
            value={form.harga}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="text"
            name="pembeli"
            placeholder="Nama Pembeli"
            value={form.pembeli}
            onChange={handleChange}
            className="input"
            required
          />
          <textarea
            name="catatan"
            placeholder="Catatan (opsional)"
            value={form.catatan}
            onChange={handleChange}
            className="input col-span-1 sm:col-span-2"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          <FaPlus />
          {editId ? 'Simpan Perubahan' : 'Tambah Penjualan'}
        </button>
      </form>

      {/* Tabel Penjualan */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-green-600 text-white text-left text-sm">
              <th className="p-3">Tanggal</th>
              <th className="p-3">Jumlah</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Total</th>
              <th className="p-3">Pembeli</th>
              <th className="p-3">Catatan</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 text-sm text-gray-700"
              >
                <td className="p-3">{format(new Date(item.tanggal), 'dd MMM yyyy', { locale: id })}</td>
                <td className="p-3">{item.jumlah} butir</td>
                <td className="p-3">Rp{parseInt(item.harga).toLocaleString()}</td>
                <td className="p-3 font-semibold text-green-700">
                  Rp{(item.jumlah * item.harga).toLocaleString()}
                </td>
                <td className="p-3">{item.pembeli}</td>
                <td className="p-3">{item.catatan || '-'}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:underline text-sm flex items-center gap-1"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-400">
                  Tidak ada data penjualan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
