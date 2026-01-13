// Types
export type {
  FavoriteLocationId,
  FavoriteState,
  FavoriteLocation,
  SavedLocationData,
} from "./model/favoriteTypes";

// Model (Public API) - 기존 서비스 함수들은 하위 호환성을 위해 유지
export {
  getFavoritesState,
  getFavoriteIds,
  isFavorite,
  addFavorite,
  removeFavorite,
  toggleFavorite,
  setFavoriteAlias,
  clearFavoriteAlias,
  getFavoriteAlias,
  clearAllFavorites,
} from "./model/favoriteService";

// Zustand Store
export { useFavoriteStore } from "./model/favoriteStore";

// Hooks
export { useFavoriteLocations } from "./model/useFavoriteLocations";

// Lib
export { mapToSavedLocation } from "./lib/mapToSavedLocation";
