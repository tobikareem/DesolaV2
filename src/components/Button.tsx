import { ButtonHTMLAttributes, ReactNode } from "react";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" ;
  size?: "sm" | "base" | "lg"; // let us restrict the size of the button to specific values
  loading?: boolean;
  fontStyle?: "grotesk" | "work" | "inter" | 'vietnam-pro' | "poppins" ;
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  radius?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'| 'full' | '48px' ;
}


export const Btn = ({
  children,
  disabled = false,
  className,
  type,
  onClick,
  size = 'base',
  fontStyle = 'work',
  weight = 'semibold',
  radius = '48px'

}: ButtonProps) => {

  const btnSize = {
    sm: "text-sm px-3 h-8",
    base: "text-base px-5 h-12",
    lg: "text-lg px-7 h-14",
  };

  const font = {
    grotesk: 'font-grotesk',
    work: 'font-work',
    inter: 'font-inter',
    poppins: 'font-poppins',
    'vietnam-pro': 'font-vietnam-pro',
  };

  const fontweight = {
    'light': 'font-light',
    'normal': 'font-normal',
    'medium': 'font-medium',
    'semibold': 'font-semibold',
    'bold': 'font-bold',
    'extrabold': 'font-extrabold',
  }

  const rounded = {
    'sm':'rounded-sm',
    'md':'rounded-md',
    'lg': 'rounded-lg',
    'xl':'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    '48px': 'rounded-[48px]',
    'full': 'rounded-full',
  }

  return (
    <button
      className={`flex items-center justify-center border ${rounded[radius]} outline-0 focus:outline-0 ring-0
        ${font[fontStyle]} ${fontweight[weight]} ${btnSize[size]} hover:scale-105 transition-transform duration-500 ease-in-out 
        ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
} 