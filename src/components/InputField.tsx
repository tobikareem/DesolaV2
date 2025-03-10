
import { InputHTMLAttributes, useId } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  labelClassName?: string;
  error?: string;
  errorClassName?: string;
  ref?: React.RefObject<HTMLInputElement> | React.LegacyRef<HTMLInputElement>;
}


export const Input = ({
  label,
  className = "",
  labelClassName = "",
  error,
  errorClassName = "",
  id,
  ref,
  ...rest
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? `input-${generatedId}`;

  return (
    <div className="flex flex-col gap-1 font-work w-full">
      {label && (
        <label htmlFor={inputId} className={clsx("text-sm font-medium text-neutral-700", labelClassName)}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={clsx(
          "px-4 py-2 border outline-none focus:border-2 hover:border-2 transition-all duration-200 ease-in-out box-border ",
          {
            "border-error": error,
            "border-neutral-300": !error,
          },
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        ref={ref}
        {...rest}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          className={clsx("text-error text-xs", errorClassName)}
        >
          {error}
        </p>
      )}
    </div>
  );
};





