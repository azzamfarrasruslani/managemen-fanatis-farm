"use client";

import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaHome,
  FaDove,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

export default function TelurFilterBar({
  search,
  setSearch,
  filterBulan,
  setFilterBulan,
  filterTahun,
  setFilterTahun,
  filterKandang,
  setFilterKandang,
  kandangList,
}) {
  const bulanList = [
    { value: "0", label: "Januari" },
    { value: "1", label: "Februari" },
    { value: "2", label: "Maret" },
    { value: "3", label: "April" },
    { value: "4", label: "Mei" },
    { value: "5", label: "Juni" },
    { value: "6", label: "Juli" },
    { value: "7", label: "Agustus" },
    { value: "8", label: "September" },
    { value: "9", label: "Oktober" },
    { value: "10", label: "November" },
    { value: "11", label: "Desember" },
  ];

  const tahunList = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  const [isBulanOpen, setIsBulanOpen] = useState(false);
  const [isTahunOpen, setIsTahunOpen] = useState(false);
  const [isKandangOpen, setIsKandangOpen] = useState(false);

  const bulanRef = useRef(null);
  const tahunRef = useRef(null);
  const kandangRef = useRef(null);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bulanRef.current && !bulanRef.current.contains(event.target))
        setIsBulanOpen(false);
      if (tahunRef.current && !tahunRef.current.contains(event.target))
        setIsTahunOpen(false);
      if (kandangRef.current && !kandangRef.current.contains(event.target))
        setIsKandangOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderDropdown = (
    isOpen,
    setIsOpen,
    ref,
    items,
    selectedValue,
    onSelect,
    labelKey = "label"
  ) => (
    <div className="relative w-40" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 text-sm bg-green-50 text-green-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 font-medium transition"
      >
        {items.find((i) => i.value.toString() === selectedValue)?.[labelKey] ||
          "Pilih"}
        {isOpen ? (
          <FaChevronUp className="ml-2" />
        ) : (
          <FaChevronDown className="ml-2" />
        )}
      </button>
      {isOpen && (
        <ul className="absolute z-50 w-full bg-white border border-gray-300 text-black rounded-lg mt-1 shadow-md max-h-40 overflow-auto">
          {items.map((item) => (
            <li
              key={item.value}
              onClick={() => {
                onSelect(item.value);
                setIsOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-green-100 flex items-center ${
                selectedValue.toString() === item.value.toString()
                  ? "bg-green-100 font-semibold"
                  : ""
              }`}
            >
              {item[labelKey]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-md border border-gray-200">
      <div className="flex items-center gap-3 flex-wrap">
        <label className="text-sm font-semibold text-gray-800">Bulan:</label>
        {renderDropdown(
          isBulanOpen,
          setIsBulanOpen,
          bulanRef,
          bulanList,
          filterBulan,
          setFilterBulan
        )}

        <label className="text-sm font-semibold text-gray-800">Tahun:</label>
        {renderDropdown(
          isTahunOpen,
          setIsTahunOpen,
          tahunRef,
          tahunList.map((t) => ({ value: t, label: t })),
          filterTahun,
          setFilterTahun
        )}

        <label className="text-sm font-semibold text-gray-800">Kandang:</label>
        {renderDropdown(
          isKandangOpen,
          setIsKandangOpen,
          kandangRef,
          [
            { value: "all", label: "Semua Kandang" },
            ...kandangList.map((k) => ({ value: k.id, label: k.nama_kandang })),
          ],
          filterKandang,
          setFilterKandang
        )}
      </div>

      <div className="relative w-full md:w-80">
        <input
          type="text"
          placeholder="Cari tanggal / kualitas / kandang..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 text-sm text-gray-800 bg-gray-50 placeholder:text-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute top-3 left-3 text-gray-400 text-sm" />
      </div>
    </div>
  );
}
