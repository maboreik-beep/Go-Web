import { Page, LanguageMode, PageType, TextContent, ServiceItem, TeamMemberItem, FAQItem, FeatureItem, PricingTier, GalleryItem } from "../types";
import { AVAILABLE_SECTIONS } from "../constants";

const createDefaultText = (en: string, ar: string, mode: LanguageMode): TextContent => {
    if (mode === 'bilingual') return { en, ar };
    if (mode === 'ar') return ar;
    return en;
};

const createBasePage = (mode: LanguageMode): Omit<Page, 'id' | 'name' | 'slug' | 'sections'> => ({
    content: {
        hero: { headline: '', subheadline: '', ctaButton: '', imageUrl: `https://source.unsplash.com/1920x1080/?abstract,${Math.random()}` },
        about: { title: '', text: '', imageUrl: `https://source.unsplash.com/800x600/?workplace,${Math.random()}` },
        services: { title: '', items: [] },
        features: { title: '', items: [] },
        team: { title: '', items: [] },
        testimonials: { title: '', items: [] },
        pricing: { title: '', items: [] },
        faq: { title: '', items: [] },
        gallery: { title: '', items: [] },
        cta: { headline: '', subheadline: '', ctaButton: '' },
        // FIX: Added missing 'form' property to satisfy the SectionContent type.
        form: {
            title: '',
            recipientEmail: '',
            submitButtonText: ''
        },
        contact: { title: '', address: '', email: '', phone: '' }
    }
});

const getPageTemplate = (type: PageType, name: TextContent, languageMode: LanguageMode): Page => {
    const basePage = createBasePage(languageMode);
    const newPage: Page = {
        ...basePage,
        id: `page_${Date.now()}`,
        name: name,
        slug: (typeof name === 'string' ? name : name.en).toLowerCase().replace(/\s+/g, '-').slice(0, 50),
        sections: AVAILABLE_SECTIONS.map(s => ({
            id: s.id as keyof Page['content'],
            name: s.name,
            visible: false
        }))
    };

    const setVisible = (ids: (keyof Page['content'])[]) => {
        ids.forEach(id => {
            const section = newPage.sections.find(s => s.id === id);
            if (section) section.visible = true;
        });
    };

    switch (type) {
        case 'ABOUT':
            setVisible(['hero', 'about', 'team', 'testimonials', 'cta']);
            newPage.content.hero.headline = createDefaultText('About Our Company', 'عن شركتنا', languageMode);
            newPage.content.about.title = createDefaultText('Our Story', 'قصتنا', languageMode);
            newPage.content.about.text = createDefaultText('Founded in 2023, our company has been on a mission to redefine the industry. We believe in innovation, quality, and customer satisfaction above all else. Our journey is one of passion and perseverance, constantly striving to deliver the best solutions.', 'تأسست في عام 2023، وكانت شركتنا في مهمة لإعادة تعريف الصناعة. نحن نؤمن بالابتكار والجودة ورضا العملاء قبل كل شيء. رحلتنا هي رحلة شغف ومثابرة، ونسعى باستمرار لتقديم أفضل الحلول.', languageMode);
            newPage.content.team.title = createDefaultText('Meet the Team', 'تعرف على الفريق', languageMode);
            newPage.content.team.items = [
                { name: createDefaultText('Alex Johnson', 'أليكس جونسون', languageMode), role: createDefaultText('Founder & CEO', 'المؤسس والرئيس التنفيذي', languageMode), imageUrl: `https://source.unsplash.com/400x400/?portrait,ceo`},
                { name: createDefaultText('Maria Garcia', 'ماريا غارسيا', languageMode), role: createDefaultText('Head of Operations', 'رئيس العمليات', languageMode), imageUrl: `https://source.unsplash.com/400x400/?portrait,professional,woman`},
                { name: createDefaultText('Sam Lee', 'سام لي', languageMode), role: createDefaultText('Lead Developer', 'المطور الرئيسي', languageMode), imageUrl: `https://source.unsplash.com/400x400/?portrait,developer`},
            ] as TeamMemberItem[];
            newPage.content.cta.headline = createDefaultText('Join Our Journey', 'انضم إلى رحلتنا', languageMode);
            newPage.content.cta.ctaButton = createDefaultText('Contact Us', 'اتصل بنا', languageMode);
            break;
        case 'SERVICES':
            setVisible(['hero', 'services', 'features', 'pricing', 'faq']);
            newPage.content.hero.headline = createDefaultText('Our Professional Services', 'خدماتنا الاحترافية', languageMode);
            newPage.content.services.title = createDefaultText('What We Offer', 'ماذا نقدم', languageMode);
            newPage.content.services.items = [
                { name: createDefaultText('Core Service One', 'الخدمة الأساسية الأولى', languageMode), description: createDefaultText('A brief but compelling description of the first main service provided.', 'وصف موجز ومقنع للخدمة الرئيسية الأولى المقدمة.', languageMode), icon: 'code' },
                { name: createDefaultText('Core Service Two', 'الخدمة الأساسية الثانية', languageMode), description: createDefaultText('Highlight the benefits and features of the second primary offering.', 'سلط الضوء على فوائد وميزات العرض الأساسي الثاني.', languageMode), icon: 'chart' },
                { name: createDefaultText('Additional Service', 'خدمة إضافية', languageMode), description: createDefaultText('Describe a supplementary service that adds value to your main offerings.', 'صف خدمة تكميلية تضيف قيمة لعروضك الرئيسية.', languageMode), icon: 'briefcase' },
            ] as ServiceItem[];
            newPage.content.features.title = createDefaultText('Why Choose Us', 'لماذا تختارنا', languageMode);
             newPage.content.pricing.title = createDefaultText('Service Plans', 'خطط الخدمة', languageMode);
            newPage.content.faq.title = createDefaultText('Service Questions', 'أسئلة حول الخدمة', languageMode);
            break;
        case 'PRODUCTS':
            setVisible(['hero', 'gallery', 'features', 'testimonials', 'cta']);
            newPage.content.hero.headline = createDefaultText('Explore Our Products', 'اكتشف منتجاتنا', languageMode);
            newPage.content.gallery.title = createDefaultText('Product Showcase', 'عرض المنتجات', languageMode);
             newPage.content.gallery.items = [
                { caption: createDefaultText('Product A', 'منتج أ', languageMode), imageUrl: 'https://source.unsplash.com/600x600/?product,1' },
                { caption: createDefaultText('Product B', 'منتج ب', languageMode), imageUrl: 'https://source.unsplash.com/600x600/?product,2' },
                { caption: createDefaultText('Product C', 'منتج ج', languageMode), imageUrl: 'https://source.unsplash.com/600x600/?product,3' },
                { caption: createDefaultText('Product D', 'منتج د', languageMode), imageUrl: 'https://source.unsplash.com/600x600/?product,4' },
            ] as GalleryItem[];
            newPage.content.features.title = createDefaultText('Product Features', 'ميزات المنتج', languageMode);
            newPage.content.features.items = [
                { name: createDefaultText('High Quality Materials', 'مواد عالية الجودة', languageMode), description: createDefaultText('Crafted from the finest materials for durability.', 'مصنوع من أجود المواد لضمان المتانة.', languageMode), icon: 'adjustments' },
                { name: createDefaultText('Modern Design', 'تصميم عصري', languageMode), description: createDefaultText('Sleek and contemporary designs that fit any style.', 'تصاميم أنيقة وعصرية تناسب أي نمط.', languageMode), icon: 'desktop' },
                { name: createDefaultText('User-Friendly', 'سهل الاستخدام', languageMode), description: createDefaultText('Intuitive and easy to use for everyone.', 'بسيط وسهل الاستخدام للجميع.', languageMode), icon: 'device-mobile' },
            ] as FeatureItem[];
            newPage.content.testimonials.title = createDefaultText('What Our Customers Say', 'ماذا يقول عملاؤنا', languageMode);
            newPage.content.cta.headline = createDefaultText('Ready to Own It?', 'هل أنت مستعد لامتلاكه؟', languageMode);
            newPage.content.cta.ctaButton = createDefaultText('Shop Now', 'تسوق الآن', languageMode);
            break;
        case 'TEAM':
            setVisible(['hero', 'team', 'about', 'features', 'contact']);
            newPage.content.hero.headline = createDefaultText('Our Expert Team', 'فريق الخبراء لدينا', languageMode);
            newPage.content.team.title = createDefaultText('Meet the Professionals', 'تعرف على المحترفين', languageMode);
            newPage.content.team.items = [
                { name: createDefaultText('John Doe', 'جون دو', languageMode), role: createDefaultText('Team Lead', 'قائد الفريق', languageMode), imageUrl: 'https://source.unsplash.com/400x400/?portrait,man,1' },
                { name: createDefaultText('Jane Smith', 'جين سميث', languageMode), role: createDefaultText('Project Manager', 'مدير المشروع', languageMode), imageUrl: 'https://source.unsplash.com/400x400/?portrait,woman,1' },
                { name: createDefaultText('Peter Jones', 'بيتر جونز', languageMode), role: createDefaultText('Senior Engineer', 'مهندس أول', languageMode), imageUrl: 'https://source.unsplash.com/400x400/?portrait,man,2' },
            ] as TeamMemberItem[];
            newPage.content.about.title = createDefaultText('Our Collaborative Culture', 'ثقافتنا التعاونية', languageMode);
            newPage.content.features.title = createDefaultText('Our Core Values', 'قيمنا الأساسية', languageMode);
            newPage.content.contact.title = createDefaultText('Work With Us', 'اعمل معنا', languageMode);
            break;
         case 'NEWS_EVENTS':
            setVisible(['hero', 'services', 'gallery', 'cta', 'contact']);
            newPage.content.hero.headline = createDefaultText('News & Upcoming Events', 'الأخبار والأحداث القادمة', languageMode);
            newPage.content.services.title = createDefaultText('Latest Articles', 'أحدث المقالات', languageMode);
            newPage.content.services.items = [ // Re-purposing services as articles
                { name: createDefaultText('Major Announcement', 'إعلان هام', languageMode), description: createDefaultText('Read about our latest company milestone and future plans.', 'اقرأ عن أحدث إنجازات شركتنا وخططنا المستقبلية.', languageMode), icon: 'chart' },
                { name: createDefaultText('Event Recap: Annual Summit', 'ملخص الحدث: القمة السنوية', languageMode), description: createDefaultText('Discover the highlights and key takeaways from our successful annual summit.', 'اكتشف أبرز النقاط والنتائج الرئيسية من قمتنا السنوية الناجحة.', languageMode), icon: 'briefcase' },
            ] as ServiceItem[];
            newPage.content.gallery.title = createDefaultText('Event Photos', 'صور الحدث', languageMode);
            newPage.content.cta.headline = createDefaultText('Stay Updated', 'ابق على اطلاع', languageMode);
            newPage.content.cta.ctaButton = createDefaultText('Subscribe to Newsletter', 'اشترك في النشرة الإخبارية', languageMode);
            break;
        case 'FEATURES':
            setVisible(['hero', 'features', 'services', 'testimonials', 'faq']);
            newPage.content.hero.headline = createDefaultText('Powerful Features', 'ميزات قوية', languageMode);
            newPage.content.features.title = createDefaultText('Everything You Need', 'كل ما تحتاجه', languageMode);
            newPage.content.services.title = createDefaultText('How It Benefits You', 'كيف يفيدك', languageMode);
            newPage.content.testimonials.title = createDefaultText('Users Love Our Features', 'المستخدمون يحبون ميزاتنا', languageMode);
            newPage.content.faq.title = createDefaultText('Questions About Features', 'أسئلة حول الميزات', languageMode);
            break;
        case 'TESTIMONIALS':
            setVisible(['hero', 'testimonials', 'about', 'gallery', 'cta']);
            newPage.content.hero.headline = createDefaultText('Success Stories', 'قصص نجاح', languageMode);
            newPage.content.testimonials.title = createDefaultText('From Our Valued Clients', 'من عملائنا الكرام', languageMode);
            newPage.content.about.title = createDefaultText('Our Commitment to Clients', 'التزامنا تجاه العملاء', languageMode);
            newPage.content.gallery.title = createDefaultText('Client Projects', 'مشاريع العملاء', languageMode);
            newPage.content.cta.headline = createDefaultText('Become Our Next Success Story', 'كن قصة نجاحنا التالية', languageMode);
            newPage.content.cta.ctaButton = createDefaultText('Get a Free Consultation', 'احصل على استشارة مجانية', languageMode);
            break;
        case 'PRICING':
            setVisible(['hero', 'pricing', 'features', 'faq', 'contact']);
            newPage.content.hero.headline = createDefaultText('Simple, Transparent Pricing', 'تسعير بسيط وشفاف', languageMode);
            newPage.content.pricing.title = createDefaultText('Find the Perfect Plan', 'ابحث عن الخطة المثالية', languageMode);
            newPage.content.pricing.items = [
                { name: createDefaultText('Basic', 'الأساسية', languageMode), price: createDefaultText('$29', '٢٩$', languageMode), frequency: createDefaultText('mo', 'شهريا', languageMode), features: [createDefaultText('Feature A', 'ميزة أ', languageMode), createDefaultText('Feature B', 'ميزة ب', languageMode)], isFeatured: false },
                { name: createDefaultText('Pro', 'الاحترافية', languageMode), price: createDefaultText('$59', '٥٩$', languageMode), frequency: createDefaultText('mo', 'شهريا', languageMode), features: [createDefaultText('All in Basic', 'كل ما في الأساسية', languageMode), createDefaultText('Feature C', 'ميزة ج', languageMode), createDefaultText('Feature D', 'ميزة د', languageMode)], isFeatured: true },
                { name: createDefaultText('Enterprise', 'المؤسسات', languageMode), price: createDefaultText('Contact Us', 'اتصل بنا', languageMode), frequency: createDefaultText('yr', 'سنويا', languageMode), features: [createDefaultText('All in Pro', 'كل ما في الاحترافية', languageMode), createDefaultText('24/7 Support', 'دعم 24/7', languageMode)], isFeatured: false },
            ] as PricingTier[];
            newPage.content.features.title = createDefaultText('What\'s Included in All Plans', 'ما هو مدرج في جميع الخطط', languageMode);
            newPage.content.faq.title = createDefaultText('Pricing Questions', 'أسئلة حول التسعير', languageMode);
            break;
        case 'DOWNLOAD_CATALOG':
             setVisible(['hero', 'features', 'testimonials', 'contact', 'cta']);
            newPage.content.hero.headline = createDefaultText('Download Our Catalog', 'حمل كتالوجنا', languageMode);
            newPage.content.hero.subheadline = createDefaultText('Get the complete guide to our products and services.', 'احصل على الدليل الكامل لمنتجاتنا وخدماتنا.', languageMode);
            newPage.content.hero.ctaButton = createDefaultText('Download Now', 'حمل الآن', languageMode);
            newPage.content.features.title = createDefaultText('Inside The Catalog', 'داخل الكتالوج', languageMode);
            newPage.content.testimonials.title = createDefaultText('What Readers Say', 'ماذا يقول القراء', languageMode);
            newPage.content.cta.headline = createDefaultText('Ready to Explore?', 'هل أنت مستعد للاستكشاف؟', languageMode);
            newPage.content.contact.title = createDefaultText('Request a Physical Copy', 'اطلب نسخة مطبوعة', languageMode);
            break;
        case 'CONTACT':
            setVisible(['hero', 'contact', 'faq', 'about', 'services']);
            newPage.content.hero.headline = createDefaultText('Get In Touch', 'تواصل معنا', languageMode);
            newPage.content.hero.subheadline = createDefaultText('We are here to help and answer any question you might have. We look forward to hearing from you.', 'نحن هنا للمساعدة والإجابة على أي سؤال قد يكون لديك. نتطلع إلى الاستماع منك.', languageMode);
            newPage.content.contact.title = createDefaultText('Contact Information', 'معلومات الاتصال', languageMode);
            newPage.content.contact.address = createDefaultText('123 Main St, Anytown, USA', '123 الشارع الرئيسي، أي مدينة، الولايات المتحدة الأمريكية', languageMode);
            newPage.content.contact.email = 'contact@example.com';
            newPage.content.contact.phone = '+1 (555) 123-4567';
            newPage.content.faq.title = createDefaultText('Frequently Asked Questions', 'الأسئلة الشائعة', languageMode);
            newPage.content.faq.items = [
                { question: createDefaultText('What are your business hours?', 'ما هي ساعات العمل لديكم؟', languageMode), answer: createDefaultText('We are open Monday to Friday, from 9 AM to 5 PM.', 'نحن نفتح من الاثنين إلى الجمعة، من الساعة 9 صباحًا حتى 5 مساءً.', languageMode) },
                { question: createDefaultText('How can I get a quote?', 'كيف يمكنني الحصول على عرض أسعار؟', languageMode), answer: createDefaultText('You can get a quote by contacting us via email or phone, or by filling out the form on our website.', 'يمكنك الحصول على عرض أسعار عن طريق الاتصال بنا عبر البريد الإلكتروني أو الهاتف، أو عن طريق ملء النموذج على موقعنا.', languageMode) },
            ] as FAQItem[];
            break;
        case 'GALLERY':
            setVisible(['hero', 'gallery', 'cta', 'testimonials', 'contact']);
            newPage.content.hero.headline = createDefaultText('Our Portfolio', 'أعمالنا', languageMode);
            newPage.content.gallery.title = createDefaultText('Visual Showcase', 'معرض الصور', languageMode);
            newPage.content.gallery.items = [
                { caption: createDefaultText('Project Alpha', 'مشروع ألفا', languageMode), imageUrl: 'https://source.unsplash.com/600x600/?project,1' },
                { caption: createDefaultText('Project Beta', 'مشروع بيتا', languageMode), imageUrl: 'https://source.unsplash.com/600x600/?project,2' },
                { caption: createDefaultText('Project Gamma', 'مشروع جاما', languageMode), imageUrl: 'https://source.unsplash.com/600x600/?project,3' },
                { caption: createDefaultText('Project Delta', 'مشروع دلتا', languageMode), imageUrl: 'https://source.unsplash.com/600x600/?project,4' },
            ];
            newPage.content.cta.headline = createDefaultText('Inspired?', 'هل ألهمتك؟', languageMode);
            newPage.content.cta.subheadline = createDefaultText('Let\'s work together on your next project.', 'دعنا نعمل معًا في مشروعك القادم.', languageMode);
            newPage.content.cta.ctaButton = createDefaultText('Contact Us', 'اتصل بنا', languageMode);
            break;
        case 'BLANK':
        default:
            setVisible(['hero']);
            newPage.content.hero.headline = name;
            newPage.content.hero.subheadline = createDefaultText('This is your new page. Start by adding content here.', 'هذه صفحتك الجديدة. ابدأ بإضافة المحتوى هنا.', languageMode);
            break;
    }
    
    return newPage;
};

export { getPageTemplate };