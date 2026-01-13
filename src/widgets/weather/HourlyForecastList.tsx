import { WeatherIcon } from "@/entities/weather/ui/WeatherIcon";
import { Card, Text } from "@packages/ui";
import type { WeatherForecast } from "@/entities/weather/model/schema";
import { mapWeatherCodeToType } from "./utils/weatherCodeMapper";

interface HourlyForecastListProps {
  forecast: WeatherForecast;
}

export const HourlyForecastList = ({ forecast }: HourlyForecastListProps) => {
  // 시간대별 예보 (최대 24시간)
  const hours = forecast.hourly.slice(0, 24);

  if (hours.length === 0) {
    return null;
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return `${date.getHours().toString().padStart(2, "0")}:00`;
  };

  return (
    <div className="w-full">
      <Text size="sm" weight="semibold" color="muted" className="mb-3 px-1">
        시간대별 예보
      </Text>
      <div className="flex overflow-x-auto gap-3 pb-4 -mx-4 px-4 scrollbar-hide">
        {hours.map((hour, index) => {
          const weatherType = mapWeatherCodeToType(hour.weather[0].id);
          return (
            <Card
              key={index}
              variant="ghost"
              padding="md"
              rounded="lg"
              className="flex-none w-16 flex flex-col items-center gap-2 bg-gray-50/50"
            >
              <Text size="xs" color="muted">
                {formatTime(hour.dt)}
              </Text>
              <WeatherIcon type={weatherType} className="w-6 h-6" />
              <Text size="sm" weight="semibold">
                {Math.round(hour.temp)}°
              </Text>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
