import React from 'react';
import { useApp } from '../context/AppContext';
import { Moon, Sun, Bell, Search } from 'lucide-react';

export function Navbar() {
  const { theme, toggleTheme, language, setLanguage } = useApp();

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 sticky top-0 z-10 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
          className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {language === 'fr' ? 'AR' : 'FR'}
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
