import React from 'react';
import { TemplateProps } from '../types';
import { TemplateWrapper, FAQAccordion, ServiceIcon } from '../common';

// New Template: Nexus (for Events/Non-profits)
export const UmeetTemplate: React.FC<TemplateProps> = (props) => {
    const { getText, page } = props;
    const c = page.content;
    const isVisible = (id: string) => page.sections.find(s => s.id === id)?.visible ?? false;

    return (
        <TemplateWrapper {...props}>
            <div className="bg-white">
                {isVisible('hero') && (
                    <section className="relative h-[80vh] flex items-center justify-center text-center text-white bg-gray-800"
                        style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${c.hero.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        <div className="max-w-4xl px-4 text-white">
                            <p className="text-lg preview-primary-text font-bold uppercase tracking-widest">{getText(c.contact.address)}</p>
                            <h2 className="text-5xl md:text-7xl font-extrabold my-4">{getText(c.hero.headline)}</h2>
                            <button className="bg-white text-gray-800 font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-200 transition-colors transform hover:scale-105">{getText(c.hero.ctaButton)}</button>
                        </div>
                    </section>
                )}
                
                {isVisible('about') && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-4xl font-bold mb-4 text-gray-800">{getText(c.about.title)}</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">{getText(c.about.text)}</p>
                            </div>
                            <img src={c.about.imageUrl} alt={getText(c.about.title)} className="rounded-lg shadow-xl" />
                        </div>
                    </section>
                )}

                {isVisible('services') && (
                    <section className="py-24 px-6 bg-gray-50">
                        <div className="container mx-auto max-w-5xl">
                            <h3 className="text-4xl font-bold mb-12 text-center text-gray-800">{getText(c.services.title)}</h3>
                            <div className="space-y-8">
                                {c.services.items.map((item, index) => (
                                <div key={index} className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-lg shadow-md">
                                    <div className="text-center md:text-left md:w-1/4">
                                        <p className="text-lg font-bold preview-primary-text">Topic {index + 1}</p>
                                        <h4 className="text-2xl font-semibold text-gray-900">{getText(item.name)}</h4>
                                    </div>
                                    <div className="flex-grow border-t-2 md:border-t-0 md:border-l-2 border-gray-200 pt-6 md:pt-0 md:pl-8">
                                        <p className="text-gray-600">{getText(item.description)}</p>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('features') && c.features.items.length > 0 && (
                     <section className="py-24 px-6">
                        <div className="container mx-auto text-center">
                            <h3 className="text-4xl font-bold mb-12 text-gray-800">{getText(c.features.title)}</h3>
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
                            <h3 className="text-4xl font-bold mb-12 text-gray-800">{getText(c.team.title)}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {c.team.items.map((item, index) => (
                                    <div key={index}>
                                        <img src={item.imageUrl} alt={getText(item.name)} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"/>
                                        <h4 className="text-xl font-semibold text-gray-800">{getText(item.name)}</h4>
                                        <p className="text-gray-500">{getText(item.role)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                 {isVisible('testimonials') && c.testimonials.items.length > 0 && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto text-center max-w-4xl">
                            <h3 className="text-4xl font-bold mb-12 text-gray-800">{getText(c.testimonials.title)}</h3>
                            <div className="space-y-10">
                                {c.testimonials.items.map((item, index) => (
                                    <blockquote key={index} className="bg-gray-50 p-8 rounded-lg shadow-xl">
                                        <p className="text-xl italic text-gray-700 leading-relaxed">"{getText(item.quote)}"</p>
                                        <footer className="mt-6">
                                            <cite className="font-semibold text-gray-900 not-italic">{getText(item.author)}</cite>, <span className="text-gray-500">{getText(item.authorRole)}</span>
                                        </footer>
                                    </blockquote>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('pricing') && c.pricing.items.length > 0 && (
                    <section className="py-24 px-6 bg-gray-50">
                        <div className="container mx-auto text-center">
                            <h3 className="text-4xl font-bold mb-12 text-gray-800">{getText(c.pricing.title)}</h3>
                            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                {c.pricing.items.map((tier, index) => (
                                    <div key={index} className={`bg-white rounded-lg p-8 shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 ${tier.isFeatured ? 'border-2 preview-primary-border' : ''}`}>
                                        <h4 className="text-2xl font-semibold text-gray-900">{getText(tier.name)}</h4>
                                        <p className="text-4xl font-bold my-4 preview-primary-text">{getText(tier.price)}</p>
                                        <p className="text-sm font-normal text-gray-500 mb-4 uppercase">{getText(tier.frequency)}</p>
                                        <ul className="space-y-3 text-gray-600 mb-8 text-left">
                                            {tier.features.map((feature, fIndex) => <li key={fIndex} className="flex items-start gap-3"><span className="text-green-500 mt-1">✓</span> {getText(feature)}</li>)}
                                        </ul>
                                        <button className={`w-full py-3 px-6 rounded-full font-semibold text-lg ${tier.isFeatured ? 'preview-primary-bg text-white' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>Get Ticket</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {isVisible('faq') && c.faq.items.length > 0 && (
                    <section className="py-24 px-6">
                        <div className="container mx-auto max-w-3xl">
                            <h3 className="text-4xl font-bold mb-12 text-center text-gray-800">{getText(c.faq.title)}</h3>
                            <div className="space-y-4">
                                {c.faq.items.map((item, index) => <FAQAccordion key={index} q={getText(item.question)} a={getText(item.answer)} />)}
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
                                    <button type="submit" className="preview-primary-bg text-white font-bold py-3 px-10 rounded-full text-lg hover:opacity-90">{getText(c.form.submitButtonText)}</button>
                                </div>
                            </form>
                        </div>
                    </section>
                )}
            </div>
        </TemplateWrapper>
    );
};