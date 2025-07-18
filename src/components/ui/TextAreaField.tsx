import { TextareaHTMLAttributes, useId } from "react";
import clsx from "clsx";


interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
  labelClassName?: string;
  error?: string;
  errorClassName?: string;
}


export const TextArea = ({
  label,
  className = "",
  labelClassName = "",
  error,
  errorClassName = "",
  id,
  ...rest
}: TextAreaProps) => {
  const generatedId = useId();
  const inputId = id ?? `input-${generatedId}`;

  return (
    <div className="flex flex-col gap-1 font-work w-full ">
      {label && (
        <label htmlFor={inputId} className={clsx("text-sm font-medium text-neutral-700", labelClassName)}>
          {label}
        </label>
      )}

      <textarea
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