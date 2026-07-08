import { prisma } from "@/lib/db";
import MateriClient from "./MateriClient";

export const dynamic = "force-dynamic";

export default async function MateriPage() {
  const materiModules = await prisma.materi.findMany({
    orderBy: { nomor: "asc" },
  });

  return <MateriClient materiModules={materiModules} />;
}
