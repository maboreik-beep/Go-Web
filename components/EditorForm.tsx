import React, { useState, lazy, Suspense } from 'react';
import { useWebsiteBuilder } from '../context/WebsiteBuilderContext';
import { COLOR_PALETTES, AVAILABLE_SECTIONS } from '../constants';
import { Select } from './common/Select';
import { Input, TextArea } from './common/Input';
import { TextContent, SectionConfig, MultilingualText } from '../types';
import { Switch } from './common/Switch';
import { ImageUpload } from './common/ImageUpload';
import { Button } from './common/Button';

const AddPageModal = lazy(() => import('./AddPageModal'));


const Accordion: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void; isVisible?: boolean; onVisibilityChange?: () => void; isOptional?: boolean; }> = 
    ({ title, children, isOpen, onClick, isVisible, onVisibilityChange, isOptional = true }) => {
    return (
        <div className="border-b border-dark-300">
            <button onClick={onClick} className="w-full text-left p-4 flex justify-between items-center hover:bg-dark-200 transition-colors">
                <div className="flex items-center gap-4">
                    {isOptional && onVisibilityChange && <Switch checked={isVisible || false} onChange={onVisibilityChange} />}
                    <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <span className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>&#9660;</span>
            </button>
            {isOpen && (!isOptional || isVisible) && <div className="p-4 bg-dark-100/50 space-y-4">{children}</div>}
        </div>
    );
};


const EditorForm: React.FC = () => {
    const { content, updateValue, toggleSectionVisibility, activePage, deletePage, setActivePageId } = useWebsiteBuilder();
    
    const [openAccordion, setOpenAccordion] = useState<string | null>('project_settings');
    const [isAddPageModalOpen, setAddPageModalOpen] = useState(false);
    
    const page = activePage;

    const handleAccordionClick = (title: string) => {
        setOpenAccordion(openAccordion === title ? null : title);
    };

    // This intelligent input renderer adapts to the website's language mode
    const renderTextInputs = (label: string, path: string, value: TextContent, isTextArea = false) => {
        const InputComponent = isTextArea ? TextArea : Input;
        // The update path should not contain the page index; the context handles it.
        const updatePath = path.substring(path.indexOf('.') + 1);

        switch (content.languageMode) {
            case 'bilingual':
                const val = (value as MultilingualText) || { en: '', ar: '' };
                return (
                    <>
                        <InputComponent label={`${label} (English)`} value={val.en} onChange={e => updateValue(`${updatePath}.en`, e.target.value)} />
                        <InputComponent label={`${label} (Arabic)`} value={val.ar} onChange={e => updateValue(`${updatePath}.ar`, e.target.value)} dir="rtl" />
                    </>
                );
            case 'ar':
                return <InputComponent label={label} value={(value as string) || ''} onChange={e => updateValue(updatePath, e.target.value)} dir="rtl" />;
            case 'en':
            default:
                return <InputComponent label={label} value={(value as string) || ''} onChange={e => updateValue(updatePath, e.target.value)} />;
        }
    };
    
    const getText = (value: TextContent): string => {
        if (typeof value === 'string') return value;
        if (!value) return '';
        return value.en || '';
    };

    if (!page) {
        return <div className="p-6 text-center">Loading editor...</div>;
    }

  return (
    <>
    <div className="text-light-100 p-6 space-y-6">
        <div>
             <Accordion title="Project Settings" isOpen={openAccordion === 'project_settings'} onClick={() => handleAccordionClick('project_settings')} isOptional={false}>
                 {renderTextInputs('Website Name', 'siteName', content.siteName)}
                 <div className="space-y-2">
                    <label className="block text-sm font-medium text-light-200">Theme Color</label>
                    <div className="flex flex-wrap gap-2">
                        {COLOR_PALETTES.map(p => (
                            <button key={p.name} onClick={() => updateValue('theme.primaryColor', p.color)} className={`w-8 h-8 rounded-full border-2 ${content.theme.primaryColor === p.color ? 'border-light-100' : 'border-transparent'}`} style={{backgroundColor: p.color}} title={p.name}></button>
                        ))}
                    </div>
                </div>
            </Accordion>
            
             <Accordion title="Page Manager" isOpen={openAccordion === 'page_manager'} onClick={() => handleAccordionClick('page_manager')} isOptional={false}>
                <div className="space-y-2">
                    {content.pages.map(p => (
                        <div key={p.id} className={`flex items-center justify-between p-2 rounded transition-colors ${p.id === content.activePageId ? 'bg-primary/20' : 'hover:bg-dark-300'}`}>
                            <button onClick={() => setActivePageId(p.id)} className="font-semibold text-left flex-grow">
                                {getText(p.name)}
                            </button>
                            {content.pages.length > 1 && p.id !== content.pages[0].id && (
                                <button onClick={() => deletePage(p.id)} className="text-red-500 hover:text-red-400 text-sm px-2 py-1">Delete</button>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-dark-300">
                    <Button onClick={() => setAddPageModalOpen(true)} className="w-full">Add New Page</Button>
                </div>
            </Accordion>
            
            {/* Dynamically render accordions for every section on the current page */}
            {page.sections.map((section) => {
                const sectionInfo = AVAILABLE_SECTIONS.find(s => s.id === section.id);
                if (!sectionInfo) return null;
                const sectionPath = `content.${section.id}`;
                const sectionData = page.content[section.id as keyof typeof page.content] as any;
                 const isHero = section.id === 'hero';

                return (
                    <Accordion 
                        key={section.id} 
                        title={sectionInfo.name} 
                        isOpen={openAccordion === section.id} 
                        onClick={() => handleAccordionClick(section.id)}
                        isVisible={section.visible}
                        onVisibilityChange={() => toggleSectionVisibility(section.id)}
                        isOptional={!isHero} // Hero section is mandatory on pages that have it, but can be hidden
                    >
                        {sectionData.headline !== undefined && renderTextInputs('Headline', `${sectionPath}.headline`, sectionData.headline)}
                        {sectionData.subheadline !== undefined && renderTextInputs('Subheadline', `${sectionPath}.subheadline`, sectionData.subheadline, true)}
                        {sectionData.ctaButton !== undefined && renderTextInputs('Button Text', `${sectionPath}.ctaButton`, sectionData.ctaButton)}
                        {sectionData.imageUrl !== undefined && (
                             <ImageUpload label="Background Image" value={sectionData.imageUrl} onChange={newUrl => updateValue(`${sectionPath}.imageUrl`, newUrl)} promptContext={`${sectionInfo.name} for a ${getText(content.siteName)} website`} />
                        )}
                        
                        {sectionData.title !== undefined && renderTextInputs('Section Title', `${sectionPath}.title`, sectionData.title)}
                        
                        {section.id === 'about' && (
                            <>
                                {renderTextInputs('Text', `${sectionPath}.text`, sectionData.text, true)}
                            </>
                        )}
                        
                        {sectionData.items && Array.isArray(sectionData.items) && sectionData.items.map((item: any, index: number) => (
                            <div key={index} className="p-3 bg-dark-300 rounded-md space-y-2 border-l-4 border-dark-100">
                                <h4 className="font-semibold text-light-200">Item {index + 1}</h4>
                                {Object.keys(item).map(key => {
                                    if (key === 'icon' || key === 'imageUrl' || key === 'isFeatured' || key === 'features') return null; // Handled by specific components
                                    if (typeof item[key] === 'string' || (typeof item[key] === 'object' && item[key] !== null && ('en' in item[key] || content.languageMode !== 'bilingual'))){
                                       return renderTextInputs(key.charAt(0).toUpperCase() + key.slice(1), `${sectionPath}.items.${index}.${key}`, item[key], key.includes('description') || key.includes('text') || key.includes('quote') || key.includes('answer'));
                                    }
                                    return null;
                                })}
                                 {item.imageUrl !== undefined && (
                                    <ImageUpload label="Image" value={item.imageUrl} onChange={url => updateValue(`${sectionPath}.items.${index}.imageUrl`, url)} promptContext={`Image for a '${sectionInfo.name}' section, related to '${getText(item.name || item.caption)}'`}/>
                                )}
                            </div>
                        ))}

                        {section.id === 'contact' && (
                           <>
                                {renderTextInputs('Address', `${sectionPath}.address`, sectionData.address)}
                                <Input label="Email" value={sectionData.email} onChange={e => updateValue(`${sectionPath}.email`, e.target.value)} />
                                <Input label="Phone" value={sectionData.phone} onChange={e => updateValue(`${sectionPath}.phone`, e.target.value)} />
                           </>
                        )}

                        {section.id === 'form' && (
                           <>
                                {renderTextInputs('Section Title', `${sectionPath}.title`, sectionData.title)}
                                <Input label="Recipient Email" value={sectionData.recipientEmail} onChange={e => updateValue(`${sectionPath}.recipientEmail`, e.target.value)} type="email" placeholder="Form submissions will be sent to info@go-web.org" />
                                {renderTextInputs('Button Text', `${sectionPath}.submitButtonText`, sectionData.submitButtonText)}
                           </>
                        )}
                    </Accordion>
                );
            })}
        </div>
    </div>
    <Suspense fallback={<div/>}>
        {isAddPageModalOpen && <AddPageModal onClose={() => setAddPageModalOpen(false)} />}
    </Suspense>
    </>
  );
};

export default EditorForm;