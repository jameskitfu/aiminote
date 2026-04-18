import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
}

const baseClasses = 'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:ring-offset-0';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'border border-brand/20 bg-slate-950 text-white shadow-glow hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand-200',
  secondary: 'border border-white/10 bg-white/6 text-slate-100 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10',
  outline: 'border border-slate-300/70 bg-white/18 text-slate-800 hover:-translate-y-0.5 hover:border-brand/40 dark:border-slate-700 dark:bg-slate-950/45 dark:text-slate-100 dark:hover:border-brand/40',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100/70 dark:text-slate-200 dark:hover:bg-slate-900/50',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
};

const Button: React.FC<ButtonProps> = ({
  loading = false,
  variant = 'primary',
  size = 'md',
  leftIcon,
  className = '',
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        leftIcon ? <span className="mr-2">{leftIcon}</span> : null
      )}
      {children}
    </button>
  );
};

export default Button;
