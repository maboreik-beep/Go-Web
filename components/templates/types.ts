import { WebsiteContent, Page, TextContent } from '../../types';

export interface TemplateProps {
    content: WebsiteContent;
    page: Page;
    pages: Page[];
    setActivePageId: (id: string) => void;
    getText: (value: TextContent) => string;
    isBilingual: boolean;
    isRtl: boolean;
    lang: 'en' | 'ar';
    setLang: (lang: 'en' | 'ar') => void;
}