import React, { useState, useCallback, Suspense, lazy, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WebsiteBuilderProvider } from './context/WebsiteBuilderContext';
import { AdminProvider } from './context/AdminContext';
import { Logo } from './components/common/Logo';
import { AppView } from './types';
import AuthModal from './components/AuthModal';
import { LocaleProvider } from './context/LocaleContext';

// Lazy load components
const Editor = lazy(() => import('./components/Editor'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const LandingPage = lazy(() => import('./components/LandingPage'));
const Dashboard = lazy(() => import('./components/Dashboard'));

const InitialLoadingScreen: React.FC = () => (
    <div className="flex items-center justify-center min-h-screen bg-dark-100">
        <div className="relative flex flex-col items-center">
            <Logo className="scale-100" />
            <div style={{width: '2.2rem', height: '2.2rem'}} className="border-2 border-primary rounded-full border-l-transparent animate-spin mt-6"></div>
        </div>
    </div>
);

const PublicApp: React.FC = () => {
    const { user, isInitializing } = useAuth();
    const [view, setView] = useState<AppView>(AppView.LANDING);
    
    useEffect(() => {
        // If the user is logged in (but not an admin), show them the dashboard.
        // The isNewWebsite check in Editor handles the initial setup modal.
        if (user && !user.isAdmin) {
            setView(AppView.DASHBOARD);
        } else {
            setView(AppView.LANDING);
        }
    }, [user]);

    const navigateToAdmin = () => {
        window.location.hash = 'admin';
    }

    if (isInitializing) {
        return <InitialLoadingScreen />;
    }

    switch (view) {
        case AppView.EDITOR:
            return <Editor openAdminLogin={navigateToAdmin} />;
        case AppView.DASHBOARD:
            return <Dashboard navigateTo={setView} />;
        case AppView.LANDING:
        default:
            return <LandingPage onStartClick={() => setView(AppView.EDITOR)} onDashboardClick={() => setView(AppView.DASHBOARD)} onLoginClick={navigateToAdmin} />;
    }
}

const AdminPortal: React.FC = () => {
    const { user, isInitializing } = useAuth();
    
    if (isInitializing) {
        return <InitialLoadingScreen />;
    }

    const navigateToPublic = () => {
        window.location.hash = '';
    }

    if (user?.isAdmin) {
        return <AdminDashboard navigateTo={() => {}} />;
    }

    // If not an admin, show a dedicated login modal.
    return (
        <div className="w-screen h-screen bg-dark-100 flex items-center justify-center">
             <AuthModal 
                onClose={navigateToPublic}
                onSuccess={() => { /* Auth context will trigger re-render */ }}
                initialView="login"
            />
        </div>
    );
}

const AppContent: React.FC = () => {
  const { isInitializing } = useAuth();
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.hash === '#admin');

  useEffect(() => {
    const handleHashChange = () => {
        setIsAdminRoute(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  if (isInitializing) {
    return <InitialLoadingScreen />;
  }

  return (
    <div className="bg-dark-100 min-h-screen text-light-200 font-sans">
      <Suspense fallback={<InitialLoadingScreen />}>
        {isAdminRoute ? <AdminPortal /> : <PublicApp />}
      </Suspense>
    </div>
  );
};

// Wrap the entire app in context providers to make state available globally
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AdminProvider>
        <WebsiteBuilderProvider>
          <LocaleProvider>
            <AppContent />
          </LocaleProvider>
        </WebsiteBuilderProvider>
      </AdminProvider>
    </AuthProvider>
  );
};

export default App;