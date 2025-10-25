import React from 'react';
import { TemplateProps } from '../types';
import { TemplateWrapper, FAQAccordion, ServiceIcon } from '../common';

// New Template: Haven (for Real Estate)
export const HomeyTemplate: React.FC<TemplateProps> = (props) => {
    const { getText, page } = props;
    const c = page.content;
    const isVisible = (id: string) => page.sections.find(s => s.id === id)?.visible ?? false;

    return (
        <TemplateWrapper {...props}>
             <div className="bg-white">
                {isVisible('hero') && (
                    <section className="relative h-[80vh] flex items-center justify-center text-center text-white bg-gray-800"
                        style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${c.hero.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        <div className="max-w-4xl px-4">
                            <h2 className="text-5xl md:text-6xl font-extrabold mb-4">{getText(c.hero.headline)}</h2>
                            <p className="text-lg md:text-xl mb-8 opacity-90">{getText(c.hero.subheadline)}</p>
                            <div className="mt-8 max-w-3xl mx-auto">
                                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg flex gap-2 flex-col md:flex-row">
                                <input type="text" placeholder="Enter a location, property type..." className="w-full p-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 preview-primary-ring"/>
                                <button className="preview-primary-bg text-white font-bold py-3 px-8 rounded-md text-lg hover:opacity-90">{getText(c.hero.ctaButton)}</button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                
                {isVisible('services') && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto">
                            <h3 className="text-4xl font-bold mb-12 text-center text-gray-800">{getText(c.services.title)}</h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                {c.services.items.map((item, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden group border border-gray-200">
                                        <div className="h-56 bg-cover bg-center overflow-hidden" >
                                            <img src={`https://source.unsplash.com/600x400/?house,modern,${index}`} alt={getText(item.name)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-2xl font-semibold mb-2 text-gray-900">{getText(item.name)}</h4>
                                            <p className="text-gray-600 truncate">{getText(item.description)}</p>
                                            <p className="preview-primary-text font-bold mt-4 text-xl">Contact for price</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('about') && (
                    <section className="py-24 px-6 bg-gray-50">
                        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
                            <img src={c.about.imageUrl} alt={getText(c.about.title)} className="rounded-lg shadow-xl" />
                            <div>
                                <h3 className="text-4xl font-bold text-gray-800 mb-4">{getText(c.about.title)}</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">{getText(c.about.text)}</p>
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('features') && c.features.items.length > 0 && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto text-center">
                            <h3 className="text-4xl font-bold text-gray-800 mb-12">{getText(c.features.title)}</h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                {c.features.items.map((item, index) => (
                                    <div key={index} className="bg-white p-8 rounded-lg">
                                        <div className="preview-primary-text inline-block mb-4"><ServiceIcon icon={item.icon} /></div>
                                        <h4 className="text-2xl font-semibold mb-2 text-gray-900">{getText(item.name)}</h4>
                                        <p className="text-gray-600">{getText(item.description)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('team') && c.team.items.length > 0 && (
                    <section className="py-24 px-6 bg-gray-50">
                        <div className="container mx-auto text-center">
                            <h3 className="text-4xl font-bold text-gray-800 mb-12">{getText(c.team.title)}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                {c.team.items.map((item, index) => (
                                    <div key={index}>
                                        <img src={item.imageUrl} alt={getText(item.name)} className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-lg"/>
                                        <h4 className="text-xl font-semibold text-gray-800">{getText(item.name)}</h4>
                                        <p className="text-gray-500 preview-primary-text">{getText(item.role)}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                {isVisible('testimonials') && c.testimonials.items.length > 0 && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto text-center max-w-4xl">
                            <h3 className="text-4xl font-bold text-gray-800 mb-12">{getText(c.testimonials.title)}</h3>
                            <div className="space-y-10">
                                {c.testimonials.items.map((item, index) => (
                                    <blockquote key={index}>
                                        <p className="text-xl italic text-gray-700">"{getText(item.quote)}"</p>
                                        <footer className="mt-4">
                                            <cite className="font-semibold not-italic text-gray-900">{getText(item.author)}</cite>
                                        </footer>
                                    </blockquote>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('faq') && c.faq.items.length > 0 && (
                    <section className="py-24 px-6 bg-gray-50">
                        <div className="container mx-auto max-w-3xl">
                            <h3 className="text-4xl font-bold text-gray-800 mb-12 text-center">{getText(c.faq.title)}</h3>
                            <div className="space-y-4">
                                {c.faq.items.map((item, index) => <FAQAccordion key={index} q={getText(item.question)} a={getText(item.answer)} />)}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('form') && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto max-w-2xl text-center">
                            <h3 className="text-4xl font-bold text-gray-800 mb-8">{getText(c.form.title)}</h3>
                            <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted! (This is a preview. In a live site, this would email submissions to ' + c.form.recipientEmail + ')'); }} className="space-y-6 text-left bg-gray-50 p-8 rounded-lg">
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
                                    <button type="submit" className="preview-primary-bg text-white font-bold py-3 px-10 rounded-full text-lg hover:opacity-90">{getText(c.form.submitButtonText)}</button>
                                </div>
                            </form>
                        </div>
                    </section>
                )}

                {isVisible('cta') && (
                    <section className="py-24 px-6 preview-primary-bg text-white">
                        <div className="container mx-auto text-center">
                            <h3 className="text-4xl font-bold mb-4">{getText(c.cta.headline)}</h3>
                            <p className="text-xl mb-8">{getText(c.cta.subheadline)}</p>
                            <button className="bg-white text-gray-800 font-bold py-3 px-10 rounded-full text-lg hover:bg-gray-200">{getText(c.cta.ctaButton)}</button>
                        </div>
                    </section>
                )}
            </div>
        </TemplateWrapper>
    );
};