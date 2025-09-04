'use client';

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  FaBars,
  FaEgg,
  FaLeaf,
  FaHome,
  FaChartLine,
  FaUsersCog,
  FaSignOutAlt,
  FaTimes,
  FaWarehouse,
  FaUserFriends,
  FaMoneyBillWave,
} from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";

const menuItems = [
  { name: "Dashboard", icon: <FaHome />, href: "/dashboard" },
  { name: "Manajemen Telur", icon: <FaEgg />, href: "/dashboard/telur" },
  { name: "Manajemen Pakan", icon: <FaLeaf />, href: "/dashboard/pakan" },
  { name: "Manajemen Kandang", icon: <FaWarehouse />, href: "/dashboard/kandang" },
  { name: "Data Pelanggan", icon: <FaUserFriends />, href: "/dashboard/pelanggan" },
  { name: "Transaksi", icon: <FaMoneyBillWave />, href: "/dashboard/transaksi" },
  { name: "Laporan & Statistik", icon: <FaChartLine />, href: "/dashboard/laporan" },
  { name: "Pengaturan Sistem", icon: <FaUsersCog />, href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Gagal logout: " + error.message);
    } else {
      router.push("/"); // Redirect ke root setelah logout
    }
  };

  return (
    <>
      {/* Tombol toggle mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-md shadow"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col justify-between h-full p-6">
          {/* Atas - Logo dan menu */}
          <div>
            <div className="flex justify-center mb-10">
              <img src="/images/logofanatis.png" alt="Logo Fanatis" className="h-20 object-contain" />
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-green-100 text-green-700 font-semibold shadow-sm"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bawah - Admin dan Logout */}
          <div className="pt-6 border-t border-gray-200">
            <div className="text-center mb-4">
              <div className="bg-green-100 text-green-600 p-3 rounded-full inline-block mb-2">
                <FaUsersCog className="text-xl" />
              </div>
              <p className="font-semibold text-gray-800 text-sm">Admin Fanatis</p>
              <div className="text-xs text-green-600 mt-1 flex items-center justify-center gap-1">
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                Online
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition font-semibold text-sm shadow-sm"
            >
              <FaSignOutAlt className="text-base" />
              Keluar
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
