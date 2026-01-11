// 날씨 API용 Location (location_coordinates.filled.json)
export interface WeatherLocation {
  id: string; // "서울특별시-종로구"
  city: string; // "서울특별시"
  district: string; // "종로구"
  fullName: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  apiName?: string;
  country?: string;
}

// 검색용 District (korea_districts.json)
export type DistrictKey = string; // "서울특별시-종로구-청운동"

// 검색 결과 아이템
export interface SearchLocationItem {
  key: DistrictKey;
  level: 1 | 2 | 3 | 4; // 1=시/도, 2=시/군/구, 3=읍/면/동, 4=리
  parts: {
    province?: string; // "서울특별시"
    city?: string; // "종로구"
    district?: string; // "청운동"
    detail?: string; // "리" 레벨
  };
  displayName: string; // "서울특별시 종로구 청운동"
  weatherLocation?: WeatherLocation; // 날씨 정보 있는 경우만
}
