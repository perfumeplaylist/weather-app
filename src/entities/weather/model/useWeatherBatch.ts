import { useSuspenseQueries } from "@tanstack/react-query";
import { weatherQueryOption } from "./queryOption";
import type { FavoriteLocation } from "@/entities/favorite/model/favoriteTypes";

export const useWeatherBatch = (locations: FavoriteLocation[]) => {
  const weatherQueries = useSuspenseQueries({
    queries: locations.map((loc) =>
      weatherQueryOption.currentWeather({ lat: loc.lat, lon: loc.lon })
    ),
  });

  return {
    weatherQueries,
    getWeatherByLocation: (locationId: string) => {
      const index = locations.findIndex((loc) => loc.id === locationId);
      return index >= 0 ? weatherQueries[index].data : null;
    },
  };
};

