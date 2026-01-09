import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface TextProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
  children: ReactNode;
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "gray-900" | "gray-700" | "gray-500" | "gray-400" | "white" | "blue-600" | "red-600";
  align?: "left" | "center" | "right";
  truncate?: boolean;
  className?: string;
}

const sizeMap = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
};

const weightMap = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const colorMap = {
  "gray-900": "text-gray-900",
  "gray-700": "text-gray-700",
  "gray-500": "text-gray-500",
  "gray-400": "text-gray-400",
  "white": "text-white",
  "blue-600": "text-blue-600",
  "red-600": "text-red-600",
};

const alignMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export const Text = ({
  children,
  as: Component = "p",
  size = "base",
  weight = "normal",
  color = "gray-900",
  align = "left",
  truncate = false,
  className,
  ...props
}: TextProps) => {
  return (
    <Component
      className={cn(
        sizeMap[size],
        weightMap[weight],
        colorMap[color],
        alignMap[align],
        truncate && "truncate",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};