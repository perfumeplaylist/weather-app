import type { FavoriteState, FavoriteLocationId } from "./favoriteTypes";

const STORAGE_KEY_IDS = "favoriteLocations:v1";
const STORAGE_KEY_ALIASES = "favoriteLocationAliases:v1";

/**
 * localStorage에서 favorites IDs 읽기
 */
export function loadFavoriteIds(): FavoriteLocationId[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_IDS);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * localStorage에 favorites IDs 저장
 */
export function saveFavoriteIds(ids: FavoriteLocationId[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_IDS, JSON.stringify(ids));
  } catch (error) {
    console.error("Failed to save favorite IDs:", error);
  }
}

/**
 * localStorage에서 aliases 읽기
 */
export function loadFavoriteAliases(): Record<
  FavoriteLocationId,
  string | undefined
> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_ALIASES);
    if (!stored) return {};
    const parsed = JSON.parse(stored);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * localStorage에 aliases 저장
 */
export function saveFavoriteAliases(
  aliases: Record<FavoriteLocationId, string | undefined>
): void {
  try {
    localStorage.setItem(STORAGE_KEY_ALIASES, JSON.stringify(aliases));
  } catch (error) {
    console.error("Failed to save favorite aliases:", error);
  }
}
