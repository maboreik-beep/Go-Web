import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { AdminWebsiteView, User } from '../types';
import { isFirebaseConfigured, db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from './AuthContext';

interface AdminContextType {
  websites: AdminWebsiteView[];
  loading: boolean;
  updateUserPlan: (uid: string, plan: User['plan']) => Promise<void>;
  fetchWebsites: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);


export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [websites, setWebsites] = useState<AdminWebsiteView[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWebsites = useCallback(async () => {
    if (!isFirebaseConfigured || !db || !user?.isAdmin) {
        setLoading(false);
        return;
    }
    setLoading(true);
    try {
        const websitesCollection = collection(db, 'websites');
        const websiteSnapshot = await getDocs(websitesCollection);
        const websitesList = websiteSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                siteName: data.siteName,
                slug: data.slug,
                isPublished: data.isPublished,
                lastUpdated: data.lastUpdated ? (data.lastUpdated as Timestamp).toDate() : new Date(),
                userId: data.userId,
                userEmail: data.userEmail || 'N/A' // userEmail should be stored on website doc
            } as AdminWebsiteView
        });
        setWebsites(websitesList);
    } catch (error) {
        console.error("Error fetching websites: ", error);
    } finally {
        setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchWebsites();
  }, [fetchWebsites]);

  const updateUserPlan = useCallback(async (uid: string, plan: User['plan']) => {
    if (!isFirebaseConfigured || !db) return;
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, { plan: plan });
    // You might want to refetch users or update state here if displaying user info
  }, []);

  return (
    <AdminContext.Provider value={{ websites, loading, updateUserPlan, fetchWebsites }}>
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