import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  name: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, id, name, className = '', ...props }) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        className={`block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
        {...props}
      />
    </div>
  );
};

export default TextInput;

