import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/admin/forum — daftar thread untuk panel admin/Pengasuh.
// Menyertakan identitas asli (authorReal) dan status baca/jawab.
export async function GET() {
  const threads = await prisma.thread.findMany({
    include: {
      _count: { select: { replies: true } },
      replies: {
        select: { isPengasuh: true },
        where: { isPengasuh: true },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const formatted = threads.map((t) => ({
    id: t.id,
    title: t.title,
    content: t.content,
    author: t.author, // nama publik ("Anonim" bila anonim)
    authorReal: t.authorReal, // identitas asli — khusus admin
    isAnonymous: t.isAnonymous,
    category: t.category,
    isRead: t.isRead,
    isAnswered: t.isAnswered || t.replies.length > 0,
    replyCount: t._count.replies,
    createdAt: t.createdAt.toISOString(),
  }));

  return NextResponse.json(formatted);
}
