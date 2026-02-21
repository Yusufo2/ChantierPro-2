import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Plus, FileText, Calendar, MapPin, TrendingUp, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { BackButton } from '../components/BackButton';

export default function Dashboard() {
  const { user, reports, t, deleteReport } = useApp();

  // Simple stats
  const totalReports = reports.length;
  const avgProgress = reports.length > 0 
    ? Math.round(reports.reduce((acc, curr) => acc + curr.progress, 0) / reports.length) 
    : 0;
  const uniqueSites = new Set(reports.map(r => r.projectName)).size;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="mb-4">
        <BackButton to="/" label={t('back_to_home')} />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('welcome')}, {user?.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {t('dashboard')}
          </p>
        </div>
        <Link
          to="/new"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-all transform hover:scale-105"
        >
          <Plus size={20} />
          {t('create_new')}
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('total_reports')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalReports}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('avg_progress')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgProgress}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl">
              <Building2 size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('active_sites')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{uniqueSites}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('recent_reports')}</h2>
        
        {reports.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
            <FileText className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">{t('no_reports')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="group bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{report.projectName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.progress >= 100 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      report.progress >= 50 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                    }`}>
                      {report.progress}%
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {report.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      {report.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{report.authorName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/report/${report.id}`}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors"
                  >
                    {t('view_details')}
                  </Link>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => {
                        if (window.confirm(t('delete_confirm'))) {
                          deleteReport(report.id);
                        }
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title={t('delete')}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { Building2 } from 'lucide-react';
