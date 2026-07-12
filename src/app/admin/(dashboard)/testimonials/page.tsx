import type { Metadata } from "next";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { AdminHeader, AdminButtonLink, AdminCard, StatusPill } from "@/components/admin/AdminUI";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteTestimonial } from "./actions";

export const metadata: Metadata = { title: "Kelola Testimoni" };
export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const items = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));

  return (
    <div>
      <AdminHeader
        title="Kelola Testimoni"
        description="Ulasan klien yang tampil di halaman beranda."
        action={<AdminButtonLink href="/admin/testimonials/new">+ Tambah Testimoni</AdminButtonLink>}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <AdminCard key={item.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-heading font-bold text-ink">{item.clientName}</p>
                <p className="text-sm text-muted">{item.company}</p>
              </div>
              {item.isPlaceholder && <StatusPill tone="warning">Contoh</StatusPill>}
            </div>
            <p className="mt-4 text-sm text-muted">&ldquo;{item.testimonial}&rdquo;</p>
            <div className="mt-4 flex items-center gap-4">
              <Link href={`/admin/testimonials/${item.id}`} className="text-sm font-medium text-accent">
                Edit
              </Link>
              <DeleteButton action={deleteTestimonial.bind(null, item.id)} />
            </div>
          </AdminCard>
        ))}
        {items.length === 0 && (
          <AdminCard>
            <p className="text-muted">Belum ada testimoni.</p>
          </AdminCard>
        )}
      </div>
    </div>
  );
}
