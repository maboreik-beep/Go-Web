import React, { useState, useCallback } from 'react';
import { Button } from '../common/Button';
import { analyzeErrorWithGemini } from '../../services/geminiService';

interface TroubleshootingGuideProps {
  errorTitle: string;
  errorDetails: string;
  troubleshootingSteps: string;
  onClose: () => void;
}

const TroubleshootingGuide: React.FC<TroubleshootingGuideProps> = ({
  errorTitle,
  errorDetails,
  troubleshootingSteps,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [error, setError] = useState('');

  const handleAnalyze = useCallback(async () => {
    setIsLoading(true);
    setAnalysis('');
    setError('');
    try {
      const result = await analyzeErrorWithGemini(errorTitle, errorDetails, troubleshootingSteps);
      setAnalysis(result);
    } catch (e) {
      setError('An error occurred while getting AI analysis. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [errorTitle, errorDetails, troubleshootingSteps]);

  const renderSteps = () => {
    return troubleshootingSteps
      .trim()
      .split('\n')
      .map((line, index) => {
        line = line.trim();
        if (line.match(/^\d+\./)) {
           const stepText = line.substring(line.indexOf('.') + 1).trim().replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          return <li key={index} className="mb-3 ml-4 pl-2" dangerouslySetInnerHTML={{ __html: stepText }} />;
        }
        return null;
      })
      .filter(Boolean);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-dark-200 rounded-2xl shadow-2xl w-full max-w-3xl m-4 h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <header className="flex-shrink-0 p-6 flex justify-between items-center border-b border-dark-300">
          <h2 className="text-2xl font-bold text-light-100">AI Troubleshooting Guide</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
        </header>
        <div className="flex-grow p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-dark-300 scrollbar-track-dark-200">
          <div>
            <h3 className="font-semibold text-lg text-primary">{errorTitle}</h3>
            <p className="text-sm text-gray-400">{errorDetails}</p>
          </div>
          <div className="bg-dark-100 p-4 rounded-lg">
            <h4 className="font-semibold text-light-100 mb-2">Initial Troubleshooting Steps</h4>
            <ol className="list-decimal list-inside text-light-300 space-y-2 text-sm">{renderSteps()}</ol>
          </div>
          
          <div className="text-center pt-2">
            <Button onClick={handleAnalyze} disabled={isLoading} className="px-8 py-3 text-base">
              {isLoading ? 'Analyzing...' : 'Get Gemini Analysis'}
            </Button>
          </div>
          
          {isLoading && (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {analysis && (
            <div className="bg-dark-100 p-6 rounded-lg border border-primary/30 animate-fade-in">
              <h4 className="font-semibold text-primary mb-3 text-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                Gemini Analysis
              </h4>
              <div className="prose prose-invert text-light-200 max-w-none" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }} />
            </div>
          )}

        </div>
      </div>
      <style>{`
        .prose-invert {
            --tw-prose-body: #e0e0e0;
            --tw-prose-headings: #ffffff;
            --tw-prose-links: #94c11f;
            --tw-prose-bold: #ffffff;
            --tw-prose-counters: #f5f5f5;
            --tw-prose-bullets: #94c11f;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TroubleshootingGuide;
