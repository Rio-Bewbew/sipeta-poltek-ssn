import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const reports = await prisma.anonymousReport.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Buat header CSV
    let csvData = "ID,Subjek,Deskripsi,Lokasi,Waktu Kejadian,Status Baca,Tanggal Dibuat\n";

    // Format fungsi untuk mengamankan string (menangani koma dan enter)
    const escapeCsv = (str: string | null) => {
      if (!str) return '""';
      const escaped = str.replace(/"/g, '""'); // escape quotes
      return `"${escaped}"`; // wrap in quotes
    };

    // Masukkan data baris per baris
    reports.forEach((report) => {
      const isReadStr = report.isRead ? "Sudah Dibaca" : "Belum Dibaca";
      const createdAtStr = new Date(report.createdAt).toLocaleString("id-ID");
      
      csvData += `${report.id},${escapeCsv(report.subject)},${escapeCsv(report.description)},${escapeCsv(report.location)},${escapeCsv(report.dateOccurred)},${isReadStr},${escapeCsv(createdAtStr)}\n`;
    });

    return new NextResponse(csvData, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="Laporan_Anonim_SIPETA_${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export API Error:", error);
    return NextResponse.json({ error: "Gagal mengekspor laporan" }, { status: 500 });
  }
}
