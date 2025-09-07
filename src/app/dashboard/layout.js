"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

// Komponen
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // tambahan untuk loader awal

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/");
      } else {
        setUser(session.user);
      }

      setLoading(false); // set selesai loading
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) router.push("/");
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [router]);

  // Loader UI saat auth dicek
  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="w-8 h-8 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Toast Notifikasi Global */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Sidebar Kiri */}
      <Sidebar />

      {/* Konten Utama */}
      <div className="flex flex-col w-full md:ml-64">
       

        {/* Navbar */}
        <Navbar />

        {/* Konten */}
        <main className="flex-1 pt-5 px-6 pb-8">
          <Breadcrumbs />
          {children}

          {/* Footer */}
          <footer className="text-xs text-gray-400 text-center mt-12">
            &copy; {new Date().getFullYear()} Fanatis Farm. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
}
