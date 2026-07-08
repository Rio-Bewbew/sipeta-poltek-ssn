import { prisma } from "@/lib/db";
import ReportList from "./ReportList";

export const dynamic = "force-dynamic";

export default async function AdminPelaporan() {
  const reports = await prisma.anonymousReport.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-white mb-2">Laporan Anonim</h2>
          <p className="text-white/60">Daftar laporan pelanggaran yang dikirim secara rahasia oleh taruna.</p>
        </div>
        <a 
          href="/api/admin/pelaporan/export" 
          download
          className="px-6 py-2.5 bg-emas text-marun-dark font-bold rounded-xl hover:bg-emas-light transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Unduh Laporan (CSV)
        </a>
      </div>

      <ReportList initialReports={reports} />
    </div>
  );
}
