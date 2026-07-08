import { prisma } from "@/lib/db";
import AdminKuisList from "./AdminKuisList";

export const dynamic = "force-dynamic";

export default async function AdminKuis() {
  const kuis = await prisma.kuis.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h2 className="font-serif text-3xl font-bold text-white mb-2">Manajemen Kuis</h2>
        <p className="text-white/60">Kelola soal kuis pemahaman.</p>
      </div>

      <AdminKuisList initialKuis={kuis} />
    </div>
  );
}
