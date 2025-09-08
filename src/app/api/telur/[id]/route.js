import { supabase } from "@/lib/supabaseClient";

export async function PATCH(req, { params }) {
  try {
    const { id } = params; // id telur
    const body = await req.json();
    const { jumlah, keterangan, tanggal, kandang_id } = body;

    // Validasi data wajib
    if (jumlah === undefined || !tanggal || !kandang_id) {
      return new Response(
        JSON.stringify({ error: "Data tidak lengkap" }),
        { status: 400 }
      );
    }

    // Ambil jumlah bebek dari tabel kandang
    const { data: kandang, error: kandangError } = await supabase
      .from("kandang")
      .select("jumlah_bebek")
      .eq("id", kandang_id)
      .single();

    if (kandangError) throw kandangError;
    if (!kandang) throw new Error("Kandang tidak ditemukan");

    // Hitung persentase telur
    const persentase_telur = (Number(jumlah) / kandang.jumlah_bebek) * 100;

    // Update data telur
    const { error } = await supabase
      .from("telur")
      .update({
        jumlah: Number(jumlah),
        persentase_telur: Number(persentase_telur.toFixed(2)),
        keterangan,
        tanggal,
        kandang_id,
      })
      .eq("id", id);

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "Berhasil update data telur" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("PATCH telur error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Terjadi kesalahan" }),
      { status: 500 }
    );
  }
}
