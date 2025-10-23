import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import EditorForm from './EditorForm';
import Preview from './Preview';
import { Button } from './common/Button';
import { Logo } from './common/Logo';
import { useWebsiteBuilder } from '../context/WebsiteBuilderContext';
import useWindowSize from '../hooks/useWindowSize';

const InitialSetupModal = lazy(() => import('./CompleteProfile'));
const PublishingAndDomainModal = lazy(() => import('./DomainSettingsModal'));

interface EditorProps {
  openAdminLogin: () => void;
}

const EditorHeader: React.FC<{ 
    openAdminLogin: () => void;
    onPublishClick: () => void;
}> = ({ openAdminLogin, onPublishClick }) => {
    const { loadContent, isLoadingContent, content } = useWebsiteBuilder();
    
    const websiteUrl = useMemo(() => {
        if (content.isPublished && content.slug) {
            return `goonline.cloud/${content.slug}`;
        }
        return null;
    }, [content]);


    const handleLiveSite = () => {
        if (websiteUrl) {
            alert(`In a real scenario, this would open:\nhttps://${websiteUrl}`);
        } else {
            alert("This site hasn't been published yet. Click 'Publish' to make it live.");
        }
    };

    return (
        <header className="bg-dark-200 h-[70px] flex items-center justify-between px-6 border-b border-dark-300 z-20 flex-shrink-0">
            <div className="flex items-center gap-4">
                 <Button variant="ghost" size="sm" onClick={openAdminLogin}>Admin Portal</Button>
            </div>

            <div className='hidden md:flex items-center gap-4'>
                <p className="text-sm text-gray-400">Preview Mode: No data is saved.</p>
                <button onClick={() => loadContent()} title="Reset to Default" className="p-2 rounded-full hover:bg-dark-300 transition-colors disabled:opacity-50" disabled={isLoadingContent}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-light-200 ${isLoadingContent ? 'animate-spin' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.899 2.186l-1.32.39a5.002 5.002 0 00-8.58-1.898l1.45 1.45a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 1.414L4 6.101V3a1 1 0 011-1zM16 8a1 1 0 011 1v2.101a7.002 7.002 0 01-11.899 2.186l1.32.39a5.002 5.002 0 008.58-1.898l-1.45 1.45a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L16 13.899V11a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                </button>
                <Logo className='scale-50' />
            </div>

            <div className="flex items-center gap-4">
                <Button variant="secondary" onClick={handleLiveSite} disabled={!websiteUrl}>Preview Link</Button>
                <Button onClick={onPublishClick}>Publish</Button>
            </div>
        </header>
    );
};

const DesktopIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const TabletIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M6 21h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>;
const MobileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
const ChevronLeft = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
const ChevronRight = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>;
const ChevronUp = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg>;


const Editor: React.FC<EditorProps> = ({ openAdminLogin }) => {
  const { isLoadingContent, isNewWebsite, setIsNewWebsite, replaceContent } = useWebsiteBuilder();
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isPublishModalOpen, setPublishModalOpen] = useState(false);
  const { width } = useWindowSize();
  const isMobile = (width ?? 0) < 768;

  useEffect(() => {
    setPreviewMode(isMobile ? 'mobile' : 'desktop');
  }, [isMobile]);

  if (isLoadingContent) {
    return (
        <div className="flex items-center justify-center h-screen bg-dark-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    )
  }

  const previewWidths = { desktop: '100%', tablet: '768px', mobile: '100%' };

  const PreviewPanel = () => (
    <main className={`flex-grow bg-dark-300 flex flex-col items-center p-4 space-y-4 overflow-hidden h-full`}>
        {!isMobile && (
            <div className="flex-shrink-0 w-full max-w-sm flex justify-center items-center gap-2 p-2 border border-dark-300 rounded-lg">
                {Object.keys(previewWidths).filter(n => n !== 'mobile').map((name) => (
                    <button key={name} onClick={() => setPreviewMode(name as any)}
                        className={`p-2 rounded-md transition-colors w-full ${previewMode === name ? 'text-primary border-b-2 border-primary' : 'text-light-300 hover:text-primary'}`}
                        title={`${name.charAt(0).toUpperCase() + name.slice(1)} View`}>
                        {name === 'desktop' && <DesktopIcon />}
                        {name === 'tablet' && <TabletIcon />}
                    </button>
                ))}
            </div>
        )}
        <div className="w-full flex-grow transition-all duration-300 ease-in-out flex justify-center overflow-hidden">
            <div className="h-full transition-all duration-300 ease-in-out shadow-2xl" style={{ width: previewWidths[previewMode] }}>
                <Preview />
            </div>
        </div>
    </main>
  );

  return (
    <div className="flex flex-col h-screen bg-dark-100">
        <EditorHeader 
            openAdminLogin={openAdminLogin} 
            onPublishClick={() => setPublishModalOpen(true)}
        />
        <div className="flex flex-grow overflow-hidden relative">
            {isMobile ? (
                <div className="w-full h-full overflow-hidden">
                    <div className="h-[calc(100%-60px)]">
                        <PreviewPanel />
                    </div>
                    <div className={`fixed bottom-0 left-0 right-0 z-30 bg-dark-100 border-t-2 border-dark-300 transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-y-0' : 'translate-y-[calc(100%-60px)]'}`}>
                        <button onClick={() => setDrawerOpen(!isDrawerOpen)} className="w-full h-[60px] flex items-center justify-center text-light-100">
                            <ChevronUp className={`w-8 h-8 transition-transform ${isDrawerOpen ? 'rotate-180' : ''}`} />
                            <span className="font-semibold ml-2">Editor Panel</span>
                        </button>
                        <div className="h-[calc(85vh-60px)] overflow-y-auto scrollbar-thin scrollbar-thumb-dark-300 scrollbar-track-dark-100">
                           <EditorForm />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className={`flex-shrink-0 relative transition-all duration-300 ease-in-out bg-dark-100 border-r border-dark-300 z-10 ${isSidebarOpen ? 'w-[450px]' : 'w-0'}`}>
                        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-dark-300 scrollbar-track-dark-100">
                            <div className={`${isSidebarOpen ? 'opacity-100' : 'opacity-0 invisible'} transition-opacity duration-200`}>
                                <EditorForm />
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="absolute top-1/2 -translate-y-1/2 bg-dark-100 border-y border-r border-dark-300 text-light-100 rounded-r-lg w-7 h-16 flex items-center justify-center z-20 transition-all duration-300 ease-in-out hover:bg-dark-200"
                        style={{ left: isSidebarOpen ? '450px' : '0px' }}
                        title={isSidebarOpen ? "Collapse Panel" : "Expand Panel"}
                    >
                        {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
                    </button>
                    <PreviewPanel />
                </>
            )}
        </div>
        
        <Suspense fallback={<div />}>
            {isNewWebsite && (
                <InitialSetupModal 
                    onSuccess={(newContent) => {
                        replaceContent(newContent);
                        setIsNewWebsite(false);
                    }}
                />
            )}
            {isPublishModalOpen && (
                <PublishingAndDomainModal onClose={() => setPublishModalOpen(false)} />
            )}
        </Suspense>

        <style>{`
            .scrollbar-thin { scrollbar-width: thin; }
            .scrollbar-thumb-dark-300::-webkit-scrollbar-thumb { background-color: #404040; border-radius: 4px;}
            .scrollbar-track-dark-100::-webkit-scrollbar-track { background-color: #1a1a1a; }
            .scrollbar-thin::-webkit-scrollbar { width: 8px; }
        `}</style>
    </div>
  );
};

export default Editor;