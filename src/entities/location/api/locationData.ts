import weatherLocationsData from "../../../../data/location_coordinates.filled.json";
import allDistrictsData from "../../../../data/korea_districts.json";
import type { WeatherLocation, DistrictKey } from "../types/location.types";

// 날씨 정보 있는 location (189개)
export const weatherLocationsMap = new Map<string, WeatherLocation>(
  (weatherLocationsData.locations as WeatherLocation[]).map((loc) => [loc.id, loc])
);

// 전체 행정구역 (20,558개)
export const allDistrictsArray: DistrictKey[] = allDistrictsData as DistrictKey[];

// 검색 최적화: 레벨별 인덱스
export const districtsByLevel = {
  1: allDistrictsArray.filter((k) => k.split("-").length === 1),
  2: allDistrictsArray.filter((k) => k.split("-").length === 2),
  3: allDistrictsArray.filter((k) => k.split("-").length === 3),
  4: allDistrictsArray.filter((k) => k.split("-").length === 4),
};
