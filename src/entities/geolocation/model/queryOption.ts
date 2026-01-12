import { queryOptions } from "@tanstack/react-query";
import { geolocationQueryKeyFactory, getCurrentPosition } from "../";
/**
 * Geolocation Query Options
 * queryOptions() 사용, API 레이어 함수만 호출
 * 캐싱은 무한히 유지 (gcTime: Infinity)
 */
export const geolocationQueryOption = {
  current: () =>
    queryOptions({
      queryKey: geolocationQueryKeyFactory.current(),
      queryFn: getCurrentPosition,
      staleTime: Infinity, // 데이터가 절대 stale 되지 않음
      gcTime: Infinity, // 캐시를 무한히 유지
      retry: false, // geolocation은 재시도 불필요
    }),
};
