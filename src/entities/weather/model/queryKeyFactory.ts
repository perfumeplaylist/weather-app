/**
 * Weather Query Key Factory
 * Query Key는 primitive 값만 포함하고 as const로 고정
 */
export const weatherQueryKeyFactory = {
  weather: () => ["weather"] as const,
  current: ({ lat, lon }: { lat: number; lon: number }) =>
    [...weatherQueryKeyFactory.weather(), "current", lat, lon] as const,
  forecast: ({ lat, lon }: { lat: number; lon: number }) =>
    [...weatherQueryKeyFactory.weather(), "forecast", lat, lon] as const,
};
