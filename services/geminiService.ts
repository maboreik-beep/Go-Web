import { GoogleGenAI, Type, Modality } from '@google/genai';
import { WebsiteContent, LanguageMode, SectionContent, TextContent } from '../types';
// FIX: Removed GEMINI_API_KEY import to use process.env.API_KEY directly, per guidelines.
import { isGeminiConfigured } from '../firebaseConfig';

// Initialize the AI client only if the key is available.
// FIX: Used process.env.API_KEY directly for initialization as required by coding guidelines.
const ai = isGeminiConfigured ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

// Schema for bilingual text objects { en: '...', ar: '...' }
const multilingualTextSchema = (description: string) => ({
    type: Type.OBJECT,
    description,
    properties: {
        en: { type: Type.STRING, description: "The English version of the text." },
        ar: { type: Type.STRING, description: "The professional Arabic translation of the text." }
    },
    required: ['en', 'ar']
});

// Schema for single-language text (plain string)
const singleLanguageTextSchema = (description: string) => ({
    type: Type.STRING,
    description,
});

// Dynamically creates the content schema based on the chosen language mode
const createContentSchema = (languageMode: LanguageMode) => {
    const textSchema = languageMode === 'bilingual' ? multilingualTextSchema : singleLanguageTextSchema;

    return {
        type: Type.OBJECT,
        properties: {
            siteName: textSchema('A catchy name for the business website.'),
            hero: {
                type: Type.OBJECT,
                properties: {
                    headline: textSchema('A powerful, attention-grabbing headline.'),
                    subheadline: textSchema('A brief, descriptive subheadline.'),
                    ctaButton: textSchema('Short, action-oriented text for a button (e.g., "Learn More").')
                }, required: ['headline', 'subheadline', 'ctaButton']
            },
            about: {
                type: Type.OBJECT,
                properties: {
                    title: textSchema('The title for the "About Us" section.'),
                    text: textSchema('A paragraph describing the company.')
                }, required: ['title', 'text']
            },
            services: {
                type: Type.OBJECT,
                properties: {
                    title: textSchema('The title for the "Services" section.'),
                    items: {
                        type: Type.ARRAY,
                        description: "An array of exactly 3 main services offered by the company.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: textSchema('The name of a specific service.'),
                                description: textSchema('A short description of the service.')
                            }, required: ['name', 'description']
                        }
                    }
                }, required: ['title', 'items']
            },
            features: {
                type: Type.OBJECT,
                properties: {
                    title: textSchema('The title for the "Features" section.'),
                    items: {
                        type: Type.ARRAY,
                        description: "An array of 3 key features or benefits.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: textSchema('The name of the feature.'),
                                description: textSchema('A short description of the feature.')
                            }, required: ['name', 'description']
                        }
                    }
                }, required: ['title', 'items']
            },
            team: {
                type: Type.OBJECT,
                properties: {
                    title: textSchema('The title for the "Our Team" section.'),
                    items: {
                        type: Type.ARRAY,
                        description: "An array of 3 team members.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: textSchema('Full name of the team member.'),
                                role: textSchema('Job title or role of the team member.')
                            }, required: ['name', 'role']
                        }
                    }
                }, required: ['title', 'items']
            },
            testimonials: {
                type: Type.OBJECT,
                properties: {
                    title: textSchema('The title for the "Testimonials" section.'),
                    items: {
                        type: Type.ARRAY,
                        description: "An array of 2 customer testimonials.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                quote: textSchema('A compelling quote from a customer.'),
                                author: textSchema('The name of the customer.'),
                                authorRole: textSchema('The role or company of the customer (e.g., CEO of Example Inc.).')
                            }, required: ['quote', 'author', 'authorRole']
                        }
                    }
                }, required: ['title', 'items']
            },
            faq: {
                type: Type.OBJECT,
                properties: {
                    title: textSchema('The title for the "FAQ" section.'),
                    items: {
                        type: Type.ARRAY,
                        description: "An array of 3 frequently asked questions and their answers.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: textSchema('A frequently asked question.'),
                                answer: textSchema('A clear and concise answer to the question.')
                            }, required: ['question', 'answer']
                        }
                    }
                }, required: ['title', 'items']
            },
            gallery: {
                type: Type.OBJECT,
                properties: {
                    title: textSchema('The title for the "Gallery" section.'),
                    items: {
                        type: Type.ARRAY,
                        description: "An array of 4 gallery items.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                caption: textSchema('A brief caption for the gallery image.')
                            }, required: ['caption']
                        }
                    }
                }, required: ['title', 'items']
            },
            contact: {
                type: Type.OBJECT,
                properties: {
                    title: textSchema('The title for the "Contact" section.'),
                    address: textSchema('The physical business address.'),
                    email: { type: Type.STRING, description: 'The business contact email.' },
                    phone: { type: Type.STRING, description: 'The business contact phone number.' }
                }, required: ['title', 'address', 'email', 'phone']
            }
        }
    };
};

export const generateWebsiteContent = async (
    industry: string,
    languageMode: LanguageMode
): Promise<Partial<WebsiteContent> & { pageContent?: Partial<SectionContent> }> => {
    if (!ai) throw new Error("Gemini API key is not configured.");
    
    let languageInstruction: string;
    switch (languageMode) {
        case 'bilingual':
            languageInstruction = 'IMPORTANT: For every text field, provide both an English version and a professional Arabic translation.';
            break;
        case 'ar':
            languageInstruction = 'IMPORTANT: Provide all text content only in professional Arabic.';
            break;
        case 'en':
        default:
            languageInstruction = 'IMPORTANT: Provide all text content only in English.';
            break;
    }

    const prompt = `Generate a comprehensive website content template for a generic company in the "${industry}" industry. The tone should be professional and engaging. ${languageInstruction} Provide content for all sections: site name, hero, about, services (3 items), features (3 items), team (3 members), testimonials (2 items), FAQ (3 items), gallery (4 items), and contact. The site name should be a creative, generic name for a company in that industry.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: createContentSchema(languageMode),
            temperature: 0.8,
        },
    });

    const jsonText = response.text.trim();
    const generated = JSON.parse(jsonText) as any;

    const mappedContent: Partial<WebsiteContent> & { pageContent?: Partial<SectionContent> } = {};
    const pageContent: Partial<SectionContent> = {};
    if (generated.siteName) mappedContent.siteName = generated.siteName;
    const getValue = (value: any, defaultValue: TextContent = ''): TextContent => value ?? defaultValue;
    const sanitizedIndustry = industry.replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, ',').toLowerCase();
    
    if (generated.hero) pageContent.hero = { headline: getValue(generated.hero.headline), subheadline: getValue(generated.hero.subheadline), ctaButton: getValue(generated.hero.ctaButton), imageUrl: `https://source.unsplash.com/1920x1080/?${sanitizedIndustry}` };
    if (generated.about) pageContent.about = { title: getValue(generated.about.title), text: getValue(generated.about.text), imageUrl: `https://source.unsplash.com/800x600/?${sanitizedIndustry},workplace` };
    if (generated.services?.items) {
        const icons = ['code', 'chart', 'briefcase', 'desktop', 'device-mobile', 'adjustments'];
        pageContent.services = { title: getValue(generated.services.title), items: generated.services.items.map((item: any, index: number) => ({ name: getValue(item.name), description: getValue(item.description), icon: icons[index % icons.length] })) };
    }
     if (generated.features?.items) {
        const icons = ['desktop', 'device-mobile', 'adjustments'];
        pageContent.features = { title: getValue(generated.features.title), items: generated.features.items.map((item: any, index: number) => ({ name: getValue(item.name), description: getValue(item.description), icon: icons[index % icons.length] })) };
    }
    if (generated.team?.items) {
        pageContent.team = { title: getValue(generated.team.title), items: generated.team.items.map((item: any, index: number) => ({ name: getValue(item.name), role: getValue(item.role), imageUrl: `https://source.unsplash.com/400x400/?portrait,person,${index}` })) };
    }
    if (generated.testimonials?.items) {
        pageContent.testimonials = { title: getValue(generated.testimonials.title), items: generated.testimonials.items.map((item: any) => ({ quote: getValue(item.quote), author: getValue(item.author), authorRole: getValue(item.authorRole) })) };
    }
    if (generated.faq?.items) {
        pageContent.faq = { title: getValue(generated.faq.title), items: generated.faq.items.map((item: any) => ({ question: getValue(item.question), answer: getValue(item.answer) })) };
    }
    if (generated.gallery?.items) {
        pageContent.gallery = { title: getValue(generated.gallery.title), items: generated.gallery.items.map((item: any, index: number) => ({ caption: getValue(item.caption), imageUrl: `https://source.unsplash.com/600x600/?${sanitizedIndustry},${index}` })) };
    }
    if (generated.contact) pageContent.contact = { title: getValue(generated.contact.title), address: getValue(generated.contact.address), email: generated.contact.email || '', phone: generated.contact.phone || '' };
    
    // Add a default CTA section as it is not generated by the model for now
    pageContent.cta = { headline: languageMode === 'bilingual' ? { en: 'Ready to Get Started?', ar: 'هل أنت مستعد للبدء؟' } : (languageMode === 'ar' ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'), subheadline: languageMode === 'bilingual' ? { en: 'Contact us today to find out how we can help you.', ar: 'اتصل بنا اليوم لمعرفة كيف يمكننا مساعدتك.' } : (languageMode === 'ar' ? 'اتصل بنا اليوم لمعرفة كيف يمكننا مساعدتك.' : 'Contact us today to find out how we can help you.'), ctaButton: languageMode === 'bilingual' ? { en: 'Contact Us', ar: 'اتصل بنا' } : (languageMode === 'ar' ? 'اتصل بنا' : 'Contact Us') };


    mappedContent.pageContent = pageContent;
    return mappedContent;
};

export const generateImage = async (prompt: string): Promise<string> => {
    if (!ai) throw new Error("Gemini API key is not configured.");

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [{ text: prompt }],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
    }
    
    throw new Error("No image was generated.");
};


export const generateContentFromPdf = async (
    fileData: { mimeType: string, data: string },
    companyName: string,
    languageMode: LanguageMode
): Promise<Partial<SectionContent>> => {
    if (!ai) throw new Error("Gemini API key is not configured.");

    let languageInstruction: string;
    switch (languageMode) {
        case 'bilingual': languageInstruction = 'Generate all text content in both English and professional Arabic.'; break;
        case 'ar': languageInstruction = 'Generate all text content exclusively in professional Arabic.'; break;
        default: languageInstruction = 'Generate all text content exclusively in English.'; break;
    }

    const prompt = `You are an expert web designer and copywriter. Analyze the content of the attached PDF brochure for a company named '${companyName}'. Extract all relevant information including services, about us text, contact details, and any calls to action. Based on this, generate a comprehensive website content structure in JSON format. The website should have a professional and engaging tone. ${languageInstruction} If some information (like 3 distinct services) is not present, generate relevant, high-quality placeholder content appropriate for the company. Generate content for hero, about, services, features, team, testimonials, and contact sections.`;
    
    // Schema for a single page, siteName is handled separately
    const pageContentSchema = createContentSchema(languageMode).properties;
    delete (pageContentSchema as any).siteName;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: { parts: [{ text: prompt }, { inlineData: fileData }] },
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: pageContentSchema
            },
        },
    });

    const jsonText = response.text?.trim();

    if (!jsonText) {
        console.error("Gemini response was empty. This could be due to safety filters or an unreadable file.");
        throw new Error("The AI returned an empty response. The brochure may be unreadable or contain restricted content.");
    }
    
    let generated;
    try {
        generated = JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse Gemini response as JSON. Response text:", jsonText);
        throw new Error("The AI was unable to structure the data from the brochure. Please try a simpler or clearer document.");
    }


    const pageContent: Partial<SectionContent> = {};
    const getValue = (value: any, defaultValue: TextContent = ''): TextContent => value ?? defaultValue;
    if (generated.hero) pageContent.hero = { headline: getValue(generated.hero.headline), subheadline: getValue(generated.hero.subheadline), ctaButton: getValue(generated.hero.ctaButton), imageUrl: `https://source.unsplash.com/1920x1080/?business` };
    if (generated.about) pageContent.about = { title: getValue(generated.about.title), text: getValue(generated.about.text), imageUrl: `https://source.unsplash.com/800x600/?office,work` };
    if (generated.services?.items) {
        const icons = ['code', 'chart', 'briefcase'];
        pageContent.services = { title: getValue(generated.services.title), items: generated.services.items.slice(0, 3).map((item: any, index: number) => ({ name: getValue(item.name), description: getValue(item.description), icon: icons[index % icons.length] })) };
    }
    if (generated.contact) pageContent.contact = { title: getValue(generated.contact.title), address: getValue(generated.contact.address), email: generated.contact.email || '', phone: generated.contact.phone || '' };
    if (generated.team?.items) {
        pageContent.team = { title: getValue(generated.team.title), items: generated.team.items.map((item: any, index: number) => ({ name: getValue(item.name), role: getValue(item.role), imageUrl: `https://source.unsplash.com/400x400/?portrait,professional,${index}` })) };
    }
     if (generated.testimonials?.items) {
        pageContent.testimonials = { title: getValue(generated.testimonials.title), items: generated.testimonials.items.map((item: any) => ({ quote: getValue(item.quote), author: getValue(item.author), authorRole: getValue(item.authorRole) })) };
    }

    return pageContent;
};


export const analyzeErrorWithGemini = async (
    errorTitle: string,
    errorDetails: string,
    troubleshootingSteps: string,
): Promise<string> => {
    if (!ai) throw new Error("Gemini API key is not configured.");

    const prompt = `
You are a world-class senior backend engineer with expertise in Node.js and cloud infrastructure.
You've been given the following error log and a set of initial troubleshooting steps.
Analyze them and provide a concise, expert opinion for a frontend developer who needs to understand the backend issue.

Your analysis should:
1.  Start with a "Most Likely Cause" section, explaining in simple terms what is probably happening.
2.  Follow with a "Recommended Next Steps" section. Prioritize the 1-2 most critical actions the developer or their team should take to confirm the cause and resolve the issue. Be very specific (e.g., "Ask the backend team to check the logs for the exact request body that failed parsing around [timestamp]").
3.  Keep the entire response under 150 words. The tone should be helpful and direct.

---
ERROR INFORMATION:
- Title: ${errorTitle}
- Details: ${errorDetails}

INITIAL TROUBLESHOOTING STEPS PROVIDED:
${troubleshootingSteps}
---
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    // Simple markdown-to-HTML conversion for bolding
    return response.text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};