import { useMemo } from "react";
import { useFavoriteStore } from "./favoriteStore";
import { getLocationById } from "../../location";
import type { FavoriteLocation } from "./favoriteTypes";

export const useFavoriteLocations = () => {
  const favoriteIds = useFavoriteStore((state) => state.ids);
  const getAlias = useFavoriteStore((state) => state.getAlias);

  const locations = useMemo<FavoriteLocation[]>(() => {
    return favoriteIds
      .map((id) => {
        const location = getLocationById(id);
        if (!location) return null;

        return {
          id: location.id,
          locationLabel: location.label,
          lat: location.lat,
          lon: location.lon,
          hasValidCoordinates: location.lat !== 0 && location.lon !== 0,
        };
      })
      .filter((loc): loc is FavoriteLocation => loc !== null);
  }, [favoriteIds]);

  return {
    locations,
    getAlias,
    isEmpty: locations.length === 0,
    validLocations: locations.filter((loc) => loc.hasValidCoordinates),
  };
};
