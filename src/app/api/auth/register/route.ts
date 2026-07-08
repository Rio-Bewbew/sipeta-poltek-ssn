import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { npm, name, password } = await req.json();

    if (!npm || !name || !password) {
      return NextResponse.json(
        { error: "NPM, Nama, dan Password wajib diisi" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { npm },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "NPM sudah terdaftar" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        npm,
        name,
        password: hashedPassword,
        role: "TARUNA",
      },
    });

    return NextResponse.json(
      { success: true, user: { id: user.id, npm: user.npm, name: user.name } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mendaftar" },
      { status: 500 }
    );
  }
}
