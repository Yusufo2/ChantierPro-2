import React from 'react';
import { useApp } from '../context/AppContext';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Package, Settings, LogOut } from 'lucide-react';

export function Sidebar() {
  const { t, logout, user } = useApp();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen flex flex-col fixed left-0 top-0 z-20 transition-colors">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{t('app_name')}</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">AADL Algeria Tracking</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            isActive('/dashboard')
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <LayoutDashboard size={20} />
          {t('dashboard')}
        </Link>
        <Link
          to="/reports"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            isActive('/reports')
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <FileText size={20} />
          {t('reports')}
        </Link>
        <Link
          to="/materials"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            isActive('/materials')
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <Package size={20} />
          {t('materials_management' as any)}
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium"
        >
          <LogOut size={18} />
          {t('logout')}
        </button>
      </div>
    </div>
  );
}
