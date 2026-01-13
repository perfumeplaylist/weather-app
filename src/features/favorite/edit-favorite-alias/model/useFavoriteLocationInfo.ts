import { useFavoriteStore } from "@/entities/favorite";

export const useFavoriteLocationInfo = ({
  locationId,
}: {
  locationId: string;
}) => {
  const isFavorite = useFavoriteStore((state) => state.isFavorite);
  const getAlias = useFavoriteStore((state) => state.getAlias);

  const isCurrentLocationFavorite = isFavorite(locationId);
  const currentLocationAlias = getAlias(locationId)!;

  return {
    isCurrentLocationFavorite,
    currentLocationAlias,
  };
};
