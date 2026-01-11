/**
 * 한글 자모 분리 (초성 검색 지원)
 */
export function decomposeHangul(char: string): string[] {
  const HANGUL_BASE = 0xac00;
  const CHO = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  const code = char.charCodeAt(0) - HANGUL_BASE;
  if (code < 0 || code > 11171) return [char];

  const cho = Math.floor(code / 588);
  return [CHO[cho], char];
}

/**
 * 검색어 매칭 점수 계산
 */
export function calculateMatchScore(
  text: string,
  query: string
): { score: number; matched: boolean } {
  if (!query) return { score: 0, matched: true };

  const normalizedText = text.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  // 정확히 일치
  if (normalizedText === normalizedQuery) {
    return { score: 1000, matched: true };
  }

  // 시작 부분 일치
  if (normalizedText.startsWith(normalizedQuery)) {
    return { score: 800, matched: true };
  }

  // 포함
  if (normalizedText.includes(normalizedQuery)) {
    return { score: 500, matched: true };
  }

  // 초성 검색 (예: "ㅅㅇ" -> "서울")
  const chosung = text
    .split("")
    .map((c) => decomposeHangul(c)[0])
    .join("");
  if (chosung.includes(normalizedQuery)) {
    return { score: 300, matched: true };
  }

  return { score: 0, matched: false };
}

/**
 * 검색 결과 정렬 (관련성 기반)
 */
export function sortByRelevance<T>(
  items: T[],
  query: string,
  getText: (item: T) => string
): T[] {
  return items
    .map((item) => ({
      item,
      score: calculateMatchScore(getText(item), query).score,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      // 점수 내림차순
      if (b.score !== a.score) return b.score - a.score;

      // 같은 점수면 짧은 것 우선
      const lenA = getText(a.item).length;
      const lenB = getText(b.item).length;
      return lenA - lenB;
    })
    .map(({ item }) => item);
}
