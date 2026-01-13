import type {
  SearchLocationItem,
  DistrictKey,
  LocationEntity,
  WeatherLocation,
} from "../types/location.types";
import { weatherLocationsMap } from "../api/locationData";

/**
 * DistrictKey를 SearchLocationItem으로 변환 (weatherLocationsMap을 파라미터로 받음)
 * Worker나 다른 컨텍스트에서 사용할 수 있도록 Map을 파라미터로 받음
 */
export function parseDistrictKeyWithMap(
  key: DistrictKey,
  weatherLocationsMap: Map<string, WeatherLocation>
): SearchLocationItem {
  const parts = key.split("-");
  const level = parts.length as 1 | 2 | 3 | 4;

  const item: SearchLocationItem = {
    key,
    level,
    parts: {
      province: parts[0],
      city: parts[1],
      district: parts[2],
      detail: parts[3],
    },
    displayName: parts.join(" "),
    weatherLocation: undefined,
  };

  // 날씨 정보 매칭 (시/군/구 레벨)
  if (level >= 2) {
    const weatherKey = `${parts[0]}-${parts[1]}`;
    item.weatherLocation = weatherLocationsMap.get(weatherKey);
  }

  return item;
}

/**
 * DistrictKey를 SearchLocationItem으로 변환
 * 기본 weatherLocationsMap을 사용
 */
export function parseDistrictKey(key: DistrictKey): SearchLocationItem {
  return parseDistrictKeyWithMap(key, weatherLocationsMap);
}

/**
 * DistrictKey를 LocationEntity로 변환
 * 좌표는 weatherLocationsMap에서 매칭 (시/군/구 레벨)
 */
export function parseDistrictKeyToEntity(key: DistrictKey): LocationEntity {
  const parts = key.split("-");
  const label = parts.join(" ");
  const tokens = parts.filter((p) => p !== "");

  // 좌표 매칭: 시/군/구 레벨 (level >= 2)에서 weatherLocation 찾기
  let lat = 0;
  let lon = 0;

  if (parts.length >= 2) {
    const weatherKey = `${parts[0]}-${parts[1]}`;
    const weatherLocation = weatherLocationsMap.get(weatherKey);
    if (weatherLocation) {
      lat = weatherLocation.coordinates.lat;
      lon = weatherLocation.coordinates.lon;
    }
  }

  return {
    id: key,
    label,
    tokens,
    lat,
    lon,
  };
}
