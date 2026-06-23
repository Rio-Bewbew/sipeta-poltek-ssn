import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaOptions: any = {};

// In Vercel, the file system is read-only except for /tmp
if (process.env.VERCEL || process.env.NODE_ENV === "production") {
  const tmpDbPath = "/tmp/dev.db";
  try {
    if (!fs.existsSync(tmpDbPath)) {
      const defaultDbPath = path.join(process.cwd(), "prisma", "dev.db");
      if (fs.existsSync(defaultDbPath)) {
        fs.copyFileSync(defaultDbPath, tmpDbPath);
      }
    }
    prismaOptions = {
      datasources: {
        db: {
          url: "file:/tmp/dev.db",
        },
      },
    };
  } catch (e) {
    console.error("Failed to copy sqlite db to /tmp", e);
  }
}

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
