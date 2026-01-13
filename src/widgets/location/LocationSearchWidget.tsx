import BaseErrorBoundary from "../../shared/ui/ErrorBoundary";
import { LocationSearchBar } from "../../features/search-location/ui/LocationSearchBar";
import { Text, Card } from "@packages/ui";
import { BaseSuspense, Skeleton } from "@/shared";

const LocationSearchErrorState = ({ error }: { error: Error }) => {
  return (
    <Card variant="elevated" padding="lg" className="mt-4">
      <Text color="danger" size="sm">
        검색 중 문제가 발생했습니다: {error.message}
      </Text>
    </Card>
  );
};

const LocationSearchLoadingSkeleton = () => {
  return <Skeleton height={400} className="rounded-2xl md:aspect-4/5" />;
};

export const LocationSearchWidget = () => {
  return (
    <BaseErrorBoundary FallbackComponent={LocationSearchErrorState}>
      <BaseSuspense fallback={<LocationSearchLoadingSkeleton />}>
        <LocationSearchBar />
      </BaseSuspense>
    </BaseErrorBoundary>
  );
};
