import type { SearchLocationItem, DistrictKey } from "../types/location.types";
import { weatherLocationsMap } from "../api/locationData";

export function parseDistrictKey(key: DistrictKey): SearchLocationItem {
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
