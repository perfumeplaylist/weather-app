import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  variant?: "default" | "outlined" | "elevated" | "ghost";
  padding?: "none" | "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  clickable?: boolean;
  className?: string;
}

const variantMap = {
  default: "bg-white border border-gray-100 shadow-sm",
  outlined: "bg-white border border-gray-200",
  elevated: "bg-white border border-gray-100 shadow-lg",
  ghost: "bg-transparent border-none",
};

const paddingMap = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

const roundedMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

export const Card = ({
  children,
  variant = "default",
  padding = "md",
  rounded = "2xl",
  clickable = false,
  className,
  onClick,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        variantMap[variant],
        paddingMap[padding],
        roundedMap[rounded],
        (clickable || onClick) && "cursor-pointer active:scale-98 transition-transform",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};