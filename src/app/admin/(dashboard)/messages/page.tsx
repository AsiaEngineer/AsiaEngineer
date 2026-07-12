import type { Metadata } from "next";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { AdminHeader, AdminCard } from "@/components/admin/AdminUI";
import DeleteButton from "@/components/admin/DeleteButton";
import MessageStatusSelect from "@/components/admin/MessageStatusSelect";
import { LEAD_STATUS_COLORS, LEAD_STATUS_LABELS, LEAD_STATUS_ORDER, formatDateTime } from "@/lib/utils";
import { deleteMessage } from "./actions";

export const metadata: Metadata = { title: "Pesan Masuk" };
export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));

  const grouped = LEAD_STATUS_ORDER.map((status) => ({
    status,
    items: messages.filter((m) => m.status === status),
  }));

  return (
    <div>
      <AdminHeader
        title="Pesan Masuk"
        description="Kelola pipeline penjualan dari calon klien yang menghubungi melalui formulir kontak."
      />

      <div className="flex gap-5 overflow-x-auto pb-4">
        {grouped.map((group) => (
          <div key={group.status} className="w-[300px] shrink-0">
            <div className={`mb-3 rounded-lg border px-4 py-2 text-xs font-semibold ${LEAD_STATUS_COLORS[group.status]}`}>
              {LEAD_STATUS_LABELS[group.status]} ({group.items.length})
            </div>
            <div className="space-y-3">
              {group.items.map((message) => (
                <AdminCard key={message.id} className="space-y-3">
                  <div>
                    <p className="font-semibold text-ink">{message.name}</p>
                    <p className="text-xs text-muted">{message.company || "-"}</p>
                  </div>
                  <div className="space-y-1 text-xs text-muted">
                    <p>{message.email}</p>
                    <p>{message.phone}</p>
                    {message.projectType && <p>Proyek: {message.projectType}</p>}
                    {message.budget && <p>Anggaran: {message.budget}</p>}
                    {message.location && <p>Lokasi: {message.location}</p>}
                  </div>
                  <p className="line-clamp-3 text-xs text-ink">{message.message}</p>
                  <p className="text-[11px] text-muted">{formatDateTime(message.createdAt)}</p>
                  <div className="flex items-center justify-between gap-2 border-t border-line pt-3">
                    <MessageStatusSelect id={message.id} status={message.status} />
                    <DeleteButton action={deleteMessage.bind(null, message.id)} />
                  </div>
                </AdminCard>
              ))}
              {group.items.length === 0 && (
                <p className="rounded-xl border border-dashed border-line p-4 text-center text-xs text-muted">
                  Tidak ada pesan
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
