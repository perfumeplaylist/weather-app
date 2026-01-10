import { type ReactNode, type HTMLAttributes } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

/**
 * Card Variants using CVA
 * Based on design tokens from index.css
 */
const cardVariants = cva(
  "transition-all",
  {
    variants: {
      variant: {
        default: "bg-[--card-bg] border border-[--card-border] shadow-[--card-shadow]",
        outlined: "bg-white border border-gray-200",
        elevated: "bg-white border border-gray-100 shadow-[--shadow-lg]",
        ghost: "bg-transparent border-none",
      },
      padding: {
        none: "p-0",
        sm: "p-[--spacing-3]",
        md: "p-[--card-padding]",
        lg: "p-[--spacing-6]",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-[--radius-sm]",
        md: "rounded-[--radius-md]",
        lg: "rounded-[--radius-lg]",
        xl: "rounded-[--radius-xl]",
        "2xl": "rounded-[--card-radius]",
      },
      interactive: {
        true: "cursor-pointer hover:shadow-lg hover:-translate-y-1 active:scale-98",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      rounded: "2xl",
      interactive: false,
    },
  }
);

interface CardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "className">,
    VariantProps<typeof cardVariants> {
  children: ReactNode;
  clickable?: boolean;
  className?: string;
}

export const Card = ({
  children,
  variant,
  padding,
  rounded,
  interactive,
  clickable = false,
  className,
  onClick,
  ...props
}: CardProps) => {
  const isInteractive = interactive ?? (clickable || !!onClick);

  return (
    <div
      className={cn(
        cardVariants({ variant, padding, rounded, interactive: isInteractive }),
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

Card.displayName = "Card";