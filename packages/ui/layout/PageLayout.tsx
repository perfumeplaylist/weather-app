import { type ReactNode } from "react";
import { cn } from "@packages/utils/cn";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export const PageLayout = ({ children, className }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div
        className={cn(
          "w-full bg-white min-h-screen shadow-2xl relative flex flex-col",
          // Mobile First: max-w-md centered
          "max-w-md",
          // Desktop: Wider layout (1024px) for dashboard style
          "md:max-w-5xl md:border-x md:border-gray-200",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
