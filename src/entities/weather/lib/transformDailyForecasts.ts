import type { WeatherForecast } from "@/entities/weather/model/schema";
import type { DailyForecast } from "@/widgets/weather/DailyForecastSummary";
import { mapWeatherCodeToType } from "@/widgets/weather/utils/weatherCodeMapper";

/**
 * Daily forecast 데이터를 UI에서 사용할 수 있는 형태로 변환
 */
export function transformDailyForecasts(
  daily: WeatherForecast["daily"]
): DailyForecast[] {
  return daily.map((day) => {
    const weatherCode = day.weather[0]?.id;
    if (!weatherCode) {
      throw new Error("Weather code is missing");
    }

    return {
      day: new Date(day.dt * 1000).toLocaleDateString("ko-KR", {
        weekday: "short",
      }),
      low: Math.round(day.temp.min),
      high: Math.round(day.temp.max),
      type: { type: mapWeatherCodeToType(weatherCode) },
    };
  });
}
