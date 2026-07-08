"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PelaporanAnonim() {
  const [formData, setFormData] = useState({
    subject: "",
    location: "",
    dateOccurred: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/pelaporan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Gagal mengirim laporan");
      }

      setIsSuccess(true);
      setFormData({ subject: "", location: "", dateOccurred: "", description: "" });
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

        {/* Form Section */}
        <div className="glass-panel-dark rounded-3xl border border-white/10 p-8 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-12 text-center space-y-6"
              >
                <div className="w-24 h-24 bg-sukses/20 rounded-full flex items-center justify-center border border-sukses/30">
                  <svg className="w-12 h-12 text-sukses" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Laporan Berhasil Dikirim</h3>
                  <p className="text-white/60 max-w-md mx-auto">
                    Terima kasih. Laporan Anda telah diamankan secara anonim dan akan segera ditindaklanjuti oleh Satuan Pengasuhan.
                  </p>
                </div>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-medium"
                >
                  Kirim Laporan Baru
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Judul / Topik Laporan <span className="text-bahaya">*</span></label>
                    <input 
                      type="text" 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="Contoh: Pelanggaran Jam Malam"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-emas focus:ring-1 focus:ring-emas focus:outline-none transition-all"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Lokasi Kejadian</label>
                      <input 
                        type="text" 
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="Opsional"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-emas focus:ring-1 focus:ring-emas focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Waktu Kejadian</label>
                      <input 
                        type="text" 
                        value={formData.dateOccurred}
                        onChange={(e) => setFormData({...formData, dateOccurred: e.target.value})}
                        placeholder="Contoh: Tadi malam jam 23.00"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-emas focus:ring-1 focus:ring-emas focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Deskripsi Kronologi <span className="text-bahaya">*</span></label>
                    <textarea 
                      required
                      rows={6}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Ceritakan kejadiannya secara detail..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-emas focus:ring-1 focus:ring-emas focus:outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-bahaya/10 border border-bahaya/20 text-bahaya rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-emas hover:bg-emas-light text-marun-dark font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-marun-dark/30 border-t-marun-dark rounded-full animate-spin"></div>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        Kirim Laporan Anonim
                      </>
                    )}
                  </button>
                  <p className="text-xs text-white/40 flex-1">
                    Dengan menekan tombol kirim, laporan akan langsung dikunci dan dienkripsi di dalam database sistem.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
