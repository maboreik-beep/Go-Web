import React from 'react';
import { TemplateProps } from '../types';
import { ServiceIcon, TemplateWrapper, FAQAccordion } from '../common';

// New Template: Keystone (for Business/Finance/Tech)
export const ConsolutionTemplate: React.FC<TemplateProps> = (props) => {
    const { getText, page } = props;
    const c = page.content;
    const isVisible = (id: string) => page.sections.find(s => s.id === id)?.visible ?? false;

    return (
        <TemplateWrapper {...props}>
            <div className="bg-white">
                {isVisible('hero') && (
                    <section className="relative h-[85vh] flex items-center text-white bg-slate-800"
                        style={{backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.7)), url(${c.hero.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        <div className="container mx-auto px-6 max-w-4xl">
                            <h2 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">{getText(c.hero.headline)}</h2>
                            <p className="text-lg md:text-xl max-w-2xl mb-8 opacity-90">{getText(c.hero.subheadline)}</p>
                            <button className="preview-primary-bg text-white font-bold py-4 px-10 rounded text-lg hover:opacity-90 transition-transform hover:scale-105">{getText(c.hero.ctaButton)}</button>
                        </div>
                    </section>
                )}
                
                {isVisible('services') && (
                    <section className="py-24 px-6 bg-white">
                        <div className="container mx-auto">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <h3 className="text-4xl font-bold text-slate-900 mb-4">{getText(c.services.title)}</h3>
                            </div>
                            <div className="grid md:grid-cols-3 gap-8">
                                {c.services.items.map((item, index) => (
                                    <div key={index} className="bg-slate-50 p-8 rounded-lg text-left border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                        <div className="preview-primary-text inline-block mb-5"><ServiceIcon icon={item.icon} /></div>
                                        <h4 className="text-2xl font-semibold mb-3 text-slate-900">{getText(item.name)}</h4>
                                        <p className="text-slate-600">{getText(item.description)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('about') && (
                    <section className="py-24 px-6 bg-slate-50">
                        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
                            <img src={c.about.imageUrl} alt={getText(c.about.title)} className="rounded-lg shadow-xl" />
                            <div>
                                <h3 className="text-4xl font-bold mb-6 text-slate-900">{getText(c.about.title)}</h3>
                                <p className="text-slate-600 leading-relaxed text-lg">{getText(c.about.text)}</p>
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('features') && c.features.items.length > 0 && (
                    <section className="py-24 px-6 bg-white">
                        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
                             <div>
                                <h3 className="text-4xl font-bold mb-6 text-slate-900">{getText(c.features.title)}</h3>
                                <div className="space-y-6">
                                    {c.features.items.map((item, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="preview-primary-text flex-shrink-0 mt-1"><ServiceIcon icon={item.icon} /></div>
                                            <div>
                                                <h4 className="text-xl font-semibold mb-1 text-slate-800">{getText(item.name)}</h4>
                                                <p className="text-slate-600">{getText(item.description)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <img src={`https://source.unsplash.com/800x600/?technology,office`} alt={getText(c.features.title)} className="rounded-lg shadow-xl" />
                        </div>
                    </section>
                )}

                {isVisible('cta') && (
                    <section className="py-24 px-6 preview-primary-bg text-white">
                        <div className="container mx-auto text-center max-w-4xl">
                            <h3 className="text-4xl font-bold mb-4">{getText(c.cta.headline)}</h3>
                            <p className="text-xl mb-8 opacity-90">{getText(c.cta.subheadline)}</p>
                            <button className="bg-white text-slate-800 font-bold py-4 px-10 rounded text-lg hover:bg-slate-200 transition-colors">{getText(c.cta.ctaButton)}</button>
                        </div>
                    </section>
                )}
                
                {isVisible('testimonials') && c.testimonials.items.length > 0 && (
                    <section className="py-24 px-6 bg-white">
                        <div className="container mx-auto text-center max-w-4xl">
                            <h3 className="text-4xl font-bold mb-12 text-slate-900">{getText(c.testimonials.title)}</h3>
                            <div className="space-y-10">
                                {c.testimonials.items.map((item, index) => (
                                    <blockquote key={index}>
                                        <p className="text-xl italic text-slate-700">"{getText(item.quote)}"</p>
                                        <footer className="mt-4">
                                            <cite className="font-semibold text-slate-900 not-italic">{getText(item.author)}</cite>, <span className="text-slate-500">{getText(item.authorRole)}</span>
                                        </footer>
                                    </blockquote>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                 {isVisible('faq') && c.faq.items.length > 0 && (
                    <section className="py-24 px-6 bg-slate-50">
                        <div className="container mx-auto max-w-3xl">
                            <h3 className="text-4xl font-bold mb-12 text-center text-slate-900">{getText(c.faq.title)}</h3>
                            <div className="space-y-4">
                                {c.faq.items.map((item, index) => <FAQAccordion key={index} q={getText(item.question)} a={getText(item.answer)} />)}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('form') && (
                    <section className="py-24 px-6 bg-white">
                        <div className="container mx-auto max-w-2xl text-center">
                            <h3 className="text-4xl font-bold text-slate-900 mb-8">{getText(c.form.title)}</h3>
                            <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted! (This is a preview. In a live site, this would email submissions to ' + c.form.recipientEmail + ')'); }} className="space-y-6 text-left bg-slate-50 p-8 rounded-lg">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input type="text" id="name" required className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 preview-primary-ring focus:border-transparent" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" id="email" required className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 preview-primary-ring focus:border-transparent" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea id="message" rows={4} required className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 preview-primary-ring focus:border-transparent"></textarea>
                                </div>
                                <div className="text-center pt-2">
                                    <button type="submit" className="preview-primary-bg text-white font-bold py-3 px-10 rounded text-lg hover:opacity-90">{getText(c.form.submitButtonText)}</button>
                                </div>
                            </form>
                        </div>
                    </section>
                )}
            </div>
        </TemplateWrapper>
    );
};