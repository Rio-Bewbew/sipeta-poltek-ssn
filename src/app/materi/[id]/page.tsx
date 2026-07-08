import { prisma } from "@/lib/db";
import Link from "next/link";
import MateriDetailClient from "./MateriDetailClient";

export const dynamic = "force-dynamic";

export default async function MateriDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch all to find prev/next efficiently (or we could fetch only what we need, but there are only 5)
  const materiModules = await prisma.materi.findMany({
    orderBy: { nomor: "asc" },
  });

  const currentIdx = materiModules.findIndex((m) => m.id === id);
  const modul = currentIdx !== -1 ? materiModules[currentIdx] : null;

  if (!modul) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold text-marun-dark mb-4">
          Modul tidak ditemukan
        </h1>
        <Link href="/materi" className="text-marun hover:text-emas transition-colors">
          ← Kembali ke Materi
        </Link>
      </div>
    );
  }

  const prev = currentIdx > 0 ? materiModules[currentIdx - 1] : null;
  const next =
    currentIdx < materiModules.length - 1
      ? materiModules[currentIdx + 1]
      : null;

  return <MateriDetailClient modul={modul} prev={prev} next={next} />;
}
