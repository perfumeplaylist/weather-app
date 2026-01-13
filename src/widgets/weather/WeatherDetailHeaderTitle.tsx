import { EditFavoriteAlias } from "@/features/favorite/edit-favorite-alias";
import { useWeatherDetailHeaderByCoordinates } from "@/features/weather/detail/model/useWeatherDetailHeaderByCoordinates";

interface WeatherDetailHeaderTitleProps {
  lat: number;
  lon: number;
  variant: "mobile" | "desktop";
}

/**
 * 날씨 상세 페이지 헤더 타이틀 컴포넌트
 * 모바일/데스크탑 variant에 따라 다른 스타일과 렌더링 적용
 * 즐겨찾기인 경우 편집 가능한 별칭, 아닌 경우 일반 텍스트 표시
 */
export const WeatherDetailHeaderTitle = ({
  lat,
  lon,
  variant,
}: WeatherDetailHeaderTitleProps) => {
  const { location, isFavorite, displayName } =
    useWeatherDetailHeaderByCoordinates(lat, lon);

  if (isFavorite) {
    return (
      <EditFavoriteAlias
        locationId={location.id}
        locationName={displayName}
        className={variant === "mobile" ? "max-w-[200px]" : "min-w-[200px]"}
      />
    );
  }

  // 비즐겨찾기 상태
  if (variant === "mobile") {
    return <>{displayName}</>;
  }

  return <h1 className="text-xl font-bold text-gray-900">{displayName}</h1>;
};
