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
                {/* FIX: Changed crossOrigin from "true" to "anonymous" to fix type error. */}
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
                )}

                {isVisible('features') && c.features.items.length > 0 && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto grid md:grid-cols-3 gap-12 text-center">
                            {c.features.items.map((item, index) => (
                                <div key={index}>
                                    <div className="preview-primary-text inline-block mb-4"><ServiceIcon icon={item.icon} /></div>
                                    <h4 className="text-xl font-semibold mb-2 text-gray-800">{getText(item.name)}</h4>
                                    <p className="text-gray-600">{getText(item.description)}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {isVisible('about') && (
                    <section className="py-24 px-6 bg-blue-50">
                        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
                            <img src={c.about.imageUrl} alt={getText(c.about.title)} className="rounded-lg shadow-xl" />
                            <div>
                                <h3 className="text-4xl font-bold mb-4 text-slate-800" style={{fontFamily: "'Lora', serif"}}>{getText(c.about.title)}</h3>
                                <p className="text-slate-600 leading-relaxed text-lg">{getText(c.about.text)}</p>
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('services') && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto text-center">
                            <h3 className="text-4xl font-bold mb-12 text-slate-800" style={{fontFamily: "'Lora', serif"}}>{getText(c.services.title)}</h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                {c.services.items.map((item, index) => (
                                    <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
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
                    <section className="py-24 px-6 bg-blue-50">
                        <div className="container mx-auto text-center">
                            <h3 className="text-4xl font-bold mb-12 text-slate-800" style={{fontFamily: "'Lora', serif"}}>{getText(c.team.title)}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {c.team.items.map((item, index) => (
                                    <div key={index}>
                                        <img src={item.imageUrl} alt={getText(item.name)} className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-lg"/>
                                        <h4 className="text-xl font-semibold text-slate-800">{getText(item.name)}</h4>
                                        <p className="preview-primary-text">{getText(item.role)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('testimonials') && c.testimonials.items.length > 0 && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto text-center max-w-4xl">
                            <h3 className="text-4xl font-bold mb-12 text-slate-800" style={{fontFamily: "'Lora', serif"}}>{getText(c.testimonials.title)}</h3>
                            <div className="space-y-10">
                                {c.testimonials.items.map((item, index) => (
                                    <blockquote key={index} className="bg-blue-50 p-8 rounded-lg shadow-xl">
                                        <p className="text-xl italic text-slate-700">"{getText(item.quote)}"</p>
                                        <footer className="mt-4">
                                            <cite className="font-semibold not-italic text-slate-900">{getText(item.author)}</cite>, <span className="text-slate-500">{getText(item.authorRole)}</span>
                                        </footer>
                                    </blockquote>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('faq') && c.faq.items.length > 0 && (
                    <section className="py-24 px-6 bg-blue-50">
                        <div className="container mx-auto max-w-3xl">
                            <h3 className="text-4xl font-bold mb-12 text-center text-slate-800" style={{fontFamily: "'Lora', serif"}}>{getText(c.faq.title)}</h3>
                            <div className="space-y-4">
                                {c.faq.items.map((item, index) => <FAQAccordion key={index} q={getText(item.question)} a={getText(item.answer)} />)}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('form') && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto max-w-2xl text-center">
                            <h3 className="text-4xl font-bold text-slate-800 mb-8" style={{fontFamily: "'Lora', serif"}}>{getText(c.form.title)}</h3>
                            <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted! (This is a preview. In a live site, this would email submissions to ' + c.form.recipientEmail + ')'); }} className="space-y-6 text-left bg-blue-50 p-8 rounded-lg">
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
