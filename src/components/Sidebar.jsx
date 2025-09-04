"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  FaBars,
  FaEgg,
  FaLeaf,
  FaHome,
  FaChartLine,
  FaUsersCog,
  FaDrumstickBite,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", icon: <FaHome />, href: "/dashboard" },
  { name: "Manajemen Telur", icon: <FaEgg />, href: "/dashboard/telur" },
  { name: "Manajemen Pakan", icon: <FaLeaf />, href: "/dashboard/pakan" },
  { name: "Data Bebek", icon: <FaDrumstickBite />, href: "/dashboard/bebek" },
  { name: "Laporan", icon: <FaChartLine />, href: "/dashboard/laporan" },
  { name: "Pengaturan", icon: <FaUsersCog />, href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-md shadow"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-screen w-64 bg-white text-gray-800 border-r border-gray-200 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <div className="h-full flex flex-col justify-between p-6">
          {/* Logo */}
          <div>
            <div className="mb-10 flex justify-center">
              <img
                src="/images/logofanatis.png"
                alt="Logo Fanatis Farm"
                className="h-20 object-contain"
              />
            </div>

            {/* Menu */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-green-100 text-green-700 font-semibold shadow-sm"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className={`text-base ${isActive ? "text-green-600" : "text-gray-500"}`}>
                      {item.icon}
                    </span>
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Admin Info & Logout */}
          <div className="mt-8 border-t border-gray-200 pt-4">
            <div className="mb-4 text-center">
              <p className="font-semibold text-gray-700">Admin Fanatis</p>
              <p className="text-xs text-green-600">Online</p>
            </div>

            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition font-medium text-sm"
              onClick={() => alert("Fitur logout belum diimplementasi")}
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
