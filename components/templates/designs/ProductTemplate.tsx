import React from 'react';
import { TemplateProps } from '../types';
import { ServiceIcon, TemplateWrapper, FAQAccordion } from '../common';

// New Template: Vogue (for Fashion)
export const ProductTemplate: React.FC<TemplateProps> = (props) => {
    const { getText, page } = props;
    const c = page.content;
    const isVisible = (id: string) => page.sections.find(s => s.id === id)?.visible ?? false;

    return (
        <TemplateWrapper {...props}>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
            
            <div className="bg-white">
                {isVisible('hero') && (
                    <section className="grid md:grid-cols-2 min-h-[85vh] font-serif">
                        <div className="flex flex-col justify-center p-12 bg-white order-2 md:order-1 text-center md:text-left">
                            <div className="max-w-md mx-auto">
                                <h2 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4 leading-none" style={{fontFamily: "'Playfair Display', serif"}}>{getText(c.hero.headline)}</h2>
                                <p className="text-lg text-gray-600 mb-8">{getText(c.hero.subheadline)}</p>
                                <button className="bg-gray-800 text-white font-sans font-bold py-3 px-10 rounded-full text-lg hover:bg-gray-700">{getText(c.hero.ctaButton)}</button>
                            </div>
                        </div>
                        <div className="bg-cover bg-center order-1 md:order-2 min-h-[50vh]" style={{backgroundImage: `url(${c.hero.imageUrl})`}}></div>
                    </section>
                )}
                
                {isVisible('services') && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto">
                            <div className="text-center mb-16">
                                <h3 className="text-4xl font-serif font-bold text-gray-800 mb-2">{getText(c.services.title)}</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {c.services.items.map((item, index) => (
                                    <div key={index} className="group relative">
                                    <div className="bg-gray-100 aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
                                        <img src={`https://source.unsplash.com/500x700/?fashion,${index}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={getText(item.name)}/>
                                    </div>
                                        <div className="text-center mt-4">
                                            <h4 className="text-xl font-semibold text-gray-800">{getText(item.name)}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('about') && (
                    <section className="py-24 px-6 bg-gray-50">
                        <div className="container mx-auto text-center max-w-3xl">
                            <h3 className="text-4xl font-serif font-bold text-gray-800 mb-4">{getText(c.about.title)}</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">{getText(c.about.text)}</p>
                        </div>
                    </section>
                )}

                {isVisible('features') && c.features.items.length > 0 && (
                    <section className="py-24 px-6 border-t border-gray-200">
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

                {isVisible('cta') && (
                    <section className="py-20 px-6 bg-gray-800 text-white">
                        <div className="container mx-auto text-center max-w-3xl">
                            <h3 className="text-3xl font-serif font-bold mb-4">{getText(c.cta.headline)}</h3>
                            <p className="text-lg opacity-90 mb-8">{getText(c.cta.subheadline)}</p>
                            <button className="bg-white text-gray-800 font-sans font-bold py-3 px-10 rounded-full hover:bg-gray-200 transition-colors">{getText(c.cta.ctaButton)}</button>
                        </div>
                    </section>
                )}

                {isVisible('testimonials') && c.testimonials.items.length > 0 && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto text-center max-w-4xl">
                            <h3 className="text-4xl font-serif font-bold text-gray-800 mb-12">{getText(c.testimonials.title)}</h3>
                            <div className="space-y-10">
                                {c.testimonials.items.map((item, index) => (
                                    <blockquote key={index}>
                                        <p className="text-2xl font-serif italic text-gray-700">"{getText(item.quote)}"</p>
                                        <footer className="mt-4">
                                            <cite className="font-semibold not-italic tracking-wider uppercase text-sm">{getText(item.author)}</cite>
                                        </footer>
                                    </blockquote>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('form') && (
                    <section className="py-24 px-6 bg-gray-50">
                        <div className="container mx-auto max-w-2xl text-center">
                            <h3 className="text-4xl font-serif font-bold text-gray-800 mb-8">{getText(c.form.title)}</h3>
                            <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted! (This is a preview. In a live site, this would email submissions to ' + c.form.recipientEmail + ')'); }} className="space-y-6 text-left bg-white p-8 rounded-lg shadow-md">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input type="text" id="name" required className="block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 preview-primary-ring focus:border-transparent" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" id="email" required className="block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 preview-primary-ring focus:border-transparent" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea id="message" rows={4} required className="block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 preview-primary-ring focus:border-transparent"></textarea>
                                </div>
                                <div className="text-center pt-2">
                                    <button type="submit" className="bg-gray-800 text-white font-sans font-bold py-3 px-10 rounded-full text-lg hover:bg-gray-700">{getText(c.form.submitButtonText)}</button>
                                </div>
                            </form>
                        </div>
                    </section>
                )}
            </div>
        </TemplateWrapper>
    );
};