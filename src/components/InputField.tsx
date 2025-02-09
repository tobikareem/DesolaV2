import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  error?: string;
}

export const Input = ({ label, className, error, ...rest }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <input
        className={`px-4 py-2 border rounded-sm outline-none focus:ring-2 focus:ring-blue-500
          transition-all duration-300 ease-in-out ${className} 
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
        {...rest}
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};
