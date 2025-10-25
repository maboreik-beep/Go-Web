import React from 'react';
import { TemplateProps } from '../types';
import { ServiceIcon, TemplateWrapper, FAQAccordion } from '../common';

// New Template: Vision (for Photographers/Designers)
export const VideographTemplate: React.FC<TemplateProps> = (props) => {
    const { getText, page, content, pages, setActivePageId } = props;
    const c = page.content;
    const isVisible = (id: string) => page.sections.find(s => s.id === id)?.visible ?? false;

    return (
        <TemplateWrapper {...props} showDefaultHeader={false} showDefaultFooter={false}>
            <div className="flex min-h-screen bg-black text-white font-sans">
                {/* Sidebar */}
                <aside className="w-1/4 min-w-[280px] bg-[#111111] p-10 flex flex-col justify-between sticky top-0 h-screen border-r border-gray-800">
                    <div>
                        <h1 className="text-4xl font-bold mb-16 tracking-tighter">{getText(content.siteName)}</h1>
                        <nav className="space-y-4">
                             {pages.map(p => (
                                <button key={p.id} onClick={() => setActivePageId(p.id)} className={`block text-lg transition-colors font-medium relative group ${p.id === page.id ? 'preview-primary-text' : 'text-gray-400 hover:text-white'}`}>
                                    <span>{getText(p.name)}</span>
                                    <span className={`absolute -bottom-1 left-0 w-full h-0.5 preview-primary-bg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${p.id === page.id ? 'scale-x-100' : ''}`}></span>
                                </button>
                             ))}
                        </nav>
                    </div>
                    <div className="text-sm text-gray-500">
                        <p>&copy; {new Date().getFullYear()} {getText(content.siteName)}</p>
                         <p className="mt-4">
                            <a href={`mailto:${c.contact.email}`} className="hover:underline">{c.contact.email}</a><br/>
                            <a href={`tel:${c.contact.phone}`} className="hover:underline">{c.contact.phone}</a>
                        </p>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="w-3/4 overflow-y-auto">
                    {isVisible('hero') && (
                        <section className="h-screen flex flex-col justify-center p-20" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${c.hero.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                             <h2 className="text-6xl font-extrabold mb-4">{getText(c.hero.headline)}</h2>
                             <p className="text-xl text-gray-300 max-w-2xl mb-8">{getText(c.hero.subheadline)}</p>
                             <button className="preview-primary-bg text-white font-bold py-3 px-8 rounded text-lg self-start hover:opacity-90">{getText(c.hero.ctaButton)}</button>
                        </section>
                    )}
                    
                    {isVisible('about') && (
                        <section className="py-24 px-20 bg-[#111111]">
                            <h3 className="text-4xl font-bold mb-8">{getText(c.about.title)}</h3>
                            <div className="grid md:grid-cols-5 gap-12 items-center">
                                <p className="text-gray-300 leading-relaxed text-lg md:col-span-3">{getText(c.about.text)}</p>
                                <img src={c.about.imageUrl} alt={getText(c.about.title)} className="rounded-lg md:col-span-2" />
                            </div>
                        </section>
                    )}

                    {isVisible('services') && (
                        <section className="py-24 px-20 bg-black">
                            <h3 className="text-4xl font-bold mb-12 text-center">{getText(c.services.title)}</h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                {c.services.items.map((item, index) => (
                                    <div key={index} className="text-center p-4 border border-gray-800 rounded-lg">
                                        <div className="preview-primary-text inline-block mb-4"><ServiceIcon icon={item.icon} /></div>
                                        <h4 className="text-2xl font-semibold mb-2">{getText(item.name)}</h4>
                                        <p className="text-gray-400">{getText(item.description)}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {isVisible('features') && c.features.items.length > 0 && (
                        <section className="py-24 px-20 bg-[#111111]">
                            <h3 className="text-4xl font-bold mb-12 text-center">{getText(c.features.title)}</h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                {c.features.items.map((item, index) => (
                                    <div key={index} className="text-left p-6 bg-black rounded-lg">
                                        <div className="preview-primary-text inline-block mb-4"><ServiceIcon icon={item.icon} /></div>
                                        <h4 className="text-2xl font-semibold mb-2">{getText(item.name)}</h4>
                                        <p className="text-gray-400">{getText(item.description)}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    
                    {isVisible('gallery') && c.gallery.items.length > 0 && (
                        <section className="py-24 px-10 bg-black">
                            <h3 className="text-4xl font-bold mb-12 text-center">{getText(c.gallery.title)}</h3>
                            <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                                {c.gallery.items.map((item, index) => (
                                    <div key={index} className="overflow-hidden rounded-lg mb-4 break-inside-avoid">
                                        <img src={item.imageUrl} alt={getText(item.caption)} className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {isVisible('team') && c.team.items.length > 0 && (
                        <section className="py-24 px-20 bg-[#111111]">
                            <h3 className="text-4xl font-bold mb-12 text-center">{getText(c.team.title)}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {c.team.items.map((item, index) => (
                                    <div key={index} className="text-center">
                                        <img src={item.imageUrl} alt={getText(item.name)} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg border-2 border-gray-700"/>
                                        <h4 className="text-xl font-semibold">{getText(item.name)}</h4>
                                        <p className="preview-primary-text">{getText(item.role)}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {isVisible('testimonials') && c.testimonials.items.length > 0 && (
                        <section className="py-24 px-20 bg-black">
                            <h3 className="text-4xl font-bold mb-12 text-center">{getText(c.testimonials.title)}</h3>
                            <div className="space-y-10 max-w-3xl mx-auto text-center">
                                {c.testimonials.items.map((item, index) => (
                                    <blockquote key={index}>
                                        <p className="text-xl italic text-gray-300">"{getText(item.quote)}"</p>
                                        <footer className="mt-4">
                                            <cite className="font-semibold not-italic">{getText(item.author)}</cite>, <span className="text-gray-500">{getText(item.authorRole)}</span>
                                        </footer>
                                    </blockquote>
                                ))}
                            </div>
                        </section>
                    )}

                    {isVisible('pricing') && c.pricing.items.length > 0 && (
                        <section className="py-24 px-20 bg-[#111111]">
                            <h3 className="text-4xl font-bold mb-12 text-center">{getText(c.pricing.title)}</h3>
                            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                {c.pricing.items.map((tier, index) => (
                                    <div key={index} className={`bg-black rounded-lg p-8 flex flex-col ${tier.isFeatured ? 'border-2 preview-primary-border' : 'border border-gray-800'}`}>
                                        <h4 className="text-2xl font-semibold">{getText(tier.name)}</h4>
                                        <p className="text-4xl font-bold my-4 preview-primary-text">{getText(tier.price)} <span className="text-lg font-normal text-gray-500">/{getText(tier.frequency)}</span></p>
                                        <ul className="space-y-3 text-gray-400 mb-8 flex-grow">
                                            {tier.features.map((feature, fIndex) => <li key={fIndex} className="flex items-start gap-3"><span className="text-green-500 mt-1">✓</span> {getText(feature)}</li>)}
                                        </ul>
                                        <button className={`w-full py-3 px-6 rounded font-semibold text-lg ${tier.isFeatured ? 'preview-primary-bg text-white' : 'bg-gray-200 text-black hover:bg-white'}`}>Choose Plan</button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {isVisible('faq') && c.faq.items.length > 0 && (
                        <section className="py-24 px-20 bg-black">
                             <h3 className="text-4xl font-bold mb-12 text-center">{getText(c.faq.title)}</h3>
                            <div className="max-w-3xl mx-auto">
                                {c.faq.items.map((item, index) => <FAQAccordion key={index} q={getText(item.question)} a={getText(item.answer)} isDark/>)}
                            </div>
                        </section>
                    )}

                    {isVisible('form') && (
                        <section className="py-24 px-20 bg-[#111111]">
                            <div className="max-w-2xl mx-auto text-center">
                                <h3 className="text-4xl font-bold text-white mb-8">{getText(c.form.title)}</h3>
                                <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted! (This is a preview. In a live site, this would email submissions to ' + c.form.recipientEmail + ')'); }} className="space-y-6 text-left">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                                        <input type="text" id="name" required className="block w-full px-3 py-2 bg-black border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 preview-primary-ring focus:border-transparent" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                        <input type="email" id="email" required className="block w-full px-3 py-2 bg-black border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 preview-primary-ring focus:border-transparent" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                                        <textarea id="message" rows={4} required className="block w-full px-3 py-2 bg-black border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 preview-primary-ring focus:border-transparent"></textarea>
                                    </div>
                                    <div className="text-center pt-2">
                                        <button type="submit" className="preview-primary-bg text-white font-bold py-3 px-10 rounded text-lg hover:opacity-90">{getText(c.form.submitButtonText)}</button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    )}

                    {isVisible('contact') && (
                        <section className="py-24 px-20 bg-black text-center">
                            <h3 className="text-4xl font-bold mb-8">{getText(c.contact.title)}</h3>
                            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                               {getText(c.contact.address)}
                            </p>
                             <button className="preview-primary-bg text-white font-bold py-3 px-8 rounded text-lg self-start hover:opacity-90">Book a Consultation</button>
                        </section>
                    )}
                </main>
            </div>
        </TemplateWrapper>
    );
};