import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Putuskan koneksi agar Prisma tidak memegang file yang lama
    await prisma.$disconnect();

    const tmpDbPath = "/tmp/dev.db";
    const defaultDbPath = path.join(process.cwd(), "prisma", "dev.db");

    if (fs.existsSync(defaultDbPath)) {
      // Timpa database sementara di memori dengan versi bawaan yang sudah bersih
      fs.copyFileSync(defaultDbPath, tmpDbPath);
      return NextResponse.json({ 
        success: true, 
        message: "Database berhasil di-reset secara paksa ke kondisi awal. Silakan kembali ke halaman forum/admin." 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: "Gagal: File database bawaan tidak ditemukan." 
      }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
