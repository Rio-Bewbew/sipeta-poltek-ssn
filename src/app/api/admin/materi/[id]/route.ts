import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.materi.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete materi:", error);
    return NextResponse.json(
      { error: "Gagal menghapus materi" },
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

    if (!data.judul || !data.nomor || !data.ringkasan) {
      return NextResponse.json(
        { error: "Judul, nomor, dan ringkasan wajib diisi" },
        { status: 400 }
      );
    }

    const materi = await prisma.materi.update({
      where: { id },
      data: {
        nomor: Number(data.nomor),
        judul: data.judul,
        ringkasan: data.ringkasan,
        icon: data.icon || "BookOpen",
        poinKunci: data.poinKunci || [],
        kutipanPasal: data.kutipanPasal || [],
        praktikBaik: data.praktikBaik || [],
        pelanggaran: data.pelanggaran || [],
      },
    });

    return NextResponse.json({ success: true, materi });
  } catch (error) {
    console.error("Failed to update materi:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate materi" },
      { status: 500 }
    );
  }
}
