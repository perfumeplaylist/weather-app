import { useSuspenseQuery } from "@tanstack/react-query";
import { getLocationById, parseLocationName } from "@/entities/location";
import { weatherQueryOption } from "@/features/weather/query";
import { useCurrentWeather } from "./useCurrentWeather";
import { transformForecastResponse } from "@/entities/weather";

/**
 * 날씨 상세 페이지에 필요한 모든 데이터를 가져오는 훅
 * 현재 날씨와 예보 데이터를 함께 반환
 */
export const useWeatherDetail = (locationId: string) => {
  const location = getLocationById(locationId);

  const currentWeather = useCurrentWeather(
    location.lat,
    location.lon,
    location.label
  );

  const { data: forecast } = useSuspenseQuery({
    ...weatherQueryOption.forecastWeather({
      lat: location.lat,
      lon: location.lon,
    }),
    select: (data) => transformForecastResponse(data, location),
  });

  const { dongName, guName } = parseLocationName(location.label);

  return {
    location,
    currentWeather,
    forecast,
    locationNames: { dongName, guName },
  };
};
