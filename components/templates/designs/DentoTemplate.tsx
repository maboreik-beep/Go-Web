import React from 'react';
import { TemplateProps } from '../types';
import { ServiceIcon, FAQAccordion, TemplateWrapper } from '../common';

// New Template: Serenity (for Healthcare/Medical)
export const DentoTemplate: React.FC<TemplateProps> = (props) => {
    const { getText, page } = props;
    const c = page.content;
    const isVisible = (id: string) => page.sections.find(s => s.id === id)?.visible ?? false;

    return (
        <TemplateWrapper {...props}>
            <div className="bg-white">
                {isVisible('hero') && (
                    <section className="relative h-[80vh] flex items-center bg-blue-50">
                        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
                            <div className="max-w-xl text-center md:text-left">
                                <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4 leading-tight">{getText(c.hero.headline)}</h2>
                                <p className="text-lg text-slate-600 mb-8">{getText(c.hero.subheadline)}</p>
                                <button className="preview-primary-bg text-white font-bold py-4 px-10 rounded-full text-lg hover:opacity-90 transition-all duration-300">{getText(c.hero.ctaButton)}</button>
                            </div>
                            <div className="hidden md:block">
                                <img src={c.hero.imageUrl} alt={getText(c.hero.headline)} className="rounded-lg shadow-2xl" />
                            </div>
                        </div>
                    </section>
                )}
                
                {isVisible('about') && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
                            <img src={c.about.imageUrl} alt={getText(c.about.title)} className="rounded-lg shadow-xl" />
                            <div>
                                <h3 className="text-4xl font-bold mb-4 text-slate-800">{getText(c.about.title)}</h3>
                                <p className="text-slate-600 leading-relaxed text-lg">{getText(c.about.text)}</p>
                            </div>
                        </div>
                    </section>
                )}
                
                {isVisible('services') && (
                    <section className="py-24 px-6 bg-blue-50">
                        <div className="container mx-auto text-center">
                            <h3 className="text-4xl font-bold mb-12 text-slate-800">{getText(c.services.title)}</h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                {c.services.items.map((item, index) => (
                                    <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                        <div className="preview-primary-text inline-block mb-4"><ServiceIcon icon={item.icon} /></div>
                                        <h4 className="text-2xl font-semibold mb-2 text-slate-900">{getText(item.name)}</h4>
                                        <p className="text-slate-600">{getText(item.description)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('features') && c.features.items.length > 0 && (
                     <section className="py-24 px-6">
                        <div className="container mx-auto text-center">
                            <h3 className="text-4xl font-bold mb-12 text-slate-800">{getText(c.features.title)}</h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                {c.features.items.map((item, index) => (
                                    <div key={index} className="bg-white p-8 rounded-lg">
                                        <div className="preview-primary-text inline-block mb-4"><ServiceIcon icon={item.icon} /></div>
                                        <h4 className="text-2xl font-semibold mb-2 text-slate-900">{getText(item.name)}</h4>
                                        <p className="text-slate-600">{getText(item.description)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('team') && c.team.items.length > 0 && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto text-center">
                            <h3 className="text-4xl font-bold mb-12 text-slate-800">{getText(c.team.title)}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                {c.team.items.map((item, index) => (
                                    <div key={index}>
                                        <img src={item.imageUrl} alt={getText(item.name)} className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-lg"/>
                                        <h4 className="text-xl font-semibold text-slate-800">{getText(item.name)}</h4>
                                        <p className="text-slate-500 preview-primary-text">{getText(item.role)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('testimonials') && c.testimonials.items.length > 0 && (
                    <section className="py-24 px-6 bg-blue-50">
                        <div className="container mx-auto text-center max-w-4xl">
                            <h3 className="text-4xl font-bold mb-12 text-slate-800">{getText(c.testimonials.title)}</h3>
                            <div className="space-y-10">
                                {c.testimonials.items.map((item, index) => (
                                    <blockquote key={index} className="bg-white p-8 rounded-lg shadow-xl">
                                        <p className="text-xl italic text-slate-700">"{getText(item.quote)}"</p>
                                        <footer className="mt-4">
                                            <cite className="font-semibold not-italic text-slate-900">{getText(item.author)}</cite>
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
                            <h3 className="text-4xl font-bold mb-12 text-center text-slate-800">{getText(c.faq.title)}</h3>
                            <div className="space-y-4">
                                {c.faq.items.map((item, index) => <FAQAccordion key={index} q={getText(item.question)} a={getText(item.answer)} />)}
                            </div>
                        </div>
                    </section>
                )}
                
                {isVisible('form') && (
                    <section className="py-24 px-6 bg-blue-50">
                        <div className="container mx-auto max-w-2xl text-center">
                            <h3 className="text-4xl font-bold text-slate-800 mb-8">{getText(c.form.title)}</h3>
                            <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted! (This is a preview. In a live site, this would email submissions to ' + c.form.recipientEmail + ')'); }} className="space-y-6 text-left bg-white p-8 rounded-lg shadow-md">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input type="text" id="name" required className="block w-full px-3 py-2 bg-blue-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 preview-primary-ring focus:border-transparent" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" id="email" required className="block w-full px-3 py-2 bg-blue-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 preview-primary-ring focus:border-transparent" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea id="message" rows={4} required className="block w-full px-3 py-2 bg-blue-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 preview-primary-ring focus:border-transparent"></textarea>
                                </div>
                                <div className="text-center pt-2">
                                    <button type="submit" className="preview-primary-bg text-white font-bold py-3 px-10 rounded-full text-lg hover:opacity-90">{getText(c.form.submitButtonText)}</button>
                                </div>
                            </form>
                        </div>
                    </section>
                )}

                {isVisible('contact') && (
                    <section className="py-24 px-6 preview-primary-bg text-white">
                        <div className="container mx-auto text-center max-w-4xl">
                            <h3 className="text-4xl font-bold mb-8">{getText(c.contact.title)}</h3>
                            <div className="grid md:grid-cols-3 gap-8 text-lg">
                                <p>{getText(c.contact.address)}</p>
                                <a href={`mailto:${c.contact.email}`} className="hover:underline">{c.contact.email}</a>
                                <a href={`tel:${c.contact.phone}`} className="hover:underline">{c.contact.phone}</a>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </TemplateWrapper>
    );
};