import { WebsiteContent, LanguageMode, TemplateId } from '../types';
import { generateWebsiteContent } from './geminiService';
import { createDefaultContent } from '../context/WebsiteBuilderContext';

export const getTemplateContent = async (
    templateId: TemplateId,
    industry: string,
    companyName: string,
    languageMode: LanguageMode
): Promise<WebsiteContent> => {
    // In a standalone app, we don't have a database to cache templates.
    // We will generate the content every time.
    console.log(`Generating new template for ${templateId} in ${languageMode}.`);
    
    try {
        const { pageContent, siteName: generatedSiteName } = await generateWebsiteContent(industry, languageMode);

        const defaultContent = createDefaultContent(languageMode, templateId);
        const homePage = {
            ...defaultContent.pages[0],
            content: { ...defaultContent.pages[0].content, ...pageContent }
        };

        const templateData: WebsiteContent = {
            ...defaultContent,
            siteName: generatedSiteName || (languageMode === 'bilingual' ? { en: industry, ar: industry } : industry),
            pages: [homePage],
            activePageId: homePage.id
        };
        
        // Overwrite the generated site name with the one provided by the user.
        templateData.siteName = languageMode === 'bilingual'
            ? { en: companyName, ar: companyName }
            : companyName;
        templateData.templateId = templateId;

        return templateData;

    } catch (error) {
        console.error(`Failed to generate template for ${templateId}:`, error);
        // Fallback to default content if Gemini API fails.
        const fallbackContent = createDefaultContent(languageMode, templateId);
        fallbackContent.siteName = languageMode === 'bilingual' ? { en: companyName, ar: companyName } : companyName;
        return fallbackContent;
    }
};
