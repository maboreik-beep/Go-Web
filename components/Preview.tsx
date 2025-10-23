import React, { useState, useEffect } from 'react';
import { useWebsiteBuilder } from '../context/WebsiteBuilderContext';
import { TextContent } from '../types';
import { TemplateRenderer } from './templates';

const Preview: React.FC = () => {
    const { content, setActivePageId } = useWebsiteBuilder();
    const [lang, setLang] = useState<'en' | 'ar'>('en');
    
    const page = content.pages.find(p => p.id === content.activePageId);

    useEffect(() => {
        if (content.languageMode === 'bilingual' && navigator.language.startsWith('ar')) {
            setLang('ar');
        } else if (content.languageMode === 'ar') {
            setLang('ar');
        } else {
            setLang('en');
        }
    }, [content.languageMode]);

    if (!page) {
        return <div className="flex items-center justify-center h-full bg-white text-black">Loading Preview...</div>;
    }
    
    const { languageMode } = content;
    const isBilingual = languageMode === 'bilingual';
    const displayLang = isBilingual ? lang : languageMode;
    const isRtl = displayLang === 'ar';

    const getText = (value: TextContent): string => {
        if (typeof value === 'string') return value;
        if (!value) return '';
        return value[displayLang] || value.en || '';
    };

    return (
        <div className={`w-full h-full overflow-y-auto transform scale-100 origin-top-left`}>
             <TemplateRenderer
                content={content}
                page={page}
                pages={content.pages}
                setActivePageId={setActivePageId}
                getText={getText}
                isBilingual={isBilingual}
                isRtl={isRtl}
                lang={lang}
                setLang={setLang}
            />
        </div>
    );
};

export default Preview;