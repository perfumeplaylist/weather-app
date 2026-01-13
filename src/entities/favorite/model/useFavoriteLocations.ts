import { useMemo } from "react";
import { useFavoriteStore } from "./favoriteStore";
import { getLocationById, createLocationFromCoordinates } from "../../location";
import type { FavoriteLocation } from "./favoriteTypes";

export const useFavoriteLocations = () => {
  const favoriteIds = useFavoriteStore((state) => state.ids);
  const getAlias = useFavoriteStore((state) => state.getAlias);
  const getCoordinates = useFavoriteStore((state) => state.getCoordinates);

  const locations = useMemo<FavoriteLocation[]>(() => {
    return favoriteIds
      .map((id) => {
        // 저장된 좌표가 있으면 사용, 없으면 getLocationById로 조회
        const savedCoordinates = getCoordinates(id);

        let location;
        if (savedCoordinates) {
          location = createLocationFromCoordinates(
            savedCoordinates.lat,
            savedCoordinates.lon
          );
        } else {
          try {
            location = getLocationById(id);
          } catch {
            return null;
          }
        }

        return {
          id: location.id,
          locationLabel: location.label,
          lat: location.lat,
          lon: location.lon,
          hasValidCoordinates: location.lat !== 0 && location.lon !== 0,
        };
      })
      .filter((loc): loc is FavoriteLocation => loc !== null);
  }, [favoriteIds, getCoordinates]);

  return {
    locations,
    getAlias,
    isEmpty: locations.length === 0,
    validLocations: locations.filter((loc) => loc.hasValidCoordinates),
  };
};
