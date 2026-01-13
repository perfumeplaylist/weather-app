import { Star } from "lucide-react";
import { useToggleFavorite } from "../model/useToggleFavorite";

interface ToggleFavoriteButtonProps {
  locationId: string;
  variant?: "mobile" | "desktop";
  className?: string;
}

/**
 * 즐겨찾기 토글 버튼 컴포넌트
 * 모바일/데스크탑 버전을 variant로 구분
 */
export const ToggleFavoriteButton = ({
  locationId,
  variant = "mobile",
  className,
}: ToggleFavoriteButtonProps) => {
  const { handleToggle, isFavorite } = useToggleFavorite();
  const isFav = isFavorite(locationId);

  if (variant === "mobile") {
    return (
      <button
        onClick={() => handleToggle(locationId)}
        className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
          className || ""
        }`}
      >
        <Star
          className={`w-6 h-6 ${
            isFav ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
          }`}
        />
      </button>
    );
  }

  // Desktop variant
  return (
    <button
      onClick={() => handleToggle(locationId)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600 ${
        className || ""
      }`}
    >
      <Star
        className={`w-5 h-5 ${
          isFav ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
        }`}
      />
      {isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
    </button>
  );
};


