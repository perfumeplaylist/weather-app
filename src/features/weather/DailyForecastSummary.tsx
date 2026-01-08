import { WeatherIcon, type WeatherType } from "./WeatherIcon";

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
      <h3 className="text-sm font-semibold text-gray-500 mb-3 px-1">
        주간 예보
      </h3>
      <div className="flex flex-col gap-1 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-2">
        {forecasts.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 px-2 border-b border-gray-100 last:border-0 md:border-b md:last:border-b-0"
          >
            <span className="w-12 text-sm font-medium text-gray-700">
              {item.day}
            </span>
            <div className="flex-1 flex justify-center">
              <WeatherIcon type={item.type} className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-4 w-24 justify-end text-sm">
              <span className="text-gray-400">{item.low}°</span>
              <div className="w-16 h-1 rounded-full bg-gray-100 overflow-hidden relative">
                <div
                  className="absolute top-0 bottom-0 bg-gradient-to-r from-blue-300 to-orange-300 opacity-60"
                  style={{
                    left: "10%",
                    right: "10%",
                  }}
                />
              </div>
              <span className="font-medium text-gray-800">{item.high}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
