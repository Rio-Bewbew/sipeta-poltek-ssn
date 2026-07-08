import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { score, total } = await req.json();

    if (score === undefined || total === undefined) {
      return NextResponse.json({ error: "Score and total are required" }, { status: 400 });
    }

    // Buat riwayat kuis
    await prisma.quizAttempt.create({
      data: {
        score,
        total,
        userId: session.id,
      },
    });

    // Tambah poin pengguna (XP)
    // Misalnya: (score / total) * 100 poin
    const earnedPoints = Math.round((score / total) * 100);

    const updatedUser = await prisma.user.update({
      where: { id: session.id },
      data: {
        points: { increment: earnedPoints },
      },
    });

    return NextResponse.json({ success: true, pointsEarned: earnedPoints, totalPoints: updatedUser.points });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json({ error: "Gagal menyimpan skor kuis" }, { status: 500 });
  }
}
