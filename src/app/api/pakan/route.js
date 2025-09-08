import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase.from("pakan").select("*").order("id", { ascending: true });
    if (error) throw error;
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("GET pakan error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.nama || !body.jenis) {
      return new Response(JSON.stringify({ error: "Nama dan jenis harus diisi" }), { status: 400 });
    }

    const { data, error } = await supabase.from("pakan").insert([body]).select();
    if (error) throw error;

    return new Response(JSON.stringify({ message: "Berhasil tambah pakan", data }), { status: 201 });
  } catch (err) {
    console.error("POST pakan error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;

    if (!id) return new Response(JSON.stringify({ error: "ID harus diberikan" }), { status: 400 });

    const { data, error } = await supabase.from("pakan").update(rest).eq("id", id).select();
    if (error) throw error;

    return new Response(JSON.stringify({ message: "Berhasil update pakan", data }), { status: 200 });
  } catch (err) {
    console.error("PUT pakan error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) return new Response(JSON.stringify({ error: "ID harus diberikan" }), { status: 400 });

    const { data, error } = await supabase.from("pakan").delete().eq("id", id).select();
    if (error) throw error;

    return new Response(JSON.stringify({ message: "Berhasil hapus pakan", data }), { status: 200 });
  } catch (err) {
    console.error("DELETE pakan error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
