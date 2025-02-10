import { clsx } from "clsx";
import { InputHTMLAttributes, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  labelClassName?: string;
  error?: string;
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
  const inputId = id ?? `input-${useId}`;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className={clsx("text-sm font-medium text-gray-700", labelClassName)}>
          {label}
        </label>
      )}

      <input
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
    </div>
  );
};
