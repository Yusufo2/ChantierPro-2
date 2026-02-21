import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, User, Report, TRANSLATIONS } from '../types';

interface AppContextType {
  user: User | null;
  login: (name: string, role: User['role']) => void;
  logout: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  reports: Report[];
  addReport: (report: Report) => void;
  updateReport: (report: Report) => void;
  deleteReport: (id: string) => void;
  t: (key: keyof typeof TRANSLATIONS['fr']) => string;
  dir: 'ltr' | 'rtl';
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Auth State
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('cp_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Language State
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('cp_lang') as Language) || 'fr';
  });

  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('cp_theme') as 'light' | 'dark') || 'light';
  });

  // Reports State
  const [reports, setReports] = useState<Report[]>(() => {
    const saved = localStorage.getItem('cp_reports');
    return saved ? JSON.parse(saved) : [];
  });

  // Effects
  useEffect(() => {
    localStorage.setItem('cp_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cp_lang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem('cp_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('cp_reports', JSON.stringify(reports));
  }, [reports]);

  // Actions
  const login = (name: string, role: User['role']) => {
    setUser({ id: Math.random().toString(36), name, role });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addReport = (report: Report) => {
    setReports(prev => [report, ...prev]);
  };

  const updateReport = (report: Report) => {
    setReports(prev => prev.map(r => r.id === report.id ? report : r));
  };

  const deleteReport = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
  };

  const t = (key: keyof typeof TRANSLATIONS['fr']) => {
    return TRANSLATIONS[language][key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <AppContext.Provider value={{
      user, login, logout,
      language, setLanguage,
      theme, toggleTheme,
      reports, addReport, updateReport, deleteReport,
      t, dir
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
