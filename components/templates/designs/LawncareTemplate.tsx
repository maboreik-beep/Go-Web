import React from 'react';
import { TemplateProps } from '../types';
import { ServiceIcon, TemplateWrapper, FAQAccordion } from '../common';

// New Template: Verdant (for Agriculture/Lawncare)
export const LawncareTemplate: React.FC<TemplateProps> = (props) => {
    const { getText, page } = props;
    const c = page.content;
    const isVisible = (id: string) => page.sections.find(s => s.id === id)?.visible ?? false;

    return (
        <TemplateWrapper {...props}>
             {isVisible('hero') && (
                <section className="relative h-[85vh] flex items-center text-white"
                    style={{backgroundImage: `linear-gradient(to right, rgba(20, 80, 40, 0.8), rgba(20, 80, 40, 0.6)), url(${c.hero.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">{getText(c.hero.headline)}</h2>
                        <p className="text-lg md:text-xl mb-8 opacity-90">{getText(c.hero.subheadline)}</p>
                        <button className="bg-white text-green-800 font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-200">{getText(c.hero.ctaButton)}</button>
                    </div>
                </section>
            )}
            
            {isVisible('about') && (
                <section className="py-24 px-6">
                    <div className="container mx-auto text-center max-w-3xl">
                        <h3 className="text-4xl font-bold text-gray-800 mb-4">{getText(c.about.title)}</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">{getText(c.about.text)}</p>
                    </div>
                </section>
            )}

            {isVisible('services') && (
                <section className="py-24 px-6 bg-gray-50">
                    <div className="container mx-auto text-center">
                        <h3 className="text-4xl font-bold text-gray-800 mb-12">{getText(c.services.title)}</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            {c.services.items.map((item, index) => (
                                <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                                    <div className="text-green-600 inline-block mb-4"><ServiceIcon icon={item.icon} /></div>
                                    <h4 className="text-2xl font-semibold mb-2 text-gray-900">{getText(item.name)}</h4>
                                    <p className="text-gray-600">{getText(item.description)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            
            {isVisible('testimonials') && c.testimonials.items.length > 0 && (
                <section className="py-24 px-6">
                    <div className="container mx-auto text-center max-w-4xl">
                        <h3 className="text-4xl font-bold mb-12">{getText(c.testimonials.title)}</h3>
                        <div className="space-y-10">
                            {c.testimonials.items.map((item, index) => (
                                <blockquote key={index}>
                                    <p className="text-xl italic text-gray-700">"{getText(item.quote)}"</p>
                                    <footer className="mt-4">
                                        <cite className="font-semibold not-italic">{getText(item.author)}</cite>
                                    </footer>
                                </blockquote>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            
            {isVisible('gallery') && c.gallery.items.length > 0 && (
                <section className="py-24 px-6 bg-gray-50">
                    <div className="container mx-auto text-center">
                        <h3 className="text-4xl font-bold mb-12">{getText(c.gallery.title)}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {c.gallery.items.map((item, index) => (
                                <div key={index} className="overflow-hidden rounded-lg shadow-md aspect-w-1 aspect-h-1">
                                    <img src={item.imageUrl} alt={getText(item.caption)} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

             {isVisible('cta') && (
                <section className="py-24 px-6 bg-green-700 text-white">
                    <div className="container mx-auto text-center">
                        <h3 className="text-4xl font-bold mb-4">{getText(c.cta.headline)}</h3>
                        <p className="text-xl mb-8">{getText(c.cta.subheadline)}</p>
                        <button className="bg-white text-green-800 font-bold py-3 px-10 rounded-full text-lg hover:bg-gray-200">{getText(c.cta.ctaButton)}</button>
                    </div>
                </section>
            )}
        </TemplateWrapper>
    );
};
