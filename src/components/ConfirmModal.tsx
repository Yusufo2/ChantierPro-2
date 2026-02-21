import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export function ConfirmModal({ isOpen, onClose, onConfirm, title, message }: ConfirmModalProps) {
  const { t } = useApp();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-400">
            <AlertTriangle size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{message}</p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {t('cancel' as any)}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              {t('delete')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
