import React from 'react';
import { Material } from '../types';
import { useApp } from '../context/AppContext';
import { Edit2, Trash2, Package } from 'lucide-react';

interface MaterialCardProps {
  material: Material;
  onEdit: (material: Material) => void;
  onDelete: (id: string) => void;
}

export function MaterialCard({ material, onEdit, onDelete }: MaterialCardProps) {
  const { user, t } = useApp();

  const getStatusColor = (status: Material['status']) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'In Progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
            <Package size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{material.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{material.thickness}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(material.status)}`}>
          {t(`status_${material.status.toLowerCase().replace(' ', '_')}` as any) || material.status}
        </span>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium text-gray-500 dark:text-gray-400 mr-2">{t('usage' as any)}:</span>
          {material.usage}
        </p>
      </div>

      {user?.role === 'admin' && (
        <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => onEdit(material)}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(material.id)}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
