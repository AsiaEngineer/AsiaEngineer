"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { faq } from "@/db/schema";

export async function createFaq(formData: FormData) {
  await db.insert(faq).values({
    category: String(formData.get("category") || "umum"),
    question: String(formData.get("question") || ""),
    answer: String(formData.get("answer") || ""),
    priority: Number(formData.get("priority")) || 0,
    published: formData.get("published") === "on",
  });
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
  redirect("/admin/faq");
}

export async function updateFaq(id: string, formData: FormData) {
  await db
    .update(faq)
    .set({
      category: String(formData.get("category") || "umum"),
      question: String(formData.get("question") || ""),
      answer: String(formData.get("answer") || ""),
      priority: Number(formData.get("priority")) || 0,
      published: formData.get("published") === "on",
    })
    .where(eq(faq.id, id));
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
  redirect("/admin/faq");
}

export async function deleteFaq(id: string, _formData: FormData) {
  await db.delete(faq).where(eq(faq.id, id));
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}
