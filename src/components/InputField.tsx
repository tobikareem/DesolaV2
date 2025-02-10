import { clsx } from "clsx";
import { InputHTMLAttributes, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  labelClassName?: string;
  error?: string;
<<<<<<< Updated upstream
  errorClassName?: string;
}

export const Input = ({
  label,
  className = "",
  labelClassName = "",
  error,
  errorClassName = "",
  id,
  ...rest
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? `input-${generatedId}`;
=======
  text?: 'sm' | 'base' | 'lg';
  placeholder?: 'sm' | 'base' | 'lg';
}

export const Input = ({ label, className, error, 
    text = 'base',
    placeholder = 'base', ...rest 
}: InputProps) => {

  const placeholderTextSize = {
    'sm' : 'placeholder:text-sm',
    'base' : 'placeholder:text-base',
    'lg': 'placeholder:text-lg',
  }

  const textSize = {
    'sm' : 'text-sm ',
    'base' : 'text-base',
    'lg': 'text-lg',
  }
>>>>>>> Stashed changes

  return (
    <div className="flex flex-col gap-1 font-work">
      {label && (
        <label htmlFor={inputId} className={clsx("text-sm font-medium text-gray-700", labelClassName)}>
          {label}
        </label>
      )}

      <input
<<<<<<< Updated upstream
        id={inputId}
        className={clsx(
          "px-4 py-2 border rounded-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out",
          {
            "border-red-500": error,
            "border-gray-300": !error,
          },
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          className={clsx("text-red-500 text-xs", errorClassName)}
        >
          {error}
        </p>
      )}
=======
        className={`font-medium text-neutral-text-500 px-4 py-2 border rounded-[10px] outline-none ring-0 focus:border-2
          transition-all duration-200 ease-in ${textSize[text]}  ${className} ${placeholderTextSize[placeholder]} placeholder:text-neutral-text-300 
          ${error ? 'border-error' : 'border'}
        `}
        {...rest}
      />

      {error && <p className="text-error text-xs">{error}</p>}
>>>>>>> Stashed changes
    </div>
  );
};
