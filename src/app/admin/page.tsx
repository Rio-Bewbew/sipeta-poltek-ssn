import { prisma } from "@/lib/db";
import { materiModules } from "@/data/materi";
import { cases } from "@/data/kasus";
import { kuisData } from "@/data/kuis";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const totalThreads = await prisma.thread.count();
  const totalReplies = await prisma.reply.count();
  
  // Calculate unanswered threads (no replies from pengasuh)
  const threadsWithPengasuh = await prisma.thread.count({
    where: {
      replies: {
        some: {
          isPengasuh: true
        }
      }
    }
  });
  
  const unansweredThreads = totalThreads - threadsWithPengasuh;

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h2 className="font-serif text-3xl font-bold text-white mb-2">Ikhtisar Sistem</h2>
        <p className="text-white/60">Pantau aktivitas pembelajaran dan diskusi taruna secara langsung.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-emas/30 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-bl from-emas/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <p className="text-white/50 text-sm font-medium mb-1">Total Pertanyaan Forum</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-white">{totalThreads}</span>
            <span className="text-emas text-sm mb-1">Thread</span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-bahaya/30 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-bl from-bahaya/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <p className="text-white/50 text-sm font-medium mb-1">Menunggu Jawaban Pengasuh</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-white">{unansweredThreads}</span>
            <span className="text-bahaya text-sm mb-1">Perlu Perhatian</span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-sukses/30 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-bl from-sukses/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <p className="text-white/50 text-sm font-medium mb-1">Total Balasan Forum</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-white">{totalReplies}</span>
            <span className="text-sukses text-sm mb-1">Balasan</span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-marun/30 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-bl from-marun/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <p className="text-white/50 text-sm font-medium mb-1">Total Modul Pembelajaran</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-white">{materiModules.length}</span>
            <span className="text-marun-light text-sm mb-1">Materi Aktif</span>
          </div>
        </div>
      </div>

      {/* Content Status */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="font-serif text-xl font-bold text-white">Status Konten Pembelajaran</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-black/20 rounded-xl border border-white/5">
            <h4 className="text-white/80 font-medium mb-2">📚 Materi</h4>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/50">Status:</span>
              <span className="text-sukses bg-sukses/10 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Aktif</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-white/50">Jumlah:</span>
              <span className="text-white">{materiModules.length} Modul</span>
            </div>
          </div>
          
          <div className="p-4 bg-black/20 rounded-xl border border-white/5">
            <h4 className="text-white/80 font-medium mb-2">🔍 Studi Kasus</h4>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/50">Status:</span>
              <span className="text-sukses bg-sukses/10 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Aktif</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-white/50">Jumlah:</span>
              <span className="text-white">{cases.length} Skenario</span>
            </div>
          </div>

          <div className="p-4 bg-black/20 rounded-xl border border-white/5">
            <h4 className="text-white/80 font-medium mb-2">📝 Kuis</h4>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/50">Status:</span>
              <span className="text-sukses bg-sukses/10 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Aktif</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-white/50">Jumlah:</span>
              <span className="text-white">{kuisData.length} Soal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
