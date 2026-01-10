import { type InputHTMLAttributes, forwardRef } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

/**
 * Input Variants using CVA
 * Based on design tokens from index.css
 */
const inputVariants = cva(
  `w-full border outline-none transition-all
  disabled:opacity-50 disabled:cursor-not-allowed
  placeholder:text-gray-400 rounded-[--input-radius]
  focus:ring-2 focus:ring-[--input-focus-ring] focus:ring-offset-0`,
  {
    variants: {
      variant: {
        default: [
          "bg-white",
          "border-[--input-border]",
          "focus:border-primary-500",
        ],
        filled: [
          "bg-[--input-bg]",
          "border-transparent",
          "focus:bg-white",
          "focus:border-primary-500",
        ],
        outline: [
          "bg-transparent",
          "border-gray-300",
          "focus:border-primary-500",
        ],
      },
      inputSize: {
        sm: ["px-3", "py-1.5", "text-[--font-size-sm]"],
        md: [
          "px-[--input-padding-x]",
          "py-[--input-padding-y]",
          "text-[--font-size-base]",
        ],
        lg: ["px-[--spacing-5]", "py-3", "text-[--font-size-lg]"],
      },
      state: {
        default: "",
        error: [
          "border-danger-500",
          "focus:border-danger-500",
          "focus:ring-danger-500",
        ],
        success: [
          "border-success-500",
          "focus:border-success-500",
          "focus:ring-success-500",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
      state: "default",
    },
  }
);

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      inputSize,
      error = false,
      leftIcon,
      rightIcon,
      className,
      ...props
    },
    ref
  ) => {
    const inputClasses = cn(
      inputVariants({
        variant,
        inputSize,
        state: error ? "error" : "default",
      }),
      leftIcon && "pl-10",
      rightIcon && "pr-10",
      className
    );

    if (leftIcon || rightIcon) {
      return (
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input ref={ref} className={inputClasses} {...props} />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
      );
    }

    return <input ref={ref} className={inputClasses} {...props} />;
  }
);

Input.displayName = "Input";
