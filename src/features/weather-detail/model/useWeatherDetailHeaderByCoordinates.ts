import { useMemo } from "react";
import { createLocationFromCoordinates } from "@/entities/location";
import { useFavoriteStore } from "@/entities/favorite";

/**
 * 좌표 기반 날씨 상세 페이지 헤더에 필요한 데이터를 제공하는 훅
 * 위치 정보와 즐겨찾기 상태를 함께 반환
 */
export const useWeatherDetailHeaderByCoordinates = (
  lat: number,
  lon: number,
  locationName?: string
) => {
  const location = createLocationFromCoordinates(lat, lon, locationName);
  
  // Zustand store에서 직접 구독하여 변경사항을 즉시 반영
  const ids = useFavoriteStore((state) => state.ids);
  const aliases = useFavoriteStore((state) => state.aliases);

  // location.id에 해당하는 값들을 계산
  const isCurrentLocationFavorite = useMemo(
    () => ids.includes(location.id),
    [ids, location.id]
  );
  
  const alias = useMemo(
    () => aliases[location.id],
    [aliases, location.id]
  );
  
  const displayName = useMemo(
    () => alias || location.label,
    [alias, location.label]
  );

  return {
    location,
    isFavorite: isCurrentLocationFavorite,
    displayName,
    alias,
  };
};
