import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// POST /api/forum/reply/[id]/upvote — upvote a reply
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const reply = await prisma.reply.update({
      where: { id },
      data: {
        upvotes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ upvotes: reply.upvotes });
  } catch {
    return NextResponse.json(
      { error: "Gagal upvote" },
      { status: 500 }
    );
  }
}
