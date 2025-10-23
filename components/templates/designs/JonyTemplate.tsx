import React from 'react';
import { TemplateProps } from '../types';
import { ServiceIcon, TemplateWrapper, FAQAccordion } from '../common';

// New Template: Profile (for Freelancers/Professionals)
export const JonyTemplate: React.FC<TemplateProps> = (props) => {
    const { getText, page } = props;
    const c = page.content;
    const isVisible = (id: string) => page.sections.find(s => s.id === id)?.visible ?? false;

    return (
        <TemplateWrapper {...props} showDefaultHeader={false} showDefaultFooter={false}>
            <div className="flex flex-col md:flex-row min-h-screen bg-white text-gray-800">
                <div 
                    className="w-full md:w-2/5 bg-cover bg-center min-h-[50vh] md:min-h-screen md:sticky top-0"
                    style={{backgroundImage: `url(${c.hero.imageUrl})`}}
                ></div>

                <main className="w-full md:w-3/5 p-12 md:p-20">
                    {isVisible('hero') && (
                        <section className="mb-16">
                            <h2 className="text-5xl md:text-7xl font-extrabold mb-2">{getText(c.hero.headline)}</h2>
                            <p className="text-2xl preview-primary-text font-semibold mb-8">{getText(c.hero.subheadline)}</p>
                        </section>
                    )}
                        
                    {isVisible('about') && (
                        <section className="mb-16">
                            <h3 className="text-3xl font-bold mb-4 border-b-2 border-gray-200 pb-2">{getText(c.about.title)}</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">{getText(c.about.text)}</p>
                        </section>
                    )}
                    
                    {isVisible('services') && (
                        <section className="mb-16">
                            <h3 className="text-3xl font-bold mb-8 border-b-2 border-gray-200 pb-2">{getText(c.services.title)}</h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                {c.services.items.map((item, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="preview-primary-text mt-1"><ServiceIcon icon={item.icon}/></div>
                                        <div>
                                            <h4 className="text-xl font-semibold mb-1">{getText(item.name)}</h4>
                                            <p className="text-gray-600">{getText(item.description)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {isVisible('testimonials') && c.testimonials.items.length > 0 && (
                        <section className="mb-16">
                            <h3 className="text-3xl font-bold mb-8 border-b-2 border-gray-200 pb-2">{getText(c.testimonials.title)}</h3>
                            <div className="space-y-8">
                                {c.testimonials.items.map((item, index) => (
                                    <blockquote key={index} className="border-l-4 preview-primary-border pl-6 bg-gray-50 p-6 rounded-r-lg">
                                        <p className="text-lg italic text-gray-700">"{getText(item.quote)}"</p>
                                        <footer className="mt-4">
                                            <cite className="font-semibold not-italic">{getText(item.author)}</cite>
                                        </footer>
                                    </blockquote>
                                ))}
                            </div>
                        </section>
                    )}

                    {isVisible('gallery') && c.gallery.items.length > 0 && (
                        <section className="mb-16">
                             <h3 className="text-3xl font-bold mb-8 border-b-2 border-gray-200 pb-2">{getText(c.gallery.title)}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {c.gallery.items.map((item, index) => (
                                    <div key={index} className="overflow-hidden rounded-lg shadow-md aspect-square">
                                        <img src={item.imageUrl} alt={getText(item.caption)} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {isVisible('faq') && c.faq.items.length > 0 && (
                        <section className="mb-16">
                            <h3 className="text-3xl font-bold mb-8 border-b-2 border-gray-200 pb-2">{getText(c.faq.title)}</h3>
                            <div className="space-y-2">
                                {c.faq.items.map((item, index) => <FAQAccordion key={index} q={getText(item.question)} a={getText(item.answer)} />)}
                            </div>
                        </section>
                    )}
                    
                    {isVisible('form') && (
                        <section className="mb-16">
                             <h3 className="text-3xl font-bold mb-8 border-b-2 border-gray-200 pb-2">{getText(c.form.title)}</h3>
                             <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted! (This is a preview. In a live site, this would email submissions to ' + c.form.recipientEmail + ')'); }} className="space-y-6">
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
                                <div className="pt-2">
                                    <button type="submit" className="preview-primary-bg text-white font-bold py-3 px-10 rounded text-lg hover:opacity-90">{getText(c.form.submitButtonText)}</button>
                                </div>
                            </form>
                        </section>
                    )}


                    {isVisible('contact') && (
                        <footer className="pt-12 border-t-2 border-gray-200">
                            <h3 className="text-3xl font-bold mb-4">{getText(c.contact.title)}</h3>
                            <p className="text-gray-600 text-lg">
                                <strong>Email:</strong> <a href={`mailto:${c.contact.email}`} className="preview-primary-text hover:underline">{c.contact.email}</a>
                            </p>
                            <p className="text-gray-600 text-lg">
                                <strong>Phone:</strong> <a href={`tel:${c.contact.phone}`} className="preview-primary-text hover:underline">{c.contact.phone}</a>
                            </p>
                            <p className="mt-12 text-sm text-gray-400">&copy; {new Date().getFullYear()} {getText(c.hero.headline)}</p>
                        </footer>
                    )}
                </main>
            </div>
        </TemplateWrapper>
    );
};