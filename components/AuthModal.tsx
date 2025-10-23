import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './common/Button';
import { Input } from './common/Input';
import { Logo } from './common/Logo';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
  initialView?: AuthView;
}

type AuthView = 'signup' | 'login';

const AUTH_ERROR_MESSAGES: { [key: string]: string } = {
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-not-found': 'Invalid email or password. Please try again.',
  'auth/wrong-password': 'Invalid email or password. Please try again.',
  'auth/invalid-credential': 'Invalid email or password. Please try again.',
  'auth/email-already-in-use': 'An account with this email already exists. Please log in.',
  'auth/weak-password': 'Password should be at least 6 characters long.',
  'auth/signup-disabled': 'Sorry, new account registrations are not open at this time.',
};


const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess, initialView = 'login' }) => {
  const { signUpWithEmailPassword, signInWithEmailPassword, loading } = useAuth();
  const [view, setView] = useState<AuthView>(initialView);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    setView('login'); // Always force login view
  }, []);

  useEffect(() => {
    let interval: number;

    const onRecaptchaSuccess = () => setIsRecaptchaVerified(true);
    const onRecaptchaExpired = () => setIsRecaptchaVerified(false);

    const renderRecaptcha = () => {
      if (recaptchaRef.current && widgetIdRef.current === null) {
        widgetIdRef.current = (window as any).grecaptcha.render(recaptchaRef.current, {
          'sitekey': '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
          'callback': onRecaptchaSuccess,
          'expired-callback': onRecaptchaExpired,
          'theme': 'dark'
        });
      }
    };

    const tryRender = () => {
      if ((window as any).grecaptcha && (window as any).grecaptcha.render) {
        if (interval) clearInterval(interval);
        renderRecaptcha();
      }
    };
    
    interval = window.setInterval(tryRender, 200);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const resetRecaptcha = () => {
    if ((window as any).grecaptcha && widgetIdRef.current !== null) {
        (window as any).grecaptcha.reset(widgetIdRef.current);
    }
    setIsRecaptchaVerified(false);
  };

  const handleAuthError = (err: any) => {
    if (err && err.code) {
        const message = AUTH_ERROR_MESSAGES[err.code] || 'An unexpected error occurred. Please try again.';
        setError(message);
        if (err.code === 'auth/email-already-in-use') {
            setView('login');
        }
    } else {
        setError('An error occurred. Please try again.');
    }
    console.error("Authentication Error:", err);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    if (!isRecaptchaVerified) {
        setError('Please complete the reCAPTCHA challenge.');
        return;
    }

    try {
      if (view === 'signup') {
        await signUpWithEmailPassword(email, password);
      } else {
        await signInWithEmailPassword(email, password);
      }
      onSuccess();
    } catch (err) {
      handleAuthError(err);
    } finally {
      resetRecaptcha();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-dark-200 p-8 rounded-2xl shadow-2xl w-full max-w-md m-4 transform transition-transform duration-300 scale-100">
        <div className="flex justify-between items-start">
          <Logo isDarkBg={true} className="scale-75 -ml-8 -mt-2" />
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
        </div>
        
        <div className="text-center my-6">
            <h2 className="text-2xl font-bold text-light-100">
                Admin Log In
            </h2>
            <p className="text-light-300 mt-1">
                Enter your credentials to access the admin panel.
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Email Address" 
            id="email" 
            name="email" 
            type="email" 
            required 
            autoComplete="email"
            onChange={e => setEmail(e.target.value)} 
            value={email}
            placeholder="you@example.com"
          />
          <Input 
            label="Password" 
            id="password" 
            name="password" 
            type="password" 
            required 
            autoComplete={view === 'login' ? "current-password" : "new-password"}
            onChange={e => setPassword(e.target.value)} 
            value={password}
            placeholder="••••••••"
          />

          <div className="flex justify-center pt-2">
            <div ref={recaptchaRef}></div>
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="pt-2">
            <Button type="submit" className="w-full text-lg" disabled={loading || !isRecaptchaVerified}>
              {loading ? 'Processing...' : 'Log In'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
            <p className="text-sm text-light-300">
                Please contact support if you have trouble logging in.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
