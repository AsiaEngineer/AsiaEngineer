"use client";

export default function DeleteButton({
  action,
  confirmText = "Yakin ingin menghapus data ini?",
}: {
  action: (formData: FormData) => void;
  confirmText?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className="text-sm font-medium text-red-500 hover:text-red-600">
        Hapus
      </button>
    </form>
  );
}
