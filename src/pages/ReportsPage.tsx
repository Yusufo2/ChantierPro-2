import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Report } from '../types';
import { ReportCard } from '../components/ReportCard';
import { ModalForm } from '../components/ModalForm';
import { ConfirmModal } from '../components/ConfirmModal';
import { Plus, Search, Filter } from 'lucide-react';
import { generateId } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export default function ReportsPage() {
  const { reports, addReport, updateReport, deleteReport, user, t } = useApp();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<Partial<Report>>({
    projectName: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    progress: 0,
    description: '',
    weather: 'Sunny',
    status: 'draft',
    workers: [],
    materials: []
  });

  const handleOpenModal = (report?: Report) => {
    if (report) {
      setEditingReport(report);
      setFormData(report);
      setIsModalOpen(true);
    } else {
      // Redirect to new report page for creating reports as it's more complex
      navigate('/new');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReport) {
      updateReport({ ...editingReport, ...formData } as Report);
      setIsModalOpen(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteReport(deletingId);
      setDeletingId(null);
    }
  };

  const filteredReports = reports.filter(r => 
    r.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('reports')}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Track construction site progress</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-blue-500/20 transition-all"
        >
          <Plus size={18} />
          {t('create_new')}
        </button>
      </div>

      <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white"
          />
        </div>
        <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <Filter size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map(report => (
          <ReportCard
            key={report.id}
            report={report}
            onEdit={handleOpenModal}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('edit_material' as any).replace('Material', 'Report')} // Quick hack for title
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('project_name')}</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none dark:text-white"
              value={formData.projectName}
              onChange={e => setFormData({ ...formData, projectName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('location')}</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none dark:text-white"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('progress')}</label>
            <input
              type="number"
              min="0"
              max="100"
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none dark:text-white"
              value={formData.progress}
              onChange={e => setFormData({ ...formData, progress: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('description' as any)}</label>
            <textarea
              className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none dark:text-white h-24 resize-none"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {t('cancel' as any)}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('save' as any)}
            </button>
          </div>
        </form>
      </ModalForm>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t('confirm_delete' as any)}
        message="Are you sure you want to delete this report? This action cannot be undone."
      />
    </div>
  );
}
