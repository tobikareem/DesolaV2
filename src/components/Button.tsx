import { ReactNode } from "react";


interface ButtonProps {
  children: ReactNode;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "base" | "lg"; // let us restrict the size of the button to specific values
  loading?: boolean;
}


export const Btn = ({
  children,
  disabled = false,
  className,
  type,
  onClick,
  size = 'base'
}: ButtonProps) => {

  const btnSize = {
    sm: "text-sm px-3 h-8",
    base: "text-base px-5 h-12",
    lg: "text-lg px-7 h-14",
  };

  return (
    <button
      className={`flex items-center justify-center border rounded-xl outline-0 focus:outline-0 ring-0
        font-work font-semibold ${btnSize[size]} hover:scale-105 transition-transform duration-500 ease-in-out 
        ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
} 