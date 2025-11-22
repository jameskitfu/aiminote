import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? '切换到日间模式' : '切换到夜间模式'}
      className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};

export default ThemeToggle;

