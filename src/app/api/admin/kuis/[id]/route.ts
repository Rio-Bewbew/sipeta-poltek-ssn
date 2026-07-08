import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.kuis.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete kuis:", error);
    return NextResponse.json(
      { error: "Gagal menghapus kuis" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();

    if (!data.pertanyaan || !data.jawabanBenar || !data.pilihan) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    const kuis = await prisma.kuis.update({
      where: { id: Number(id) },
      data: {
        pertanyaan: data.pertanyaan,
        pilihan: data.pilihan,
        jawabanBenar: data.jawabanBenar,
        penjelasan: data.penjelasan || "",
        rujukanPasal: data.rujukanPasal || "",
      },
    });

    return NextResponse.json({ success: true, kuis });
  } catch (error) {
    console.error("Failed to update kuis:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate kuis" },
      { status: 500 }
    );
  }
}
