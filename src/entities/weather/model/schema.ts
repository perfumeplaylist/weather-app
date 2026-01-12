import { z } from "zod";

/**
 * Weather 객체 스키마 (공통)
 */
const WeatherSchema = z.object({
  id: z.number(), // Weather condition id
  main: z.string(), // Group of weather parameters
  description: z.string(), // Weather condition description
  icon: z.string(), // Weather icon id
});

/**
 * Current Weather API 응답 스키마
 * getCurrentWeather 함수의 반환값을 검증합니다.
 *
 * 참고:
 * - Current: https://openweathermap.org/current
 */
export const CurrentWeatherSchema = z.object({
  coord: z.object({
    lat: z.number(),
    lon: z.number(),
  }),
  dt: z.number(), // 현재 시간 timestamp
  main: z.object({
    temp: z.number(), // 현재 기온 (섭씨, units=metric)
  }),
  weather: z.array(WeatherSchema),
  name: z.string().optional(), // 지역명
});

export type CurrentWeather = z.infer<typeof CurrentWeatherSchema>;

/**
 * Forecast API 응답 스키마
 * getForecast 함수의 반환값을 검증합니다.
 *
 * 참고:
 * - Forecast: https://openweathermap.org/forecast5
 */
export const ForecastSchema = z.object({
  city: z.object({
    timezone: z.number(), // 타임존 오프셋 (초)
    name: z.string().optional(), // 지역명
  }),
  list: z.array(
    z.object({
      dt: z.number(), // 시간 timestamp
      main: z.object({
        temp: z.number(), // 기온 (섭씨, units=metric)
      }),
      weather: z.array(WeatherSchema),
    })
  ),
});

export type Forecast = z.infer<typeof ForecastSchema>;

/**
 * OpenWeatherMap 무료 API 조합 응답 스키마
 * - Current Weather API + 5 Day / 3 Hour Forecast API
 * UI에서 실제 사용하는 필드만 포함
 *
 * 참고:
 * - Current: https://openweathermap.org/current
 * - Forecast: https://openweathermap.org/forecast5
 */
export const WeatherForecastSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  timezone: z.union([z.string(), z.number()]), // Forecast API는 number, One Call은 string
  locationName: z.string().optional(), // 지역명 (Current Weather API의 name 필드)
  current: z.object({
    dt: z.number(),
    temp: z.number(), // 현재 기온 (섭씨, units=metric)
    weather: z.array(WeatherSchema),
  }),
  daily: z.array(
    z.object({
      dt: z.number(), // 날짜 timestamp
      temp: z.object({
        min: z.number(), // 최저 기온
        max: z.number(), // 최고 기온
        day: z.number(), // 낮 기온
      }),
      weather: z.array(WeatherSchema),
    })
  ),
  hourly: z.array(
    z.object({
      dt: z.number(), // 시간 timestamp
      temp: z.number(), // 기온
      weather: z.array(WeatherSchema),
    })
  ),
});

export type WeatherForecast = z.infer<typeof WeatherForecastSchema>;
