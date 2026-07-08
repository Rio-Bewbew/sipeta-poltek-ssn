import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    if (!data.pertanyaan || !data.jawabanBenar || !data.pilihan) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    const kuis = await prisma.kuis.create({
      data: {
        pertanyaan: data.pertanyaan,
        pilihan: data.pilihan,
        jawabanBenar: data.jawabanBenar,
        penjelasan: data.penjelasan || "",
        rujukanPasal: data.rujukanPasal || "",
      },
    });

    return NextResponse.json({ success: true, kuis }, { status: 201 });
  } catch (error) {
    console.error("Failed to create kuis:", error);
    return NextResponse.json(
      { error: "Gagal membuat soal kuis" },
      { status: 500 }
    );
  }
}
