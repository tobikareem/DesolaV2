import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  className?: string | undefined;
  size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
  color?: string;
}

export const Text = ({
  children,
  as: Tag = "p",
  className,
  size = "base",
  weight = "normal",
  color = "text-neutral-900",
}: TextProps) => {
  return (
    <Tag className={`text-${size} font-${weight} ${color} ${className}`}>
      {children}
    </Tag>
  );
};
