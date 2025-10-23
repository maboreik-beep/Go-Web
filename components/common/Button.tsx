import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  const baseClasses = 'px-6 py-3 font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-100 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'border-2 border-primary text-primary hover:bg-primary hover:text-dark-100 focus:ring-primary',
    secondary: 'border border-dark-300 text-light-200 hover:bg-dark-300 focus:ring-primary',
    ghost: 'bg-transparent hover:bg-dark-200 text-light-100 focus:ring-primary border border-dark-300',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};