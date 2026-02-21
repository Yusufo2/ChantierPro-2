import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Building2, HardHat, Wrench } from 'lucide-react';

export default function Login() {
  const { login, t, setLanguage, language } = useApp();
  const [name, setName] = useState('');
  const [role, setRole] = useState<'engineer' | 'admin' | 'technician'>('engineer');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name, role);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5 pointer-events-none">
         <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 z-10 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg transform rotate-3">
            <Building2 size={32} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          {t('app_name')}
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          {t('login_subtitle')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('name_label')}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('role_label')}
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setRole('engineer')}
                className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                  role === 'engineer'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                    : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <HardHat size={24} />
                <span className="text-sm font-medium text-center">{t('role_engineer')}</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('technician')}
                className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                  role === 'technician'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                    : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <Wrench size={24} />
                <span className="text-sm font-medium text-center">{t('role_technician' as any)}</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                  role === 'admin'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                    : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <Building2 size={24} />
                <span className="text-sm font-medium text-center">{t('role_admin')}</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02]"
          >
            {t('enter_button')}
          </button>
        </form>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
            className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 font-medium"
          >
            {language === 'fr' ? 'Switch to Arabic' : 'Passer en Français'}
          </button>
        </div>
      </div>
    </div>
  );
}
