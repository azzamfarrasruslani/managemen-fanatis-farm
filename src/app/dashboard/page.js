'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatistikGrid from "@/components/dashboard/StatistikGrid";

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const [dataTelur, setDataTelur] = useState([]); // simpan data telur

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setEmail(user.email);
    };

    const getDataTelur = async () => {
      const { data, error } = await supabase.from("telur").select("*");
      if (error) console.error(error);
      else setDataTelur(data);
    };

    getUser();
    getDataTelur();
  }, []);

  return (
    <div className="space-y-8">
      <DashboardHeader email={email} />
      <StatistikGrid dataTelur={dataTelur} />
      {/* ChartProduksiTelur dan ChartPenghasilan bisa tetap pakai dataTelur juga */}
    </div>
  );
}
