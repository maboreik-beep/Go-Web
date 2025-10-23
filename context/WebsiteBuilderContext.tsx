import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { WebsiteContent, SectionConfig, TextContent, Page, LanguageMode, TemplateId } from '../types';
import { AVAILABLE_SECTIONS } from '../constants';
import { useAuth } from './AuthContext';
import { isFirebaseConfigured, db } from '../firebaseConfig';
import { collection, query, where, getDocs, addDoc, updateDoc, serverTimestamp, doc, Timestamp } from 'firebase/firestore';
import { useDebounce } from '../hooks/useDebounce';

const createDefaultText = (en: string, ar: string, mode: LanguageMode): TextContent => {
    if (mode === 'bilingual') {
        return { en, ar };
    }
    if (mode === 'ar') {
        return ar;
    }
    return en;
};

const createDefaultPage = (mode: LanguageMode): Page => {
    // Generate sections from the central constant for consistency
    const sections: SectionConfig[] = AVAILABLE_SECTIONS.map(s => ({
        id: s.id as SectionConfig['id'],
        name: s.name,
        // Define default visibility for the homepage here
        visible: ['hero', 'about', 'services', 'features', 'testimonials', 'cta', 'contact'].includes(s.id),
    }));

    return {
        id: `page_${Date.now()}`,
        name: createDefaultText('Home', 'الرئيسية', mode),
        slug: 'home',
        sections: sections,
        content: {
            hero: {
                headline: createDefaultText('Welcome to My Website', 'أهلاً بكم في موقعي', mode),
                subheadline: createDefaultText('Your amazing journey starts here. Discover what we have to offer.', 'رحلتك المذهلة تبدأ هنا. اكتشف ما نقدمه.', mode),
                ctaButton: createDefaultText('Get Started', 'ابدأ الآن', mode),
                imageUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            },
            about: {
                title: createDefaultText('About Us', 'من نحن', mode),
                text: createDefaultText('We are a passionate team dedicated to delivering the best products and services.', 'نحن فريق شغوف ملتزم بتقديم أفضل المنتجات والخدمات.', mode),
                imageUrl: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            },
            services: {
                title: createDefaultText('Our Services', 'خدماتنا', mode),
                items: [
                    { name: createDefaultText('Web Development', 'تطوير الويب', mode), description: createDefaultText('Creating stunning and functional websites.', 'إنشاء مواقع ويب مذهلة وعملية.', mode), icon: 'code' },
                    { name: createDefaultText('Marketing', 'التسويق', mode), description: createDefaultText('Boosting your brand to new heights.', 'دفع علامتك التجارية إلى آفاق جديدة.', mode), icon: 'chart' },
                    { name: createDefaultText('Consulting', 'الاستشارات', mode), description: createDefaultText('Expert advice to guide your business.', 'مشورة الخبراء لتوجيه عملك.', mode), icon: 'briefcase' }
                ]
            },
            features: { title: createDefaultText('Features', 'المميزات', mode), items: [] },
            team: { title: createDefaultText('Our Team', 'فريقنا', mode), items: [] },
            testimonials: { title: createDefaultText('Testimonials', 'الشهادات', mode), items: [] },
            pricing: { title: createDefaultText('Our Pricing', 'أسعارنا', mode), items: [] },
            faq: { title: createDefaultText('FAQ', 'الأسئلة الشائعة', mode), items: [] },
            gallery: { title: createDefaultText('Gallery', 'معرضنا', mode), items: [] },
            cta: { headline: createDefaultText('Ready?', 'هل أنت مستعد؟', mode), subheadline: createDefaultText('Join us today.', 'انضم إلينا اليوم.', mode), ctaButton: createDefaultText('Sign Up', 'سجل الآن', mode) },
            form: {
                title: createDefaultText('Get in Touch', 'تواصل معنا', mode),
                recipientEmail: 'your-email@example.com',
                submitButtonText: createDefaultText('Send Message', 'إرسال رسالة', mode)
            },
            contact: {
                title: createDefaultText('Contact Us', 'اتصل بنا', mode),
                address: createDefaultText('123 Main St, Anytown, USA', '123 الشارع الرئيسي، أي مدينة، الولايات المتحدة الأمريكية', mode),
                email: 'contact@example.com',
                phone: '+1 (555) 123-4567'
            }
        }
    };
};


export const createDefaultContent = (mode: LanguageMode = 'en', templateId: TemplateId = 'default'): WebsiteContent => {
    const homePage = createDefaultPage(mode);
    return {
        languageMode: mode,
        templateId: templateId,
        theme: {
            primaryColor: '#94c11f',
            font: 'Poppins'
        },
        siteName: createDefaultText('My Awesome Site', 'موقعي الرائع', mode),
        pages: [homePage],
        activePageId: homePage.id,
        userId: '',
    };
};

interface WebsiteBuilderContextType {
    content: WebsiteContent;
    setContent: React.Dispatch<React.SetStateAction<WebsiteContent>>;
    replaceContent: (newContent: WebsiteContent) => void;
    updateValue: (path: string, value: any) => void;
    toggleSectionVisibility: (sectionId: SectionConfig['id']) => void;
    activePage: Page | undefined;
    createPage: (newPage: Page) => void;
    deletePage: (id: string) => void;
    setActivePageId: (id: string) => void;
    isSaving: boolean;
    lastSaved: Date | null;
    isLoadingContent: boolean;
    isNewWebsite: boolean;
    setIsNewWebsite: (isNew: boolean) => void;
    loadContent: () => Promise<void>;
    docId: string | null;
}

const WebsiteBuilderContext = createContext<WebsiteBuilderContextType | undefined>(undefined);

const setIn = (obj: any, path: string[], value: any): any => {
    const [key, ...rest] = path;
    if (key === undefined) return value;
    const newCurrent = Array.isArray(obj) ? [...obj] : { ...(obj || {}) };
    if (rest.length > 0) {
        (newCurrent as any)[key] = setIn((newCurrent as any)[key], rest, value);
    } else {
        (newCurrent as any)[key] = value;
    }
    return newCurrent;
};


export const WebsiteBuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [content, setContent] = useState<WebsiteContent>(createDefaultContent());
    const [docId, setDocId] = useState<string | null>(null);
    const [isLoadingContent, setIsLoadingContent] = useState(true);
    const [isNewWebsite, setIsNewWebsite] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    const debouncedContent = useDebounce(content, 2000);

    const activePage = useMemo(() => content.pages.find(p => p.id === content.activePageId), [content.pages, content.activePageId]);
    const activePageIndex = useMemo(() => content.pages.findIndex(p => p.id === content.activePageId), [content.pages, content.activePageId]);

    const loadContent = useCallback(async () => {
        if (!user || !isFirebaseConfigured || !db) {
            setContent(createDefaultContent());
            setIsNewWebsite(true);
            setIsLoadingContent(false);
            return;
        }

        setIsLoadingContent(true);
        const q = query(collection(db, "websites"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            setIsNewWebsite(true);
            setContent(createDefaultContent());
            setDocId(null);
        } else {
            const doc = querySnapshot.docs[0];
            const data = doc.data() as WebsiteContent;
            if(data.lastUpdated) {
                setLastSaved((data.lastUpdated as Timestamp).toDate());
            }
            setContent(data);
            setDocId(doc.id);
            setIsNewWebsite(false);
        }
        setIsLoadingContent(false);
    }, [user]);

    useEffect(() => {
        loadContent();
    }, [loadContent]);

    // Debounced save effect
    useEffect(() => {
        const saveContent = async () => {
            if (!isFirebaseConfigured || !db || !user || isSaving || isLoadingContent || isNewWebsite || !docId) {
                return;
            }

            setIsSaving(true);
            const docRef = doc(db, 'websites', docId);
            try {
                await updateDoc(docRef, {
                    ...debouncedContent,
                    lastUpdated: serverTimestamp()
                });
                setLastSaved(new Date());
            } catch (error) {
                console.error("Error updating document:", error);
            } finally {
                setIsSaving(false);
            }
        };

        if (debouncedContent.userId) { // Only save if content has been initialized with a user
             saveContent();
        }
    }, [debouncedContent, user, docId, isNewWebsite, isLoadingContent]);


     const updateValue = useCallback((path: string, value: any) => {
        if (activePageIndex === -1 && !path.startsWith('siteName') && !path.startsWith('theme')) return;

        const fullPath = (path.startsWith('siteName') || path.startsWith('theme') || path.startsWith('slug') || path.startsWith('isPublished'))
            ? path
            : `pages.${activePageIndex}.${path}`;

        setContent(prev => setIn(prev, fullPath.split('.'), value));
    }, [activePageIndex]);

    const toggleSectionVisibility = useCallback((sectionId: SectionConfig['id']) => {
        if (activePageIndex === -1) return;
        setContent(prev => {
            const newPages = [...prev.pages];
            const newSections = newPages[activePageIndex].sections.map(section =>
                section.id === sectionId ? { ...section, visible: !section.visible } : section
            );
            newPages[activePageIndex] = { ...newPages[activePageIndex], sections: newSections };
            return { ...prev, pages: newPages };
        });
    }, [activePageIndex]);

    const setActivePageId = useCallback((id: string) => {
        setContent(prev => ({ ...prev, activePageId: id }));
    }, []);

    const createPage = useCallback((newPage: Page) => {
        setContent(prev => {
            const updatedPages = [...prev.pages, newPage];
            return { ...prev, pages: updatedPages, activePageId: newPage.id };
        });
    }, []);

    const deletePage = useCallback((id: string) => {
        setContent(prev => {
            if (prev.pages.length <= 1) return prev;
            const newPages = prev.pages.filter(p => p.id !== id);
            const newActivePageId = id === prev.activePageId ? newPages[0].id : prev.activePageId;
            return { ...prev, pages: newPages, activePageId: newActivePageId };
        });
    }, []);


    const replaceContent = useCallback(async (newContent: WebsiteContent) => {
        if (!user || !isFirebaseConfigured || !db) return;
        setIsSaving(true);
        try {
            const contentToSave = {
                ...newContent,
                userId: user.uid,
                lastUpdated: serverTimestamp()
            };
            const docRef = await addDoc(collection(db, 'websites'), contentToSave);
            setDocId(docRef.id);
            setContent(contentToSave);
            setIsNewWebsite(false);
            setLastSaved(new Date());
        } catch (error) {
            console.error("Error creating new website:", error);
        } finally {
            setIsSaving(false);
        }
    }, [user]);

    const value = { 
        content, 
        setContent, 
        updateValue, 
        toggleSectionVisibility, 
        isSaving,
        lastSaved,
        isLoadingContent,
        isNewWebsite,
        setIsNewWebsite,
        loadContent, 
        replaceContent,
        activePage,
        createPage,
        deletePage,
        setActivePageId,
        docId,
    };

    return (
        <WebsiteBuilderContext.Provider value={value}>
            {children}
        </WebsiteBuilderContext.Provider>
    );
};

export const useWebsiteBuilder = (): WebsiteBuilderContextType => {
    const context = useContext(WebsiteBuilderContext);
    if (context === undefined) {
        throw new Error('useWebsiteBuilder must be used within a WebsiteBuilderProvider');
    }
    return context;
};
export { createDefaultPage };