'use client';

import { FaEdit, FaTrash } from 'react-icons/fa';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-white rounded-xl shadow p-4">
          <ul className="space-y-2">
            <li className="text-sm font-medium text-green-600 bg-green-50 px-4 py-2 rounded-lg">Profil Peternakan</li>
            <li className="text-sm text-gray-600 hover:text-green-600 cursor-pointer px-4 py-2 rounded-lg hover:bg-green-50">Peternakan</li>
            <li className="text-sm text-gray-600 hover:text-green-600 cursor-pointer px-4 py-2 rounded-lg hover:bg-green-50">Produksi</li>
            <li className="text-sm text-gray-600 hover:text-green-600 cursor-pointer px-4 py-2 rounded-lg hover:bg-green-50">Keuangan</li>
            <li className="text-sm text-gray-600 hover:text-green-600 cursor-pointer px-4 py-2 rounded-lg hover:bg-green-50">Notifikasi</li>
            <li className="text-sm text-gray-600 hover:text-green-600 cursor-pointer px-4 py-2 rounded-lg hover:bg-green-50">Tampilan</li>
            <li className="text-sm text-gray-600 hover:text-green-600 cursor-pointer px-4 py-2 rounded-lg hover:bg-green-50">Backup & Reset</li>
            <li className="text-sm text-red-600 hover:bg-red-50 cursor-pointer px-4 py-2 rounded-lg">Hapus Akun</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4 space-y-6">
          {/* Profile Section */}
          <section className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <img
                  src="https://i.pravatar.cc/100"
                  alt="avatar"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Fanatis Farm</h2>
                  <p className="text-sm text-gray-500">Manajemen Peternakan Bebek</p>
                  <p className="text-sm text-gray-400">Banyumas, Indonesia</p>
                </div>
              </div>
              <button className="text-sm text-green-600 flex items-center gap-1">
                <FaEdit className="text-xs" />
                Edit
              </button>
            </div>
          </section>

          {/* Informasi Akun */}
          <section className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">Informasi Akun</h3>
              <button className="text-sm text-green-600 flex items-center gap-1">
                <FaEdit className="text-xs" />
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="text-gray-400">Nama Pengguna</p>
                <p>Admin Fanatis</p>
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <p>admin@fanatisfarm.com</p>
              </div>
              <div>
                <p className="text-gray-400">Role</p>
                <p>Administrator</p>
              </div>
              <div>
                <p className="text-gray-400">Status</p>
                <p>Aktif</p>
              </div>
            </div>
          </section>

          {/* Alamat Peternakan */}
          <section className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">Alamat Peternakan</h3>
              <button className="text-sm text-green-600 flex items-center gap-1">
                <FaEdit className="text-xs" />
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="text-gray-400">Alamat Lengkap</p>
                <p>Jl. Peternakan No. 21, Banyumas</p>
              </div>
              <div>
                <p className="text-gray-400">Google Maps</p>
                <p>https://maps.link/fanatisfarm</p>
              </div>
              <div>
                <p className="text-gray-400">Jam Operasional</p>
                <p>07.00 - 17.00</p>
              </div>
              <div>
                <p className="text-gray-400">Catatan Umum</p>
                <p>Peternakan modern dengan sistem manajemen digital.</p>
              </div>
            </div>
          </section>

          {/* Produksi Telur */}
          <section className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">Produksi Telur</h3>
              <button className="text-sm text-green-600 flex items-center gap-1">
                <FaEdit className="text-xs" />
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="text-gray-400">Target Harian</p>
                <p>1200 Butir</p>
              </div>
              <div>
                <p className="text-gray-400">Umur Minimum Bertelur</p>
                <p>24 Minggu</p>
              </div>
              <div>
                <p className="text-gray-400">Harga Default</p>
                <p>Rp2.800 / Butir</p>
              </div>
              <div>
                <p className="text-gray-400">Stok Awal Pakan</p>
                <p>100 kg</p>
              </div>
            </div>
          </section>

          {/* Keuangan */}
          <section className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">Keuangan</h3>
              <button className="text-sm text-green-600 flex items-center gap-1">
                <FaEdit className="text-xs" />
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="text-gray-400">Metode Perhitungan</p>
                <p>Bulanan</p>
              </div>
              <div>
                <p className="text-gray-400">Akun Bank</p>
                <p>BCA 12345678</p>
              </div>
              <div>
                <p className="text-gray-400">Format Laporan</p>
                <p>Excel & PDF</p>
              </div>
            </div>
          </section>

          {/* Notifikasi */}
          <section className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">Integrasi Notifikasi</h3>
              <button className="text-sm text-green-600 flex items-center gap-1">
                <FaEdit className="text-xs" />
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="text-gray-400">Telegram Aktif</p>
                <p>Ya</p>
              </div>
              <div>
                <p className="text-gray-400">Token Bot</p>
                <p>***123456:ABC***</p>
              </div>
            </div>
          </section>

          {/* Kustomisasi */}
          <section className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">Kustomisasi Tampilan</h3>
              <button className="text-sm text-green-600 flex items-center gap-1">
                <FaEdit className="text-xs" />
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="text-gray-400">Warna Utama</p>
                <p>#16A34A</p>
              </div>
              <div>
                <p className="text-gray-400">Mode</p>
                <p>Terang</p>
              </div>
            </div>
          </section>

          {/* Reset */}
          <section className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-red-600">Backup & Reset</h3>
              <button className="text-sm text-red-600 flex items-center gap-1">
                <FaTrash className="text-xs" />
                Reset
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Anda dapat mengekspor data atau mereset seluruh sistem. Tindakan ini tidak dapat dibatalkan.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
