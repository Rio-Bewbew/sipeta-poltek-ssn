import { materiModules } from "@/data/materi";

export default function AdminMateri() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h2 className="font-serif text-3xl font-bold text-white mb-2">Manajemen Materi</h2>
        <p className="text-white/60">Kelola modul pembelajaran taruna.</p>
      </div>

      <div className="bg-emas/10 border border-emas/20 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex gap-4 items-start relative z-10">
          <div className="text-3xl">⚠️</div>
          <div>
            <h3 className="text-emas font-bold text-lg mb-2">Pembaruan Sistem Diperlukan</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Materi dan Kuis saat ini menggunakan sistem <strong>Penyimpanan Statis (Hardcoded)</strong> demi kecepatan akses. Untuk dapat mengubah, menambah, atau menghapus materi secara langsung dari panel ini, kita perlu memigrasikan seluruh arsitektur data ke <strong>Database Dinamis (seperti PostgreSQL/Supabase)</strong>.
            </p>
            <p className="text-white/50 text-xs italic">
              Ini adalah antarmuka purwarupa. Hubungi pengembang untuk melakukan migrasi database.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emas/10 rounded-full blur-[80px] pointer-events-none -z-0"></div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden opacity-50 pointer-events-none filter grayscale">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="font-serif text-xl font-bold text-white">Daftar Materi Saat Ini (Hanya Baca)</h3>
          <button className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium">
            + Tambah Materi
          </button>
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="bg-black/20 text-white/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold">Judul Modul</th>
                <th className="px-6 py-4 font-semibold">Estimasi Waktu</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {materiModules.map((materi) => (
                <tr key={materi.id} className="border-b border-white/5">
                  <td className="px-6 py-4">
                    <p className="font-medium text-white mb-1">{materi.title}</p>
                    <p className="text-xs text-white/40">{materi.description.substring(0, 50)}...</p>
                  </td>
                  <td className="px-6 py-4">{materi.estimatedTime}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-emas/50 hover:text-emas mr-3">Edit</button>
                    <button className="text-bahaya/50 hover:text-bahaya">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
