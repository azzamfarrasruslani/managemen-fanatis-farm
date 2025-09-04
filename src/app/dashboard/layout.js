'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/"); // redirect ke root kalau belum login
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) router.push("/"); // logout otomatis
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [router]);

  if (loading) return null; // sembunyikan halaman sampai sesi valid
  if (!user) return null;

  return (
    <div className="flex bg-gray-50">
      {/* Sidebar fixed */}
      <Sidebar />

      {/* Konten utama */}
      <div className="flex flex-col w-full md:ml-64 min-h-screen">
        <Navbar />

        <main className="flex-1 pt-5 px-6 pb-8">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}
