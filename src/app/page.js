"use client";

import Image from "next/image";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center">
      {/* Background Gambar Paling Belakang */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/login-bg.png" // ganti dengan path gambar kamu
          alt="Background Login"
          fill
          className="object-cover"
        />
        {/* Overlay hitam semi-transparan */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Container Form */}
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row z-10">
        {/* Kiri - Ilustrasi */}
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <Image
            src="/images/login-illustration.png"
            alt="Ilustrasi Fanatis Farm"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-green-700">
              Selamat Datang di Fanatis Farm!
            </h2>
            <p className="text-gray-700 text-sm mt-1">
              Kelola ternak, pantau produksi telur, dan optimalkan peternakan Anda
              dengan mudah.
            </p>
          </div>
        </div>

        {/* Kanan - Form */}
        <div className="md:w-1/2 p-8 sm:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-green-700 mb-2">
              Masuk ke Dashboard
            </h1>
            <p className="text-gray-600 mb-6">
              Masukkan email dan kata sandi Anda untuk mengakses fitur manajemen
              ternak.
            </p>

            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 shadow-sm">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleLogin}>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-green-500">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-black shadow-sm transition"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kata Sandi
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-green-500">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-black shadow-sm transition"
                    required
                  />
                </div>
              </div>

              {/* Tombol Masuk */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold text-sm sm:text-base shadow-md transition duration-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Sedang Masuk..." : "Masuk Sekarang"}
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-500 text-center">
              Belum punya akun?{" "}
              <span className="text-green-600 font-medium hover:underline cursor-pointer">
                Hubungi Admin
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
