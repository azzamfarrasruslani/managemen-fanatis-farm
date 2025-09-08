import { supabase } from "@/lib/supabaseClient";

export async function POST(req) {
  try {
    const rows = await req.json(); // array dari frontend
    const insertRows = [];

    for (const item of rows) {
      // Ambil data kandang untuk jumlah bebek
      const { data: kandang, error: kandangErr } = await supabase
        .from("kandang")
        .select("jumlah_bebek")
        .eq("id", item.kandang_id)
        .single();

      if (kandangErr || !kandang) {
        throw new Error(`Kandang dengan ID ${item.kandang_id} tidak ditemukan`);
      }

      // Hitung persentase telur
      const persentase_telur = (
        (Number(item.jumlah) / kandang.jumlah_bebek) *
        100
      ).toFixed(2);

      insertRows.push({
        tanggal: item.tanggal,
        jumlah: Number(item.jumlah),
        persentase_telur: Number(persentase_telur),
        keterangan: item.keterangan,
        kandang_id: Number(item.kandang_id),
      });
    }

    // Insert ke tabel telur
    const { data, error } = await supabase
      .from("telur")
      .insert(insertRows)
      .select();

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "Berhasil menambah data telur", data }),
      { status: 201 }
    );
  } catch (err) {
    console.error("POST telur error:", err);
    return new Response(JSON.stringify({ error: err.message || err }), {
      status: 400,
    });
  }
}

export async function PATCH(req) {
  try {
    const { id, jumlah, persentase_telur, keterangan, tanggal, kandang_id } =
      await req.json();

    if (!id)
      return new Response(JSON.stringify({ error: "ID telur wajib" }), {
        status: 400,
      });

    const { data, error } = await supabase
      .from("telur")
      .update({ jumlah, persentase_telur, keterangan, tanggal, kandang_id })
      .eq("id", id)
      .select();

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "Berhasil update data telur", data }),
      { status: 200 }
    );
  } catch (err) {
    console.error("PATCH telur error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
    });
  }
}

export async function GET() {
  try {
    const { searchParams } = new URL(req.url);
    const kandang_id = searchParams.get("kandang_id");

    let query = supabase.from("telur").select("*");

    if (kandang_id) query = query.eq("kandang_id", kandang_id);

    const { data, error } = await query;

    if (error) throw error;

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("GET telur error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
