import { allDistrictsArray } from "../api/locationData";
import { parseDistrictKeyToEntity } from "./locationParser";
import type { LocationEntity } from "../types/location.types";
import { calculateMatchScore, sortByRelevance } from "@/shared/lib/search";

// 모든 Location을 메모이제이션하여 캐싱
let allLocationsCache: LocationEntity[] | null = null;

/**
 * 모든 Location을 반환 (최초 호출 시 파싱하여 캐싱)
 */
export function getAllLocations(): LocationEntity[] {
  if (allLocationsCache === null) {
    allLocationsCache = allDistrictsArray.map(parseDistrictKeyToEntity);
  }
  return allLocationsCache;
}

/**
 * ID로 Location 조회
 */
export function getLocationById(id: string): LocationEntity {
  const locations = getAllLocations();
  const location = locations.find((loc) => loc.id === id);
  if (!location) {
    throw new Error(`Location not found: ${id}`);
  }
  if (location.lat === 0 || location.lon === 0) {
    throw new Error(`Location coordinates not available: ${id}`);
  }
  return location;
}

/**
 * 검색어로 Location 검색
 */
export function searchLocations(
  query: string,
  maxResults = 50
): LocationEntity[] {
  if (!query.trim()) return [];

  const locations = getAllLocations();

  // 1. 토큰 기반 매칭 필터링
  const matched = locations.filter((loc) => {
    // 각 토큰에서 검색어와 매칭되는지 확인
    return loc.tokens.some((token) => {
      const { matched } = calculateMatchScore(token, query);
      return matched;
    });
  });

  // 2. 관련성 기반 정렬
  const sorted = sortByRelevance(matched, query, (loc) => {
    // label 전체를 검색 대상으로 사용
    return loc.label;
  });

  // 3. 최대 결과 수 제한
  return sorted.slice(0, maxResults);
}
