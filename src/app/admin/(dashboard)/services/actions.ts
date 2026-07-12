"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { services } from "@/db/schema";
import { slugify } from "@/lib/utils";
import { saveUploadedFile } from "@/lib/upload";

function parseLines(input: string): string[] {
  return input
    .split("\n")
    .map((t) => t.trim())
    .filter(Boolean);
}

export async function createService(formData: FormData) {
  const title = String(formData.get("title") || "");
  const slug = slugify(String(formData.get("slug") || "") || title);
  const heroFile = formData.get("heroImageFile") as File | null;
  const heroImage = heroFile && heroFile.size > 0 ? (await saveUploadedFile(heroFile, "services")) || "" : "";

  await db.insert(services).values({
    title,
    slug,
    icon: String(formData.get("icon") || "building"),
    heroImage,
    description: String(formData.get("description") || ""),
    content: String(formData.get("content") || ""),
    benefits: parseLines(String(formData.get("benefits") || "")),
    workflow: parseLines(String(formData.get("workflow") || "")),
    featured: formData.get("featured") === "on",
    displayOrder: Number(formData.get("displayOrder")) || 0,
    seoTitle: String(formData.get("seoTitle") || ""),
    seoDescription: String(formData.get("seoDescription") || ""),
    status: (String(formData.get("status") || "published") as "draft" | "published" | "archived"),
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  const [current] = await db.select().from(services).where(eq(services.id, id)).limit(1);
  if (!current) redirect("/admin/services");

  const title = String(formData.get("title") || "");
  const slug = slugify(String(formData.get("slug") || "") || title);
  const heroFile = formData.get("heroImageFile") as File | null;
  const heroImage =
    heroFile && heroFile.size > 0 ? (await saveUploadedFile(heroFile, "services")) || current.heroImage : current.heroImage;

  await db
    .update(services)
    .set({
      title,
      slug,
      icon: String(formData.get("icon") || "building"),
      heroImage,
      description: String(formData.get("description") || ""),
      content: String(formData.get("content") || ""),
      benefits: parseLines(String(formData.get("benefits") || "")),
      workflow: parseLines(String(formData.get("workflow") || "")),
      featured: formData.get("featured") === "on",
      displayOrder: Number(formData.get("displayOrder")) || 0,
      seoTitle: String(formData.get("seoTitle") || ""),
      seoDescription: String(formData.get("seoDescription") || ""),
      status: (String(formData.get("status") || "published") as "draft" | "published" | "archived"),
      updatedAt: new Date(),
    })
    .where(eq(services.id, id));

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function deleteService(id: string, _formData: FormData) {
  await db.delete(services).where(eq(services.id, id));
  revalidatePath("/admin/services");
  revalidatePath("/services");
}
