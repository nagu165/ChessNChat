import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};