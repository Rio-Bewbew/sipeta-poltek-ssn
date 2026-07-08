import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { npm, password } = await req.json();

    if (!npm || !password) {
      return NextResponse.json(
        { error: "NPM dan Password wajib diisi" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { npm },
    });

    if (!user) {
      return NextResponse.json(
        { error: "NPM atau Password salah" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "NPM atau Password salah" },
        { status: 401 }
      );
    }

    // Create session payload
    const payload = {
      id: user.id,
      npm: user.npm,
      name: user.name,
      role: user.role,
      points: user.points,
    };

    const session = await encrypt(payload);
    
    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return NextResponse.json({ success: true, user: payload });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat login" },
      { status: 500 }
    );
  }
}
