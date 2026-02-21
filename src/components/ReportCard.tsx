import React from 'react';
import { Report } from '../types';
import { useApp } from '../context/AppContext';
import { Edit2, Trash2, Calendar, MapPin, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReportCardProps {
  report: Report;
  onEdit: (report: Report) => void;
  onDelete: (id: string) => void;
}

export function ReportCard({ report, onEdit, onDelete }: ReportCardProps) {
  const { user, t } = useApp();

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{report.projectName}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Calendar size={12} />
            {report.date}
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          report.progress >= 100 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
          report.progress >= 50 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
          'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
        }`}>
          {report.progress}%
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
          <MapPin size={14} className="text-gray-400" />
          {report.location}
        </div>
        {report.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
            {report.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
        <Link 
          to={`/report/${report.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
        >
          {t('view_details')} <FileText size={14} />
        </Link>
        
        {user?.role === 'admin' && (
          <div className="flex gap-1">
            <button
              onClick={() => onEdit(report)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(report.id)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
