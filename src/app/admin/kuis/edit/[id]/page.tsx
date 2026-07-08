import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import KuisForm from "../../KuisForm";

export const dynamic = "force-dynamic";

export default async function EditKuisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kuis = await prisma.kuis.findUnique({
    where: { id: Number(id) },
  });

  if (!kuis) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h2 className="font-serif text-3xl font-bold text-white mb-2">Edit Soal Kuis</h2>
        <p className="text-white/60">Ubah soal kuis untuk taruna.</p>
      </div>

      <KuisForm initialData={kuis} />
    </div>
  );
}
