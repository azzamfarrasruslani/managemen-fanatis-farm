"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatistikGrid from "@/components/dashboard/StatistikGrid";
import ChartProduksiTelur from "@/components/dashboard/ChartProduksiTelur";
import ChartPenghasilan from "@/components/dashboard/ChartPenghasilan";

export default function DashboardPage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email);
      }
    };

    getUser();
  }, []);

  return (
    <div className="space-y-8">
      <DashboardHeader email={email} />
      <StatistikGrid />
      <ChartProduksiTelur />
      <ChartPenghasilan />
    </div>
  );
}
