import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    User as FirebaseUser
} from 'firebase/auth';
import { User } from '../types';
import { isFirebaseConfigured, auth as firebaseAuth } from '../firebaseConfig';


interface AuthContextType {
  user: User | null;
  loading: boolean;
  isInitializing: boolean;
  signUpWithEmailPassword: (email: string, password: string) => Promise<void>;
  signInWithEmailPassword: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  reloadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !firebaseAuth) {
      console.warn("Firebase Auth is not configured. Authentication will not work.");
      setIsInitializing(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const isAdmin = firebaseUser.email === 'admin@goonline.cloud';
        
        // In a real app, this profile would be fetched from Firestore.
        // Here, we create a default profile to ensure the app works smoothly.
        const nameFromEmail = firebaseUser.email ? firebaseUser.email.split('@')[0] : 'New User';
        const companyFromEmail = firebaseUser.email ? `${nameFromEmail}'s Business` : 'My Company';

        const appUser: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || nameFromEmail,
            company: companyFromEmail,
            plan: 'premium', // Placeholder
            isAdmin: isAdmin,
        };
        setUser(appUser);
      } else {
        setUser(null);
      }
      setIsInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const signUpWithEmailPassword = async (email: string, password: string) => {
    if (!firebaseAuth) throw new Error("Firebase not configured");
    setLoading(true);
    try {
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
        // User state will be updated by onAuthStateChanged
    } finally {
        setLoading(false);
    }
  };

  const signInWithEmailPassword = async (email: string, password: string) => {
    if (!firebaseAuth) throw new Error("Firebase not configured");
    setLoading(true);
    try {
        await signInWithEmailAndPassword(firebaseAuth, email, password);
        // User state will be updated by onAuthStateChanged
    } finally {
        setLoading(false);
    }
  };

  const logout = async () => {
    if (!firebaseAuth) throw new Error("Firebase not configured");
    await signOut(firebaseAuth);
    setUser(null);
  };

  const reloadUser = async () => {
    await firebaseAuth?.currentUser?.reload();
  };

  return (
    <AuthContext.Provider value={{ 
        user, 
        loading, 
        isInitializing, 
        signUpWithEmailPassword,
        signInWithEmailPassword,
        logout,
        reloadUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};