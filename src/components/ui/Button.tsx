import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'custom';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className,
  ...props
}) => {
  const baseStyles = 'font-normal transition-colors';

  const variantClasses = {
    primary: 'bg-creatorsfy-blue-dark text-white hover:bg-creatorsfy-blue-hover font-normal',
    outline: 'border border-creatorsfy-gray-bold border-opacity-10 text-gray-800 hover:bg-gray-50',
    secondary: 'bg-creatorsfy-bg-lighter100 text-creatorsfy-gray-bold200',
    ghost: 'text-blue-600 hover:bg-blue-50',
    custom: 'bg-creatorsfy-blue-dark text-white hover:bg-creatorsfy-blue-hover font-normal',
  };

  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;