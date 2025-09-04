"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Pisahkan path berdasarkan "/"
  const segments = pathname.split("/").filter((segment) => segment);

  // Build breadcrumb list
  const breadcrumbList = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;
    const label = segment
      .replace(/-/g, " ") // Ganti "-" dengan spasi
      .replace(/\b\w/g, (l) => l.toUpperCase()); // Kapitalisasi kata

    return {
      href,
      label,
      isLast,
    };
  });

  return (
    <nav className="text-sm text-gray-600 mb-4 flex items-center space-x-2">
      <Link href="/dashboard" className="flex items-center gap-1 hover:underline text-green-600">
        <FaHome className="text-xs" />
        <span>Dashboard</span>
      </Link>
      {breadcrumbList.map((crumb, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-gray-400">/</span>
          {crumb.isLast ? (
            <span className="font-medium text-green-700">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:underline text-green-600">
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
