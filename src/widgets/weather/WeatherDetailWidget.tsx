import { WeatherDetailContent } from "@/features/weather-detail";
import { AlertTriangle } from "lucide-react";
import { Flex, Text } from "@packages/ui";
import {
  EmptyState,
  BaseErrorBoundary,
  BaseSuspense,
  Skeleton,
} from "@/shared";
import { useLocationParams } from "@/features/search-location";

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
    <Flex direction="col" align="center" gap={4} className="text-center">
      <AlertTriangle className="w-12 h-12 text-danger-500" />
      <Flex direction="col" gap={2} align="center">
        <Text size="lg" weight="bold" color="default">
          날씨 정보를 불러올 수 없습니다
        </Text>
        <Text size="sm" color="muted">
          {error.message || "잠시 후 다시 시도해주세요."}
        </Text>
      </Flex>
    </Flex>
  );
};

export const WeatherDetailWidget = () => {
  const { lat, lon } = useLocationParams();

  if (!lat || !lon || Number(lat) === 0 || Number(lon) === 0) {
    return <EmptyState title="위치 정보를 불러올 수 없습니다." />;
  }

  return (
    <BaseErrorBoundary
      FallbackComponent={WeatherDetailErrorState}
      resetKey={[lat, lon]}
    >
      <BaseSuspense fallback={<WeatherDetailLoadingSkeleton />}>
        <WeatherDetailContent lat={parseFloat(lat)} lon={parseFloat(lon)} />
      </BaseSuspense>
    </BaseErrorBoundary>
  );
};
