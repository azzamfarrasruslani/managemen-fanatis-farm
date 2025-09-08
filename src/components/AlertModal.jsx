'use client';

import { useEffect } from "react";

export default function AlertModal({ open, onClose, type = "success", message = "" }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => onClose && onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  const typeStyles = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className={`border-l-4 rounded-md p-4 w-full max-w-sm shadow-lg ${typeStyles[type]}`}>
        <div className="flex items-start gap-3">
          <span className="font-bold">{type === "success" ? "Sukses" : type === "error" ? "Error" : type === "info" ? "Info" : "Peringatan"}</span>
          <p className="text-sm flex-1">{message}</p>
          <button onClick={onClose} className="font-bold px-1 text-xl leading-none hover:text-gray-900">×</button>
        </div>
      </div>
    </div>
  );
}
