"use client";

import Link from "next/link";
import { materiModules } from "@/data/materi";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

const iconMap: Record<string, string> = {
  Shield: "🛡️",
  Users: "👥",
  Heart: "❤️",
  BookOpen: "📖",
  ClipboardList: "📋",
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
};

export default function MateriPage() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = JSON.parse(
        localStorage.getItem("sipeta-materi-completed") || "[]"
      );
      setCompleted(stored);
    } catch {
      // ignore
    }
  }, []);

  const progressPercent = Math.round((completed.length / materiModules.length) * 100);

  if (!isMounted) return null;

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emas/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-gold"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-marun/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-float"></div>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-marun-dark mb-3">
          Materi Pembinaan
        </h1>
        <p className="text-teks/60 max-w-2xl mx-auto mb-6">
          5 modul pembelajaran berdasarkan Peraturan Direktur Poltek SSN
          No. 2 Tahun 2024 tentang Kehidupan Taruna
        </p>

        {/* Progress bar */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-teks/60">Progres Belajar</span>
            <span className="font-bold text-marun">
              {completed.length}/{materiModules.length} modul
            </span>
          </div>
          <div className="h-3 bg-black/5 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-marun to-emas rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Module cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {materiModules.map((modul, i) => {
          const isCompleted = completed.includes(modul.id);
          return (
            <motion.div variants={itemVariants} key={modul.id}>
              <Link
                href={`/materi/${modul.id}`}
                className={`group block h-full relative glass-panel rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-xl overflow-hidden ${
                  isCompleted
                    ? "border-sukses/30 hover:border-sukses/50"
                    : "hover:border-emas/50"
                }`}
              >
                {/* Decoration blob */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-bl from-emas/10 to-transparent rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                {/* Badge INTI for module 3 */}
                {modul.nomor === 3 && (
                  <span className="absolute top-4 right-4 bg-bahaya text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Modul Inti
                  </span>
                )}

                {/* Completed badge */}
                {isCompleted && (
                  <span className="absolute top-4 right-4 bg-sukses text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    ✓ Selesai
                  </span>
                )}

                <motion.div 
                  whileHover={{ rotate: [-5, 5, -5, 0] }}
                  transition={{ duration: 0.4 }}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors text-2xl shadow-inner ${
                    isCompleted ? "bg-sukses/10 text-sukses" : "bg-marun/10 group-hover:bg-marun group-hover:text-white"
                  }`}
                >
                  {iconMap[modul.icon] || "📄"}
                </motion.div>

                <span className="text-xs font-medium text-emas uppercase tracking-wider">
                  Modul {modul.nomor}
                </span>
                <h3 className="font-serif font-bold text-xl text-marun-dark mt-1 mb-3 group-hover:text-marun transition-colors">
                  {modul.judul}
                </h3>
                <p className="text-sm text-teks/60 leading-relaxed line-clamp-3">
                  {modul.ringkasan}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-medium transition-colors group-hover:text-emas">
                  <span className={isCompleted ? "text-sukses" : "text-marun"}>
                    {isCompleted ? "Pelajari Ulang" : "Pelajari"}
                  </span>
                  <motion.svg
                    className={`w-4 h-4 ${isCompleted ? "text-sukses" : "text-marun"} group-hover:text-emas`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    whileHover={{ x: 5 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </motion.svg>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
