import {
  createLocationFromCoordinates,
  parseLocationName,
} from "@/entities/location";
import { useCurrentWeather } from "./useCurrentWeather";
import { useSuspenseQuery } from "@tanstack/react-query";
import { weatherQueryOption } from "./weatherQueryOptions";
import { transformForecastResponse } from "@/entities/weather";

/**
 * 좌표 기반 날씨 상세 데이터 훅
 * locationId 없이 좌표만으로 날씨 정보를 가져옴
 */
export const useWeatherDetailByCoordinates = (
  lat: number,
  lon: number,
  locationName?: string
) => {
  const currentWeather = useCurrentWeather(lat, lon, locationName);

  // 좌표로 location 찾기
  const location = createLocationFromCoordinates(lat, lon, locationName);

  const { data: forecast } = useSuspenseQuery({
    ...weatherQueryOption.forecastWeather({ lat, lon }),
    select: (data) => transformForecastResponse(data, lat, lon),
  });

  const { dongName, guName } = parseLocationName(location.label);

  return {
    location,
    currentWeather,
    forecast,
    locationNames: { dongName, guName },
  };
};
