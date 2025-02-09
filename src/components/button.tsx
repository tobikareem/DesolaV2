import { ReactNode } from "react";


interface ButtonProps {
  children: ReactNode;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  className?: string | undefined;
  Disabled?: boolean | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  size?: string | undefined;
  loading?: boolean | undefined;
}


export const Btn =({
  children, 
  Disabled = false,
  className,
  type,
  onClick,
  size = 'base',
  ...rest
}:ButtonProps)=> {
  return(
    <button className={`flex items-center justify-center px-5 h-12 border rounded-xl outline-0 focus:outline-0 ring-0
      font-work font-semibold text-${size}  hover:scale-105 transition-transform duration-500 ease-in-out
       ${className} ${Disabled ? 'opacity-50 cursor-not-allowed':''} 
      `}
      disabled={Disabled}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
} 