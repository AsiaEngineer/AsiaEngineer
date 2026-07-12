import "server-only";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const ALLOWED_TYPES = ["image/webp", "image/png", "image/jpeg", "image/jpg"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function saveUploadedFile(file: File, folder: string): Promise<string | null> {
  if (!file || file.size === 0) return null;
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Format file tidak didukung. Gunakan WebP, PNG, atau JPEG.");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("Ukuran file melebihi batas maksimum 10MB.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split(".").pop() || "jpg";
  const safeFolder = folder.replace(/[^a-z0-9-]/gi, "");
  const filename = `${crypto.randomUUID()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", safeFolder);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);

  return `/uploads/${safeFolder}/${filename}`;
}
