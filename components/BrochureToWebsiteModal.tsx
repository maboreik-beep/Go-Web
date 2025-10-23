import React, { useState, useRef } from 'react';
import { Button } from './common/Button';
import { useAuth } from '../context/AuthContext';
import { useWebsiteBuilder } from '../context/WebsiteBuilderContext';
import { generateContentFromPdf } from '../services/geminiService';
import { createDefaultContent } from '../context/WebsiteBuilderContext';
import { Input } from './common/Input';
import { useLocale } from '../context/LocaleContext';

interface BrochureToWebsiteModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });
};

const BrochureToWebsiteModal: React.FC<BrochureToWebsiteModalProps> = ({ onClose, onSuccess }) => {
  const { user } = useAuth();
  const { content, replaceContent } = useWebsiteBuilder();
  const [file, setFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [url, setUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t, lang } = useLocale();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        if (selectedFile.type !== 'application/pdf') {
            setError(t('errorInvalidPDF'));
            setFile(null);
            return;
        }
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB
        if (selectedFile.size > MAX_SIZE) {
            setError(t('errorFileSize'));
            setFile(null);
            return;
        }
        setError('');
        setFile(selectedFile);
    }
  };

  const handleGenerate = async () => {
    if (!file || !user?.company) {
      setError(t('errorSelectFile'));
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
        const base64Data = await fileToBase64(file);
        const fileData = { mimeType: 'application/pdf', data: base64Data };

        const generatedPageContent = await generateContentFromPdf(fileData, user.company, content.languageMode);
        
        const newContent = createDefaultContent(content.languageMode, content.templateId);
        newContent.siteName = content.siteName;
        newContent.pages[0].content = { ...newContent.pages[0].content, ...generatedPageContent };

        const generatedKeys = Object.keys(generatedPageContent);
        newContent.pages[0].sections.forEach(section => {
            if (generatedKeys.includes(section.id)) {
                section.visible = true;
            }
        });

        replaceContent(newContent);
        onSuccess();
    } catch (err) {
      console.error('Error generating from brochure:', err);
      const errorMessage = err instanceof Error ? err.message : t('errorUnknownBrochure');
      setError(`${t('errorFailedBrochure')} ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateFromUrl = () => {
    if (!url) {
      setError(t('errorEnterURL'));
      return;
    }
    setError('');
    alert(t('alertCorsWarning'));
  };
  
  const renderContent = () => {
      if(isGenerating) {
          return (
              <div className="text-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-light-100 mb-2">{t('generatingTitle')}</h3>
                <p className="text-gray-300">{t('generatingDesc')}</p>
              </div>
          )
      }

      return (
        <>
          <div className="flex items-center gap-1 p-1 bg-dark-300 rounded-lg mb-6">
            <button onClick={() => setMode('upload')} className={`w-1/2 px-3 py-2 rounded-md text-sm font-semibold transition-colors ${mode === 'upload' ? 'bg-primary text-dark-100' : 'text-light-200'}`}>{t('uploadPDF')}</button>
            <button onClick={() => setMode('url')} className={`w-1/2 px-3 py-2 rounded-md text-sm font-semibold transition-colors ${mode === 'url' ? 'bg-primary text-dark-100' : 'text-light-200'}`}>{t('importFromURL')}</button>
          </div>
          
          {mode === 'upload' ? (
            <div className="space-y-6">
                  <div>
                      <label htmlFor="brochure-upload" className="block text-sm font-medium text-light-200 mb-1">{t('uploadYourBrochure')}</label>
                      <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dark-300 border-dashed rounded-md cursor-pointer hover:border-primary"
                      >
                          <div className="space-y-1 text-center">
                              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                              <div className="flex text-sm text-gray-400">
                                  <p className="pl-1">{file ? file.name : t('clickToUpload')}</p>
                              </div>
                              <p className="text-xs text-gray-500">{t('pdfMaxSize')}</p>
                          </div>
                      </div>
                       <input ref={fileInputRef} id="brochure-upload" name="brochure-upload" type="file" className="sr-only" accept="application/pdf" onChange={handleFileChange} />
                  </div>
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  <Button onClick={handleGenerate} className="w-full text-lg" disabled={!file}>
                      {t('generateWebsite')}
                  </Button>
              </div>
          ) : (
            <div className="space-y-6">
              <Input
                label={t('brochureURL')}
                id="brochure-url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com/brochure.pdf"
              />
               {error && <p className="text-red-500 text-sm text-center">{error}</p>}
               <Button onClick={handleGenerateFromUrl} className="w-full text-lg" disabled={!url}>
                  {t('generateWebsite')}
              </Button>
               <p className="text-xs text-gray-400 text-center">{t('urlNote')}</p>
            </div>
          )}
        </>
      );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-dark-200 p-8 rounded-2xl shadow-2xl w-full max-w-lg m-4" onClick={e => e.stopPropagation()} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-light-100">{t('buildWithAI')}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl" disabled={isGenerating}>&times;</button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default BrochureToWebsiteModal;