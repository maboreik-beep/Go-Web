import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    'myWebsite': 'My Website',
    'notPublished': 'Not Published',
    'editSite': 'Edit Site',
    'publish': 'Publish',
    'createFromBrochure': 'Create from Brochure',
    'brochureDescription': 'Upload a PDF and let AI build your website instantly.',
    'startWithAI': 'Start with AI',
    'upgradePlan': 'Upgrade Your Plan',
    'upgradeDescription': 'Unlock premium templates and advanced features.',
    'viewPlans': 'View Plans',
    'logout': 'Logout',
    'goLive': 'Go Live',
    'freeUrlLabel': 'Your Free Website URL',
    'slugPlaceholder': 'your-business-name',
    'publishing': 'Publishing...',
    'updateAndPublish': 'Update & Publish',
    'publishSite': 'Publish Site',
    'or': 'OR',
    'connectYourDomain': 'Connect Your Domain',
    'getNewDomain': 'Get a New Domain',
    'connectDomainTitle': 'Connect Your Domain',
    'connectDomainDesc': 'To connect a domain you already own, you need to update its DNS records.',
    'connectStep1Title': 'Step 1: Add an A Record',
    'connectStep1Desc': 'Log in to your domain provider and create an A record pointing to our server IP address:',
    'connectStep2Title': 'Step 2: Add a CNAME Record (for www)',
    'connectStep2Desc': "Create a CNAME record for 'www' that points to your root domain:",
    'dnsWarning': 'DNS changes can take up to 48 hours to propagate. This is a simplified guide for demonstration.',
    'backToPublishing': 'Back to Publishing',
    'findDomainTitle': 'Find a New Domain',
    'findDomainDesc': 'Search for your perfect domain name. You will be redirected to a trusted registrar to complete your purchase.',
    'search': 'Search',
    'domainSearchWarning': 'Domain availability check is a simulation. You will complete your purchase on GoDaddy.com.',
    'errorEnterSlug': 'Please enter a URL slug for your free subdomain.',
    'alertSiteLive': 'Site preview is live!\nIn a real app, your site would be available at:',
    'buildWithAI': 'Build with AI',
    'generatingTitle': 'AI is Building Your Site...',
    'generatingDesc': "This may take a moment. Please don't close this window.",
    'uploadPDF': 'Upload PDF',
    'importFromURL': 'Import from URL',
    'uploadYourBrochure': 'Upload your brochure',
    'clickToUpload': 'Click to upload a PDF',
    'pdfMaxSize': 'PDF up to 5MB',
    'generateWebsite': 'Generate Website',
    'brochureURL': 'Brochure URL',
    'urlNote': 'Note: Due to browser security, this is a demonstration. Please use PDF upload.',
    'errorInvalidPDF': 'Please upload a valid PDF file.',
    'errorFileSize': 'File is too large. Maximum size is 5MB.',
    'errorSelectFile': 'Please select a file to begin.',
    'errorUnknownBrochure': 'An unknown error occurred. Please try a different file.',
    'errorFailedBrochure': 'Failed to generate website from brochure.',
    'errorEnterURL': 'Please enter a URL.',
    'alertCorsWarning': "Due to web browser security restrictions (CORS), fetching directly from a URL is not reliably possible in this demo. Please use the 'Upload PDF' option instead.",
  },
  ar: {
    'myWebsite': 'موقعي الإلكتروني',
    'notPublished': 'غير منشور',
    'editSite': 'تعديل الموقع',
    'publish': 'نشر',
    'createFromBrochure': 'إنشاء من كتيب',
    'brochureDescription': 'قم بتحميل ملف PDF ودع الذكاء الاصطناعي يبني موقعك على الفور.',
    'startWithAI': 'ابدأ بالذكاء الاصطناعي',
    'upgradePlan': 'ترقية خطتك',
    'upgradeDescription': 'افتح قوالب مميزة وميزات متقدمة.',
    'viewPlans': 'عرض الخطط',
    'logout': 'تسجيل الخروج',
    'goLive': 'إطلاق الموقع',
    'freeUrlLabel': 'عنوان URL المجاني لموقعك',
    'slugPlaceholder': 'اسم-عملك',
    'publishing': 'جاري النشر...',
    'updateAndPublish': 'تحديث ونشر',
    'publishSite': 'نشر الموقع',
    'or': 'أو',
    'connectYourDomain': 'ربط نطاقك الخاص',
    'getNewDomain': 'الحصول على نطاق جديد',
    'connectDomainTitle': 'ربط نطاقك',
    'connectDomainDesc': 'لربط نطاق تملكه بالفعل، تحتاج إلى تحديث سجلات DNS الخاصة به.',
    'connectStep1Title': 'الخطوة 1: أضف سجل A',
    'connectStep1Desc': 'سجل الدخول إلى مزود النطاق الخاص بك وأنشئ سجل A يشير إلى عنوان IP الخاص بخادمنا:',
    'connectStep2Title': 'الخطوة 2: أضف سجل CNAME (لـ www)',
    'connectStep2Desc': "أنشئ سجل CNAME لـ 'www' يشير إلى نطاقك الجذري:",
    'dnsWarning': 'قد تستغرق تغييرات DNS ما يصل إلى 48 ساعة للانتشار. هذا دليل مبسط للعرض التوضيحي.',
    'backToPublishing': 'العودة إلى النشر',
    'findDomainTitle': 'البحث عن نطاق جديد',
    'findDomainDesc': 'ابحث عن اسم النطاق المثالي لك. سيتم إعادة توجيهك إلى مسجل موثوق به لإكمال عملية الشراء.',
    'search': 'بحث',
    'domainSearchWarning': 'التحقق من توفر النطاق هو محاكاة. ستكمل عملية الشراء على GoDaddy.com.',
    'errorEnterSlug': 'الرجاء إدخال اسم URL لعنوان نطاقك الفرعي المجاني.',
    'alertSiteLive': 'معاينة الموقع مباشرة الآن!\nفي تطبيق حقيقي، سيكون موقعك متاحًا على:',
    'buildWithAI': 'أنشئ بالذكاء الاصطناعي',
    'generatingTitle': 'الذكاء الاصطناعي يبني موقعك...',
    'generatingDesc': 'قد يستغرق هذا بعض الوقت. الرجاء عدم إغلاق هذه النافذة.',
    'uploadPDF': 'تحميل PDF',
    'importFromURL': 'استيراد من URL',
    'uploadYourBrochure': 'قم بتحميل الكتيب الخاص بك',
    'clickToUpload': 'انقر لتحميل ملف PDF',
    'pdfMaxSize': 'PDF حتى 5 ميجابايت',
    'generateWebsite': 'إنشاء موقع إلكتروني',
    'brochureURL': 'عنوان URL للكتيب',
    'urlNote': 'ملاحظة: بسبب قيود أمان متصفح الويب، هذا للعرض فقط. يرجى استخدام خيار تحميل PDF.',
    'errorInvalidPDF': 'الرجاء تحميل ملف PDF صالح.',
    'errorFileSize': 'حجم الملف كبير جدًا. الحجم الأقصى هو 5 ميجابايت.',
    'errorSelectFile': 'الرجاء تحديد ملف للبدء.',
    'errorUnknownBrochure': 'حدث خطأ غير معروف. يرجى تجربة ملف مختلف.',
    'errorFailedBrochure': 'فشل إنشاء الموقع من الكتيب.',
    'errorEnterURL': 'الرجاء إدخال عنوان URL.',
    'alertCorsWarning': 'بسبب قيود أمان متصفح الويب (CORS)، لا يمكن الجلب مباشرة من عنوان URL بشكل موثوق في هذا العرض التوضيحي. يرجى استخدام خيار "تحميل PDF" بدلاً من ذلك.',
  }
};


interface LocaleContextType {
    lang: 'en' | 'ar';
    setLang: (lang: 'en' | 'ar') => void;
    t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [lang, setLang] = useState<'en' | 'ar'>('en');

    useEffect(() => {
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'ar') {
            setLang('ar');
        }
    }, []);

    const t = (key: string): string => {
        return translations[lang]?.[key] || translations['en']?.[key] || key;
    };

    const value = { lang, setLang, t };

    return (
        <LocaleContext.Provider value={value}>
            {children}
        </LocaleContext.Provider>
    );
};

export const useLocale = (): LocaleContextType => {
    const context = useContext(LocaleContext);
    if (context === undefined) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
};
