import React from 'react';
import { useApp } from '../context/AppContext';
import { Moon, Sun, Languages, LogOut, LayoutDashboard, FileText, Settings, Plus, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme, language, setLanguage, user, logout, t, dir } = useApp();
  const location = useLocation();

  if (!user) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">{children}</div>;
  }

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'home' },
    { path: '/new', icon: Plus, label: 'new_report' },
  ];

  if (user.role === 'admin') {
    // Admin specific links could go here
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col md:flex-row">
      {/* Sidebar / Mobile Header */}
      <aside className="bg-white dark:bg-gray-800 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 w-full md:w-64 flex-shrink-0 flex flex-col transition-colors duration-200">
        <div className="p-4 flex items-center justify-between md:block">
          <div className="flex items-center gap-2 mb-0 md:mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              CP
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">{t('app_name')}</span>
          </div>

          {/* Mobile Menu Toggle could go here, but keeping simple for now */}
          <div className="md:hidden flex items-center gap-2">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>

        <nav className="flex-1 px-2 md:px-4 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                location.pathname === item.path
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              )}
            >
              <item.icon size={18} />
              {t(item.label as any)}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2 hidden md:block">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <button
              onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors font-bold"
              title="Switch Language"
            >
              {language === 'fr' ? 'AR' : 'FR'}
            </button>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 mt-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{t(`role_${user.role}` as any)}</p>
            </div>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 px-2"
              title={t('logout')}
            >
              <LogOut size={18} />
              <span className="text-xs font-medium uppercase hidden md:inline-block">{t('logout')}</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
