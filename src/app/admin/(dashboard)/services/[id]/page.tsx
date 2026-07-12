import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { services } from "@/db/schema";
import { AdminHeader, AdminCard } from "@/components/admin/AdminUI";
import ServiceForm from "@/components/admin/ServiceForm";
import { updateService } from "../actions";

export const metadata: Metadata = { title: "Edit Layanan" };
export const dynamic = "force-dynamic";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [service] = await db.select().from(services).where(eq(services.id, id)).limit(1);
  if (!service) notFound();

  const updateWithId = async (formData: FormData) => {
    "use server";
    await updateService(id, formData);
  };

  return (
    <div>
      <AdminHeader title={`Edit Layanan: ${service.title}`} />
      <AdminCard>
        <ServiceForm action={updateWithId} service={service} />
      </AdminCard>
    </div>
  );
}
