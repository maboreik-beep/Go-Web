import React, { useState, useRef, useEffect, useMemo } from 'react';
import { AppView, NavigateTo, User } from '../types';
import { useAuth } from '../context/AuthContext';
import { Button } from './common/Button';
import { Logo } from './common/Logo';
import PublishingAndDomainModal from './DomainSettingsModal';
import BrochureToWebsiteModal from './BrochureToWebsiteModal';
import { useWebsiteBuilder } from '../context/WebsiteBuilderContext';
import { useLocale } from '../context/LocaleContext';

interface DashboardProps {
  navigateTo: NavigateTo;
}

const Header: React.FC<{user: User, onLogout: () => void}> = ({ user, onLogout }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { lang, setLang, t } = useLocale();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="bg-dark-200 p-4 flex justify-between items-center shadow-md">
            <Logo className='scale-75 -ml-8'/>
            {/* Desktop View */}
            <div className="hidden md:flex items-center space-x-4">
                 <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="px-3 py-1 text-sm rounded-md bg-dark-300 hover:bg-dark-100 transition-colors">
                    {lang === 'en' ? 'العربية' : 'English'}
                </button>
                <div className="text-right">
                    <p className="font-semibold text-light-100">{user.name}</p>
                    <p className="text-sm text-light-300">{user.email}</p>
                </div>
                <Button onClick={onLogout} variant="secondary">{t('logout')}</Button>
            </div>
             {/* Mobile View */}
            <div ref={menuRef} className="md:hidden relative">
                <button onClick={() => setMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-dark-300">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-dark-300 rounded-lg shadow-xl z-20">
                        <div className="p-4 border-b border-dark-100">
                             <p className="font-semibold text-light-100 truncate">{user.name}</p>
                             <p className="text-sm text-light-300 truncate">{user.email}</p>
                        </div>
                        <div className="p-2">
                             <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="w-full text-left px-4 py-2 text-sm text-light-200 rounded hover:bg-dark-100">
                                {lang === 'en' ? 'Switch to العربية' : 'التبديل إلى English'}
                             </button>
                             <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-light-200 rounded hover:bg-dark-100">{t('logout')}</button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

const Dashboard: React.FC<DashboardProps> = ({ navigateTo }) => {
  const { user, logout } = useAuth();
  const { content, isNewWebsite } = useWebsiteBuilder();
  const [isPublishModalOpen, setPublishModalOpen] = useState(false);
  const [isBrochureModalOpen, setBrochureModalOpen] = useState(false);
  const { t, lang } = useLocale();
  
  if (!user) {
    navigateTo(AppView.LANDING);
    return null;
  }
  
  // If this is a new user journey, go straight to the editor to trigger the setup modal.
  if (isNewWebsite) {
      navigateTo(AppView.EDITOR);
      return null;
  }

  const handleBrochureSuccess = () => {
    setBrochureModalOpen(false);
    navigateTo(AppView.EDITOR);
  };

  const websiteUrl = useMemo(() => {
    if (content.isPublished && content.slug) {
        return `goonline.cloud/${content.slug}`;
    }
    return null;
  }, [content]);

  return (
    <div className="min-h-screen" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Header user={user} onLogout={logout} />
      <main className="p-8 md:p-12">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-light-100">{t('myWebsite')}</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-dark-200 rounded-lg shadow-lg overflow-hidden group">
                <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url(${content.pages[0].content.hero.imageUrl})`}}></div>
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-light-100 mb-2">{user.company || 'My Website'}</h2>
                    {websiteUrl ? (
                         <a href={`https://${websiteUrl}`} target="_blank" rel="noopener noreferrer" className="text-primary font-medium mb-4 block hover:underline truncate">{websiteUrl}</a>
                    ): (
                        <p className="text-yellow-400 font-medium mb-4 block text-sm">{t('notPublished')}</p>
                    )}
                    <div className="flex space-x-4">
                        <Button onClick={() => navigateTo(AppView.EDITOR)} className="w-full">{t('editSite')}</Button>
                        <Button variant="secondary" onClick={() => setPublishModalOpen(true)} className="w-full">{t('publish')}</Button>
                    </div>
                </div>
            </div>

             <div className="bg-dark-200 rounded-lg shadow-lg flex flex-col items-center justify-center p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <h2 className="text-2xl font-semibold text-light-200 mb-2">{t('createFromBrochure')}</h2>
                <p className="text-light-300 mb-4">{t('brochureDescription')}</p>
                <Button variant="secondary" onClick={() => setBrochureModalOpen(true)}>{t('startWithAI')}</Button>
            </div>

            <div className="border-2 border-dashed border-dark-300 rounded-lg flex flex-col items-center justify-center p-6 text-center hover:bg-dark-200 transition-colors">
                <h2 className="text-2xl font-semibold text-light-200 mb-2">{t('upgradePlan')}</h2>
                <p className="text-light-300 mb-4">{t('upgradeDescription')}</p>
                <Button variant="ghost" onClick={() => alert('Upgrade options coming soon!')}>{t('viewPlans')}</Button>
            </div>
        </div>

      </main>
      {isPublishModalOpen && <PublishingAndDomainModal onClose={() => setPublishModalOpen(false)} />}
      {isBrochureModalOpen && <BrochureToWebsiteModal onClose={() => setBrochureModalOpen(false)} onSuccess={handleBrochureSuccess} />}
    </div>
  );
};

export default Dashboard;