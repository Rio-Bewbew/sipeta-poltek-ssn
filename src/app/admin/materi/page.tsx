import { prisma } from "@/lib/db";
import AdminMateriList from "./AdminMateriList";

export const dynamic = "force-dynamic";

export default async function AdminMateri() {
  const materiModules = await prisma.materi.findMany({
    orderBy: { nomor: "asc" },
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h2 className="font-serif text-3xl font-bold text-white mb-2">Manajemen Materi</h2>
        <p className="text-white/60">Kelola modul pembelajaran taruna secara dinamis dari database.</p>
      </div>

      <AdminMateriList initialMateri={materiModules} />
    </div>
  );
}
