import { type ReactNode } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

/**
 * Badge Variants using CVA
 * Based on design tokens from index.css
 */
const badgeVariants = cva(
  "inline-flex items-center font-[--font-weight-medium] border transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary-100 text-primary-800 border-primary-200",
        secondary: "bg-gray-100 text-gray-800 border-gray-200",
        success: "bg-success-100 text-success-800 border-success-200",
        warning: "bg-warning-100 text-warning-800 border-warning-200",
        danger: "bg-danger-100 text-danger-800 border-danger-200",
      },
      size: {
        sm: ["px-[--spacing-2]", "py-0.5", "text-[--font-size-xs]", "rounded-full"],
        md: ["px-[--spacing-2]", "py-1", "text-[--font-size-sm]", "rounded-full"],
        lg: ["px-[--spacing-3]", "py-1.5", "text-[--font-size-base]", "rounded-full"],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode;
  className?: string;
}

export const Badge = ({
  children,
  variant,
  size,
  className,
}: BadgeProps) => {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)}>
      {children}
    </span>
  );
};

Badge.displayName = "Badge";