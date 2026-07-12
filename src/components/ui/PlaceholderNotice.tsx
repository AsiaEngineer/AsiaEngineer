export function PlaceholderNotice({ label = "Segera diisi Admin" }: { label?: string }) {
  return <span className="placeholder-badge">{label}</span>;
}
