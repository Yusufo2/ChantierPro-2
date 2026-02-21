import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

interface BackButtonProps {
  to?: string;
  className?: string;
  label?: string;
}

export function BackButton({ to, className, label }: BackButtonProps) {
  const navigate = useNavigate();
  const { t, dir } = useApp();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={cn(
        "group flex items-center gap-2 px-5 py-2.5 rounded-xl",
        "bg-white dark:bg-gray-800",
        "border border-gray-200 dark:border-gray-700",
        "text-gray-600 dark:text-gray-300",
        "hover:border-blue-500 dark:hover:border-blue-500",
        "hover:text-blue-600 dark:hover:text-blue-400",
        "hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20",
        "transition-all duration-300 ease-out",
        className
      )}
    >
      <ArrowLeft 
        size={20} 
        className={cn(
          "transition-transform duration-300",
          dir === 'rtl' ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"
        )} 
      />
      <span className="font-medium text-sm uppercase tracking-wide">{label || t('back')}</span>
    </button>
  );
}
