"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { slugify } from "@/lib/utils";
import { saveUploadedFile } from "@/lib/upload";

function parseTags(input: string): string[] {
  return input
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

async function resolveImage(formData: FormData, fileField: string, existing: string): Promise<string> {
  const file = formData.get(fileField) as File | null;
  if (file && file.size > 0) {
    const saved = await saveUploadedFile(file, "projects");
    if (saved) return saved;
  }
  return existing;
}

export async function createProject(formData: FormData) {
  const title = String(formData.get("title") || "");
  const slug = slugify(String(formData.get("slug") || "") || title);
  const heroImage = await resolveImage(formData, "heroImageFile", "");
  const thumbnail = (await resolveImage(formData, "thumbnailFile", "")) || heroImage;

  await db.insert(projects).values({
    title,
    slug,
    category: String(formData.get("category") || "residential"),
    location: String(formData.get("location") || ""),
    province: String(formData.get("province") || ""),
    client: String(formData.get("client") || ""),
    architect: String(formData.get("architect") || ""),
    contractor: String(formData.get("contractor") || "Asia Engineer"),
    year: Number(formData.get("year")) || new Date().getFullYear(),
    status: String(formData.get("status") || "Selesai"),
    area: String(formData.get("area") || ""),
    duration: String(formData.get("duration") || ""),
    budget: String(formData.get("budget") || ""),
    shortDescription: String(formData.get("shortDescription") || ""),
    fullDescription: String(formData.get("fullDescription") || ""),
    challenges: String(formData.get("challenges") || ""),
    engineeringSolution: String(formData.get("engineeringSolution") || ""),
    constructionMethod: String(formData.get("constructionMethod") || ""),
    materials: String(formData.get("materials") || ""),
    heroImage,
    thumbnail,
    featured: formData.get("featured") === "on",
    seoTitle: String(formData.get("seoTitle") || ""),
    seoDescription: String(formData.get("seoDescription") || ""),
    tags: parseTags(String(formData.get("tags") || "")),
    statusPublish: (String(formData.get("statusPublish") || "published") as "draft" | "published" | "archived"),
  });

  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const title = String(formData.get("title") || "");
  const slug = slugify(String(formData.get("slug") || "") || title);

  const [current] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  if (!current) redirect("/admin/projects");

  const heroImage = await resolveImage(formData, "heroImageFile", current.heroImage);
  const thumbnail = await resolveImage(formData, "thumbnailFile", current.thumbnail || heroImage);

  await db
    .update(projects)
    .set({
      title,
      slug,
      category: String(formData.get("category") || "residential"),
      location: String(formData.get("location") || ""),
      province: String(formData.get("province") || ""),
      client: String(formData.get("client") || ""),
      architect: String(formData.get("architect") || ""),
      contractor: String(formData.get("contractor") || "Asia Engineer"),
      year: Number(formData.get("year")) || new Date().getFullYear(),
      status: String(formData.get("status") || "Selesai"),
      area: String(formData.get("area") || ""),
      duration: String(formData.get("duration") || ""),
      budget: String(formData.get("budget") || ""),
      shortDescription: String(formData.get("shortDescription") || ""),
      fullDescription: String(formData.get("fullDescription") || ""),
      challenges: String(formData.get("challenges") || ""),
      engineeringSolution: String(formData.get("engineeringSolution") || ""),
      constructionMethod: String(formData.get("constructionMethod") || ""),
      materials: String(formData.get("materials") || ""),
      heroImage,
      thumbnail,
      featured: formData.get("featured") === "on",
      seoTitle: String(formData.get("seoTitle") || ""),
      seoDescription: String(formData.get("seoDescription") || ""),
      tags: parseTags(String(formData.get("tags") || "")),
      statusPublish: (String(formData.get("statusPublish") || "published") as "draft" | "published" | "archived"),
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id));

  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${slug}`);
  redirect("/admin/projects");
}

export async function deleteProject(id: string, _formData: FormData) {
  if (!id) return;
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
}
