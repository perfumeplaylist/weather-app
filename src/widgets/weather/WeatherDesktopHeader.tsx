import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { ToggleFavoriteButton } from "@/features/favorite/toggle-favorite";
import { WeatherDetailHeaderTitle } from "./WeatherDetailHeaderTitle";

/**
 * 날씨 상세 페이지 데스크탑 헤더
 * Feature 컴포넌트들을 조합하여 구성
 */
export const WeatherDesktopHeader = ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex items-center justify-between p-6 border-b border-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="text-sm font-medium">뒤로가기</span>
      </button>

      <div className="flex items-center gap-3">
        <WeatherDetailHeaderTitle lat={lat} lon={lon} variant="desktop" />
      </div>

      <ToggleFavoriteButton lat={lat} lon={lon} variant="desktop" />
    </div>
  );
};
