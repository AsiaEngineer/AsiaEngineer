import { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`py-24 lg:py-[120px] ${dark ? "bg-ink text-white" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] ${
        dark ? "text-white/60" : "text-muted"
      }`}
    >
      <span className="h-px w-8 bg-accent" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {eyebrow ? <SectionLabel dark={dark}>{eyebrow}</SectionLabel> : null}
      <h2
        className={`text-balance text-[32px] font-bold leading-[1.1] sm:text-[40px] lg:text-[56px] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-6 text-lg leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
