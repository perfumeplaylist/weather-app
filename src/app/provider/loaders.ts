import { queryClient } from "./queryClient";
import { geolocationQueryOption } from "@/features/geolocation";
import { weatherQueryOption } from "@/features/weather-detail";
import { getLocationById } from "@/entities/location";
import type { FavoriteState } from "@/entities/favorite/model/favoriteTypes";

/**
 * 로컬스토리지에서 즐겨찾기 데이터 읽기
 */
function loadFavoritesFromStorage(): FavoriteState {
  try {
    const stored = localStorage.getItem("favoriteLocations:v2");
    if (!stored) {
      return { ids: [], aliases: {}, coordinates: {} };
    }
    const parsed = JSON.parse(stored);
    return {
      ids: Array.isArray(parsed?.ids) ? parsed.ids : [],
      aliases:
        typeof parsed?.aliases === "object" && parsed.aliases !== null
          ? parsed.aliases
          : {},
      coordinates:
        typeof parsed?.coordinates === "object" && parsed.coordinates !== null
          ? parsed.coordinates
          : {},
    };
  } catch {
    return { ids: [], aliases: {}, coordinates: {} };
  }
}

/**
 * HomePage loader
 * 현재 위치의 날씨 데이터와 즐겨찾기 위치들의 날씨 데이터를 prefetch
 * 모든 작업을 병렬로 실행하여 최대한 빠르게 처리
 */
export const homeLoader = async () => {
  try {
    // 1. Geolocation 데이터 가져오기 (Promise로 시작, await 하지 않음)
    const geoDataPromise = queryClient.ensureQueryData(
      geolocationQueryOption.current()
    );

    // 2. 로컬스토리지에서 즐겨찾기 데이터 읽기 (동기 작업이지만 병렬 처리 준비)
    const favorites = loadFavoritesFromStorage();

    // 3. 모든 prefetch 작업을 병렬로 실행
    const allPromises: Promise<unknown>[] = [
      // Geolocation 데이터 가져오기
      geoDataPromise.then((geoData) => {
        // Geolocation 성공 시 현재 위치 날씨 데이터 prefetch
        if (geoData) {
          return queryClient.prefetchQuery(
            weatherQueryOption.currentWeather({
              lat: geoData.lat,
              lon: geoData.lon,
            })
          );
        }
        return null;
      }),
    ];

    // 4. 즐겨찾기 위치들의 날씨 데이터 prefetch (병렬로 추가)
    if (favorites.ids.length > 0) {
      favorites.ids.forEach((id) => {
        const favoritePrefetchPromise = (async () => {
          try {
            // 저장된 좌표가 있으면 사용, 없으면 getLocationById로 조회
            const savedCoordinates = favorites.coordinates[id];
            let lat: number;
            let lon: number;

            if (savedCoordinates) {
              lat = savedCoordinates.lat;
              lon = savedCoordinates.lon;
            } else {
              const location = getLocationById(id);
              lat = location.lat;
              lon = location.lon;
            }

            // 유효한 좌표인 경우에만 prefetch
            if (lat !== 0 && lon !== 0) {
              return queryClient.prefetchQuery(
                weatherQueryOption.currentWeather({
                  lat,
                  lon,
                })
              );
            }
            return null;
          } catch {
            // 개별 즐겨찾기 조회 실패는 무시하고 계속 진행
            return null;
          }
        })();

        allPromises.push(favoritePrefetchPromise);
      });
    }

    // 모든 작업을 병렬로 실행
    await Promise.all(allPromises);

    // 결과 반환을 위해 geoData 가져오기
    const geoData = await geoDataPromise;

    return { geoData, favoritesCount: favorites.ids.length };
  } catch {
    // 에러가 발생해도 페이지는 렌더링되도록 null 반환
    return null;
  }
};

/**
 * DetailPage loader
 * 쿼리 파라미터에서 lat, lon을 읽어서 날씨 데이터 prefetch
 */
export const detailLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  if (!lat || !lon) {
    return null;
  }

  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);

  if (isNaN(latNum) || isNaN(lonNum)) {
    return null;
  }

  try {
    // 현재 날씨와 예보 데이터를 병렬로 prefetch
    await Promise.all([
      queryClient.prefetchQuery(
        weatherQueryOption.currentWeather({
          lat: latNum,
          lon: lonNum,
        })
      ),
      queryClient.prefetchQuery(
        weatherQueryOption.forecastWeather({
          lat: latNum,
          lon: lonNum,
        })
      ),
    ]);

    return { lat: latNum, lon: lonNum };
  } catch {
    return null;
  }
};
