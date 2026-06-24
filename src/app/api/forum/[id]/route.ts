import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/forum/[id] — get single thread with replies (PUBLIK)
// Identitas asli (authorReal) tidak pernah dibagikan ke publik.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const thread = await prisma.thread.findUnique({
    where: { id },
    include: {
      replies: {
        orderBy: { upvotes: "desc" },
      },
    },
  });

  if (!thread) {
    return NextResponse.json(
      { error: "Thread tidak ditemukan" },
      { status: 404 }
    );
  }

  // Buang authorReal sebelum dikirim ke publik
  const safe = {
    id: thread.id,
    title: thread.title,
    content: thread.content,
    author: thread.author,
    isAnonymous: thread.isAnonymous,
    category: thread.category,
    isAnswered: thread.isAnswered,
    createdAt: thread.createdAt,
    replies: thread.replies.map((r) => ({
      id: r.id,
      content: r.content,
      author: r.author,
      isAnonymous: r.isAnonymous,
      isPengasuh: r.isPengasuh,
      upvotes: r.upvotes,
      createdAt: r.createdAt,
    })),
  };

  return NextResponse.json(safe);
}

// POST /api/forum/[id] — add reply to thread (oleh taruna/publik)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { content, author, isAnonymous } = body;

    if (!content || !author) {
      return NextResponse.json(
        { error: "Isi dan penulis wajib diisi" },
        { status: 400 }
      );
    }

    // Check thread exists
    const thread = await prisma.thread.findUnique({ where: { id } });
    if (!thread) {
      return NextResponse.json(
        { error: "Thread tidak ditemukan" },
        { status: 404 }
      );
    }

    const anon = Boolean(isAnonymous);

    // Create the reply and update the thread's read/answered status in a transaction
    const [reply] = await prisma.$transaction([
      prisma.reply.create({
        data: {
          content,
          author: anon ? "Anonim" : author,
          authorReal: author,
          isAnonymous: anon,
          threadId: id,
          isPengasuh: false,
        },
      }),
      prisma.thread.update({
        where: { id },
        data: {
          isRead: false,
          isAnswered: false,
        },
      }),
    ]);

    return NextResponse.json(reply, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal menambah balasan" },
      { status: 500 }
    );
  }
}
