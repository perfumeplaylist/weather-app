import { type ReactNode, type ButtonHTMLAttributes, forwardRef } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

/**
 * Button Variants using CVA
 * Based on design tokens from index.css
 */
const buttonVariants = cva(
  `inline-flex items-center justify-center
  font-[--button-font-weight] rounded-[--button-radius] border
  transition-[--button-transition]
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
  active:scale-98 transition-transform
  disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100`,
  {
    variants: {
      variant: {
        primary: "bg-primary-600 hover:bg-primary-700 text-white border-transparent",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200",
        outline: "bg-transparent hover:bg-gray-50 text-gray-700 border-gray-300",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700 border-transparent",
        danger: "bg-danger-600 hover:bg-danger-700 text-white border-transparent",
      },
      size: {
        sm: ["px-3", "py-1.5", "text-[--font-size-sm]"],
        md: ["px-[--button-padding-x]", "py-[--button-padding-y]", "text-[--font-size-base]"],
        lg: ["px-6", "py-3", "text-[--font-size-lg]"],
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  loading?: boolean;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant,
      size,
      fullWidth,
      loading = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";