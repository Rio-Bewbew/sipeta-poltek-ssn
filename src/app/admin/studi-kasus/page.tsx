import { prisma } from "@/lib/db";
import AdminStudiKasusList from "./AdminStudiKasusList";

export const dynamic = "force-dynamic";

export default async function AdminStudiKasus() {
  const caseStudies = await prisma.studiKasus.findMany({
    orderBy: { nomor: "asc" },
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h2 className="font-serif text-3xl font-bold text-white mb-2">Manajemen Studi Kasus</h2>
        <p className="text-white/60">Kelola skenario interaktif studi kasus.</p>
      </div>

      <AdminStudiKasusList initialCaseStudies={caseStudies} />
    </div>
  );
}
