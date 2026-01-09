import { type ReactNode } from "react";
import { cn } from "../../utils/cn";

interface IconProps {
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  color?: "current" | "gray-400" | "gray-500" | "gray-600" | "gray-700" | "gray-900" | "blue-500" | "red-500" | "green-500" | "yellow-500" | "white";
  className?: string;
}

const sizeMap = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
  "2xl": "w-10 h-10",
};

const colorMap = {
  current: "text-current",
  "gray-400": "text-gray-400",
  "gray-500": "text-gray-500",
  "gray-600": "text-gray-600",
  "gray-700": "text-gray-700",
  "gray-900": "text-gray-900",
  "blue-500": "text-blue-500",
  "red-500": "text-red-500",
  "green-500": "text-green-500",
  "yellow-500": "text-yellow-500",
  "white": "text-white",
};

export const Icon = ({
  children,
  size = "md",
  color = "current",
  className,
}: IconProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        sizeMap[size],
        colorMap[color],
        className
      )}
    >
      {children}
    </span>
  );
};