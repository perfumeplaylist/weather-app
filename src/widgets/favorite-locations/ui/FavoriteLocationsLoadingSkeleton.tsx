import { Skeleton } from "@/shared/ui/Skeleton";

/**
 * 즐겨찾기 위치 목록 로딩 중 표시되는 스켈레톤 컴포넌트
 */
export const FavoriteLocationsLoadingSkeleton = () => {
  return <Skeleton height={400} className="rounded-2xl md:aspect-4/5" />;
};
