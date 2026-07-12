"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { Button } from "@/components/ui/Button";

const initialState: ContactFormState = { success: false, message: "" };

const PROJECT_TYPES = [
  "Rumah Tinggal",
  "Gedung Komersial",
  "Fasilitas Industrial",
  "Renovasi",
  "Interior Fit-Out",
  "Lainnya",
];

const BUDGET_RANGES = [
  "< Rp 500 Juta",
  "Rp 500 Juta – Rp 1 Miliar",
  "Rp 1 – 5 Miliar",
  "> Rp 5 Miliar",
  "Belum menentukan",
];

function fieldClass(hasError?: boolean) {
  return `w-full rounded-[14px] border bg-white px-5 py-4 text-sm text-ink placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 ${
    hasError ? "border-red-400" : "border-line focus:border-accent"
  }`;
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
            Nama Lengkap
          </label>
          <input id="name" name="name" required className={fieldClass(!!state.errors?.name)} placeholder="Nama Anda" />
          {state.errors?.name && <p className="mt-1 text-xs text-red-500">{state.errors.name}</p>}
        </div>
        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-ink">
            Perusahaan (opsional)
          </label>
          <input id="company" name="company" className={fieldClass()} placeholder="Nama perusahaan" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
            Email
          </label>
          <input id="email" name="email" type="email" required className={fieldClass(!!state.errors?.email)} placeholder="nama@email.com" />
          {state.errors?.email && <p className="mt-1 text-xs text-red-500">{state.errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink">
            Nomor Telepon / WhatsApp
          </label>
          <input id="phone" name="phone" required className={fieldClass(!!state.errors?.phone)} placeholder="08xxxxxxxxxx" />
          {state.errors?.phone && <p className="mt-1 text-xs text-red-500">{state.errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-ink">
            Jenis Proyek
          </label>
          <select id="projectType" name="projectType" className={fieldClass()} defaultValue="">
            <option value="" disabled>
              Pilih jenis proyek
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="mb-2 block text-sm font-medium text-ink">
            Estimasi Anggaran
          </label>
          <select id="budget" name="budget" className={fieldClass()} defaultValue="">
            <option value="" disabled>
              Pilih kisaran anggaran
            </option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location" className="mb-2 block text-sm font-medium text-ink">
            Lokasi Proyek
          </label>
          <input id="location" name="location" className={fieldClass()} placeholder="Kota / Provinsi" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Ceritakan Kebutuhan Anda
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={fieldClass(!!state.errors?.message)}
          placeholder="Jelaskan proyek yang Anda rencanakan..."
        />
        {state.errors?.message && <p className="mt-1 text-xs text-red-500">{state.errors.message}</p>}
      </div>

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Mengirim..." : "Kirim Permintaan"}
      </Button>

      {state.message && (
        <p
          role="status"
          className={`rounded-xl px-4 py-3 text-sm ${
            state.success ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
