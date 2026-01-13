import BaseErrorBoundary from "../../shared/ui/ErrorBoundary";
import BaseSuspense from "../../shared/ui/Suspense";
import { CurrentLocationWeatherContent } from "@/features/weather-detail";
import { Skeleton } from "../../shared/ui/Skeleton";
import { Card, Text, Flex } from "@packages/ui";
import { AlertTriangle } from "lucide-react";

const CurrentLocationWeatherLoadingSkeleton = () => {
  return <Skeleton height={400} className="rounded-2xl md:aspect-4/5" />;
};

const CurrentLocationWeatherErrorState = ({ error }: { error: Error }) => {
  return (
    <Card variant="elevated" padding="lg" className="mt-4">
      <Flex direction="col" align="center" gap={3} className="text-center">
        <AlertTriangle className="w-8 h-8 text-danger-500" />
        <Flex direction="col" gap={1}>
          <Text size="base" weight="medium" color="default">
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

export const CurrentLocationWeatherWidget = () => {
  return (
    <BaseErrorBoundary FallbackComponent={CurrentLocationWeatherErrorState}>
      <BaseSuspense fallback={<CurrentLocationWeatherLoadingSkeleton />}>
        <CurrentLocationWeatherContent />
      </BaseSuspense>
    </BaseErrorBoundary>
  );
};
