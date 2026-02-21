export type Language = 'fr' | 'ar';
export type Role = 'engineer' | 'admin' | 'technician';

export interface User {
  id: string;
  name: string;
  role: Role;
}

export interface Material {
  id: string;
  name: string;
  thickness: string;
  usage: string;
  status: 'In Progress' | 'Completed' | 'Pending';
}

export interface Report {
  id: string;
  date: string;
  projectName: string;
  location: string;
  progress: number;
  description?: string;
  images?: string[];
  weather: string;
  workers: {
    role: string;
    count: number;
  }[];
  materials: {
    name: string;
    quantity: string;
    status: 'delivered' | 'pending' | 'low';
  }[];
  issues: string;
  aiSummary?: string;
  aiRecommendations?: string;
  status: 'draft' | 'finalized';
  authorId: string;
  authorName: string;
  createdAt: number;
}

export const TRANSLATIONS = {
  fr: {
    app_name: 'ChantierPro',
    login_title: 'Connexion',
    login_subtitle: 'Accédez à votre espace de gestion de chantier',
    name_label: 'Nom complet',
    role_label: 'Rôle',
    role_engineer: 'Ingénieur Civil',
    role_admin: 'Administrateur',
    role_technician: 'Technicien',
    enter_button: 'Entrer',
    home: 'Accueil',
    dashboard: 'Tableau de bord',
    new_report: 'Nouveau Rapport',
    reports: 'Rapports',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    welcome: 'Bienvenue',
    recent_reports: 'Rapports Récents',
    create_new: 'Créer un nouveau',
    no_reports: 'Aucun rapport trouvé. Commencez par en créer un.',
    project_details: 'Détails du Projet',
    project_name: 'Nom du projet',
    location: 'Lieu',
    date: 'Date',
    weather: 'Météo',
    progress: 'Progression',
    workers: 'Main d\'œuvre',
    add_worker: 'Ajouter un rôle',
    role: 'Rôle',
    count: 'Nombre',
    materials: 'Matériaux',
    add_material: 'Ajouter un matériau',
    material_name: 'Nom du matériau',
    quantity: 'Quantité',
    status: 'Statut',
    status_delivered: 'Livré',
    status_pending: 'En attente',
    status_low: 'Stock faible',
    issues_risks: 'Problèmes & Risques',
    describe_issues: 'Décrivez les problèmes rencontrés ou les risques potentiels...',
    generate_ai: 'Générer avec IA',
    generating: 'Génération en cours...',
    save_report: 'Enregistrer le rapport',
    view_details: 'Voir détails',
    delete: 'Supprimer',
    print: 'Imprimer / PDF',
    ai_analysis: 'Analyse IA',
    executive_summary: 'Résumé Exécutif',
    recommendations: 'Recommandations',
    safety: 'Sécurité',
    weather_sunny: 'Ensoleillé',
    weather_cloudy: 'Nuageux',
    weather_rainy: 'Pluvieux',
    weather_windy: 'Vent',
    back: 'Retour',
    back_to_home: 'Retour à l\'accueil',
    total_reports: 'Total Rapports',
    avg_progress: 'Progression Moyenne',
    active_sites: 'Chantiers Actifs',
    admin_panel: 'Panneau Admin',
    delete_confirm: 'Êtes-vous sûr de vouloir supprimer ce rapport ?',
    // New translations
    saved: 'Enregistré',
    saving: 'Enregistrement...',
    templates: 'Modèles',
    template_concrete: 'Bétonnage',
    template_foundation: 'Fondation',
    template_finishing: 'Finitions',
    template_general: 'Général',
    copy_summary: 'Copier le résumé',
    copied: 'Copié !',
    email_report: 'Envoyer par Email',
    low_progress_warning: 'Attention : Progression faible',
    material_shortage_warning: 'Alerte : Pénurie de matériaux',
    analyze: 'Analyser',
    whatsapp_summary: 'Résumé WhatsApp',
    // New translations for Admin Dashboard
    materials_management: 'Gestion des Matériaux',
    add_material: 'Ajouter un matériau',
    edit_material: 'Modifier le matériau',
    delete_material: 'Supprimer le matériau',
    thickness: 'Épaisseur',
    usage: 'Utilisation',
    status_in_progress: 'En cours',
    status_completed: 'Terminé',
    status_pending_material: 'En attente',
    confirm_delete: 'Confirmer la suppression',
    cancel: 'Annuler',
    save: 'Enregistrer',
    description: 'Description',
    images: 'Images',
    upload_image: 'Télécharger une image',
  },
  ar: {
    app_name: 'شانتيي برو',
    login_title: 'تسجيل الدخول',
    login_subtitle: 'الوصول إلى مساحة إدارة الموقع الخاص بك',
    name_label: 'الاسم الكامل',
    role_label: 'الدور',
    role_engineer: 'مهندس مدني',
    role_admin: 'مدير',
    role_technician: 'تقني',
    enter_button: 'دخول',
    home: 'الرئيسية',
    dashboard: 'لوحة القيادة',
    new_report: 'تقرير جديد',
    reports: 'التقارير',
    settings: 'الإعدادات',
    logout: 'خروج',
    welcome: 'مرحباً',
    recent_reports: 'التقارير الأخيرة',
    create_new: 'إنشاء جديد',
    no_reports: 'لم يتم العثور على تقارير. ابدأ بإنشاء واحد.',
    project_details: 'تفاصيل المشروع',
    project_name: 'اسم المشروع',
    location: 'الموقع',
    date: 'التاريخ',
    weather: 'الطقس',
    progress: 'التقدم',
    workers: 'العمالة',
    add_worker: 'إضافة دور',
    role: 'الدور',
    count: 'العدد',
    materials: 'المواد',
    add_material: 'إضافة مادة',
    material_name: 'اسم المادة',
    quantity: 'الكمية',
    status: 'الحالة',
    status_delivered: 'تم التسليم',
    status_pending: 'قيد الانتظار',
    status_low: 'مخزون منخفض',
    issues_risks: 'المشاكل والمخاطر',
    describe_issues: 'صف المشاكل التي تمت مواجهتها أو المخاطر المحتملة...',
    generate_ai: 'توليد باستخدام الذكاء الاصطناعي',
    generating: 'جاري التوليد...',
    save_report: 'حفظ التقرير',
    view_details: 'عرض التفاصيل',
    delete: 'حذف',
    print: 'طباعة / PDF',
    ai_analysis: 'تحليل الذكاء الاصطناعي',
    executive_summary: 'الملخص التنفيذي',
    recommendations: 'التوصيات',
    safety: 'السلامة',
    weather_sunny: 'مشمس',
    weather_cloudy: 'غائم',
    weather_rainy: 'ممطر',
    weather_windy: 'عاصف',
    back: 'عودة',
    back_to_home: 'العودة إلى الصفحة الرئيسية',
    total_reports: 'إجمالي التقارير',
    avg_progress: 'متوسط التقدم',
    active_sites: 'المواقع النشطة',
    admin_panel: 'لوحة الإدارة',
    delete_confirm: 'هل أنت متأكد أنك تريد حذف هذا التقرير؟',
    // New translations
    saved: 'تم الحفظ',
    saving: 'جاري الحفظ...',
    templates: 'القوالب',
    template_concrete: 'صب الخرسانة',
    template_foundation: 'الأساسات',
    template_finishing: 'التشطيبات',
    template_general: 'عام',
    copy_summary: 'نسخ الملخص',
    copied: 'تم النسخ!',
    email_report: 'إرسال عبر البريد الإلكتروني',
    low_progress_warning: 'تنبيه: تقدم ضعيف',
    material_shortage_warning: 'تنبيه: نقص في المواد',
    analyze: 'تحليل',
    whatsapp_summary: 'ملخص واتساب',
    // New translations for Admin Dashboard
    materials_management: 'إدارة المواد',
    add_material: 'إضافة مادة',
    edit_material: 'تعديل المادة',
    delete_material: 'حذف المادة',
    thickness: 'السمك',
    usage: 'الاستخدام',
    status_in_progress: 'قيد التنفيذ',
    status_completed: 'مكتمل',
    status_pending_material: 'قيد الانتظار',
    confirm_delete: 'تأكيد الحذف',
    cancel: 'إلغاء',
    save: 'حفظ',
    description: 'الوصف',
    images: 'الصور',
    upload_image: 'رفع صورة',
  }
};
