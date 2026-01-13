import type { WeatherType } from "@/entities/weather";

/**
 * OpenWeatherMap weather condition id를 WeatherType으로 변환
 * OpenWeatherMap condition codes: https://openweathermap.org/weather-conditions
 */
export function mapWeatherCodeToType(code: number): WeatherType["type"] {
  // 800: Clear sky (sunny)
  if (code === 800) return "sunny";

  // 801-804: Clouds (cloudy)
  if (code >= 801 && code <= 804) return "cloudy";

  // 500-531: Rain (rainy)
  if (code >= 500 && code <= 531) return "rainy";

  // 600-622: Snow (snowy)
  if (code >= 600 && code <= 622) return "snowy";

  // 200-232: Thunderstorm (stormy)
  if (code >= 200 && code <= 232) return "stormy";

  // 300-321: Drizzle (drizzle)
  if (code >= 300 && code <= 321) return "drizzle";

  // 701-781: Mist, Fog, etc. (cloudy)
  if (code >= 701 && code <= 781) return "cloudy";

  // 기본값은 sunny
  return "sunny";
}
