"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [npm, setNpm] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ npm, name, password }),
      });

      if (res.ok) {
        // Otomatis arahkan ke halaman login
        router.push("/login?registered=true");
      } else {
        const data = await res.json();
        setError(data.error || "Gagal mendaftar");
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-marun/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-emas/5 rounded-full blur-[150px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emas/20 rounded-2xl mx-auto flex items-center justify-center border border-emas/30 mb-4 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
              <span className="text-emas font-bold text-2xl">+</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-white mb-2">Daftar Akun Baru</h1>
            <p className="text-white/60 text-sm">Bergabung dan lacak progres belajar Anda</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">NPM</label>
              <input 
                type="text" 
                value={npm}
                onChange={(e) => setNpm(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-emas focus:ring-1 focus:ring-emas focus:outline-none transition-all"
                placeholder="Contoh: 2110001"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-emas focus:ring-1 focus:ring-emas focus:outline-none transition-all"
                placeholder="Nama Anda"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Kata Sandi</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-emas focus:ring-1 focus:ring-emas focus:outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 bg-bahaya/10 border border-bahaya/20 text-bahaya rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-white hover:bg-white/90 text-navy font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 mt-4"
            >
              {loading ? "Memproses..." : "Daftar Sekarang"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/50">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-emas hover:underline font-bold">
              Masuk di sini
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
