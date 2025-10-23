import React from 'react';
import { TemplateProps } from '../types';
import { TemplateWrapper, ServiceIcon, FAQAccordion } from '../common';

// New Template: Aura (for Retail/E-commerce)
export const KarmaTemplate: React.FC<TemplateProps> = (props) => {
    const { getText, page, content, pages, setActivePageId } = props;
    const c = page.content;
    const isVisible = (id: string) => page.sections.find(s => s.id === id)?.visible ?? false;

    return (
        <TemplateWrapper {...props} showDefaultFooter={false}>
            {/* Custom Header for Aura */}
            <header className="bg-white/80 backdrop-blur-md p-6 sticky top-0 z-20 border-b border-gray-100">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-wider">{getText(content.siteName)}</h1>
                    <nav className="hidden md:flex space-x-8 items-center">
                         {pages.map(p => (
                             <button key={p.id} onClick={() => setActivePageId(p.id)} className={`font-medium tracking-wide text-gray-500 hover:text-gray-900 transition-colors ${p.id === page.id ? 'text-gray-900' : ''}`}>
                                {getText(p.name)}
                             </button>
                         ))}
                    </nav>
                </div>
            </header>
            
            <div className="bg-white">
                {isVisible('hero') && (
                    <section className="h-[75vh] flex items-center justify-center text-center" style={{backgroundImage: `url(${c.hero.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        <div className="max-w-4xl px-4 bg-white/70 backdrop-blur-sm p-12 rounded-lg">
                            <h2 className="text-5xl text-gray-800 font-bold mb-4">{getText(c.hero.headline)}</h2>
                            <p className="text-lg text-gray-600 mb-8">{getText(c.hero.subheadline)}</p>
                            <button className="bg-gray-800 text-white font-bold py-3 px-10 rounded-full hover:bg-gray-700 transition-colors">{getText(c.hero.ctaButton)}</button>
                        </div>
                    </section>
                )}
                
                {isVisible('services') && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto">
                            <div className="text-center mb-12">
                                <h3 className="text-4xl font-bold text-gray-800 mb-2">{getText(c.services.title)}</h3>
                                <p className="text-gray-500">Discover our curated selection</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {c.services.items.map((item, index) => (
                                    <div key={index} className="group text-left">
                                    <div className="bg-gray-100 aspect-w-4 aspect-h-5 flex items-center justify-center rounded-lg overflow-hidden">
                                        <img src={`https://source.unsplash.com/500x600/?product,${index}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={getText(item.name)}/>
                                    </div>
                                        <h4 className="text-xl font-semibold mt-4 mb-1 text-gray-800">{getText(item.name)}</h4>
                                        <p className="text-gray-500">{getText(item.description)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('about') && (
                    <section className="py-24 px-6 bg-gray-50">
                        <div className="container mx-auto text-center max-w-3xl">
                            <h3 className="text-4xl font-bold text-gray-800 mb-4">{getText(c.about.title)}</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">{getText(c.about.text)}</p>
                        </div>
                    </section>
                )}

                {isVisible('features') && c.features.items.length > 0 && (
                    <section className="py-24 px-6 border-t border-gray-100">
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
                    <section className="py-20 px-6 bg-gray-100">
                        <div className="container mx-auto text-center max-w-3xl">
                            <h3 className="text-3xl font-bold text-gray-800 mb-4">{getText(c.cta.headline)}</h3>
                            <p className="text-lg text-gray-600 mb-8">{getText(c.cta.subheadline)}</p>
                            <button className="bg-gray-800 text-white font-bold py-3 px-10 rounded-full hover:bg-gray-700 transition-colors">{getText(c.cta.ctaButton)}</button>
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
                            <h3 className="text-4xl font-bold text-gray-800 mb-8">{getText(c.form.title)}</h3>
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
                                    <button type="submit" className="bg-gray-800 text-white font-bold py-3 px-10 rounded-full hover:bg-gray-700 transition-colors">{getText(c.form.submitButtonText)}</button>
                                </div>
                            </form>
                        </div>
                    </section>
                )}
                
                {isVisible('contact') && (
                    <footer className="py-24 px-6 bg-gray-800 text-white">
                        <div className="container mx-auto grid md:grid-cols-4 gap-8">
                            <div className="col-span-2">
                                <h4 className="text-xl font-bold mb-4">{getText(content.siteName)}</h4>
                                <p className="text-gray-400 max-w-sm">{getText(c.about.text).substring(0, 150)}...</p>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-4">{getText(c.contact.title)}</h4>
                                <p className="text-gray-300">{getText(c.contact.address)}</p>
                                <p><a href={`mailto:${c.contact.email}`} className="hover:underline text-gray-300">{c.contact.email}</a></p>
                                <p><a href={`tel:${c.contact.phone}`} className="hover:underline text-gray-300">{c.contact.phone}</a></p>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-4">Newsletter</h4>
                                <p className="text-gray-400 mb-4">Get updates on new arrivals and sales.</p>
                                <div className="flex">
                                    <input type="email" placeholder="Your email" className="w-full p-2 rounded-l-md text-gray-800 focus:outline-none"/>
                                    <button className="preview-primary-bg text-white font-bold p-2 rounded-r-md">Go</button>
                                </div>
                            </div>
                        </div>
                    </footer>
                )}
            </div>
        </TemplateWrapper>
    );
};