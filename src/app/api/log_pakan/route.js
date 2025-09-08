// app/api/log_pakan/route.js
import { supabase } from "@/lib/supabaseClient";

export async function POST(req) {
  try {
    const body = await req.json();

    // body sekarang harus berisi: { kandang_id, pakan_id, jumlah, harga_total, tanggal_penggunaan }
    const { kandang_id, pakan_id, jumlah, harga_total, tanggal_penggunaan } = body;

    if (!kandang_id || !pakan_id || !jumlah || !harga_total || !tanggal_penggunaan) {
      return new Response(JSON.stringify({ error: "Data tidak lengkap" }), { status: 400 });
    }

    const { data, error } = await supabase
      .from("log_pakan")
      .insert([
        {
          kandang_id,
          pakan_id,
          jumlah,
          harga_total,
          tanggal_penggunaan,
        },
      ]);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    console.error("POST /api/log_pakan error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

// Tambahkan GET untuk ambil semua log pakan
export async function GET(req) {
  try {
    const { data, error } = await supabase
      .from("log_pakan")
      .select(`
        id,
        kandang_id,
        pakan_id,
        jumlah,
        harga_total,
        tanggal_penggunaan,
        kandang: kandang_id (nama_kandang),
        pakan: pakan_id (nama, satuan)
      `)
      .order("tanggal_penggunaan", { ascending: false });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("GET /api/log_pakan error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
