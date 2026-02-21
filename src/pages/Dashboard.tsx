import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Plus, FileText, Calendar, MapPin, TrendingUp, Package, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { user, reports, materials, t } = useApp();

  // Stats
  const totalReports = reports.length;
  const avgProgress = reports.length > 0 
    ? Math.round(reports.reduce((acc, curr) => acc + curr.progress, 0) / reports.length) 
    : 0;
  const totalMaterials = materials.length;
  const lowStockMaterials = materials.filter(m => m.status === 'Pending').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('welcome')}, {user?.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {t('dashboard')} - AADL Algeria
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('materials_management' as any)}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalMaterials}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-xl">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('status_pending_material' as any)}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{lowStockMaterials}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Reports List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('recent_reports')}</h2>
            <Link to="/reports" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              {t('view_details')}
            </Link>
          </div>
          
          {reports.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
              <FileText className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">{t('no_reports')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {reports.slice(0, 3).map((report) => (
                <div
                  key={report.id}
                  className="group bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{report.projectName}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <Calendar size={14} />
                      {report.date}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.progress >= 100 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    report.progress >= 50 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                  }`}>
                    {report.progress}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Materials */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('materials_management' as any)}</h2>
            <Link to="/materials" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              {t('view_details')}
            </Link>
          </div>
          
          {materials.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
              <Package className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No materials found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {materials.slice(0, 3).map((material) => (
                <div
                  key={material.id}
                  className="group bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{material.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{material.usage}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    material.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    material.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {material.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
