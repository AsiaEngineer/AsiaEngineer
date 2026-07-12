import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { AdminHeader, AdminCard } from "@/components/admin/AdminUI";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { updateTestimonial } from "../actions";

export const metadata: Metadata = { title: "Edit Testimoni" };
export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [item] = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
  if (!item) notFound();

  const updateWithId = async (formData: FormData) => {
    "use server";
    await updateTestimonial(id, formData);
  };

  return (
    <div>
      <AdminHeader title={`Edit Testimoni: ${item.clientName}`} />
      <AdminCard>
        <TestimonialForm action={updateWithId} testimonial={item} />
      </AdminCard>
    </div>
  );
}
