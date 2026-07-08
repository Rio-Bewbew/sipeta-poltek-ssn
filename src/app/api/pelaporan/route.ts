import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subject, description, location, dateOccurred } = body;

    if (!subject || !description) {
      return NextResponse.json(
        { error: "Judul dan deskripsi wajib diisi" },
        { status: 400 }
      );
    }

    const report = await prisma.anonymousReport.create({
      data: {
        subject,
        description,
        location,
        dateOccurred,
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "Gagal mengirim laporan" },
      { status: 500 }
    );
  }
}
