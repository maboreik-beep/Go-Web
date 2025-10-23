import React, { useState } from 'react';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { Logo } from './common/Logo';
import { Select } from './common/Select';
import { INDUSTRIES, TEMPLATES } from '../constants';
import { LanguageMode, WebsiteContent } from '../types';
import { getTemplateContent } from '../services/templateService';
import { generateContentFromPdf } from '../services/geminiService';
import { createDefaultContent } from '../context/WebsiteBuilderContext';

interface InitialSetupModalProps {
    onSuccess: (newContent: WebsiteContent) => void;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });
};

const InitialSetupModal: React.FC<InitialSetupModalProps> = ({ onSuccess }) => {
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('');
  const [languageMode, setLanguageMode] = useState<LanguageMode>('en');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        if (selectedFile.type !== 'application/pdf') {
            setError('Please upload a valid PDF file.');
            setFile(null);
            return;
        }
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB
        if (selectedFile.size > MAX_SIZE) {
            setError('File is too large. Maximum size is 5MB.');
            setFile(null);
            return;
        }
        setError('');
        setIndustry(''); // Clear industry selection if a file is chosen
        setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !industry.trim()) {
      setError('Please fill in company name and industry.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      const templateInfo = TEMPLATES.find(t => t.industries.includes(industry));
      const templateId = templateInfo ? templateInfo.id : 'default';
      const newContent = await getTemplateContent(templateId, industry, company, languageMode);
      onSuccess(newContent);
    } catch (err) {
      console.error('Error in initial setup:', err);
      setError('An error occurred while generating your site. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateFromBrochure = async () => {
    if (!file || !company.trim()) {
        setError('Please provide a company name and select a file.');
        return;
    }
    setIsSubmitting(true);
    setError('');
    try {
        const base64Data = await fileToBase64(file);
        const fileData = { mimeType: 'application/pdf', data: base64Data };

        const generatedPageContent = await generateContentFromPdf(fileData, company, languageMode);
        
        const newContent = createDefaultContent(languageMode, 'default');
        
        newContent.siteName = languageMode === 'bilingual' ? { en: company, ar: company } : company;
        
        newContent.pages[0].content = { ...newContent.pages[0].content, ...generatedPageContent };

        const generatedKeys = Object.keys(generatedPageContent);
        newContent.pages[0].sections.forEach(section => {
            if (generatedKeys.includes(section.id)) {
                section.visible = true;
            }
        });

        onSuccess(newContent);
    } catch (err) {
        console.error('Error generating from brochure:', err);
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred. Please try a different file.';
        setError(`Failed to generate from brochure. ${errorMessage}`);
    } finally {
        setIsSubmitting(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
        <div className="w-full max-w-lg text-center p-4">
            <div className="bg-dark-200 p-8 rounded-2xl shadow-2xl relative">
                <Logo className="scale-75 mb-4 mx-auto" />
                <h1 className="text-2xl font-bold text-light-100 mb-2">Let's build your website!</h1>
                <p className="text-light-300 mb-6">Tell us about your business to generate a personalized draft.</p>
                
                <div className="space-y-4 text-left">
                    <Input label="Your Company Name" id="company" value={company} onChange={(e) => setCompany(e.target.value)} required />
                    <div>
                        <label className="block text-sm font-medium text-light-200 mb-2">Website Language</label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center justify-center gap-2 p-3 bg-dark-300 rounded-lg cursor-pointer border-2 border-transparent has-[:checked]:border-primary">
                                <input type="radio" name="languageMode" value="en" checked={languageMode === 'en'} onChange={() => setLanguageMode('en')} className="accent-primary"/>
                                English Only
                            </label>
                            <label className="flex items-center justify-center gap-2 p-3 bg-dark-300 rounded-lg cursor-pointer border-2 border-transparent has-[:checked]:border-primary">
                                <input type="radio" name="languageMode" value="ar" checked={languageMode === 'ar'} onChange={() => setLanguageMode('ar')} className="accent-primary"/>
                                Arabic Only
                            </label>
                            <label className="col-span-2 flex items-center justify-center gap-2 p-3 bg-dark-300 rounded-lg cursor-pointer border-2 border-transparent has-[:checked]:border-primary">
                                <input type="radio" name="languageMode" value="bilingual" checked={languageMode === 'bilingual'} onChange={() => setLanguageMode('bilingual')} className="accent-primary"/>
                                English & Arabic
                            </label>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t-2 border-dashed border-dark-300">
                         <h2 className="text-lg font-semibold text-light-100 mb-3 text-center">Option 1: Start with an Industry Template</h2>
                         <Select label="Your Industry" id="industry" value={industry} onChange={e => { setIndustry(e.target.value); setFile(null); }} required>
                            <option value="" disabled>Select an industry...</option>
                            {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                        </Select>
                        <div className="pt-4">
                            <Button onClick={handleSubmit} className="w-full text-lg" disabled={isSubmitting || !industry}>
                                {isSubmitting && !file ? 'Generating...' : 'Create My Website'}
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center text-center my-4">
                        <div className="flex-grow border-t border-dark-300"></div>
                        <span className="flex-shrink mx-4 text-light-300 font-semibold">OR</span>
                        <div className="flex-grow border-t border-dark-300"></div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-light-100 mb-3 text-center">Option 2: Generate From Your Brochure (PDF)</h2>
                         <label htmlFor="brochure-upload" className="w-full p-4 flex flex-col items-center justify-center bg-dark-300 border-2 border-dashed border-dark-100 rounded-lg cursor-pointer hover:border-primary">
                            <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <span className="mt-2 text-sm text-gray-400">{file ? file.name : 'Click to upload a PDF'}</span>
                            <span className="text-xs text-gray-500">Max 5MB</span>
                        </label>
                        <input id="brochure-upload" name="brochure-upload" type="file" className="sr-only" accept="application/pdf" onChange={handleFileChange} />
                         <div className="pt-4">
                            <Button onClick={handleGenerateFromBrochure} className="w-full text-lg" disabled={isSubmitting || !file}>
                                {isSubmitting && file ? 'Generating...' : 'Generate From Brochure'}
                            </Button>
                        </div>
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm text-center pt-4">{error}</p>}
            </div>
        </div>
    </div>
  );
};

export default InitialSetupModal;