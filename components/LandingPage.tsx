import React from 'react';
import { Button } from './common/Button';
import { Logo } from './common/Logo';
import { useAuth } from '../context/AuthContext';

interface LandingPageProps {
  onStartClick: () => void;
  onDashboardClick: () => void;
  onLoginClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartClick, onDashboardClick, onLoginClick }) => {
  const { user } = useAuth();

  const handleCTAClick = () => {
    if (user) {
      onDashboardClick();
    } else {
      onStartClick();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-dark-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      <header className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center">
        <Logo />
        <Button variant="ghost" onClick={onLoginClick}>Admin Log In</Button>
      </header>
      <main className="z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-light-100 mb-4 leading-tight">
          Build Your Stunning Website <br/> in <span className="text-primary">Minutes</span>
        </h1>
        <p className="text-lg md:text-xl text-light-300 max-w-3xl mx-auto mb-8">
          No code, no hassle. Our AI-powered builder creates a professional, multilingual website tailored to your business.
        </p>
        <Button onClick={handleCTAClick} className="text-xl px-10 py-4 transform hover:scale-105">
          {user ? 'Go to My Dashboard' : 'Start Building For Free'}
        </Button>
        <p className="text-sm text-dark-300 mt-4">No credit card required to start.</p>
      </main>
       <style>{`
          .bg-grid {
            background-image: linear-gradient(to right, #2c2c2c 1px, transparent 1px), linear-gradient(to bottom, #2c2c2c 1px, transparent 1px);
            background-size: 3rem 3rem;
          }
       `}</style>
    </div>
  );
};

export default LandingPage;