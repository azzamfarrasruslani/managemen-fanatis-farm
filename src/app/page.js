"use client";

import Image from "next/image";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard"); // redirect ke dashboard
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-white">
      <div className="w-full h-full flex flex-col md:flex-row">
        {/* Kiri - Gambar */}
        <div className="w-full md:w-1/2 relative h-64 md:h-screen">
          <Image
            src="/images/login-illustration.png"
            alt="Ilustrasi Fanatis Farm"
            fill
            className="object-cover"
          />
        </div>

        {/* Kanan - Form */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-white p-6 sm:p-12">
          <div className="w-full max-w-md">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-green-700 mb-2">
                Selamat Datang 👋
              </h1>
              <p className="text-gray-600 text-sm">
                Masuk ke dashboard <strong>Fanatis Farm</strong> untuk mengelola
                data ternak.
              </p>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Tombol Google */}
            <div className="mb-4">
              <button
                type="button"
                className="w-full border border-gray-300 flex items-center justify-center gap-3 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition"
              >
                <FcGoogle className="text-xl" />
                <span className="text-gray-700 font-medium">
                  Masuk dengan Google
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="mx-4 text-sm text-gray-500">atau</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>

            {/* Form Login */}
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black "
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                    required
                  />
                </div>
              </div>

              {/* Tombol Masuk */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold text-sm sm:text-base transition duration-300"
              >
                Masuk Sekarang
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
