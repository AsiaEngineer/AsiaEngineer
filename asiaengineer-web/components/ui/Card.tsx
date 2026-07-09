import { HTMLAttributes, ReactNode } from 'react';
import { clsx } from '@/lib/utils/clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
}

/**
 * Card dasar — dipakai sebagai fondasi CardPortofolio & CardLayanan
 * di /components/sections. Jangan taruh logic spesifik konten di sini,
 * biar tetap reusable untuk keperluan lain (misal card di admin).
 */
export function Card({ children, hoverable = false, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-card bg-white shadow-soft-sm overflow-hidden',
        hoverable &&
          'transition-all duration-hover hover:shadow-soft-lg hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
