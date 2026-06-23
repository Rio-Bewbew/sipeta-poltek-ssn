import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Prisma requires deleting related records first (replies) if cascading delete isn't setup in schema
    await prisma.reply.deleteMany({
      where: { threadId: id },
    });
    
    await prisma.thread.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete thread:", error);
    return NextResponse.json({ error: "Failed to delete thread" }, { status: 500 });
  }
}
