import { useCallback, useEffect, useRef, useState } from "react";
import { allDistrictsArray, weatherLocationsMap } from "@/entities/location";
import type { SearchLocationItem } from "@/entities/location/types/location.types";
import type {
  SearchMessage,
  SearchResultMessage,
  InitMessage,
} from "./locationSearchWorker.types";

// Vite의 Worker import 방식 사용 (프로덕션 빌드에서 올바르게 처리됨)
import LocationSearchWorker from "./locationSearchWorker.worker.ts?worker";

/**
 * 지역 검색 훅
 * Web Worker를 사용하여 메인 스레드 블로킹 없이 검색 수행
 *
 * @param maxResults 최대 검색 결과 수 (기본값: 50)
 * @returns 검색 쿼리, 결과, 상태 관리 함수
 */
export function useLocationSearch(maxResults = 50) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchLocationItem[]>([]);
  const workerRef = useRef<Worker | null>(null);
  const requestIdRef = useRef(0);
  const initializedRef = useRef(false);

  /**
   * Worker 메시지 핸들러
   * 검색 결과를 받아서 state 업데이트
   */
  const handleWorkerMessage = useCallback(
    (event: MessageEvent<SearchResultMessage>) => {
      const {
        data: { results: searchResults, requestId },
      } = event.data;

      // 오래된 요청 결과는 무시 (race condition 방지)
      if (requestId === requestIdRef.current) {
        setResults(searchResults);
      }
    },
    []
  );

  /**
   * Worker 에러 핸들러
   */
  const handleWorkerError = useCallback((error: ErrorEvent) => {
    console.error("LocationSearchWorker error:", error);
    setResults([]);
  }, []);

  /**
   * Worker 초기화
   * 컴포넌트 마운트 시 한 번만 실행
   */
  useEffect(() => {
    // Worker 생성 - import한 Worker 클래스 사용
    const worker = new LocationSearchWorker();
    workerRef.current = worker;

    // 이벤트 핸들러 등록
    worker.onmessage = handleWorkerMessage;
    worker.onerror = handleWorkerError;

    // 초기화 메시지 전송
    const initMessage: InitMessage = {
      type: "INIT",
      data: {
        districts: allDistrictsArray,
        weatherLocations: Array.from(weatherLocationsMap.entries()),
      },
    };

    worker.postMessage(initMessage);
    initializedRef.current = true;

    // Cleanup: 컴포넌트 언마운트 시 Worker 종료
    return () => {
      worker.onmessage = null;
      worker.onerror = null;
      worker.terminate();
      workerRef.current = null;
      initializedRef.current = false;
    };
  }, [handleWorkerMessage, handleWorkerError]);

  /**
   * 검색 요청
   * query 변경 시 Worker에 검색 요청 전송
   */
  useEffect(() => {
    // Worker가 초기화되지 않았으면 스킵
    if (!initializedRef.current || !workerRef.current) {
      return;
    }

    // query가 빈 문자열이면 즉시 빈 배열 반환 (Worker 호출 불필요)
    if (!query.trim()) {
      return;
    }

    // requestId 증가하여 요청 추적
    requestIdRef.current += 1;
    const currentRequestId = requestIdRef.current;

    // 검색 메시지 전송
    const searchMessage: SearchMessage = {
      type: "SEARCH",
      data: {
        query,
        maxResults,
        requestId: currentRequestId,
      },
    };

    workerRef.current.postMessage(searchMessage);
  }, [query, maxResults]);

  return {
    query,
    setQuery,
    results,
    hasResults: results.length > 0,
  };
}
