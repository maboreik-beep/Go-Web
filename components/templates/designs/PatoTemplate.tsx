import React from 'react';
import { TemplateProps } from '../types';
import { TemplateWrapper, FAQAccordion, ServiceIcon } from '../common';

// New Template: Savor (for Restaurants/Coffee Shops)
export const PatoTemplate: React.FC<TemplateProps> = (props) => {
    const { getText, page } = props;
    const c = page.content;
    const isVisible = (id: string) => page.sections.find(s => s.id === id)?.visible ?? false;

    return (
        <TemplateWrapper {...props}>
            <div className="bg-white">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                {/* FIX: Changed crossOrigin from "true" to "anonymous" to fix type error. */}
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />

                {isVisible('hero') && (
                    <section className="relative h-screen flex items-center justify-center text-center text-white bg-gray-800"
                        style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${c.hero.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        <div className="max-w-4xl px-4">
                            <h2 className="text-6xl md:text-8xl font-bold mb-4" style={{fontFamily: "'Playfair Display', serif"}}>{getText(c.hero.headline)}</h2>
                            <p className="text-lg md:text-xl mb-8 tracking-widest uppercase">{getText(c.hero.subheadline)}</p>
                            <button className="border-2 border-white text-white font-bold py-3 px-10 text-lg hover:bg-white hover:text-black transition-colors">{getText(c.hero.ctaButton)}</button>
                        </div>
                    </section>
                )}
                
                {isVisible('about') && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
                            <div className="text-center md:text-left">
                                <h3 className="text-4xl font-bold text-gray-800 mb-4" style={{fontFamily: "'Playfair Display', serif"}}>{getText(c.about.title)}</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">{getText(c.about.text)}</p>
                            </div>
                            <img src={c.about.imageUrl} alt={getText(c.about.title)} className="rounded-lg shadow-xl" />
                        </div>
                    </section>
                )}
                
                {isVisible('services') && (
                    <section className="py-24 px-6 bg-cover bg-center bg-fixed" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://source.unsplash.com/1920x1080/?food,dark)`}}>
                        <div className="container mx-auto text-center text-white">
                            <h3 className="text-4xl font-bold mb-12" style={{fontFamily: "'Playfair Display', serif"}}>{getText(c.services.title)}</h3>
                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto text-left">
                                {c.services.items.map((item, index) => (
                                    <div key={index} className="border-b border-gray-700 pb-4">
                                        <h4 className="text-2xl font-semibold mb-2">{getText(item.name)}</h4>
                                        <p className="text-gray-300">{getText(item.description)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('gallery') && c.gallery.items.length > 0 && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto text-center">
                            <h3 className="text-4xl font-bold text-gray-800 mb-12" style={{fontFamily: "'Playfair Display', serif"}}>{getText(c.gallery.title)}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {c.gallery.items.map((item, index) => (
                                    <div key={index} className="overflow-hidden rounded-lg shadow-md aspect-square">
                                        <img src={item.imageUrl} alt={getText(item.caption)} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('testimonials') && c.testimonials.items.length > 0 && (
                    <section className="py-24 px-6 bg-gray-50">
                        <div className="container mx-auto text-center max-w-4xl">
                            <h3 className="text-4xl font-bold text-gray-800 mb-12" style={{fontFamily: "'Playfair Display', serif"}}>{getText(c.testimonials.title)}</h3>
                            <div className="space-y-10">
                                {c.testimonials.items.map((item, index) => (
                                    <blockquote key={index}>
                                        <p className="text-xl italic text-gray-700">"{getText(item.quote)}"</p>
                                        <footer className="mt-4">
                                            <cite className="font-semibold not-italic">{getText(item.author)}</cite>, <span className="text-gray-500">{getText(item.authorRole)}</span>
                                        </footer>
                                    </blockquote>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('form') && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto max-w-2xl text-center">
                            <h3 className="text-4xl font-bold text-gray-800 mb-8" style={{fontFamily: "'Playfair Display', serif"}}>{getText(c.form.title)}</h3>
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
                                    <button type="submit" className="border-2 border-gray-800 text-gray-800 font-bold py-3 px-10 text-lg hover:bg-gray-800 hover:text-white transition-colors">{getText(c.form.submitButtonText)}</button>
                                </div>
                            </form>
                        </div>
                    </section>
                )}
            </div>
        </TemplateWrapper>
    );
};
