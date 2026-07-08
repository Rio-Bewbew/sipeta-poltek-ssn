import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.studiKasus.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete studi kasus:", error);
    return NextResponse.json(
      { error: "Gagal menghapus studi kasus" },
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

    if (!data.judul || !data.nomor || !data.situasi || !data.pilihan) {
      return NextResponse.json(
        { error: "Judul, nomor, situasi, dan pilihan wajib diisi" },
        { status: 400 }
      );
    }

    const studiKasus = await prisma.studiKasus.update({
      where: { id },
      data: {
        nomor: Number(data.nomor),
        judul: data.judul,
        situasi: data.situasi,
        pilihan: data.pilihan,
        umpanBalikBenar: data.umpanBalikBenar || "",
        pelajaranUtama: data.pelajaranUtama || "",
        rujukanPasal: data.rujukanPasal || "",
      },
    });

    return NextResponse.json({ success: true, studiKasus });
  } catch (error) {
    console.error("Failed to update studi kasus:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate studi kasus" },
      { status: 500 }
    );
  }
}
