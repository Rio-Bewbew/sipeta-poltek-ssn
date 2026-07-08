import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Simple validation (can be expanded later)
    if (!data.judul || !data.nomor || !data.ringkasan) {
      return NextResponse.json(
        { error: "Judul, nomor, dan ringkasan wajib diisi" },
        { status: 400 }
      );
    }

    const materi = await prisma.materi.create({
      data: {
        id: "modul-" + Date.now(),
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

    return NextResponse.json({ success: true, materi }, { status: 201 });
  } catch (error) {
    console.error("Failed to create materi:", error);
    return NextResponse.json(
      { error: "Gagal membuat materi" },
      { status: 500 }
    );
  }
}
