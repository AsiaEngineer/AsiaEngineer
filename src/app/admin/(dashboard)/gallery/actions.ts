"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { gallery } from "@/db/schema";
import { saveUploadedFile } from "@/lib/upload";

export async function createGalleryItem(formData: FormData) {
  const file = formData.get("imageFile") as File | null;
  if (!file || file.size === 0) {
    throw new Error("Gambar wajib diunggah.");
  }
  const image = (await saveUploadedFile(file, "gallery")) || "";

  await db.insert(gallery).values({
    title: String(formData.get("title") || ""),
    category: String(formData.get("category") || "residential"),
    image,
    alt: String(formData.get("alt") || ""),
    caption: String(formData.get("caption") || ""),
    featured: formData.get("featured") === "on",
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  redirect("/admin/gallery");
}

export async function deleteGalleryItem(id: string, _formData: FormData) {
  await db.delete(gallery).where(eq(gallery.id, id));
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}
