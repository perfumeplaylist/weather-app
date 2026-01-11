import type { SearchLocationItem } from "../../../entities/location";

/**
 * 검색 결과 표시 텍스트 생성
 */
export function formatLocationDisplay(item: SearchLocationItem): {
  primary: string;
  secondary?: string;
  hasWeather: boolean;
} {
  const { parts, level, weatherLocation } = item;

  if (level === 1) {
    return {
      primary: parts.province!,
      secondary: undefined,
      hasWeather: false,
    };
  }

  if (level === 2) {
    return {
      primary: parts.city!,
      secondary: parts.province,
      hasWeather: !!weatherLocation,
    };
  }

  if (level === 3) {
    return {
      primary: parts.district!,
      secondary: `${parts.province} ${parts.city}`,
      hasWeather: !!weatherLocation,
    };
  }

  // level 4
  return {
    primary: parts.detail!,
    secondary: `${parts.province} ${parts.city} ${parts.district}`,
    hasWeather: !!weatherLocation,
  };
}

/**
 * 검색어 하이라이트
 */
export function highlightMatch(text: string, query: string): string {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}
