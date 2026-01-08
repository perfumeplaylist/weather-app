import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { cn } from "../../../packages/utils/cn";

interface HeaderProps {
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header = ({
  title,
  left,
  right,
  className,
  showBack = false,
  onBack,
}: HeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header
      className={cn(
        "flex items-center justify-between h-14 px-4 bg-white/80 backdrop-blur-md sticky top-0 z-50",
        className
      )}
    >
      <div className="flex items-center gap-2 flex-1">
        {showBack && (
          <button
            onClick={handleBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </button>
        )}
        {left}
      </div>

      {title && (
        <h1 className="text-lg font-semibold text-gray-900 absolute left-1/2 -translate-x-1/2">
          {title}
        </h1>
      )}

      <div className="flex items-center justify-end flex-1 gap-2">{right}</div>
    </header>
  );
};


