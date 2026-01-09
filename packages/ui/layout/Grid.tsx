import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface GridProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  cols?: "1" | "2" | "3" | "4" | "5" | "6" | "12" | "auto" | "none";
  rows?: "1" | "2" | "3" | "4" | "5" | "6" | "auto" | "none";
  gap?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16" | "20" | "24";
  gapX?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16" | "20" | "24";
  gapY?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16" | "20" | "24";
  className?: string;
}

const colsMap = {
  "1": "grid-cols-1",
  "2": "grid-cols-2",
  "3": "grid-cols-3",
  "4": "grid-cols-4",
  "5": "grid-cols-5",
  "6": "grid-cols-6",
  "12": "grid-cols-12",
  "auto": "grid-cols-auto",
  "none": "grid-cols-none",
};

const rowsMap = {
  "1": "grid-rows-1",
  "2": "grid-rows-2",
  "3": "grid-rows-3",
  "4": "grid-rows-4",
  "5": "grid-rows-5",
  "6": "grid-rows-6",
  "auto": "grid-rows-auto",
  "none": "grid-rows-none",
};

const gapMap = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "5": "gap-5",
  "6": "gap-6",
  "8": "gap-8",
  "10": "gap-10",
  "12": "gap-12",
  "16": "gap-16",
  "20": "gap-20",
  "24": "gap-24",
};

const gapXMap = {
  "0": "gap-x-0",
  "1": "gap-x-1",
  "2": "gap-x-2",
  "3": "gap-x-3",
  "4": "gap-x-4",
  "5": "gap-x-5",
  "6": "gap-x-6",
  "8": "gap-x-8",
  "10": "gap-x-10",
  "12": "gap-x-12",
  "16": "gap-x-16",
  "20": "gap-x-20",
  "24": "gap-x-24",
};

const gapYMap = {
  "0": "gap-y-0",
  "1": "gap-y-1",
  "2": "gap-y-2",
  "3": "gap-y-3",
  "4": "gap-y-4",
  "5": "gap-y-5",
  "6": "gap-y-6",
  "8": "gap-y-8",
  "10": "gap-y-10",
  "12": "gap-y-12",
  "16": "gap-y-16",
  "20": "gap-y-20",
  "24": "gap-y-24",
};

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
        "grid",
        cols && colsMap[cols],
        rows && rowsMap[rows],
        gap && gapMap[gap],
        gapX && gapXMap[gapX],
        gapY && gapYMap[gapY],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};