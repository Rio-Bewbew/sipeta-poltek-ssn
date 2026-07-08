import { prisma } from "@/lib/db";
import StudiKasusClient from "./StudiKasusClient";

export const dynamic = "force-dynamic";

export default async function StudiKasusPage() {
  const caseStudies = await prisma.studiKasus.findMany({
    orderBy: { nomor: "asc" },
  });

  return <StudiKasusClient caseStudies={caseStudies} />;
}
