import type { WeatherLocation } from "@/entities/location/types/location.types";
import type {
  IndexedDistrict,
  InitMessage,
  SearchMessage,
  SearchResultMessage,
  WorkerMessage,
} from "./locationSearchWorker.types";
import { sortByRelevance, decomposeHangul } from "@/shared/lib/search";
import { parseDistrictKeyWithMap } from "@/entities/location/model/locationParser";

/**
 * 초성 추출 (사전 인덱싱용)
 */
function extractChosung(text: string): string {
  return text
    .split("")
    .map((c) => decomposeHangul(c)[0])
    .join("");
}

/**
 * Worker 내부 상태
 */
let indexedDistricts: IndexedDistrict[] | null = null;
let weatherLocationsMap: Map<string, WeatherLocation> | null = null;

/**
 * 초기화 핸들러
 */
function handleInit(message: InitMessage) {
  const { districts, weatherLocations } = message.data;

  // weatherLocations 배열을 Map으로 변환
  weatherLocationsMap = new Map(weatherLocations);

  // 사전 인덱싱: 모든 district를 IndexedDistrict로 변환
  indexedDistricts = districts.map((key) => {
    const parts = key.split("-");
    const flatText = key.toLowerCase().replace(/-/g, "");
    const chosung = extractChosung(key);

    return {
      key,
      parts,
      flatText,
      chosung,
    };
  });
}

/**
 * 검색 핸들러
 */
function handleSearch(message: SearchMessage): SearchResultMessage {
  const { query, maxResults, requestId } = message.data;

  if (!indexedDistricts || !weatherLocationsMap) {
    return {
      type: "SEARCH_RESULT",
      data: {
        results: [],
        requestId,
      },
    };
  }

  if (!query.trim()) {
    return {
      type: "SEARCH_RESULT",
      data: {
        results: [],
        requestId,
      },
    };
  }

  const normalizedQuery = query.toLowerCase();

  // 1. 사전 인덱싱된 데이터에서 빠른 필터링
  const matched = indexedDistricts
    .filter((indexed) => {
      // flatText나 chosung에서 검색
      return (
        indexed.flatText.includes(normalizedQuery) ||
        indexed.chosung.includes(normalizedQuery)
      );
    })
    .slice(0, maxResults * 2); // 정렬 전에 더 많이 가져옴

  // 2. 파싱
  const items = matched.map((indexed) =>
    parseDistrictKeyWithMap(indexed.key, weatherLocationsMap!)
  );

  // 3. 관련성 기반 정렬
  const sorted = sortByRelevance(items, query, (item) => {
    // 가장 구체적인 레벨을 검색 대상으로
    return (
      item.parts.detail ||
      item.parts.district ||
      item.parts.city ||
      item.parts.province ||
      ""
    );
  });

  // 4. 최대 결과 수 제한
  const results = sorted.slice(0, maxResults);

  return {
    type: "SEARCH_RESULT",
    data: {
      results,
      requestId,
    },
  };
}

/**
 * Worker 메시지 핸들러
 */
self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  try {
    const message = event.data;

    switch (message.type) {
      case "INIT":
        handleInit(message);
        break;

      case "SEARCH": {
        const response = handleSearch(message);
        self.postMessage(response);
        break;
      }

      default:
        console.warn("Unknown message type:", message);
    }
  } catch (error) {
    console.error("Worker error:", error);
    // 에러 발생 시 빈 결과 반환
    if (event.data.type === "SEARCH") {
      self.postMessage({
        type: "SEARCH_RESULT",
        data: {
          results: [],
          requestId: event.data.data.requestId,
        },
      });
    }
  }
};
