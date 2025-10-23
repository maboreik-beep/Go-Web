import React from 'react';
import { TemplateProps } from '../types';

export const ServiceIcon: React.FC<{icon: string}> = ({ icon }) => {
    const iconMap: Record<string, React.ReactElement> = {
        code: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
        chart: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
        briefcase: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        desktop: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        'device-mobile': <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
        adjustments: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8v-2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0-4v-2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m6-14v-2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0 12v-2m0 2a2 2 0 100 4m0-4a2 2 0 110 4" /></svg>,
    };
    return iconMap[icon] || iconMap.briefcase;
};

export const FAQAccordion: React.FC<{ q: string; a: string; }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="border-b border-gray-200 py-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
                <h4 className="text-lg font-medium text-gray-800">{q}</h4>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>&#9660;</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="pt-2 text-gray-600">{a}</p>
            </div>
        </div>
    );
};

interface TemplateWrapperProps extends TemplateProps {
    children: React.ReactNode;
    showDefaultHeader?: boolean;
    showDefaultFooter?: boolean;
}

const DefaultHeader: React.FC<TemplateProps> = ({ content, page, pages, getText, setActivePageId }) => (
    <header className="absolute top-0 left-0 right-0 z-10 p-6 flex justify-between items-center text-white">
        <h1 className="text-2xl font-bold">{getText(content.siteName)}</h1>
        <nav className="hidden md:flex space-x-6 items-center">
            {pages.map(p => (
                <button key={p.id} onClick={() => setActivePageId(p.id)} className={`font-medium transition-opacity ${p.id === page.id ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}>
                    {getText(p.name)}
                </button>
            ))}
        </nav>
    </header>
);

const DefaultFooter: React.FC<TemplateProps> = ({ page, getText, content }) => {
    const c = page.content;
    const isVisible = (id: string) => page.sections.find(s => s.id === id)?.visible ?? false;
    
    if (!isVisible('contact')) return null;

    return (
        <footer className="py-20 px-6 bg-gray-800 text-white">
            <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
                <div className="md:col-span-1">
                    <h3 className="text-2xl font-bold mb-4">{getText(content.siteName)}</h3>
                    <p className="text-gray-400">Your trusted partner in excellence.</p>
                </div>
                <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold mb-4">{getText(c.contact.title)}</h3>
                    <div className="space-y-2 text-gray-300">
                        <p><strong>Address:</strong> {getText(c.contact.address)}</p>
                        <p><strong>Email:</strong> <a href={`mailto:${c.contact.email}`} className="hover:underline">{c.contact.email}</a></p>
                        <p><strong>Phone:</strong> <a href={`tel:${c.contact.phone}`} className="hover:underline">{c.contact.phone}</a></p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const Copyright: React.FC<TemplateProps> = ({ content, getText }) => (
     <div className="text-center py-6 bg-gray-900 text-gray-400">
        <p>&copy; {new Date().getFullYear()} {getText(content.siteName)}. All rights reserved.</p>
    </div>
);


export const TemplateWrapper: React.FC<TemplateWrapperProps> = ({ 
    children, 
    showDefaultHeader = true, 
    showDefaultFooter = true, 
    ...props 
}) => {
    const { content, isRtl } = props;
    const { theme } = content;

    return (
        <div className={`bg-white text-gray-800 rounded-lg shadow-lg w-full h-full ${isRtl ? 'font-cairo' : 'font-sans'}`} 
            style={{ '--primary-color': theme.primaryColor } as React.CSSProperties} 
            dir={isRtl ? 'rtl' : 'ltr'}>
            <style>{`.preview-primary-text{color:var(--primary-color)}.preview-primary-bg{background-color:var(--primary-color)}.preview-primary-border{border-color:var(--primary-color)}`}</style>
            
            {props.isBilingual && (
                <div className="fixed top-20 right-6 z-50">
                    <button onClick={() => props.setLang(props.lang === 'en' ? 'ar' : 'en')}
                        className="bg-dark-100 text-white px-3 py-1 rounded-md text-sm shadow-lg">
                        {props.lang === 'en' ? 'العربية' : 'English'}
                    </button>
                </div>
            )}
            
            {showDefaultHeader && <DefaultHeader {...props} />}
            
            <main>{children}</main>
            
            {showDefaultFooter && <DefaultFooter {...props} />}
            <Copyright {...props}/>
        </div>
    );
};