import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Material, Report } from '../types';
import { MaterialCard } from '../components/MaterialCard';
import { ReportCard } from '../components/ReportCard';
import { ModalForm } from '../components/ModalForm';
import { ConfirmModal } from '../components/ConfirmModal';
import { Plus, Search, Filter } from 'lucide-react';
import { generateId } from '../lib/utils';

export default function MaterialsPage() {
  const { materials, addMaterial, updateMaterial, deleteMaterial, user, t } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<Partial<Material>>({
    name: '',
    thickness: '',
    usage: '',
    status: 'Pending'
  });

  const handleOpenModal = (material?: Material) => {
    if (material) {
      setEditingMaterial(material);
      setFormData(material);
    } else {
      setEditingMaterial(null);
      setFormData({
        name: '',
        thickness: '',
        usage: '',
        status: 'Pending'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMaterial) {
      updateMaterial({ ...editingMaterial, ...formData } as Material);
    } else {
      addMaterial({
        id: generateId(),
        ...formData
      } as Material);
    }
    setIsModalOpen(false);
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteMaterial(deletingId);
      setDeletingId(null);
    }
  };

  const filteredMaterials = materials.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.usage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('materials_management' as any)}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage construction materials inventory</p>
        </div>
        {user?.role === 'admin' && (
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-blue-500/20 transition-all"
          >
            <Plus size={18} />
            {t('add_material' as any)}
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search materials..."
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
        {filteredMaterials.map(material => (
          <MaterialCard
            key={material.id}
            material={material}
            onEdit={handleOpenModal}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMaterial ? t('edit_material' as any) : t('add_material' as any)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('material_name')}</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none dark:text-white"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('thickness' as any)}</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none dark:text-white"
              value={formData.thickness}
              onChange={e => setFormData({ ...formData, thickness: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('usage' as any)}</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none dark:text-white"
              value={formData.usage}
              onChange={e => setFormData({ ...formData, usage: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('status')}</label>
            <select
              className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none dark:text-white"
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value as any })}
            >
              <option value="Pending">{t('status_pending_material' as any)}</option>
              <option value="In Progress">{t('status_in_progress' as any)}</option>
              <option value="Completed">{t('status_completed' as any)}</option>
            </select>
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
        message="Are you sure you want to delete this material? This action cannot be undone."
      />
    </div>
  );
}
