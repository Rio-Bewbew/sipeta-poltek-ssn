"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

function FeatureCard({
  icon,
  title,
  desc,
  href,
}: {
  icon: string;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link href={href} className="block h-full">
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="h-full glass-panel rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-emas/50 transition-all duration-300 group relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emas/5 to-transparent rounded-bl-full pointer-events-none"></div>
        <motion.div 
          className="w-14 h-14 rounded-xl bg-marun/10 flex items-center justify-center mb-5 group-hover:bg-marun group-hover:text-white transition-colors duration-300 text-2xl shadow-inner"
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <h3 className="font-serif font-bold text-xl text-marun-dark mb-3 group-hover:text-marun transition-colors">
          {title}
        </h3>
        <p className="text-sm text-teks/70 leading-relaxed group-hover:text-teks/90 transition-colors">{desc}</p>
      </motion.div>
    </Link>
  );
}

function ProgressIndicator({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-teks/80">{label}</span>
        <motion.span 
          className="font-bold" 
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {value}%
        </motion.span>
      </div>
      <div className="h-3 bg-black/5 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r"
          style={{ 
            backgroundImage: `linear-gradient(to right, ${color}80, ${color})` 
          }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
};

export default function Beranda() {
  const [materiProgress, setMateriProgress] = useState(0);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Read progress from localStorage
    try {
      const completed = JSON.parse(
        localStorage.getItem("sipeta-materi-completed") || "[]"
      );
      setMateriProgress(Math.round((completed.length / 5) * 100));

      const score = localStorage.getItem("sipeta-quiz-score");
      if (score) setQuizScore(parseInt(score));
    } catch {
      // ignore
    }
  }, []);

  if (!isMounted) return null;

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-marun-dark via-marun to-navy animate-gradient-x overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-emas/10 rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-20%] left-[-10%] w-[35rem] h-[35rem] bg-white/10 rounded-full blur-[80px]" 
          />
          <motion.div 
            animate={{ 
              rotate: [0, 90, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-emas/5 rounded-full blur-[120px]" 
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emas opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emas"></span>
              </span>
              <span className="text-sm text-white/90 font-medium tracking-wide">
                Perdir Poltek SSN No. 2 Tahun 2024
              </span>
            </motion.div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
              Belajar Membina <br/>
              <motion.span 
                className="text-emas inline-block relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Tanpa Kekerasan
                <motion.div 
                  className="absolute -bottom-2 left-0 h-1 bg-emas rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                />
              </motion.span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed max-w-2xl font-light"
            >
              Platform edukasi interaktif bagi Taruna Poltek SSN untuk
              memahami &amp; menerapkan metode pembinaan yang{" "}
              <strong className="text-white font-semibold">positif</strong>,{" "}
              <strong className="text-white font-semibold">mendidik</strong>, dan{" "}
              <strong className="text-white font-semibold">sesuai peraturan</strong>.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <Link href="/materi">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(224, 168, 46, 0.4), 0 10px 10px -5px rgba(224, 168, 46, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emas to-emas-light text-marun-dark font-bold text-lg rounded-2xl transition-all shadow-lg shadow-emas/30"
                >
                  <span className="text-2xl">📚</span> Mulai Belajar
                </motion.button>
              </Link>
              <Link href="/kuis">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-bold text-lg rounded-2xl border border-white/20 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                >
                  <span className="text-2xl">✏️</span> Kerjakan Kuis
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full h-auto">
            <path d="M0 100V40C240 -10 480 -10 720 20C960 50 1200 50 1440 20V100H0Z" fill="#FBF8F3" />
          </svg>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-marun-dark mb-4">
            Fitur Pembelajaran
          </h2>
          <div className="w-24 h-1 bg-emas mx-auto rounded-full mb-6"></div>
          <p className="text-teks/60 max-w-xl mx-auto text-lg">
            Empat pilar pembelajaran interaktif untuk memahami aturan
            pembinaan di lingkungan Poltek SSN
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <motion.div variants={itemVariants}>
            <FeatureCard
              icon="📖"
              title="Materi Pembinaan"
              desc="5 modul lengkap berdasarkan Perdir No. 2/2024 dengan kutipan pasal dan contoh praktik."
              href="/materi"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FeatureCard
              icon="🔍"
              title="Studi Kasus"
              desc="4 skenario nyata untuk menguji pemahaman Anda dalam situasi pembinaan."
              href="/studi-kasus"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FeatureCard
              icon="📝"
              title="Kuis Pemahaman"
              desc="10 soal pilihan ganda dengan umpan balik instan dan rujukan pasal."
              href="/kuis"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FeatureCard
              icon="💬"
              title="Forum Diskusi"
              desc="Tanya jawab dengan pengasuh dan sesama taruna tentang pembinaan."
              href="/forum"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Mengapa SIPETA */}
      <section className="bg-white border-y border-black/5 relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-krem rounded-full blur-[80px] opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emas/5 rounded-full blur-[100px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-marun-dark mb-4">
              Mengapa SIPETA?
            </h2>
            <div className="w-24 h-1 bg-emas mx-auto rounded-full mb-6"></div>
            <p className="text-teks/60 max-w-xl mx-auto text-lg">
              Tiga akar masalah yang mendorong lahirnya platform ini
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {[
              {
                num: "01",
                title: "Pemahaman Aturan Belum Optimal",
                desc: "Banyak taruna belum memahami secara mendalam isi Perdir No. 2/2024, sehingga tindakan pembinaan kerap dilakukan tanpa landasan peraturan yang benar.",
                icon: "📋",
              },
              {
                num: "02",
                title: "Budaya Senioritas & Tradisi Menyimpang",
                desc: "Tradisi turun-temurun seperti hukuman fisik berkedok pembinaan masih terjadi, padahal jelas dilarang oleh peraturan yang berlaku.",
                icon: "⚠️",
              },
              {
                num: "03",
                title: "Pengawasan & Kepatuhan Prosedur Lemah",
                desc: "Tindakan di luar prosedur — seperti kegiatan di luar jam yang ditentukan — masih sering terjadi tanpa pelaporan yang memadai.",
                icon: "🔒",
              },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="relative glass-panel rounded-2xl p-8 shadow-sm group hover:shadow-xl hover:border-emas/30 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-tl from-marun/5 to-transparent rounded-full pointer-events-none"></div>
                <motion.span 
                  className="absolute top-4 right-6 text-6xl font-serif font-black text-marun/5 group-hover:text-emas/10 transition-colors duration-300 pointer-events-none select-none"
                >
                  {item.num}
                </motion.span>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-black/5 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-serif font-bold text-xl text-marun-dark mb-4 group-hover:text-marun transition-colors">
                  {item.title}
                </h3>
                <p className="text-teks/70 leading-relaxed text-[15px]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Progress */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring" }}
          className="max-w-2xl mx-auto glass-panel rounded-3xl p-10 shadow-xl relative overflow-hidden"
        >
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emas/10 rounded-bl-full pointer-events-none"></div>
          
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-marun-dark mb-8 text-center flex items-center justify-center gap-3">
            <motion.span 
              animate={{ rotate: [0, 15, -10, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-3xl"
            >
              📊
            </motion.span> 
            Progres Belajar Anda
          </h2>

          <div className="space-y-8 relative z-10">
            <ProgressIndicator
              label="Materi Selesai"
              value={materiProgress}
              color="#5C0A1E"
            />
            <ProgressIndicator
              label="Skor Kuis Terakhir"
              value={quizScore ?? 0}
              color={
                quizScore !== null
                  ? quizScore >= 80
                    ? "#2E7D32"
                    : quizScore >= 60
                    ? "#E0A82E"
                    : "#C62828"
                  : "#1B2A4A"
              }
            />
          </div>

          {materiProgress === 0 && quizScore === null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-10 p-6 bg-marun/5 rounded-2xl border border-marun/10"
            >
              <p className="text-marun-dark font-medium">
                Belum ada progres. Mulai belajar sekarang! 🚀
              </p>
              <Link href="/materi">
                <button className="mt-4 px-6 py-2 bg-marun text-white text-sm font-medium rounded-lg hover:bg-marun-dark transition-colors">
                  Buka Materi Pertama
                </button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </section>
    </div>
  );
}

