import { useMemo } from "react";
import { useFavoriteLocations } from "@/entities/favorite";
import { useWeatherBatch } from "@/entities/weather";
import { mapToSavedLocation } from "../lib/mapToSavedLocation";
import type { SavedLocationData } from "@/entities/favorite/model/favoriteTypes";

/**
 * 즐겨찾기 위치와 날씨 데이터를 결합하여 SavedLocationData 배열을 반환하는 훅
 * 
 * @returns SavedLocationData 배열
 */
export const useFavoriteWithWeather = (): SavedLocationData[] => {
  // 즐겨찾기 위치 목록 가져오기
  const { locations, getAlias, validLocations } = useFavoriteLocations();

  // 유효한 좌표를 가진 위치들의 날씨 데이터 병렬 조회
  const { getWeatherByLocation } = useWeatherBatch(validLocations);

  // 데이터 변환 및 결합
  const savedLocations = useMemo<SavedLocationData[]>(() => {
    return locations.map((location) => {
      const alias = getAlias(location.id);
      const displayName = alias || location.locationLabel;
      const weatherData = getWeatherByLocation(location.id);

      return mapToSavedLocation(location, weatherData, displayName);
    });
  }, [locations, getAlias, getWeatherByLocation]);

  return savedLocations;
};

