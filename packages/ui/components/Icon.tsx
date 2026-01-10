import { type ReactNode } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

/**
 * Icon Variants using CVA
 * Based on design tokens from index.css
 */
const iconVariants = cva(
  "inline-flex items-center justify-center flex-shrink-0",
  {
    variants: {
      size: {
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-8 h-8",
        "2xl": "w-10 h-10",
      },
      color: {
        current: "text-current",
        muted: "text-gray-400",
        default: "text-gray-500",
        emphasis: "text-gray-900",
        primary: "text-primary-500",
        success: "text-success-500",
        warning: "text-warning-500",
        danger: "text-danger-500",
        inverse: "text-white",
      },
    },
    defaultVariants: {
      size: "md",
      color: "current",
    },
  }
);

interface IconProps extends VariantProps<typeof iconVariants> {
  children: ReactNode;
  className?: string;
}

export const Icon = ({
  children,
  size,
  color,
  className,
}: IconProps) => {
  return (
    <span className={cn(iconVariants({ size, color }), className)}>
      {children}
    </span>
  );
};

Icon.displayName = "Icon";