import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string | null;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, id, error, className, ...props }) => {
  return (
    <div className={clsx("w-full", className)}>
      {label && (
        <label htmlFor={id} className="block text-[15px] font-normal text-creatorsfy-black200 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`mt-1 block w-full px-3 py-3 border ${
          error ? 'border-red-500' : 'border-creatorsfy-gray200 border-opacity-60'
        } rounded-[2px] focus:outline-none sm:text-sm`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;