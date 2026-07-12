import type { Metadata } from "next";
import Link from "next/link";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { services } from "@/db/schema";
import { AdminHeader, AdminButtonLink, AdminCard } from "@/components/admin/AdminUI";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteService } from "./actions";

export const metadata: Metadata = { title: "Kelola Layanan" };
export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const allServices = await db.select().from(services).orderBy(asc(services.displayOrder));

  return (
    <div>
      <AdminHeader
        title="Kelola Layanan"
        description="Layanan konstruksi yang ditawarkan Asia Engineer."
        action={<AdminButtonLink href="/admin/services/new">+ Tambah Layanan</AdminButtonLink>}
      />
      <AdminCard className="overflow-x-auto p-0">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line bg-neutral/60 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-6 py-4">Judul</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Beranda</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {allServices.map((service) => (
              <tr key={service.id} className="border-b border-line last:border-none">
                <td className="px-6 py-4 font-medium text-ink">{service.title}</td>
                <td className="px-6 py-4 capitalize text-muted">{service.status}</td>
                <td className="px-6 py-4">{service.featured ? "Ya" : "-"}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-4">
                    <Link href={`/admin/services/${service.id}`} className="text-sm font-medium text-accent">
                      Edit
                    </Link>
                    <DeleteButton action={deleteService.bind(null, service.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {allServices.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-muted">
                  Belum ada layanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </AdminCard>
    </div>
  );
}
