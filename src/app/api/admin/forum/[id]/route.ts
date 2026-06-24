import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/admin/forum/[id] — detail thread untuk admin (termasuk identitas asli)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const thread = await prisma.thread.findUnique({
    where: { id },
    include: { replies: { orderBy: { createdAt: "asc" } } },
  });
  if (!thread) {
    return NextResponse.json({ error: "Thread tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(thread);
}

// PATCH /api/admin/forum/[id] — tandai sudah dibaca (atau ubah status lain)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let body: { isRead?: boolean } = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }
    const updated = await prisma.thread.update({
      where: { id },
      data: { isRead: body.isRead ?? true },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update thread:", error);
    return NextResponse.json({ error: "Gagal memperbarui status" }, { status: 500 });
  }
}

// POST /api/admin/forum/[id] — balasan dari Pengasuh.
// PENTING: hanya menambah balasan + mengubah status. Thread TIDAK dihapus.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { content, author, isAnonymous } = body;

    if (!content) {
      return NextResponse.json({ error: "Isi balasan wajib diisi" }, { status: 400 });
    }

    const thread = await prisma.thread.findUnique({ where: { id } });
    if (!thread) {
      return NextResponse.json({ error: "Thread tidak ditemukan" }, { status: 404 });
    }

    const pengasuhName = author?.trim() ? author.trim() : "Pengasuh";
    const anon = Boolean(isAnonymous);

    // Buat balasan Pengasuh + tandai thread sudah dibaca & sudah dijawab.
    const [reply] = await prisma.$transaction([
      prisma.reply.create({
        data: {
          content,
          author: anon ? "Anonim" : pengasuhName,
          authorReal: pengasuhName,
          isAnonymous: anon,
          isPengasuh: true,
          threadId: id,
        },
      }),
      prisma.thread.update({
        where: { id },
        data: { isAnswered: true, isRead: true },
      }),
    ]);

    return NextResponse.json(reply, { status: 201 });
  } catch (error) {
    console.error("Failed to add pengasuh reply:", error);
    return NextResponse.json({ error: "Gagal mengirim balasan" }, { status: 500 });
  }
}

// DELETE /api/admin/forum/[id] — hapus thread beserta balasannya
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.reply.deleteMany({ where: { threadId: id } });
    await prisma.thread.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete thread:", error);
    return NextResponse.json({ error: "Failed to delete thread" }, { status: 500 });
  }
}
