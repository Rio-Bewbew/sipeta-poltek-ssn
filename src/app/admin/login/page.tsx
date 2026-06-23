"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded simple password for prototype
    if (password === "admin123") {
      localStorage.setItem("sipeta-admin-auth", "true");
      router.push("/admin");
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0B1120]">
      {/* Background decorations */}
      <div className="absolute top-[-20%] right-[-10%] w-[40rem] h-[40rem] bg-emas/5 rounded-full blur-[100px] pointer-events-none animate-pulse-gold"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[35rem] h-[35rem] bg-marun/10 rounded-full blur-[120px] pointer-events-none animate-float"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-emas/20 flex items-center justify-center border border-emas/30 shadow-inner mb-4">
              <span className="text-emas font-bold text-3xl">S</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-white mb-1">Admin SIPETA</h1>
            <p className="text-white/40 text-sm">Masuk untuk mengelola sistem</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Kata Sandi
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all text-sm bg-white/5 text-white placeholder:text-white/20
                  ${error ? "border-bahaya focus:border-bahaya focus:ring-1 focus:ring-bahaya" : "border-white/10 focus:border-emas focus:ring-1 focus:ring-emas"}
                `}
                required
              />
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-bahaya text-xs mt-2"
                >
                  Kata sandi salah. (Petunjuk: admin123)
                </motion.p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emas to-emas-light text-marun-dark font-bold rounded-xl shadow-lg shadow-emas/20 hover:shadow-emas/40 transition-all"
            >
              Masuk
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-white/40 hover:text-white transition-colors">
              &larr; Kembali ke Beranda Utama
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
