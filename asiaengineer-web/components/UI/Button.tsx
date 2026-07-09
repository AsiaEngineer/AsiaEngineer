import { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from '@/lib/utils/clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-button font-body font-medium transition-all duration-hover',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeStyles[size],
        variant === 'primary' &&
          'bg-primary text-white shadow-soft-sm hover:bg-primary-dark hover:shadow-soft-md active:scale-[0.98]',
        variant === 'secondary' &&
          'border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
