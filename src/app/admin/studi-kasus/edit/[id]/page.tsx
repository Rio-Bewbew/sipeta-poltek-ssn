import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import StudiKasusForm from "../../StudiKasusForm";

export const dynamic = "force-dynamic";

export default async function EditStudiKasusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kasus = await prisma.studiKasus.findUnique({
    where: { id },
  });

  if (!kasus) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h2 className="font-serif text-3xl font-bold text-white mb-2">Edit Studi Kasus</h2>
        <p className="text-white/60">Ubah skenario studi kasus.</p>
      </div>

      <StudiKasusForm initialData={kasus} />
    </div>
  );
}
