import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label }) => {
  const handleToggle = (e: React.MouseEvent) => {
    // Stop propagation to prevent parent elements (like accordions) from triggering their own onClick events.
    e.stopPropagation();
    onChange(!checked);
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={handleToggle}>
      {label && <span className="mr-3 text-sm font-medium text-light-200">{label}</span>}
      <div className="relative">
        {/* The actual checkbox is hidden, but kept for accessibility */}
        <input type="checkbox" className="sr-only" checked={checked} readOnly />
        <div className={`block w-10 h-5 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-dark-300'}`}></div>
        <div className={`dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'transform translate-x-5' : ''}`}></div>
      </div>
    </div>
  );
};