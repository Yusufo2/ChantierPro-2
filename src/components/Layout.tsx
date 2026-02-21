import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useApp } from '../context/AppContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const { dir } = useApp();
  
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors" dir={dir}>
      <Sidebar />
      <div className={`flex-1 flex flex-col ${dir === 'rtl' ? 'mr-64' : 'ml-64'}`}>
        <Navbar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
