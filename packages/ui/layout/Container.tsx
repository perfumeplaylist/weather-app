import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface ContainerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  center?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "w-full",
};

export const Container = ({
  children,
  size = "full",
  center = false,
  className,
  ...props
}: ContainerProps) => {
  return (
    <div
      className={cn(
        sizeMap[size],
        center && "mx-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};