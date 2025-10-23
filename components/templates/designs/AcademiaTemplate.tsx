import React from 'react';
import { TemplateProps } from '../types';
import { TemplateWrapper, FAQAccordion, ServiceIcon } from '../common';

// New Template: Erudite (for Education)
export const AcademiaTemplate: React.FC<TemplateProps> = (props) => {
    const { getText, page } = props;
    const c = page.content;
    const isVisible = (id: string) => page.sections.find(s => s.id === id)?.visible ?? false;

    return (
        <TemplateWrapper {...props}>
            <div className="bg-white">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Lora:wght@700&display=swap" rel="stylesheet" />
                
                {isVisible('hero') && (
                    <section className="relative h-[80vh] flex items-center justify-center text-center text-white bg-gray-800"
                        style={{backgroundImage: `linear-gradient(rgba(20, 50, 90, 0.8), rgba(20, 50, 90, 0.8)), url(${c.hero.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        <div className="max-w-4xl px-4">
                            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{fontFamily: "'Lora', serif"}}>{getText(c.hero.headline)}</h2>
                            <p className="text-lg md:text-xl mb-8 opacity-90">{getText(c.hero.subheadline)}</p>
                            <button className="preview-primary-bg text-white font-bold py-4 px-10 rounded text-lg hover:opacity-90">{getText(c.hero.ctaButton)}</button>
                        </div>
                    </section>
