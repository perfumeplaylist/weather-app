import { useSuspenseQuery } from "@tanstack/react-query";
import BaseErrorBoundary from "../../shared/ui/ErrorBoundary";
import BaseSuspense from "../../shared/ui/Susepse";
import { weatherQueryOption } from "../../entities/weather";
import { CurrentWeatherHero } from "../../features/weather/CurrentWeatherHero";
import { Skeleton } from "../../shared/ui/Skeleton";
import { Card, Text, Flex } from "@packages/ui";
import { AlertTriangle } from "lucide-react";
import { mapWeatherCodeToType } from "../../features/weather/utils/weatherCodeMapper";
import { useGetGeoLocation } from "@/features/getGeolocation";
import { useNavigate } from "react-router";

const CurrentLocationWeatherContent = () => {
  const { data } = useGetGeoLocation();

  const { data: weather } = useSuspenseQuery({
    ...weatherQueryOption.currentWeather({ lat: data.lat, lon: data.lon }),
    select: (data) => {
      return {
        todayForecast: data.daily[0],
        currentWeather: data.current.weather[0],
        weatherType: mapWeatherCodeToType(data.current.weather[0].id),
        locationName: data.locationName || "현재 위치",
        temperature: Math.round(data.current.temp),
        highTemp: Math.round(data.daily[0].temp.max),
        lowTemp: Math.round(data.daily[0].temp.min),
      };
    },
  });

  const navigate = useNavigate();

  return (
    <CurrentWeatherHero
      locationName={weather.locationName}
      temperature={weather.temperature}
      weatherType={weather.weatherType}
      highTemp={weather.highTemp}
      lowTemp={weather.lowTemp}
      onClick={() => {
        navigate(`/detail/current?lat=${data.lat}&lon=${data.lon}`);
      }}
      className="md:h-auto md:aspect-4/5 cursor-pointer hover:shadow-lg transition-shadow"
    />
  );
};

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
