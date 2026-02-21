import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Report } from '../types';
import { generateId } from '../lib/utils';
import { generateReportContent } from '../lib/gemini';
import { Save, Sparkles, Plus, Trash2, Loader2 } from 'lucide-react';
import { BackButton } from '../components/BackButton';

export default function NewReport() {
  const { user, addReport, t, language } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<Report>>({
    projectName: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    weather: 'Sunny',
    progress: 0,
    workers: [{ role: 'General', count: 0 }],
    materials: [{ name: '', quantity: '', status: 'pending' }],
    issues: '',
  });

  // ... (rest of the component state and handlers)

  const handleInputChange = (field: keyof Report, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateWorker = (index: number, field: string, value: any) => {
    const newWorkers = [...(formData.workers || [])];
    newWorkers[index] = { ...newWorkers[index], [field]: value };
    setFormData(prev => ({ ...prev, workers: newWorkers }));
  };

  const addWorker = () => {
    setFormData(prev => ({
      ...prev,
      workers: [...(prev.workers || []), { role: '', count: 0 }]
    }));
  };

  const removeWorker = (index: number) => {
    setFormData(prev => ({
      ...prev,
      workers: prev.workers?.filter((_, i) => i !== index)
    }));
  };

  const updateMaterial = (index: number, field: string, value: any) => {
    const newMaterials = [...(formData.materials || [])];
    newMaterials[index] = { ...newMaterials[index], [field]: value };
    setFormData(prev => ({ ...prev, materials: newMaterials }));
  };

  const addMaterial = () => {
    setFormData(prev => ({
      ...prev,
      materials: [...(prev.materials || []), { name: '', quantity: '', status: 'pending' }]
    }));
  };

  const removeMaterial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Generate AI Content
    const aiContent = await generateReportContent(formData, language);

    const newReport: Report = {
      id: generateId(),
      ...formData as Report,
      aiSummary: aiContent.summary,
      aiRecommendations: aiContent.recommendations,
      status: 'finalized',
      authorId: user!.id,
      authorName: user!.name,
      createdAt: Date.now(),
    };

    addReport(newReport);
    setLoading(false);
    navigate(`/report/${newReport.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="mb-6">
        <BackButton />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('new_report')}</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Project Details */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
            {t('project_details')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('project_name')}</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                value={formData.projectName}
                onChange={e => handleInputChange('projectName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('location')}</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                value={formData.location}
                onChange={e => handleInputChange('location', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('date')}</label>
              <input
                type="date"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                value={formData.date}
                onChange={e => handleInputChange('date', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('weather')}</label>
              <select
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                value={formData.weather}
                onChange={e => handleInputChange('weather', e.target.value)}
              >
                <option value="Sunny">{t('weather_sunny')}</option>
                <option value="Cloudy">{t('weather_cloudy')}</option>
                <option value="Rainy">{t('weather_rainy')}</option>
                <option value="Windy">{t('weather_windy')}</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('progress')} ({formData.progress}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                value={formData.progress}
                onChange={e => handleInputChange('progress', parseInt(e.target.value))}
              />
            </div>
          </div>
        </section>

        {/* Workers */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full"></span>
              {t('workers')}
            </h2>
            <button
              type="button"
              onClick={addWorker}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <Plus size={16} /> {t('add_worker')}
            </button>
          </div>
          <div className="space-y-3">
            {formData.workers?.map((worker, index) => (
              <div key={index} className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">{t('role')}</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none dark:text-white"
                    value={worker.role}
                    onChange={e => updateWorker(index, 'role', e.target.value)}
                  />
                </div>
                <div className="w-24">
                  <label className="text-xs text-gray-500 mb-1 block">{t('count')}</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none dark:text-white"
                    value={worker.count}
                    onChange={e => updateWorker(index, 'count', parseInt(e.target.value))}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeWorker(index)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg mb-[2px]"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Materials */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
              {t('materials')}
            </h2>
            <button
              type="button"
              onClick={addMaterial}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <Plus size={16} /> {t('add_material')}
            </button>
          </div>
          <div className="space-y-3">
            {formData.materials?.map((material, index) => (
              <div key={index} className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-5">
                  <label className="text-xs text-gray-500 mb-1 block">{t('material_name')}</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none dark:text-white"
                    value={material.name}
                    onChange={e => updateMaterial(index, 'name', e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <label className="text-xs text-gray-500 mb-1 block">{t('quantity')}</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none dark:text-white"
                    value={material.quantity}
                    onChange={e => updateMaterial(index, 'quantity', e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <label className="text-xs text-gray-500 mb-1 block">{t('status')}</label>
                  <select
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none dark:text-white text-sm"
                    value={material.status}
                    onChange={e => updateMaterial(index, 'status', e.target.value)}
                  >
                    <option value="pending">{t('status_pending')}</option>
                    <option value="delivered">{t('status_delivered')}</option>
                    <option value="low">{t('status_low')}</option>
                  </select>
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeMaterial(index)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg mb-[2px]"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Issues */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-red-500 rounded-full"></span>
            {t('issues_risks')}
          </h2>
          <textarea
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white h-32 resize-none"
            placeholder={t('describe_issues')}
            value={formData.issues}
            onChange={e => handleInputChange('issues', e.target.value)}
          />
        </section>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                {t('generating')}
              </>
            ) : (
              <>
                <Sparkles size={20} />
                {t('generate_ai')}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
