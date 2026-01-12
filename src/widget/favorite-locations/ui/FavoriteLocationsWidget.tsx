import BaseErrorBoundary from "@/shared/ui/ErrorBoundary";
import BaseSuspense from "@/shared/ui/Susepse";
import { CountAddFavorite } from "@/features/favorite/ui/CountAddFavorite";
import { FavoriteLocationsContent } from "./FavoriteLocationsContent";
import { FavoriteLocationsErrorState } from "./FavoriteLocationsErrorState";
import { FavoriteLocationsLoadingSkeleton } from "./FavoriteLocationsLoadingSkeleton";

/**
 * 즐겨찾기 위치 목록 위젯
 * ErrorBoundary와 Suspense로 감싸서 경계 처리
 * 외부에 노출되는 Public API
 */
export const FavoriteLocationsWidget = () => {
  return (
    <BaseErrorBoundary FallbackComponent={FavoriteLocationsErrorState}>
      <CountAddFavorite />
      <BaseSuspense fallback={<FavoriteLocationsLoadingSkeleton />}>
        <FavoriteLocationsContent />
      </BaseSuspense>
    </BaseErrorBoundary>
  );
};

