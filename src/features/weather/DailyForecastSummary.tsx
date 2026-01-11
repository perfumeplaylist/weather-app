import { WeatherIcon, type WeatherType } from "./WeatherIcon";
import { Text, Flex } from "@packages/ui";

export interface DailyForecast {
  day: string;
  low: number;
  high: number;
  type: WeatherType;
}

interface DailyForecastSummaryProps {
  forecasts: DailyForecast[];
}

export const DailyForecastSummary = ({
  forecasts,
}: DailyForecastSummaryProps) => {
  return (
    <div className="mt-6 md:mt-0">
      <Text size="sm" weight="semibold" color="muted" className="mb-3 px-1">
        주간 예보
      </Text>
      <div className="flex flex-col gap-1 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-2">
        {forecasts.map((item, index) => (
          <Flex
            key={index}
            align="center"
            justify="between"
            className="py-3 px-2 border-b border-gray-100 last:border-0 md:border-b md:last:border-b-0"
          >
            <Text size="sm" weight="medium" color="default" className="w-12">
              {item.day}
            </Text>
            <div className="flex-1 flex justify-center">
              <WeatherIcon type={item.type} className="w-6 h-6" />
            </div>
            <Flex align="center" gap={4} justify="end" className="w-24">
              <Text size="sm" color="muted">
                {item.low}°
              </Text>
              <div className="w-16 h-1 rounded-full bg-gray-100 overflow-hidden relative">
                <div
                  className="absolute top-0 bottom-0 bg-gradient-to-r from-blue-300 to-orange-300 opacity-60"
                  style={{
                    left: "10%",
                    right: "10%",
                  }}
                />
              </div>
              <Text size="sm" weight="medium" color="default">
                {item.high}°
              </Text>
            </Flex>
          </Flex>
        ))}
      </div>
    </div>
  );
};
