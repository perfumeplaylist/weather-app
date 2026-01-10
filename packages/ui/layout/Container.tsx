import { type ReactNode, type HTMLAttributes } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

/**
 * Container Variants using CVA
 * Based on design tokens from index.css
 */
const containerVariants = cva(
  "w-full",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        mobile: "max-w-[--page-max-width-mobile]",
        desktop: "max-w-[--page-max-width-desktop]",
        full: "max-w-full",
      },
      padding: {
        none: "px-0",
        sm: "px-[--spacing-4]",
        md: "px-[--spacing-6]",
        lg: "px-[--spacing-8]",
      },
      center: {
        true: "mx-auto",
        false: "",
      },
    },
    defaultVariants: {
      size: "full",
      padding: "none",
      center: false,
    },
  }
);

interface ContainerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "className">,
    VariantProps<typeof containerVariants> {
  children: ReactNode;
  className?: string;
}

export const Container = ({
  children,
  size,
  padding,
  center,
  className,
  ...props
}: ContainerProps) => {
  return (
    <div
      className={cn(containerVariants({ size, padding, center }), className)}
      {...props}
    >
      {children}
    </div>
  );
};

Container.displayName = "Container";