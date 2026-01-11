import { useMemo, useState } from "react";
import { allDistrictsArray, parseDistrictKey } from "@/entities/location";
import { calculateMatchScore, sortByRelevance } from "@/shared/lib/search";

export function useLocationSearch(maxResults = 50) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];

    // 1. 모든 district에서 매칭되는 것 필터링
    const matched = allDistrictsArray
      .filter((key) => {
        const parts = key.split("-");
        // 각 파트 (시/도, 구, 동 등)에서 검색
        return parts.some((part) => {
          const { matched } = calculateMatchScore(part, query);
          return matched;
        });
      })
      .slice(0, maxResults * 2); // 정렬 전에 더 많이 가져옴

    // 2. 파싱
    const items = matched.map(parseDistrictKey);

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
    return sorted.slice(0, maxResults);
  }, [query, maxResults]);

  return {
    query,
    setQuery,
    results,
    hasResults: results.length > 0,
  };
}
