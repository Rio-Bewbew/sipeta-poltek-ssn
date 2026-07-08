import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import MateriForm from "../../MateriForm";

export const dynamic = "force-dynamic";

export default async function EditMateriPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const materi = await prisma.materi.findUnique({
    where: { id },
  });

  if (!materi) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h2 className="font-serif text-3xl font-bold text-white mb-2">Edit Materi</h2>
        <p className="text-white/60">Ubah modul pembelajaran taruna.</p>
      </div>

      <MateriForm initialData={materi} />
    </div>
  );
}
