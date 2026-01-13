import { WeatherMobileHeader } from "./WeatherMobileHeader";
import { WeatherDesktopHeader } from "./WeatherDesktopHeader";
import { BaseErrorBoundary, EmptyState } from "@/shared";
import { useLocationParams } from "@/features/search-location";

export const WeatherDetailHeader = () => {
  const { lat, lon } = useLocationParams();

  if (Number(lat) === 0 || Number(lon) === 0 || !lat || !lon) {
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
      <WeatherMobileHeader lat={parseFloat(lat)} lon={parseFloat(lon)} />
      <WeatherDesktopHeader lat={parseFloat(lat)} lon={parseFloat(lon)} />
    </BaseErrorBoundary>
  );
};
