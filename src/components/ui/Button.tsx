import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(255,107,0,0.28)] active:scale-[0.98]",
  secondary:
    "bg-transparent border border-white/70 text-white hover:bg-white hover:text-ink active:scale-[0.98]",
  ghost:
    "bg-transparent text-current underline-offset-4 hover:underline px-0",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[14px] px-9 py-4 text-sm font-semibold tracking-wide transition-all duration-300 ease-out";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  icon,
  ...rest
}: CommonProps & { href: string; target?: string; rel?: string }) {
  const classes = variant === "ghost" ? `${base.replace("px-9 py-4", "")} ${variantClasses.ghost} ${className}` : `${base} ${variantClasses[variant]} ${className}`;
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
      {icon}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  icon,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = variant === "ghost" ? `${base.replace("px-9 py-4", "")} ${variantClasses.ghost} ${className}` : `${base} ${variantClasses[variant]} ${className}`;
  return (
    <button className={classes} {...rest}>
      {children}
      {icon}
    </button>
  );
}
