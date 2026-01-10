import { type ReactNode, type HTMLAttributes } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

/**
 * Grid Variants using CVA
 * Based on design tokens from index.css
 */
const gridVariants = cva(
  "grid",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        12: "grid-cols-12",
        auto: "grid-cols-auto",
        none: "grid-cols-none",
      },
      rows: {
        1: "grid-rows-1",
        2: "grid-rows-2",
        3: "grid-rows-3",
        4: "grid-rows-4",
        5: "grid-rows-5",
        6: "grid-rows-6",
        auto: "grid-rows-auto",
        none: "grid-rows-none",
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
      gapX: {
        0: "gap-x-0",
        1: "gap-x-[--spacing-1]",
        2: "gap-x-[--spacing-2]",
        3: "gap-x-[--spacing-3]",
        4: "gap-x-[--spacing-4]",
        5: "gap-x-[--spacing-5]",
        6: "gap-x-[--spacing-6]",
        8: "gap-x-[--spacing-8]",
        10: "gap-x-[--spacing-10]",
        12: "gap-x-[--spacing-12]",
        16: "gap-x-[--spacing-16]",
        20: "gap-x-[--spacing-20]",
        24: "gap-x-[--spacing-24]",
      },
      gapY: {
        0: "gap-y-0",
        1: "gap-y-[--spacing-1]",
        2: "gap-y-[--spacing-2]",
        3: "gap-y-[--spacing-3]",
        4: "gap-y-[--spacing-4]",
        5: "gap-y-[--spacing-5]",
        6: "gap-y-[--spacing-6]",
        8: "gap-y-[--spacing-8]",
        10: "gap-y-[--spacing-10]",
        12: "gap-y-[--spacing-12]",
        16: "gap-y-[--spacing-16]",
        20: "gap-y-[--spacing-20]",
        24: "gap-y-[--spacing-24]",
      },
    },
    defaultVariants: {
      gap: 0,
    },
  }
);

interface GridProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "className">,
    VariantProps<typeof gridVariants> {
  children: ReactNode;
  className?: string;
}

export const Grid = ({
  children,
  cols,
  rows,
  gap,
  gapX,
  gapY,
  className,
  ...props
}: GridProps) => {
  return (
    <div
      className={cn(
        gridVariants({ cols, rows, gap, gapX, gapY }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Grid.displayName = "Grid";