import { getLocationById } from "@/entities/location";
import { useFavoriteStore } from "@/entities/favorite";

/**
 * 날씨 상세 페이지 헤더에 필요한 데이터를 제공하는 훅
 * 위치 정보와 즐겨찾기 상태를 함께 반환
 */
export const useWeatherDetailHeader = (locationId: string) => {
  const location = getLocationById(locationId);
  const isFavorite = useFavoriteStore((state) => state.isFavorite);
  const getAlias = useFavoriteStore((state) => state.getAlias);

  const isCurrentLocationFavorite = isFavorite(locationId);
  const alias = getAlias(locationId);
  const displayName = alias || location.label;

  return {
    location,
    isFavorite: isCurrentLocationFavorite,
    displayName,
    alias,
  };
};
