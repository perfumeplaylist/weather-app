import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType } from "react";
import type { PolymorphicComponentProp } from "./polymorphicComponentProp";
import { cn } from "@packages/utils/cn";

/**
 * Text Variants using CVA
 * Based on design tokens from index.css
 */
const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-[--font-size-xs]",
      sm: "text-[--font-size-sm]",
      base: "text-[--font-size-base]",
      lg: "text-[--font-size-lg]",
      xl: "text-[--font-size-xl]",
      "2xl": "text-[--font-size-2xl]",
      "3xl": "text-[--font-size-3xl]",
      "4xl": "text-[--font-size-4xl]",
      "5xl": "text-[--font-size-5xl]",
      "6xl": "text-[--font-size-6xl]",
    },
    weight: {
      normal: "font-[--font-weight-normal]",
      medium: "font-[--font-weight-medium]",
      semibold: "font-[--font-weight-semibold]",
      bold: "font-[--font-weight-bold]",
    },
    color: {
      default: "text-gray-900",
      muted: "text-gray-700",
      subtle: "text-gray-500",
      disabled: "text-gray-400",
      inverse: "text-white",
      primary: "text-primary-600",
      danger: "text-danger-600",
      success: "text-success-600",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    lineHeight: {
      tight: "leading-[--line-height-tight]",
      normal: "leading-[--line-height-normal]",
      relaxed: "leading-[--line-height-relaxed]",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    color: "default",
    align: "left",
    lineHeight: "normal",
  },
});

type TextVariants = VariantProps<typeof textVariants>;

type TextOwnProps = TextVariants & {
  truncate?: boolean;
  lineClamp?: 2 | 3;
};

type TextProps<C extends ElementType = "p"> = PolymorphicComponentProp<
  C,
  TextOwnProps
>;

export const Text = <C extends ElementType = "p">({
  as,
  size,
  weight,
  color,
  align,
  lineHeight,
  truncate,
  lineClamp,
  className,
  children,
  ...props
}: TextProps<C>) => {
  const Component = as || "p";

  return (
    <Component
      className={cn(
        textVariants({ size, weight, color, align, lineHeight }),
        truncate && "truncate",
        lineClamp && `line-clamp-${lineClamp}`,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
