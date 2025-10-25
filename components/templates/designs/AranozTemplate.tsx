import React from 'react';
import { TemplateProps } from '../types';
import { ServiceIcon, TemplateWrapper, FAQAccordion } from '../common';

// New Template: Hearth (for Furniture/Interior Design)
export const AranozTemplate: React.FC<TemplateProps> = (props) => {
    const { getText, page } = props;
    const c = page.content;
    const isVisible = (id: string) => page.sections.find(s => s.id === id)?.visible ?? false;

    return (
        <TemplateWrapper {...props}>
             <div className="bg-white">
                {isVisible('hero') && (
                    <section className="h-[90vh] flex items-center bg-[#F7F6F2]">
                        <div className="container mx-auto grid md:grid-cols-2 items-center px-6 gap-8">
                            <div className="text-gray-800 text-center md:text-left">
                                <h2 className="text-6xl font-serif font-bold text-slate-800 mb-4 leading-tight">{getText(c.hero.headline)}</h2>
                                <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto md:mx-0">{getText(c.hero.subheadline)}</p>
                                <button className="preview-primary-bg text-white font-bold py-4 px-10 rounded-md text-lg hover:opacity-90">{getText(c.hero.ctaButton)}</button>
                            </div>
                            <div className="h-[70vh] w-full">
                                <img src={c.hero.imageUrl} alt="Hero" className="w-full h-full object-cover rounded-lg shadow-xl"/>
                            </div>
                        </div>
                    </section>
                )}
                
                {isVisible('features') && c.features.items.length > 0 && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto grid md:grid-cols-3 gap-12 text-left">
                            {c.features.items.map((item, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="preview-primary-text mt-1"><ServiceIcon icon={item.icon} /></div>
                                    <div>
                                        <h4 className="text-xl font-semibold mb-2 text-slate-800">{getText(item.name)}</h4>
                                        <p className="text-slate-600">{getText(item.description)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {isVisible('services') && (
                    <section className="py-24 px-6 bg-[#F7F6F2]">
                        <div className="container mx-auto text-center">
                            <h3 className="text-4xl font-serif font-bold text-slate-800 mb-12">{getText(c.services.title)}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {c.services.items.map((item, index) => (
                                    <div key={index} className="group text-left">
                                    <div className="bg-white aspect-[4/5] rounded-lg overflow-hidden relative">
                                        <img src={`https://source.unsplash.com/500x600/?furniture,${index}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={getText(item.name)}/>
                                    </div>
                                        <h4 className="text-xl font-semibold mt-4 text-slate-800">{getText(item.name)}</h4>
                                        <p className="text-slate-500">{getText(item.description)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('about') && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto text-center max-w-3xl">
                            <h3 className="text-4xl font-serif font-bold text-slate-800 mb-4">{getText(c.about.title)}</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">{getText(c.about.text)}</p>
                        </div>
                    </section>
                )}

                {isVisible('testimonials') && c.testimonials.items.length > 0 && (
                    <section className="py-24 px-6 bg-[#F7F6F2]">
                        <div className="container mx-auto text-center max-w-4xl">
                            <h3 className="text-4xl font-serif font-bold mb-12 text-slate-800">{getText(c.testimonials.title)}</h3>
                            <div className="space-y-10">
                                {c.testimonials.items.map((item, index) => (
                                    <blockquote key={index}>
                                        <p className="text-2xl font-serif italic text-slate-700">"{getText(item.quote)}"</p>
                                        <footer className="mt-4">
                                            <cite className="font-semibold not-italic text-slate-800">{getText(item.author)}</cite>, <span className="text-slate-500">{getText(item.authorRole)}</span>
                                        </footer>
                                    </blockquote>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('faq') && c.faq.items.length > 0 && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto max-w-3xl">
                            <h3 className="text-4xl font-serif font-bold text-slate-800 mb-12 text-center">{getText(c.faq.title)}</h3>
                            <div className="space-y-4">
                                {c.faq.items.map((item, index) => <FAQAccordion key={index} q={getText(item.question)} a={getText(item.answer)} />)}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('cta') && (
                    <section className="py-24 px-6 preview-primary-bg text-white">
                        <div className="container mx-auto text-center max-w-3xl">
                            <h3 className="text-4xl font-serif font-bold mb-4">{getText(c.cta.headline)}</h3>
                            <p className="text-xl mb-8 opacity-90">{getText(c.cta.subheadline)}</p>
                            <button className="bg-white text-slate-800 font-bold py-3 px-10 rounded text-lg hover:bg-slate-200 transition-colors">{getText(c.cta.ctaButton)}</button>
                        </div>
                    </section>
                )}

                 {isVisible('form') && (
                    <section className="py-24 px-6 bg-[#F7F6F2]">
                        <div className="container mx-auto max-w-2xl text-center">
                            <h3 className="text-4xl font-serif font-bold text-slate-800 mb-8">{getText(c.form.title)}</h3>
                            <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted! (This is a preview. In a live site, this would email submissions to ' + c.form.recipientEmail + ')'); }} className="space-y-6 text-left bg-white p-8 rounded-lg shadow-md">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input type="text" id="name" required className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 preview-primary-ring focus:border-transparent" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" id="email" required className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 preview-primary-ring focus:border-transparent" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea id="message" rows={4} required className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 preview-primary-ring focus:border-transparent"></textarea>
                                </div>
                                <div className="text-center pt-2">
                                    <button type="submit" className="preview-primary-bg text-white font-bold py-3 px-10 rounded-md text-lg hover:opacity-90">{getText(c.form.submitButtonText)}</button>
                                </div>
                            </form>
                        </div>
                    </section>
                )}
            </div>
        </TemplateWrapper>
    );
};