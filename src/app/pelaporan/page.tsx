"use client";

import { motion } from "framer-motion";

export default function PelaporanAnonim() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-emas/20 rounded-2xl mx-auto flex items-center justify-center border border-emas/30 shadow-[0_0_30px_rgba(234,179,8,0.2)]"
          >
            <svg className="w-10 h-10 text-emas" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
            Pelaporan <span className="text-emas">Anonim</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Sistem Pelaporan Pelanggaran Khusus Taruna. Identitas Anda dijamin 100% aman, rahasia, dan tidak dapat dilacak.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel-dark p-6 rounded-2xl border border-white/10 hover:border-emas/30 transition-colors">
            <svg className="w-8 h-8 text-emas mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
            <h3 className="text-lg font-semibold text-white mb-2">Tanpa Jejak</h3>
            <p className="text-sm text-white/60">Sistem ini tidak merekam akun, email, maupun perangkat Anda saat melapor.</p>
          </div>
          <div className="glass-panel-dark p-6 rounded-2xl border border-white/10 hover:border-emas/30 transition-colors">
            <svg className="w-8 h-8 text-emas mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h3 className="text-lg font-semibold text-white mb-2">Tindak Lanjut</h3>
            <p className="text-sm text-white/60">Setiap laporan yang masuk akan diverifikasi secara ketat oleh tim khusus Satuan Pengasuhan.</p>
          </div>
          <div className="glass-panel-dark p-6 rounded-2xl border border-white/10 hover:border-emas/30 transition-colors">
            <svg className="w-8 h-8 text-emas mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <h3 className="text-lg font-semibold text-white mb-2">Kronologi Jelas</h3>
            <p className="text-sm text-white/60">Pastikan Anda menyertakan waktu, lokasi, dan deskripsi kejadian selengkap mungkin.</p>
          </div>
        </div>

        {/* Iframe Section */}
        <div className="glass-panel-dark rounded-3xl border border-white/10 p-2 overflow-hidden shadow-2xl relative min-h-[800px]">
          {/* Loading Indicator for Iframe */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-emas/30 border-t-emas rounded-full animate-spin"></div>
              <p className="text-white/60 font-medium">Memuat formulir rahasia...</p>
            </div>
          </div>
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSfj1fLy01Z45M0v7zOwmxB-CHx1CuXi_gBD9qYrc5SDf2XGeg/viewform?embedded=true" 
            width="100%" 
            height="1000" 
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0}
            className="bg-white/5 rounded-2xl w-full backdrop-blur-xl"
          >
            Memuat formulir pelaporan...
          </iframe>
        </div>
      </motion.div>
    </div>
  );
}
