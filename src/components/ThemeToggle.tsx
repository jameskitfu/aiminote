import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? '切换到日间模式' : '切换到夜间模式'}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/60 bg-white/20 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:text-slate-950 dark:border-white/10 dark:bg-slate-950/55 dark:text-slate-200 dark:hover:border-brand/40 dark:hover:text-white"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};

export default ThemeToggle;

