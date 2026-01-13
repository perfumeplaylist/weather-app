import type { FavoriteState, FavoriteLocationId } from "./favoriteTypes";
import {
  loadFavoriteIds,
  saveFavoriteIds,
  loadFavoriteAliases,
  saveFavoriteAliases,
} from "./favoriteStorage";

const MAX_FAVORITES = 6;

/**
 * 전체 favorites state 조회
 */
export function getFavoritesState(): FavoriteState {
  return {
    ids: loadFavoriteIds(),
    aliases: loadFavoriteAliases(),
  };
}

/**
 * Favorite IDs 조회
 */
export function getFavoriteIds(): FavoriteLocationId[] {
  return loadFavoriteIds();
}

/**
 * 특정 ID가 favorite인지 확인
 */
export function isFavorite(id: FavoriteLocationId): boolean {
  const ids = loadFavoriteIds();
  return ids.includes(id);
}

/**
 * Favorite 추가
 * @returns true: 성공, false: 실패 (이미 존재하거나 최대 개수 초과)
 */
export function addFavorite(id: FavoriteLocationId): boolean {
  const ids = loadFavoriteIds();

  // 이미 존재하면 false
  if (ids.includes(id)) return false;

  // 최대 개수 체크
  if (ids.length >= MAX_FAVORITES) {
    // 토스트 메시지는 호출하는 쪽에서 처리
    return false;
  }

  // 추가
  const newIds = [...ids, id];
  saveFavoriteIds(newIds);
  return true;
}

/**
 * Favorite 제거
 */
export function removeFavorite(id: FavoriteLocationId): boolean {
  const ids = loadFavoriteIds();

  if (!ids.includes(id)) return false;

  const newIds = ids.filter((fid) => fid !== id);
  saveFavoriteIds(newIds);

  // alias도 제거
  const aliases = loadFavoriteAliases();
  if (aliases[id] !== undefined) {
    const newAliases = { ...aliases };
    delete newAliases[id];
    saveFavoriteAliases(newAliases);
  }

  return true;
}

/**
 * 모든 Favorite 제거
 */
export function clearAllFavorites(): void {
  saveFavoriteIds([]);
  saveFavoriteAliases({});
}

/**
 * Favorite 토글
 * @returns true: 성공, false: 실패 (최대 개수 초과 시)
 */
export function toggleFavorite(id: FavoriteLocationId): boolean {
  if (isFavorite(id)) {
    return removeFavorite(id);
  } else {
    return addFavorite(id);
  }
}

/**
 * Favorite alias 설정
 * 빈 문자열이나 공백만 있으면 alias 제거
 */
export function setFavoriteAlias(id: FavoriteLocationId, alias: string): void {
  if (!isFavorite(id)) {
    throw new Error(`Location ${id} is not in favorites`);
  }

  const aliases = loadFavoriteAliases();
  const trimmedAlias = alias.trim();

  if (trimmedAlias === "") {
    // 빈 문자열이면 alias 제거
    const newAliases = { ...aliases };
    delete newAliases[id];
    saveFavoriteAliases(newAliases);
  } else {
    // alias 설정 (1~20자 제한은 UI에서 처리)
    saveFavoriteAliases({
      ...aliases,
      [id]: trimmedAlias,
    });
  }
}

/**
 * Favorite alias 제거
 */
export function clearFavoriteAlias(id: FavoriteLocationId): void {
  if (!isFavorite(id)) {
    throw new Error(`Location ${id} is not in favorites`);
  }

  const aliases = loadFavoriteAliases();
  if (aliases[id] !== undefined) {
    const newAliases = { ...aliases };
    delete newAliases[id];
    saveFavoriteAliases(newAliases);
  }
}

/**
 * Favorite alias 조회
 */
export function getFavoriteAlias(id: FavoriteLocationId): string | undefined {
  const aliases = loadFavoriteAliases();
  return aliases[id];
}
