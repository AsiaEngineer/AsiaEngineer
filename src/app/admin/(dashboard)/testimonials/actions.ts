"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { saveUploadedFile } from "@/lib/upload";

export async function createTestimonial(formData: FormData) {
  const photoFile = formData.get("photoFile") as File | null;
  const photo = photoFile && photoFile.size > 0 ? (await saveUploadedFile(photoFile, "testimonials")) || "" : "";

  await db.insert(testimonials).values({
    clientName: String(formData.get("clientName") || ""),
    company: String(formData.get("company") || ""),
    photo,
    rating: Number(formData.get("rating")) || 5,
    testimonial: String(formData.get("testimonial") || ""),
    isPlaceholder: formData.get("isPlaceholder") === "on",
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const [current] = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
  if (!current) redirect("/admin/testimonials");

  const photoFile = formData.get("photoFile") as File | null;
  const photo =
    photoFile && photoFile.size > 0 ? (await saveUploadedFile(photoFile, "testimonials")) || current.photo : current.photo;

  await db
    .update(testimonials)
    .set({
      clientName: String(formData.get("clientName") || ""),
      company: String(formData.get("company") || ""),
      photo,
      rating: Number(formData.get("rating")) || 5,
      testimonial: String(formData.get("testimonial") || ""),
      isPlaceholder: formData.get("isPlaceholder") === "on",
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
    })
    .where(eq(testimonials.id, id));

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string, _formData: FormData) {
  await db.delete(testimonials).where(eq(testimonials.id, id));
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
