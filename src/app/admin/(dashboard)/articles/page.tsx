import type { Metadata } from "next";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { AdminHeader, AdminButtonLink, AdminCard } from "@/components/admin/AdminUI";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteArticle } from "./actions";

export const metadata: Metadata = { title: "Kelola Artikel" };
export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const items = await db.select().from(articles).orderBy(desc(articles.createdAt));

  return (
    <div>
      <AdminHeader
        title="Kelola Artikel"
        description="Artikel dan berita perusahaan (fitur siap untuk pengembangan blog di masa mendatang)."
        action={<AdminButtonLink href="/admin/articles/new">+ Tambah Artikel</AdminButtonLink>}
      />
      <AdminCard className="overflow-x-auto p-0">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line bg-neutral/60 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-6 py-4">Judul</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-line last:border-none">
                <td className="px-6 py-4 font-medium text-ink">{item.title}</td>
                <td className="px-6 py-4 text-muted">{item.category}</td>
                <td className="px-6 py-4 text-muted">{item.published ? "Publik" : "Draft"}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-4">
                    <Link href={`/admin/articles/${item.id}`} className="text-sm font-medium text-accent">
                      Edit
                    </Link>
                    <DeleteButton action={deleteArticle.bind(null, item.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-muted">
                  Belum ada artikel.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </AdminCard>
    </div>
  );
}
