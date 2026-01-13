import type { FavoriteLocation } from "@/entities/favorite/model/favoriteTypes";
import type { SavedLocationData } from "@/entities/favorite/model/favoriteTypes";
import type { WeatherForecast } from "@/entities/weather/model/schema";
import type { WeatherType } from "@/entities/weather/model/iconMap";
import { mapWeatherCodeToType } from "@/widgets/weather/utils/weatherCodeMapper";

/**
 * FavoriteLocation과 WeatherForecast를 결합하여 SavedLocationData로 변환하는 순수 함수
 *
 * @param location - 즐겨찾기 위치 정보
 * @param weatherData - 날씨 데이터 (null 가능)
 * @param displayName - 표시할 이름 (별칭 또는 기본 이름)
 * @returns SavedLocationData
 */
export function mapToSavedLocation(
  location: FavoriteLocation,
  weatherData: WeatherForecast | null,
  displayName: string
): SavedLocationData {
  // 좌표가 유효하지 않은 경우
  if (!location.hasValidCoordinates) {
    return {
      id: location.id,
      name: displayName,
      temperature: null,
      minTemp: null,
      maxTemp: null,
      weatherType: null,
    };
  }

  // 날씨 데이터가 없는 경우
  if (!weatherData) {
    return {
      id: location.id,
      name: displayName,
      temperature: null,
      minTemp: null,
      maxTemp: null,
      weatherType: null,
    };
  }

  const todayForecast = weatherData.daily[0];
  const currentWeather = weatherData.current.weather[0];
  const weatherTypeString = mapWeatherCodeToType(currentWeather.id);
  const weatherType: WeatherType = { type: weatherTypeString };

  return {
    id: location.id,
    name: displayName,
    temperature: Math.round(weatherData.current.temp),
    minTemp: Math.round(todayForecast.temp.min),
    maxTemp: Math.round(todayForecast.temp.max),
    weatherType,
  };
}
