import type { ReactNode } from "react";
import { cn } from "@packages/utils/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = ({ children, className, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-gray-100 p-4",
        onClick && "cursor-pointer active:scale-98 transition-transform",
        className
      )}
    >
      {children}
    </div>
  );
};
