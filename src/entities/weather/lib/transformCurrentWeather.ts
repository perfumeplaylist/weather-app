import type { WeatherForecast } from "@/entities/weather/model/schema";
import { mapWeatherCodeToType } from "@/widgets/weather/utils/weatherCodeMapper";

export interface TransformedCurrentWeather {
  todayForecast: WeatherForecast["daily"][0];
  currentWeather: WeatherForecast["current"]["weather"][0];
  weatherType: ReturnType<typeof mapWeatherCodeToType>;
  locationName: string;
  temperature: number;
  highTemp: number;
  lowTemp: number;
}

/**
 * 현재 날씨 데이터를 UI에서 사용할 수 있는 형태로 변환
 */
export function transformCurrentWeather(
  data: WeatherForecast,
  defaultLocationName?: string
): TransformedCurrentWeather {
  return {
    todayForecast: data.daily[0],
    currentWeather: data.current.weather[0],
    weatherType: mapWeatherCodeToType(data.current.weather[0].id),
    locationName: data.locationName || defaultLocationName || "현재 위치",
    temperature: Math.round(data.current.temp),
    highTemp: Math.round(data.daily[0].temp.max),
    lowTemp: Math.round(data.daily[0].temp.min),
  };
}
