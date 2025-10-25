import React, { useState, useRef } from 'react';
import { generateImage } from '../../services/geminiService';
import { Button } from './Button';
import { useAuth } from '../../context/AuthContext';
import { storage, isFirebaseConfigured } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  promptContext?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ label, value, onChange, promptContext }) => {
  const [uploading, setUploading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (!isFirebaseConfigured || !storage || !user) {
        setError("File storage is not configured. Please contact support.");
        return;
    }
    
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
        setError("File is too large. Maximum size is 5 MB.");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
    }

    setUploading(true);

    try {
      const storageRef = ref(storage, `user_uploads/${user.uid}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      onChange(downloadURL);
    } catch (uploadError) {
      console.error("File upload failed:", uploadError);
      setError("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
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
        {(value || isSuggesting || uploading) && (
          <div className="mb-4 w-full h-32 flex items-center justify-center relative">
            {value && !isSuggesting && !uploading && <img src={value} alt="Preview" className="max-h-32 rounded-md object-cover" />}
            {(isSuggesting || uploading) && (
                <div className="w-full h-full bg-dark-300 rounded-md flex flex-col items-center justify-center animate-pulse">
                    <div className="w-8 h-8 border-2 border-primary rounded-full border-t-transparent animate-spin"></div>
                    <span className="text-primary mt-2">{uploading ? 'Uploading...' : 'Generating...'}</span>
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
            <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>
        </div>
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};