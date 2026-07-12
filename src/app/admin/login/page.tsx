import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Masuk Admin" };

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-md rounded-[24px] bg-white p-10 shadow-2xl">
        <p className="font-heading text-lg font-bold text-ink">Asia Engineer</p>
        <h1 className="mt-2 text-2xl font-bold text-ink">Masuk ke Dashboard</h1>
        <p className="mt-2 text-sm text-muted">Khusus untuk tim internal Asia Engineer.</p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
