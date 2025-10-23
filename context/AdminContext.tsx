import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
// FIX: Import User type for plan management.
import { AdminWebsiteView, User } from '../types';

interface AdminContextType {
  websites: AdminWebsiteView[];
  loading: boolean;
  // FIX: Add updateUserPlan to the context type to match usage in UserManagementModal.
  updateUserPlan: (uid: string, plan: User['plan']) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mock data for the admin dashboard in preview mode.
const MOCK_WEBSITES: AdminWebsiteView[] = [
    {
        id: 'website_1',
        siteName: { en: 'Quantum Solutions', ar: 'الحلول الكمومية' },
        slug: 'quantum-solutions',
        isPublished: true,
        lastUpdated: new Date(Date.now() - 86400000 * 2), // 2 days ago
    },
    {
        id: 'website_2',
        siteName: { en: 'Apex Construction', ar: 'قمة البناء' },
        slug: 'apex-construction',
        isPublished: true,
        lastUpdated: new Date(Date.now() - 86400000 * 5), // 5 days ago
    },
    {
        id: 'website_3',
        siteName: { en: 'The Gourmet Kitchen', ar: 'المطبخ الذواقة' },
        slug: 'gourmet-kitchen',
        isPublished: false,
        lastUpdated: new Date(Date.now() - 86400000 * 1), // 1 day ago
    },
     {
        id: 'website_4',
        siteName: 'Starlight Photography',
        slug: undefined,
        isPublished: false,
        lastUpdated: new Date(Date.now() - 86400000 * 10), // 10 days ago
    },
];

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [websites, setWebsites] = useState<AdminWebsiteView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In preview mode, just load the mock data.
    setLoading(true);
    setTimeout(() => { // Simulate a network delay
        setWebsites(MOCK_WEBSITES);
        setLoading(false);
    }, 500);
  }, []);

  // FIX: Provide a mock implementation for updateUserPlan to fix the error in UserManagementModal.
  const updateUserPlan = useCallback(async (uid: string, plan: User['plan']) => {
    console.log(`[MOCK] Updating plan for user ${uid} to ${plan}. This is a mock action.`);
    // Simulate an API call delay.
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real app, this would involve a state update or refetch.
  }, []);

  return (
    <AdminContext.Provider value={{ websites, loading, updateUserPlan }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
