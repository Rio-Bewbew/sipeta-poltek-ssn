"use client";

import { useParams, useRouter } from "next/navigation";
import { materiModules } from "@/data/materi";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";

export default function MateriDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [completed, setCompleted] = useState<string[]>([]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const modul = materiModules.find((m) => m.id === params.id);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("sipeta-materi-completed") || "[]"
      );
      setCompleted(stored);
    } catch {
      // ignore
    }
  }, []);

  if (!modul) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold text-marun-dark mb-4">
          Modul tidak ditemukan
        </h1>
        <Link href="/materi" className="text-marun hover:text-emas transition-colors">
          ← Kembali ke Materi
        </Link>
      </div>
    );
  }

  const isCompleted = completed.includes(modul.id);

  const handleTandaiSelesai = () => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("sipeta-materi-completed") || "[]"
      );
      if (!stored.includes(modul.id)) {
        stored.push(modul.id);
        localStorage.setItem(
          "sipeta-materi-completed",
          JSON.stringify(stored)
        );
        setCompleted(stored);
      }
    } catch {
      // ignore
    }
  };

  const handleBatalSelesai = () => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("sipeta-materi-completed") || "[]"
      );
      const updated = stored.filter((id: string) => id !== modul.id);
      localStorage.setItem(
        "sipeta-materi-completed",
        JSON.stringify(updated)
      );
      setCompleted(updated);
    } catch {
      // ignore
    }
  };

  // Find prev/next module
  const currentIdx = materiModules.findIndex((m) => m.id === modul.id);
  const prev = currentIdx > 0 ? materiModules[currentIdx - 1] : null;
  const next =
    currentIdx < materiModules.length - 1
      ? materiModules[currentIdx + 1]
      : null;

  return (
    <div className="relative min-h-screen">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-marun to-emas origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Background decorations */}
      <div className="fixed top-0 right-0 w-64 h-64 bg-emas/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-gold"></div>
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-marun/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-float"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-teks/50 mb-8">
        <Link href="/materi" className="hover:text-marun transition-colors">
          Materi
        </Link>
        <span>/</span>
        <span className="text-teks/80">Modul {modul.nomor}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-medium text-emas uppercase tracking-wider">
          Modul {modul.nomor}
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-marun-dark mt-1 mb-4">
          {modul.judul}
        </h1>
        {modul.nomor === 3 && (
          <span className="inline-block bg-bahaya text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            ⭐ Modul Inti
          </span>
        )}
        <p className="text-teks/70 leading-relaxed text-lg">
          {modul.ringkasan}
        </p>
      </div>

      {/* Poin Kunci */}
      <div className="glass-panel rounded-2xl p-8 shadow-sm mb-10">
        <h2 className="font-serif font-bold text-xl text-marun-dark mb-4 flex items-center gap-2">
          📌 Poin Kunci
        </h2>
        <ul className="space-y-3">
          {modul.poinKunci.map((poin, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-marun/10 text-marun flex items-center justify-center text-xs font-bold mt-0.5">
                {i + 1}
              </span>
              <span className="text-teks/80">{poin}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Kutipan Pasal */}
      {modul.kutipanPasal.map((kutipan, i) => (
        <div
          key={i}
          className="relative glass-panel bg-white/40 border-l-4 border-l-emas rounded-r-2xl p-8 mb-10 overflow-hidden shadow-sm"
        >
          <span className="inline-block text-xs font-bold text-emas uppercase tracking-wider mb-2 bg-emas/10 px-2 py-0.5 rounded">
            {kutipan.label}
          </span>
          <blockquote className="text-teks/80 italic leading-relaxed">
            {kutipan.teks}
          </blockquote>
          <div className="absolute top-3 right-4 text-4xl text-emas/10">
            &ldquo;
          </div>
        </div>
      ))}

      {/* Praktik Baik vs Pelanggaran */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Praktik Baik */}
        <div className="glass-panel bg-sukses/5 rounded-2xl p-8 border border-sukses/20 shadow-sm relative overflow-hidden">
          <div className="absolute -right-5 -top-5 w-24 h-24 bg-sukses/10 rounded-full blur-2xl"></div>
          <h3 className="font-serif font-bold text-lg text-sukses mb-4 flex items-center gap-2">
            ✅ Praktik Baik
          </h3>
          <ul className="space-y-3">
            {modul.praktikBaik.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-sukses/90 leading-relaxed"
              >
                <span className="flex-shrink-0 mt-1 text-sukses">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Pelanggaran */}
        <div className="glass-panel bg-bahaya/5 rounded-2xl p-8 border border-bahaya/20 shadow-sm relative overflow-hidden">
          <div className="absolute -right-5 -top-5 w-24 h-24 bg-bahaya/10 rounded-full blur-2xl"></div>
          <h3 className="font-serif font-bold text-lg text-bahaya mb-4 flex items-center gap-2">
            ❌ Pelanggaran
          </h3>
          <ul className="space-y-3">
            {modul.pelanggaran.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-bahaya/90 leading-relaxed"
              >
                <span className="flex-shrink-0 mt-1 text-bahaya">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tandai Selesai */}
      <div className="flex justify-center mb-12">
        {isCompleted ? (
          <button
            onClick={handleBatalSelesai}
            className="inline-flex items-center gap-2 px-8 py-3 bg-sukses text-white font-bold rounded-xl hover:bg-sukses/90 transition-all"
          >
            ✓ Sudah Selesai — Klik untuk Batalkan
          </button>
        ) : (
          <button
            onClick={handleTandaiSelesai}
            className="inline-flex items-center gap-2 px-8 py-3 bg-marun text-white font-bold rounded-xl hover:bg-marun-dark transition-all shadow-lg shadow-marun/20 hover:shadow-xl hover:-translate-y-0.5 animate-pulse-gold"
          >
            ✓ Tandai Selesai
          </button>
        )}
      </div>

      {/* Prev / Next */}
      <div className="flex justify-between items-center pt-6 border-t border-black/5">
        {prev ? (
          <Link
            href={`/materi/${prev.id}`}
            className="flex items-center gap-2 text-sm text-teks/60 hover:text-marun transition-colors group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>
              Modul {prev.nomor}: {prev.judul}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/materi/${next.id}`}
            className="flex items-center gap-2 text-sm text-teks/60 hover:text-marun transition-colors group"
          >
            <span>
              Modul {next.nomor}: {next.judul}
            </span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
    </div>
  );
}
