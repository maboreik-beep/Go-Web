import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { NavigateTo, User } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useAdmin } from '../../context/AdminContext';
import { Button } from '../common/Button';
import { Logo } from '../common/Logo';
import WebsiteList from './WebsiteList';

const TroubleshootingGuide = lazy(() => import('./TroubleshootingGuide'));


interface AdminDashboardProps {
  navigateTo: NavigateTo;
}

const AdminHeader: React.FC<{user: User, onLogout: () => void}> = ({ user, onLogout }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="bg-dark-200 p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-4">
                <Logo className='scale-75 -ml-8'/>
                <h1 className="text-xl font-bold text-light-100 border-l-2 border-primary pl-4">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-right hidden md:block">
                    <p className="font-semibold text-light-100">{user.name}</p>
                    <p className="text-sm text-light-300">{user.email}</p>
                </div>
                <Button onClick={onLogout} variant="secondary">Exit Admin View</Button>
            </div>
        </header>
    );
}

const StatCard: React.FC<{title: string, value: string | number}> = ({title, value}) => (
    <div className="bg-dark-200 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg text-light-300 mb-2">{title}</h3>
        <p className="text-4xl font-bold text-primary">{value}</p>
    </div>
);

const errorData = {
    title: "SyntaxError: Unexpected non-whitespace character after JSON",
    details: ".JSON.parse",
    steps: `
1. **Examine the incoming request body**: The error combined with .JSON.parse and body-parser in the stack trace strongly suggests that the application is trying to parse an incoming request body as JSON, but the body is malformed or contains unexpected characters. Use Cloud Logging's full log entry view to see the request that triggered this error, if available, or reproduce the issue with a similar request.
2. **Verify client-side JSON formatting**: If your application expects JSON input, ensure that the client sending the request is correctly formatting the JSON. This includes proper escaping of special characters and adherence to the JSON specification.
3. **Inspect application code for JSON parsing logic**: Review the application's code, particularly around the /app/node_modules/body-parser/lib/types/json.js and /app/node_modules/body-parser/lib/read.js lines mentioned in the stack trace. Look for where JSON.parse() is being called and what data is being passed to it.
4. **Consider content-type headers**: Ensure the client is sending the correct Content-Type header (e.g., application/json) when sending JSON data. If the Content-Type is incorrect, body-parser might not attempt to parse it as JSON, or it might try to parse non-JSON data as JSON.
5. **Add robust error handling and logging**: Implement more specific error handling around JSON parsing in your application. Catch SyntaxError exceptions and log the exact input that caused the parsing failure. This will provide more context for future troubleshooting.`
};


const AdminDashboard: React.FC<AdminDashboardProps> = ({ navigateTo }) => {
  const { user, logout } = useAuth();
  const { websites, loading } = useAdmin();
  const [isTroubleshooterOpen, setTroubleshooterOpen] = useState(false);

  if (!user) {
    return null;
  }
  
  return (
    <div className="min-h-screen">
      <AdminHeader user={user} onLogout={logout} />
      <main className="p-8 md:p-12">
        <h2 className="text-3xl font-bold text-light-100 mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard title="Total Websites" value={loading ? '...' : websites.length} />
            <StatCard title="Published Sites" value={loading ? '...' : websites.filter(w => w.isPublished).length} />
            <StatCard title="Draft Sites" value={loading ? '...' : websites.filter(w => !w.isPublished).length} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-dark-200 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-light-100 mb-4">Website Management</h2>
                {loading ? (
                     <div className="flex justify-center items-center p-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <WebsiteList websites={websites} />
                )}
            </div>
            <div className="bg-dark-200 p-6 rounded-lg shadow-lg flex flex-col">
                <h2 className="text-2xl font-bold text-light-100 mb-4">Error Log & Analysis</h2>
                 <div className="bg-dark-100 p-4 rounded-lg flex-grow flex flex-col justify-between">
                    <div>
                        <div className="flex items-start gap-3">
                            <span className="text-red-500 mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            </span>
                            <div>
                                <h3 className="font-semibold text-light-100">{errorData.title}</h3>
                                <p className="text-sm text-gray-400">{errorData.details}</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 ml-8">Last seen: 1 day ago</p>
                    </div>
                    <Button onClick={() => setTroubleshooterOpen(true)} className="w-full mt-4">Troubleshoot with AI</Button>
                </div>
            </div>
        </div>

      </main>

       {isTroubleshooterOpen && (
        <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
          <TroubleshootingGuide
            errorTitle={errorData.title}
            errorDetails={errorData.details}
            troubleshootingSteps={errorData.steps}
            onClose={() => setTroubleshooterOpen(false)}
          />
        </Suspense>
      )}

    </div>
  );
};

export default AdminDashboard;