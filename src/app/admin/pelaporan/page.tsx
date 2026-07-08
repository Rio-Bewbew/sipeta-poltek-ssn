import { prisma } from "@/lib/db";
import ReportList from "./ReportList";

export const dynamic = "force-dynamic";

export default async function AdminPelaporan() {
  const reports = await prisma.anonymousReport.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h2 className="font-serif text-3xl font-bold text-white mb-2">Laporan Anonim</h2>
        <p className="text-white/60">Daftar laporan pelanggaran yang dikirim secara rahasia oleh taruna.</p>
      </div>

      <ReportList initialReports={reports} />
    </div>
  );
}
