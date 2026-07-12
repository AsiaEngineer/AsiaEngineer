import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { faq } from "@/db/schema";
import { AdminHeader, AdminCard } from "@/components/admin/AdminUI";
import FaqForm from "@/components/admin/FaqForm";
import { updateFaq } from "../actions";

export const metadata: Metadata = { title: "Edit FAQ" };
export const dynamic = "force-dynamic";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [item] = await db.select().from(faq).where(eq(faq.id, id)).limit(1);
  if (!item) notFound();

  const updateWithId = async (formData: FormData) => {
    "use server";
    await updateFaq(id, formData);
  };

  return (
    <div>
      <AdminHeader title="Edit FAQ" />
      <AdminCard>
        <FaqForm action={updateWithId} item={item} />
      </AdminCard>
    </div>
  );
}
