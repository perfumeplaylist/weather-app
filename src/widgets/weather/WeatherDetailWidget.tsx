import { useParams } from "react-router";
import BaseErrorBoundary from "../../shared/ui/ErrorBoundary";
import BaseSuspense from "../../shared/ui/Suspense";
import { WeatherDetailContent } from "@/features/weather-detail";
import { Skeleton } from "../../shared/ui/Skeleton";
import { Text, Card } from "@packages/ui";
import { AlertTriangle } from "lucide-react";
import { Flex } from "@packages/ui";

const WeatherDetailLoadingSkeleton = () => {
  return (
    <div className="px-4 pb-10 md:p-8 md:grid md:grid-cols-2 md:gap-8">
      <div className="py-4 space-y-4">
        <Skeleton height={300} className="rounded-2xl" />
        <Skeleton height={60} className="rounded-lg" />
      </div>
      <div className="space-y-6">
        <Skeleton height={200} className="rounded-lg" />
        <Skeleton height={300} className="rounded-lg" />
      </div>
    </div>
  );
};

const WeatherDetailErrorState = ({ error }: { error: Error }) => {
  return (
    <Card
      variant="elevated"
      padding="lg"
      rounded="xl"
      className="max-w-md mx-auto mt-8"
    >
      <Flex direction="col" align="center" gap={4} className="text-center">
        <AlertTriangle className="w-12 h-12 text-danger-500" />
        <Flex direction="col" gap={2}>
          <Text size="lg" weight="bold" color="default">
            날씨 정보를 불러올 수 없습니다
          </Text>
          <Text size="sm" color="muted">
            {error.message || "잠시 후 다시 시도해주세요."}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export const WeatherDetailWidget = () => {
  const { locationId } = useParams<{ locationId: string }>();

  if (!locationId) {
    return (
      <Card variant="elevated" padding="lg" className="mt-8">
        <Text color="muted">Location ID가 필요합니다.</Text>
      </Card>
    );
  }

  return (
    <BaseErrorBoundary
      FallbackComponent={WeatherDetailErrorState}
      resetKey={[locationId]}
    >
      <BaseSuspense fallback={<WeatherDetailLoadingSkeleton />}>
        <WeatherDetailContent locationId={locationId} />
      </BaseSuspense>
    </BaseErrorBoundary>
  );
};
