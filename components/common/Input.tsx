import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  dir?: 'ltr' | 'rtl';
}

export const Input: React.FC<InputProps> = ({ label, id, dir, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-light-200 mb-1">
        {label}
      </label>
      <input
        id={id}
        dir={dir}
        className="w-full bg-dark-200 border border-dark-300 rounded-md px-3 py-2 text-light-100 focus:outline-none focus:border-primary transition duration-200"
        {...props}
      />
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  dir?: 'ltr' | 'rtl';
}

export const TextArea: React.FC<TextAreaProps> = ({ label, id, dir, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-light-200 mb-1">
        {label}
      </label>
      <textarea
        id={id}
        dir={dir}
        rows={4}
        className="w-full bg-dark-200 border border-dark-300 rounded-md px-3 py-2 text-light-100 focus:outline-none focus:border-primary transition duration-200"
        {...props}
      />
    </div>
  );
};