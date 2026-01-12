import { useSuspenseQuery } from "@tanstack/react-query";
import { geolocationQueryOption } from "../../../entities/geolocation";
import type { GeolocationError } from "@/entities/geolocation/api/api";

export const useGetGeoLocation = () => {
  const { data, isLoading, error } = useSuspenseQuery({
    ...geolocationQueryOption.current(),
  });

  // TanStack Query의 error를 GeolocationPositionError 형태로 변환
  const geolocationError: GeolocationPositionError | null = error
    ? (() => {
        const geoError = error as unknown as GeolocationError;
        return {
          code: geoError.code,
          message: geoError.message,
          PERMISSION_DENIED: geoError.PERMISSION_DENIED,
          POSITION_UNAVAILABLE: geoError.POSITION_UNAVAILABLE,
          TIMEOUT: geoError.TIMEOUT,
        } as GeolocationPositionError;
      })()
    : null;

  return { data, isLoading, error: geolocationError };
};

export default useGetGeoLocation;
