import type { WeatherForecast } from "@/entities/weather/model/schema";
import type { Forecast } from "@/entities/weather/model/schema";
import { transformDailyForecasts } from "./transformDailyForecasts";

/**
 * Forecast API 응답을 WeatherForecast 형식으로 변환
 */
export function transformForecastResponse(
  data: Forecast,
  lat: number,
  lon: number
): {
  hourlyForecasts: WeatherForecast;
  dailyForecasts: ReturnType<typeof transformDailyForecasts>;
} {
  // Forecast API 응답을 WeatherForecast 형식으로 변환
  const hourlyForecasts: WeatherForecast = {
    lat,
    lon,
    timezone: data.city.timezone,
    locationName: data.city.name,
    current: {
      dt: data.list[0]?.dt ?? 0,
      temp: data.list[0]?.main.temp ?? 0,
      weather: data.list[0]?.weather ?? [],
    },
    daily: [],
    hourly: data.list.slice(0, 24).map((item) => ({
      dt: item.dt,
      temp: item.main.temp,
      weather: item.weather,
    })),
  };

  // Daily forecasts 변환 (select 내부에서 처리하여 캐싱 최적화)
  // Map을 사용하여 더 효율적으로 일별로 그룹화
  const dailyMap = new Map<
    string,
    {
      dt: number;
      temp: { min: number; max: number; day: number };
      weather: (typeof data.list)[0]["weather"];
    }
  >();

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split("T")[0]; // YYYY-MM-DD

    if (!dailyMap.has(dateKey)) {
      dailyMap.set(dateKey, {
        dt: item.dt,
        temp: {
          min: item.main.temp,
          max: item.main.temp,
          day: item.main.temp,
        },
        weather: item.weather,
      });
    } else {
      const dayData = dailyMap.get(dateKey)!;
      dayData.temp.min = Math.min(dayData.temp.min, item.main.temp);
      dayData.temp.max = Math.max(dayData.temp.max, item.main.temp);
      const hour = date.getHours();
      if (hour >= 12 && hour <= 18) {
        dayData.temp.day = item.main.temp;
        dayData.weather = item.weather;
      }
    }
  });

  const dailyForecasts = transformDailyForecasts(
    Array.from(dailyMap.values())
      .slice(0, 5)
      .map((day) => ({
        dt: day.dt,
        temp: {
          min: Math.round(day.temp.min),
          max: Math.round(day.temp.max),
          day: Math.round(day.temp.day),
        },
        weather: day.weather,
      }))
  );

  return {
    hourlyForecasts,
    dailyForecasts,
  };
}
