import { WeatherIcon, type WeatherType } from "./WeatherIcon";
import { Card } from "../../shared/ui/Card";

export interface HourlyForecast {
  time: string;
  temp: number;
  type: WeatherType;
}

interface HourlyForecastListProps {
  forecasts: HourlyForecast[];
}

export const HourlyForecastList = ({ forecasts }: HourlyForecastListProps) => {
  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-gray-500 mb-3 px-1">
        시간대별 예보
      </h3>
      <div className="flex overflow-x-auto gap-3 pb-4 -mx-4 px-4 scrollbar-hide">
        {forecasts.map((item, index) => (
          <Card
            key={index}
            className="flex-none w-16 flex flex-col items-center gap-2 py-3 px-0 bg-gray-50/50 border-0"
          >
            <span className="text-xs text-gray-500">{item.time}</span>
            <WeatherIcon type={item.type} className="w-6 h-6" />
            <span className="text-sm font-semibold">{item.temp}°</span>
          </Card>
        ))}
      </div>
    </div>
  );
};



