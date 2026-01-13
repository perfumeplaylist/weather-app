import { useSuspenseQuery } from "@tanstack/react-query";
import { weatherQueryOption } from "@/features/weather/query";
import { transformCurrentWeather } from "@/entities/weather";

/**
 * 현재 날씨 데이터를 가져오는 공통 훅
 * WeatherDetailWidget과 CurrentLocationWeatherWidget에서 공통 사용
 */
export const useCurrentWeather = (
  lat: number,
  lon: number,
  defaultLocationName?: string
) => {
  const { data } = useSuspenseQuery({
    ...weatherQueryOption.currentWeather({ lat, lon }),
    select: (data) => transformCurrentWeather(data, defaultLocationName),
  });

  return data;
};
