import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/forum/[id] — get single thread with replies
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

  return NextResponse.json(thread);
}

// POST /api/forum/[id] — add reply to thread
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { content, author } = body;

    if (!content || !author) {
      return NextResponse.json(
        { error: "Isi dan penulis wajib diisi" },
        { status: 400 }
      );
    }

    // Check thread exists
    const thread = await prisma.thread.findUnique({
      where: { id },
    });

    if (!thread) {
      return NextResponse.json(
        { error: "Thread tidak ditemukan" },
        { status: 404 }
      );
    }

    const reply = await prisma.reply.create({
      data: {
        content,
        author,
        threadId: id,
        isPengasuh: false,
      },
    });

    return NextResponse.json(reply, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal menambah balasan" },
      { status: 500 }
    );
  }
}
