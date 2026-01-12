import { queryOptions } from "@tanstack/react-query";
import { weatherQueryKeyFactory } from "./queryKeyFactory";
import { getForecast, getWeather } from "../api/weatherApi";

/**
 * Weather Query Options
 * queryOptions() 사용, API 레이어 함수만 호출
 */
export const weatherQueryOption = {
  currentWeather: ({ lat, lon }: { lat: number; lon: number }) =>
    queryOptions({
      queryKey: weatherQueryKeyFactory.current({ lat, lon }),
      queryFn: () => getWeather(lat, lon),
    }),
  forecastWeather: ({ lat, lon }: { lat: number; lon: number }) =>
    queryOptions({
      queryKey: weatherQueryKeyFactory.forecast({ lat, lon }),
      queryFn: () => getForecast(lat, lon),
    }),
};
