/**
 * Geolocation Query Key Factory
 * Query Key는 primitive 값만 포함하고 as const로 고정
 */
export const geolocationQueryKeyFactory = {
  geolocation: () => ["geolocation"] as const,
  current: () => [...geolocationQueryKeyFactory.geolocation(), "current"] as const,
};
