import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useReactToPrint } from 'react-to-print';
import { Printer, Share2, Download, Calendar, MapPin, User, Cloud, Copy, Mail, Check, Languages, Loader2 } from 'lucide-react';
import { BackButton } from '../components/BackButton';
import { generateReportContent } from '../lib/gemini';

export default function ReportView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reports, t, language, setLanguage, updateReport } = useApp();
  const report = reports.find(r => r.id === id);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `Report-${report?.projectName}-${report?.date}`,
  });

  const handleLanguageSwitch = async () => {
    if (!report) return;
    const newLang = language === 'fr' ? 'ar' : 'fr';
    setLanguage(newLang);
    
    // Regenerate content in new language
    setRegenerating(true);
    try {
      const aiContent = await generateReportContent(report, newLang);
      const updatedReport = {
        ...report,
        aiSummary: aiContent.summary,
        aiRecommendations: aiContent.recommendations
      };
      updateReport(updatedReport);
    } catch (error) {
      console.error("Failed to regenerate report:", error);
    } finally {
      setRegenerating(false);
    }
  };

  const handleCopySummary = () => {
    if (!report) return;
    const summary = `*${report.projectName} - ${report.date}*\n\n*${t('progress')}:* ${report.progress}%\n*${t('location')}:* ${report.location}\n\n*${t('executive_summary')}:*\n${report.aiSummary}\n\n*${t('issues_risks')}:*\n${report.issues || 'None'}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmail = () => {
    if (!report) return;
    const subject = `${t('app_name')}: ${report.projectName} - ${report.date}`;
    const body = `${t('executive_summary')}:\n${report.aiSummary}\n\n${t('link')}: ${window.location.href}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (!report) {
    return <div className="text-center py-20">{t('no_reports')}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 print:hidden">
        <BackButton to="/dashboard" />

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleLanguageSwitch}
            disabled={regenerating}
            className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg font-medium transition-all shadow-sm disabled:opacity-50"
          >
            {regenerating ? <Loader2 size={18} className="animate-spin" /> : <Languages size={18} />}
            {language === 'fr' ? 'العربية' : 'Français'}
          </button>

          <button
            onClick={handleCopySummary}
            className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg font-medium transition-all shadow-sm"
          >
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
            {copied ? t('copied') : t('copy_summary')}
          </button>
          
          <button
            onClick={handleEmail}
            className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg font-medium transition-all shadow-sm"
          >
            <Mail size={18} />
            {t('email_report')}
          </button>

          <button
            onClick={() => handlePrint()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-blue-500/20 transition-all"
          >
            <Printer size={18} />
            {t('print')}
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white text-gray-900 shadow-xl rounded-none md:rounded-2xl overflow-hidden print:shadow-none print:rounded-none" ref={contentRef}>
        {/* Header */}
        <div className="bg-slate-900 text-white p-8 print:bg-slate-900 print:text-white print-color-adjust-exact">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t('app_name')}</h1>
              <p className="opacity-80 text-sm">Daily Construction Report</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold">{report.projectName}</h2>
              <p className="opacity-80">{report.date}</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Meta Data Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-xl border border-gray-100 print:bg-gray-50 print:border-gray-200">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('location')}</p>
              <p className="font-semibold flex items-center gap-2">
                <MapPin size={16} className="text-blue-500" />
                {report.location}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('weather')}</p>
              <p className="font-semibold flex items-center gap-2">
                <Cloud size={16} className="text-blue-500" />
                {t(`weather_${report.weather.toLowerCase()}` as any)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('authorName' as any) || 'Ingénieur'}</p>
              <p className="font-semibold flex items-center gap-2">
                <User size={16} className="text-blue-500" />
                {report.authorName}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('progress')}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${report.progress}%` }}></div>
                </div>
                <span className="font-bold text-blue-600">{report.progress}%</span>
              </div>
            </div>
          </div>

          {/* AI Summary Section */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4 uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              {t('executive_summary')}
            </h3>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-gray-800 leading-relaxed text-justify print:bg-blue-50 print:border-blue-100">
              {report.aiSummary}
            </div>
          </section>

          {/* Two Column Layout for Workers & Materials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4 uppercase tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                {t('workers')}
              </h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="p-3 rounded-l-lg">{t('role')}</th>
                    <th className="p-3 rounded-r-lg text-right">{t('count')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {report.workers.map((w, i) => (
                    <tr key={i}>
                      <td className="p-3">{w.role}</td>
                      <td className="p-3 text-right font-medium">{w.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4 uppercase tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                {t('materials')}
              </h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="p-3 rounded-l-lg">{t('material_name')}</th>
                    <th className="p-3">{t('quantity')}</th>
                    <th className="p-3 rounded-r-lg text-right">{t('status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {report.materials.map((m, i) => (
                    <tr key={i}>
                      <td className="p-3">{m.name}</td>
                      <td className="p-3">{m.quantity}</td>
                      <td className="p-3 text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          m.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          m.status === 'low' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {t(`status_${m.status}` as any)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          {/* Issues & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4 uppercase tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                {t('issues_risks')}
              </h3>
              <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-red-900 min-h-[100px]">
                {report.issues || 'None reported.'}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4 uppercase tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                {t('recommendations')}
              </h3>
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-900 min-h-[100px] whitespace-pre-line">
                {report.aiRecommendations}
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>Generated by {t('app_name')} on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
