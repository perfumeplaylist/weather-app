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

/**
 * 좌표로 가장 가까운 Location 조회
 * 정확히 일치하는 좌표를 가진 location을 찾거나, 가장 가까운 location 반환
 */
export function getLocationByCoordinates(
  lat: number,
  lon: number
): LocationEntity | null {
  const locations = getAllLocations();
  const validLocations = locations.filter(
    (loc) => loc.lat !== 0 && loc.lon !== 0
  );

  // 정확히 일치하는 좌표 찾기 (소수점 4자리까지 비교)
  const exactMatch = validLocations.find(
    (loc) =>
      Math.abs(loc.lat - lat) < 0.0001 && Math.abs(loc.lon - lon) < 0.0001
  );
  if (exactMatch) return exactMatch;

  // 가장 가까운 location 찾기 (유클리드 거리 사용)
  let closest: LocationEntity | null = null;
  let minDistance = Infinity;

  for (const loc of validLocations) {
    const distance = Math.sqrt(
      Math.pow(loc.lat - lat, 2) + Math.pow(loc.lon - lon, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closest = loc;
    }
  }

  return closest;
}

/**
 * 좌표만으로 LocationEntity 형태의 정보 생성
 * locationId가 없는 경우 사용
 */
export function createLocationFromCoordinates(
  lat: number,
  lon: number,
  label?: string
): LocationEntity {
  const found = getLocationByCoordinates(lat, lon);

  if (found) {
    return found;
  }

  // 찾지 못한 경우 새로 생성
  return {
    id: `coords-${lat}-${lon}`,
    label: label || "현재 위치",
    tokens: label ? label.split(" ") : [],
    lat,
    lon,
  };
}
