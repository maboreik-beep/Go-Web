import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ label, id, children, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-light-200 mb-1">
        {label}
      </label>
      <select
        id={id}
        className="w-full bg-dark-200 border border-dark-300 rounded-lg px-3 py-2 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition appearance-none"
        {...props}
      >
        {children}
      </select>
    </div>
  );
};