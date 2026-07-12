import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { AdminHeader, AdminCard } from "@/components/admin/AdminUI";
import ArticleForm from "@/components/admin/ArticleForm";
import { updateArticle } from "../actions";

export const metadata: Metadata = { title: "Edit Artikel" };
export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [item] = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  if (!item) notFound();

  const updateWithId = async (formData: FormData) => {
    "use server";
    await updateArticle(id, formData);
  };

  return (
    <div>
      <AdminHeader title={`Edit Artikel: ${item.title}`} />
      <AdminCard>
        <ArticleForm action={updateWithId} article={item} />
      </AdminCard>
    </div>
  );
}
