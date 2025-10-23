import React, { useState } from 'react';
import { Button } from './common/Button';
import { Input } from './common/Input';
import { useWebsiteBuilder } from '../context/WebsiteBuilderContext';
import { getPageTemplate } from '../services/pageTemplateService';
import { PageType } from '../types';

interface AddPageModalProps {
  onClose: () => void;
}

const PAGE_TYPES: { id: PageType; name: string; description: string }[] = [
    { id: 'BLANK', name: 'Blank Page', description: 'Start with a clean slate.' },
    { id: 'ABOUT', name: 'About Us', description: 'Introduce your team and story.' },
    { id: 'SERVICES', name: 'Services', description: 'Detail the services you offer.' },
    { id: 'PRODUCTS', name: 'Products', description: 'Showcase items you sell.' },
    { id: 'TEAM', name: 'Our Team', description: 'Feature your key members.' },
    { id: 'NEWS_EVENTS', name: 'News & Events', description: 'Share updates and articles.' },
    { id: 'FEATURES', name: 'Features', description: 'Highlight key features.' },
    { id: 'TESTIMONIALS', name: 'Testimonials', description: 'Display customer feedback.' },
    { id: 'PRICING', name: 'Pricing', description: 'Outline your pricing plans.' },
    { id: 'DOWNLOAD_CATALOG', name: 'Download Page', description: 'Offer a file for download.' },
    { id: 'GALLERY', name: 'Gallery Page', description: 'Showcase your work visually.' },
    { id: 'CONTACT', name: 'Contact Page', description: 'Help visitors get in touch.' },
]

const AddPageModal: React.FC<AddPageModalProps> = ({ onClose }) => {
  const { createPage, content } = useWebsiteBuilder();
  const [pageName, setPageName] = useState('');
  const [selectedType, setSelectedType] = useState<PageType>('BLANK');
  const [error, setError] = useState('');

  const handleCreate = () => {
    if (!pageName.trim()) {
      setError('Please enter a name for your new page.');
      return;
    }
    const name = content.languageMode === 'bilingual' ? { en: pageName, ar: pageName } : pageName;
    const newPage = getPageTemplate(selectedType, name, content.languageMode);
    createPage(newPage);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-dark-200 p-8 rounded-2xl shadow-2xl w-full max-w-2xl m-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-light-100">Add a New Page</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
        </div>
        <div className="space-y-6">
            <Input 
                label="New Page Name"
                id="page-name"
                placeholder="e.g., About Us"
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
            />

            <div>
                <label className="block text-sm font-medium text-light-200 mb-2">Select a Page Template</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[40vh] overflow-y-auto pr-2">
                    {PAGE_TYPES.map(type => (
                        <label key={type.id} className={`p-4 rounded-lg cursor-pointer border-2 transition-colors ${selectedType === type.id ? 'bg-primary/20 border-primary' : 'bg-dark-300 border-transparent hover:border-dark-100'}`}>
                            <div className="flex items-start gap-3">
                                <input 
                                    type="radio"
                                    name="page-type"
                                    className="accent-primary mt-1"
                                    checked={selectedType === type.id}
                                    onChange={() => setSelectedType(type.id)}
                                />
                                <div>
                                    <h4 className="font-semibold text-light-100">{type.name}</h4>
                                    <p className="text-sm text-light-300">{type.description}</p>
                                </div>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <div className="flex justify-end gap-4 pt-4">
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button onClick={handleCreate} className="text-lg">Create Page</Button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default AddPageModal;