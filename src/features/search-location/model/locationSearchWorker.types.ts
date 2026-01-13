import type {
  DistrictKey,
  SearchLocationItem,
  WeatherLocation,
} from "@/entities/location/types/location.types";

/**
 * 사전 인덱싱된 District 데이터
 * 검색 성능 향상을 위해 미리 계산된 값들을 저장
 */
export interface IndexedDistrict {
  key: DistrictKey;
  parts: string[]; // split 결과를 미리 저장
  flatText: string; // lowercase 검색용 텍스트 (공백 제거)
  chosung: string; // 초성 검색용
}

/**
 * Worker 초기화 메시지
 */
export interface InitMessage {
  type: "INIT";
  data: {
    districts: DistrictKey[];
    weatherLocations: Array<[string, WeatherLocation]>; // Map을 직렬화 가능한 형태로 변환
  };
}

/**
 * Worker 검색 요청 메시지
 */
export interface SearchMessage {
  type: "SEARCH";
  data: {
    query: string;
    maxResults: number;
    requestId: number; // 요청 추적용
  };
}

/**
 * Worker 메시지 유니온 타입
 */
export type WorkerMessage = InitMessage | SearchMessage;

/**
 * Worker 검색 결과 응답 메시지
 */
export interface SearchResultMessage {
  type: "SEARCH_RESULT";
  data: {
    results: SearchLocationItem[];
    requestId: number;
  };
}

/**
 * Worker 응답 메시지 유니온 타입
 */
export type WorkerResponse = SearchResultMessage;
