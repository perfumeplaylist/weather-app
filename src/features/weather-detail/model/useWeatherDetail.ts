import { useSuspenseQuery } from "@tanstack/react-query";
import { createLocationFromCoordinates, parseLocationName } from "@/entities/location";
import { weatherQueryOption } from "@/features/weather/query";
import { useCurrentWeather } from "./useCurrentWeather";
import { transformForecastResponse } from "@/entities/weather";

/**
 * 날씨 상세 페이지에 필요한 모든 데이터를 가져오는 훅
 * 현재 날씨와 예보 데이터를 함께 반환
 */
export const useWeatherDetail = (
  lat: number,
  lon: number,
  locationName?: string
) => {
  const currentWeather = useCurrentWeather(lat, lon, locationName);

  // 좌표로 location 찾기
  const location = createLocationFromCoordinates(lat, lon, locationName);

  const { data: forecast } = useSuspenseQuery({
    ...weatherQueryOption.forecastWeather({
      lat,
      lon,
    }),
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
