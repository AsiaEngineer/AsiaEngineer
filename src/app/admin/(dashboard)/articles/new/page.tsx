import type { Metadata } from "next";
import { AdminHeader, AdminCard } from "@/components/admin/AdminUI";
import ArticleForm from "@/components/admin/ArticleForm";
import { createArticle } from "../actions";

export const metadata: Metadata = { title: "Tambah Artikel" };

export default function NewArticlePage() {
  return (
    <div>
      <AdminHeader title="Tambah Artikel" />
      <AdminCard>
        <ArticleForm action={createArticle} />
      </AdminCard>
    </div>
  );
}
