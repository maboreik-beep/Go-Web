import React, { useState } from 'react';
import { Button } from './common/Button';
import { Input } from './common/Input';
import { useWebsiteBuilder } from '../context/WebsiteBuilderContext';
import { useLocale } from '../context/LocaleContext';

interface PublishingAndDomainModalProps {
  onClose: () => void;
}

type ModalView = 'publish' | 'connect' | 'find';

const PublishingAndDomainModal: React.FC<PublishingAndDomainModalProps> = ({ onClose }) => {
  const { content, updateValue } = useWebsiteBuilder();
  const [slug, setSlug] = useState(content.slug || '');
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState<ModalView>('publish');
  const [domainQuery, setDomainQuery] = useState('');
  const { t, lang } = useLocale();

  const finalUrl = `goonline.cloud/${slug}`;

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSlug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
      setSlug(newSlug);
  }

  const handlePublish = async () => {
    if (!slug) {
      setError(t('errorEnterSlug'));
      return;
    }
    setError('');
    setIsPublishing(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    updateValue('slug', slug);
    updateValue('isPublished', true);
    setIsPublishing(false);
    onClose();
    alert(`${t('alertSiteLive')}\nhttps://${finalUrl}`);
  };
  
  const renderContent = () => {
      switch(view) {
          case 'connect':
              return (
                  <div>
                      <h3 className="text-xl font-bold text-light-100 mb-4">{t('connectDomainTitle')}</h3>
                      <p className="text-light-300 mb-4">{t('connectDomainDesc')}</p>
                      <div className="bg-dark-100 p-4 rounded-lg space-y-4 text-sm text-left">
                          <div>
                            <p className="font-semibold text-light-100">{t('connectStep1Title')}</p>
                            <p className="text-gray-400">{t('connectStep1Desc')}</p>
                            <code className="block bg-dark-300 p-2 rounded-md mt-1 font-mono">74.220.219.67</code>
                          </div>
                           <div>
                            <p className="font-semibold text-light-100">{t('connectStep2Title')}</p>
                            <p className="text-gray-400">{t('connectStep2Desc')}</p>
                            <code className="block bg-dark-300 p-2 rounded-md mt-1 font-mono">your-domain.com</code>
                          </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-4 text-left">{t('dnsWarning')}</p>
                      <Button variant="secondary" onClick={() => setView('publish')} className="mt-6 w-full">{t('backToPublishing')}</Button>
                  </div>
              );
          case 'find':
               return (
                  <div>
                      <h3 className="text-xl font-bold text-light-100 mb-4">{t('findDomainTitle')}</h3>
                      <p className="text-light-300 mb-4">{t('findDomainDesc')}</p>
                       <div className="flex gap-2">
                        <Input label="" id="domain-search" placeholder="your-perfect-domain.com" value={domainQuery} onChange={e => setDomainQuery(e.target.value)} />
                        <a href={`https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=${domainQuery}`} target="_blank" rel="noopener noreferrer" className="self-end">
                            <Button disabled={!domainQuery}>{t('search')}</Button>
                        </a>
                       </div>
                       <p className="text-xs text-gray-400 mt-2">{t('domainSearchWarning')}</p>
                      <Button variant="secondary" onClick={() => setView('publish')} className="mt-6 w-full">{t('backToPublishing')}</Button>
                  </div>
              );
          case 'publish':
          default:
              return (
                 <div className="space-y-6">
                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-light-200 mb-1 text-left">
                            {t('freeUrlLabel')}
                        </label>
                        <div className="flex items-center bg-dark-200 border border-dark-300 rounded-lg focus-within:ring-2 focus-within:ring-primary">
                            <span className="px-3 text-gray-400">goonline.cloud/</span>
                            <input 
                                id="slug" 
                                value={slug}
                                onChange={handleSlugChange}
                                placeholder={t('slugPlaceholder')}
                                className="flex-grow bg-transparent py-2 text-light-100 focus:outline-none"
                            />
                        </div>
                    </div>
                    
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    
                    <Button onClick={handlePublish} className="w-full text-lg" disabled={isPublishing}>
                        {isPublishing ? t('publishing') : (content.isPublished ? t('updateAndPublish') : t('publishSite'))}
                    </Button>

                     <div className="flex items-center text-center my-2">
                        <div className="flex-grow border-t border-dark-300"></div>
                        <span className="flex-shrink mx-4 text-light-300 font-semibold">{t('or')}</span>
                        <div className="flex-grow border-t border-dark-300"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="secondary" onClick={() => setView('connect')}>{t('connectYourDomain')}</Button>
                        <Button variant="secondary" onClick={() => setView('find')}>{t('getNewDomain')}</Button>
                    </div>
                  </div>
              );
      }
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-dark-200 p-8 rounded-2xl shadow-2xl w-full max-w-lg m-4" onClick={e => e.stopPropagation()} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-light-100">{t('goLive')}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default PublishingAndDomainModal;