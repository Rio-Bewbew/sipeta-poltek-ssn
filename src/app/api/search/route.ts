import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query || query.trim() === "") {
      return NextResponse.json({ materi: [], studiKasus: [], forum: [] });
    }

    const searchQuery = query.trim();

    // Jalankan query secara paralel untuk performa lebih baik
    const [materi, studiKasus, forum] = await Promise.all([
      // Cari Materi (berdasarkan judul atau ringkasan)
      prisma.materi.findMany({
        where: {
          OR: [
            { judul: { contains: searchQuery, mode: "insensitive" } },
            { ringkasan: { contains: searchQuery, mode: "insensitive" } },
          ],
        },
        take: 5, // Batasi hasil
      }),
      
      // Cari Studi Kasus (berdasarkan judul atau situasi)
      prisma.studiKasus.findMany({
        where: {
          OR: [
            { judul: { contains: searchQuery, mode: "insensitive" } },
            { situasi: { contains: searchQuery, mode: "insensitive" } },
          ],
        },
        take: 5,
      }),

      // Cari Forum Thread (berdasarkan judul atau isi)
      prisma.thread.findMany({
        where: {
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" } },
            { content: { contains: searchQuery, mode: "insensitive" } },
          ],
        },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      materi,
      studiKasus,
      forum,
    });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Gagal mencari data" }, { status: 500 });
  }
}
