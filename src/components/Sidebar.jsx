"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaEgg,
  FaHome,
  FaChartLine,
  FaUsersCog,
  FaSignOutAlt,
  FaTimes,
  FaWarehouse,
  FaUserFriends,
  FaMoneyBillWave,
  FaListAlt,
} from "react-icons/fa";
import { LuWheat } from "react-icons/lu";
import { supabase } from "@/lib/supabaseClient";

const menuGroups = [
  {
    title: "Menu Utama",
    items: [{ name: "Dashboard", icon: <FaHome />, href: "/dashboard" }],
  },
  {
    title: "Produksi & Peternakan",
    items: [
      { name: "Manajemen Telur", icon: <FaEgg />, href: "/dashboard/telur" },
      {
        name: "Manajemen Kandang",
        icon: <FaWarehouse />,
        href: "/dashboard/kandang",
      },
      { name: "Pakan & Obat", icon: <LuWheat />, href: "/dashboard/pakan" },
    ],
  },
  {
    title: "Operasional & Keuangan",
    items: [
      {
        name: "Penjualan Telur",
        icon: <FaMoneyBillWave />,
        href: "/dashboard/penjualan",
      },
      {
        name: "Data Pelanggan",
        icon: <FaUserFriends />,
        href: "/dashboard/pelanggan",
      },
      {
        name: "Laporan Produksi",
        icon: <FaListAlt />,
        href: "/dashboard/laporan",
      },
      {
        name: "Laporan Keuangan",
        icon: <FaChartLine />,
        href: "/dashboard/keuangan",
      },
    ],
  },
  {
    title: "Sistem",
    items: [
      {
        name: "Pengaturan Sistem",
        icon: <FaUsersCog />,
        href: "/dashboard/settings",
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Tombol Toggle Sidebar (Mobile) */}
      <button
        ref={toggleButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-md shadow"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col justify-between h-full p-5 overflow-y-auto">
          {/* Logo */}
          <div className="mb-10 text-center">
            <img
              src="/images/logofanatis.png"
              alt="Fanatis Logo"
              className="h-17 mx-auto object-contain"
            />
          </div>

          {/* Navigasi */}
          <nav className="flex-1 space-y-6">
            {menuGroups.map((group, index) => (
              <div key={index}>
                {/* Judul Grup Menu - Ditingkatkan UI-nya */}
                <div className="flex items-center gap-2 text-green-700 font-semibold text-[13px] uppercase tracking-wide px-2 mb-2">
                  <span className="w-1 h-4 bg-green-600 rounded-sm"></span>
                  {group.title}
                </div>

                {/* List Menu */}
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                            isActive
                              ? "bg-green-100 text-green-700 font-semibold"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <span className="text-base">{item.icon}</span>
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Tombol Keluar */}
          <div className="pt-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition font-semibold text-sm"
            >
              <FaSignOutAlt />
              Keluar
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
