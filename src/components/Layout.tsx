import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, Home, FileText, LogIn, LogOut, X, Menu, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitch from '@/components/LanguageSwitch';
import { useI18n } from '@/contexts/I18nContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { t } = useI18n();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('nav_home'), href: '/', icon: Home },
    { name: t('nav_articles'), href: '/articles', icon: FileText },
    { name: t('nav_about'), href: '/about', icon: User },
  ];

  const adminNavigation = [
    { name: t('nav_create'), href: '/create-article', icon: Plus },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-surface-warm dark:bg-deep-slate dark:text-slate-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-brand-700 dark:text-slate-100" />
              <span className="text-xl font-heading font-bold text-slate-900 dark:text-slate-100">{t('app_title')}</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-brand bg-brand/15'
                        : 'text-slate-700 dark:text-slate-300 hover:text-brand hover:bg-brand/15'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              {/* Admin navigation */}
              {isAuthenticated && adminNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-brand bg-brand/15'
                        : 'text-slate-700 dark:text-slate-300 hover:text-brand hover:bg-brand/15'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Login button */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <LanguageSwitch />
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-slate-600 dark:text-slate-300">欢迎, {user?.username}</span>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>退出</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700"
                >
                  <LogIn className="h-4 w-4" />
                  <span>登录</span>
                </Link>
              )}
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700"
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

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-900 bg-blue-50 dark:text-blue-100 dark:bg-blue-900/30'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {/* Admin navigation for mobile */}
            {isAuthenticated && adminNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-green-900 bg-green-50 dark:text-green-100 dark:bg-green-900/30'
                      : 'text-green-600 hover:text-green-900 hover:bg-green-100 dark:text-green-300 dark:hover:text-green-100 dark:hover:bg-green-900/30'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700"
              >
                <LogOut className="h-4 w-4" />
                <span>退出</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700"
              >
                <LogIn className="h-4 w-4" />
                <span>登录</span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-left">
            <p className="text-sm text-slate-400">
              © 2024 爱米的前端小笔记. 专注于前端技术分享
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
