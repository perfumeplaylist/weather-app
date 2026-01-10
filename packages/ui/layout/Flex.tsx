import { type ReactNode, type HTMLAttributes } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

/**
 * Flex Variants using CVA
 * Based on design tokens from index.css
 */
const flexVariants = cva(
  "flex",
  {
    variants: {
      direction: {
        row: "flex-row",
        col: "flex-col",
        rowReverse: "flex-row-reverse",
        colReverse: "flex-col-reverse",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      },
      wrap: {
        nowrap: "flex-nowrap",
        wrap: "flex-wrap",
        wrapReverse: "flex-wrap-reverse",
      },
      gap: {
        0: "gap-0",
        1: "gap-[--spacing-1]",
        2: "gap-[--spacing-2]",
        3: "gap-[--spacing-3]",
        4: "gap-[--spacing-4]",
        5: "gap-[--spacing-5]",
        6: "gap-[--spacing-6]",
        8: "gap-[--spacing-8]",
        10: "gap-[--spacing-10]",
        12: "gap-[--spacing-12]",
        16: "gap-[--spacing-16]",
        20: "gap-[--spacing-20]",
        24: "gap-[--spacing-24]",
      },
    },
    defaultVariants: {
      direction: "row",
      align: "start",
      justify: "start",
      wrap: "nowrap",
      gap: 0,
    },
  }
);

interface FlexProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "className">,
    VariantProps<typeof flexVariants> {
  children: ReactNode;
  className?: string;
}

export const Flex = ({
  children,
  direction,
  align,
  justify,
  wrap,
  gap,
  className,
  ...props
}: FlexProps) => {
  return (
    <div
      className={cn(
        flexVariants({ direction, align, justify, wrap, gap }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Flex.displayName = "Flex";