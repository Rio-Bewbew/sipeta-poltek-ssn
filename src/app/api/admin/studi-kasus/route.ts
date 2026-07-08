import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    if (!data.judul || !data.nomor || !data.situasi || !data.pilihan) {
      return NextResponse.json(
        { error: "Judul, nomor, situasi, dan pilihan wajib diisi" },
        { status: 400 }
      );
    }

    const studiKasus = await prisma.studiKasus.create({
      data: {
        id: "kasus-" + Date.now(),
        nomor: Number(data.nomor),
        judul: data.judul,
        situasi: data.situasi,
        pilihan: data.pilihan,
        umpanBalikBenar: data.umpanBalikBenar || "",
        pelajaranUtama: data.pelajaranUtama || "",
        rujukanPasal: data.rujukanPasal || "",
      },
    });

    return NextResponse.json({ success: true, studiKasus }, { status: 201 });
  } catch (error) {
    console.error("Failed to create studi kasus:", error);
    return NextResponse.json(
      { error: "Gagal membuat studi kasus" },
      { status: 500 }
    );
  }
}
