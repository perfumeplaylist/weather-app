import { useParams } from "react-router";
import { WeatherMobileHeader } from "./WeatherMobileHeader";
import { WeatherDesktopHeader } from "./WeatherDesktopHeader";
import { BaseErrorBoundary, EmptyState } from "@/shared";

export const WeatherDetailHeader = () => {
  const { locationId } = useParams();

  if (!locationId) {
    return <EmptyState title="위치 정보를 불러올 수 없습니다." />;
  }

  return (
    <BaseErrorBoundary
      FallbackComponent={({ error }) => (
        <EmptyState
          title="위치 정보를 불러올 수 없습니다."
          description={error.message}
        />
      )}
    >
      <WeatherMobileHeader locationId={locationId} />
      <WeatherDesktopHeader locationId={locationId} />
    </BaseErrorBoundary>
  );
};
