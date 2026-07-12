"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { slugify } from "@/lib/utils";
import { saveUploadedFile } from "@/lib/upload";

export async function createArticle(formData: FormData) {
  const title = String(formData.get("title") || "");
  const slug = slugify(String(formData.get("slug") || "") || title);
  const coverFile = formData.get("coverFile") as File | null;
  const cover = coverFile && coverFile.size > 0 ? (await saveUploadedFile(coverFile, "articles")) || "" : "";

  await db.insert(articles).values({
    title,
    slug,
    cover,
    author: String(formData.get("author") || "Tim Asia Engineer"),
    category: String(formData.get("category") || "berita"),
    content: String(formData.get("content") || ""),
    excerpt: String(formData.get("excerpt") || ""),
    readingTime: Number(formData.get("readingTime")) || 3,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    seoTitle: String(formData.get("seoTitle") || ""),
    seoDescription: String(formData.get("seoDescription") || ""),
  });

  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function updateArticle(id: string, formData: FormData) {
  const [current] = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  if (!current) redirect("/admin/articles");

  const title = String(formData.get("title") || "");
  const slug = slugify(String(formData.get("slug") || "") || title);
  const coverFile = formData.get("coverFile") as File | null;
  const cover = coverFile && coverFile.size > 0 ? (await saveUploadedFile(coverFile, "articles")) || current.cover : current.cover;

  await db
    .update(articles)
    .set({
      title,
      slug,
      cover,
      author: String(formData.get("author") || "Tim Asia Engineer"),
      category: String(formData.get("category") || "berita"),
      content: String(formData.get("content") || ""),
      excerpt: String(formData.get("excerpt") || ""),
      readingTime: Number(formData.get("readingTime")) || 3,
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
      seoTitle: String(formData.get("seoTitle") || ""),
      seoDescription: String(formData.get("seoDescription") || ""),
      updatedAt: new Date(),
    })
    .where(eq(articles.id, id));

  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function deleteArticle(id: string, _formData: FormData) {
  await db.delete(articles).where(eq(articles.id, id));
  revalidatePath("/admin/articles");
}
