import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, Home, FileText, X, Menu, Sparkles } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitch from '@/components/LanguageSwitch';
import { useI18n } from '@/contexts/useI18n';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { t, lang } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const copy = lang === 'zh'
    ? {
        microLabel: '女性前端未来主义站点',
        footerTitle: '静态档案，动态执迷。',
        footerText:
          'Aimi.blog 不是普通博客，而是一间持续记录界面、代码、材料与感知的前端实验室。',
      }
    : {
        microLabel: 'A feminine future-tech frontend archive',
        footerTitle: 'Static archive, dynamic obsession.',
        footerText:
          'Aimi.blog is built as a frontend atelier where interfaces, code, material, and taste are documented with intent.',
      };

  const navigation = [
    { name: t('nav_home'), href: '/', icon: Home },
    { name: t('nav_articles'), href: '/articles', icon: FileText },
    { name: t('nav_about'), href: '/about', icon: User },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="site-shell relative min-h-screen overflow-hidden flex flex-col">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-[40rem] bg-aurora-grid opacity-100" />
        <div className="absolute left-[8%] top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl dark:bg-brand/10" />
        <div className="absolute right-[10%] top-28 h-56 w-56 rounded-full bg-signal/10 blur-3xl dark:bg-signal/8" />
      </div>

      <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
        <div className="glass-panel mx-auto max-w-7xl rounded-[1.6rem] border px-4 sm:px-6">
          <div className="flex min-h-[4.8rem] items-center justify-between gap-4">
            <Link to="/" className="flex min-w-0 items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-[1.1rem] border border-brand/20 bg-slate-950 text-brand shadow-glow dark:border-brand/30 dark:bg-slate-950 dark:text-brand">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-brand/70">
                  Aimi / Frontend Systems Lab
                </p>
                <span className="block truncate font-heading text-2xl font-semibold text-slate-950 dark:text-white">
                  {t('app_title')}
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-2 rounded-full border border-slate-300/60 bg-white/40 p-1 dark:border-slate-700/80 dark:bg-slate-950/55">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                      isActive(item.href)
                        ? 'bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950'
                        : 'text-slate-600 hover:bg-slate-950/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden xl:flex items-center gap-2 rounded-full border border-brand/15 bg-white/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:border-brand/15 dark:bg-slate-950/40 dark:text-brand/75">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{copy.microLabel}</span>
              </div>
              <ThemeToggle />
              <LanguageSwitch />
              <div className="md:hidden">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/60 bg-white/55 text-slate-700 transition-colors hover:text-slate-950 dark:border-slate-700/80 dark:bg-slate-900/55 dark:text-slate-300 dark:hover:text-white"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden relative z-40 mx-4 mt-3 rounded-[1.75rem] border border-slate-300/60 bg-white/85 p-3 shadow-panel backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/85 sm:mx-6">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive(item.href)
                      ? 'bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <main className="relative z-10 flex-1 px-4 pb-16 pt-8 sm:px-6 lg:px-10">
        {children}
      </main>

      <footer className="relative z-10 px-4 pb-8 sm:px-6 lg:px-10">
        <div className="glass-panel mx-auto max-w-7xl rounded-[1.8rem] border p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">Static / authored / systems</p>
              <h2 className="font-heading text-3xl text-slate-950 dark:text-white">
                {copy.footerTitle}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                {copy.footerText}
              </p>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              <p>© 2026 Aimi.blog</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em]">
                React · Static archive · Vercel
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
