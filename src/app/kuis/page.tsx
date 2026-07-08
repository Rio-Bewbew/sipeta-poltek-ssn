import { prisma } from "@/lib/db";
import KuisClient from "./KuisClient";

export const dynamic = "force-dynamic";

export default async function KuisPage() {
  const quizQuestions = await prisma.kuis.findMany({
    orderBy: { id: "asc" },
  });

  return <KuisClient quizQuestions={quizQuestions} />;
}
