import React, { useState, useRef } from 'react';
import { generateImage } from '../../services/geminiService';
import { Button } from './Button';


interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  promptContext?: string;
}

const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const ImageUpload: React.FC<ImageUploadProps> = ({ label, value, onChange, promptContext }) => {
  const [uploading, setUploading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    
    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
    if (file.size > MAX_FILE_SIZE) {
        setError("File is too large. Maximum size is 1 MB.");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
    }

    setUploading(true);

    try {
      const dataUrl = await fileToDataUrl(file);
      onChange(dataUrl);
    } catch (uploadError) {
      console.error("File read failed:", uploadError);
      setError("Failed to read file. Please try again.");
    } finally {
      setUploading(false);
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSuggestion = async () => {
    if (!promptContext) return;
    setIsSuggesting(true);
    setError(null);
    try {
        const fullPrompt = `A high-quality, professional photo for a website. Context: ${promptContext}. The image should be visually appealing and relevant. Avoid adding text to the image.`;
        const newImageUrl = await generateImage(fullPrompt);
        onChange(newImageUrl);
    } catch(e) {
        setError("AI suggestion failed. Please try again.");
        console.error(e);
    } finally {
        setIsSuggesting(false);
    }
  };


  return (
    <div>
      <label className="block text-sm font-medium text-light-200 mb-1">{label}</label>
      <div className="mt-1 flex flex-col items-center p-4 bg-dark-200 border-2 border-dashed border-dark-300 rounded-lg">
        {(value || isSuggesting) && (
          <div className="mb-4 w-full h-32 flex items-center justify-center relative">
            {value && !isSuggesting && <img src={value} alt="Preview" className="max-h-32 rounded-md object-cover" />}
            {isSuggesting && (
                <div className="w-full h-full bg-dark-300 rounded-md flex items-center justify-center animate-pulse">
                    <span className="text-primary">Generating...</span>
                </div>
            )}
          </div>
        )}

        <div className="text-center">
            <div className="flex flex-wrap justify-center gap-2">
                 <Button onClick={() => fileInputRef.current?.click()} variant="secondary" className="py-2 px-3 text-sm" disabled={uploading || isSuggesting}>
                    {value ? 'Change Image' : 'Upload Image'}
                 </Button>
                <input ref={fileInputRef} type="file" className="sr-only" accept="image/*" onChange={handleFileChange} disabled={uploading || isSuggesting} />
                {promptContext && (
                    <Button onClick={handleSuggestion} variant="ghost" className="py-2 px-3 text-sm" disabled={isSuggesting || uploading}>
                        Suggest with AI ✨
                    </Button>
                )}
            </div>
            <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 1MB</p>
        </div>
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};