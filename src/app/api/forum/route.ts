import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/forum — list all threads (publik; identitas asli TIDAK dibagikan)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const where = category && category !== "Semua" ? { category } : {};

  const threads = await prisma.thread.findMany({
    where,
    include: {
      _count: {
        select: { replies: true },
      },
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
    // author sudah disimpan sebagai "Anonim" bila anonim — aman untuk publik
    author: t.author,
    isAnonymous: t.isAnonymous,
    category: t.category,
    createdAt: t.createdAt.toISOString(),
    replyCount: t._count.replies,
    hasPengasuhReply: t.replies.length > 0,
    isAnswered: t.isAnswered,
  }));

  return NextResponse.json(formatted);
}

// POST /api/forum — create new thread
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, author, category, isAnonymous } = body;

    if (!title || !content || !author || !category) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    const anon = Boolean(isAnonymous);

    const thread = await prisma.thread.create({
      data: {
        title,
        content,
        category,
        // Nama publik disamarkan bila anonim; identitas asli disimpan di authorReal
        author: anon ? "Anonim" : author,
        authorReal: author,
        isAnonymous: anon,
        isRead: false,
        isAnswered: false,
      },
    });

    return NextResponse.json(thread, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Gagal membuat thread" }, { status: 500 });
  }
}
