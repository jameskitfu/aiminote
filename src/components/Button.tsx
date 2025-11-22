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

const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'text-white bg-brand hover:bg-brand-700 focus:ring-brand',
  secondary: 'text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 focus:ring-brand',
  outline: 'text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:ring-brand',
  ghost: 'text-slate-700 dark:text-slate-200 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-700 focus:ring-brand',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
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
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} shadow-sm ${className}`}
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
