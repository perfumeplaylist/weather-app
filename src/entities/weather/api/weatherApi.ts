import {
  CurrentWeatherSchema,
  ForecastSchema,
  WeatherForecastSchema,
  type Forecast,
} from "../model/schema";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
// Forecast API 응답의 list 항목 타입
type ForecastListItem = Forecast["list"][number];

/**
 * Current Weather API 호출
 * 현재 날씨 정보만 가져옵니다.
 *
 * 참고:
 * - Current: https://openweathermap.org/current
 */
export async function getCurrentWeather(lat: number, lon: number) {
  if (!API_KEY) {
    throw new Error("VITE_OPENWEATHER_API_KEY is not set");
  }

  // units=metric: 섭씨 온도 사용
  // lang=kr: 한국어 응답
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    appid: API_KEY,
    units: "metric",
    lang: "kr",
  });

  try {
    const res = await fetch(`${url}?${params.toString()}`);

    const json = await res.json();
    return CurrentWeatherSchema.parse(json);
  } catch (error) {
    throw new Error(`Current Weather API error: ${error}`);
  }
}

/**
 * Forecast API 호출
 * 5일간 3시간 간격 예보 정보를 가져옵니다.
 *
 * 참고:
 * - Forecast: https://openweathermap.org/forecast5
 */
export async function getForecast(lat: number, lon: number) {
  if (!API_KEY) {
    throw new Error("VITE_OPENWEATHER_API_KEY is not set");
  }

  const url = `${BASE_URL}/forecast`;

  // units=metric: 섭씨 온도 사용
  // lang=kr: 한국어 응답
  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    appid: API_KEY,
    units: "metric",
    lang: "kr",
  });

  try {
    const res = await fetch(`${url}?${params.toString()}`);

    const json = await res.json();
    return ForecastSchema.parse(json);
  } catch (error) {
    throw new Error(`Forecast API error: ${error}`);
  }
}

/**
 * Weather API 호출 (OpenWeatherMap 무료 API 조합)
 * - Current Weather API: 현재 날씨
 * - 5 Day / 3 Hour Forecast API: 5일간 3시간 간격 예보
 *
 * 참고:
 * - Current: https://openweathermap.org/current
 * - Forecast: https://openweathermap.org/forecast5
 */
export async function getWeather(lat: number, lon: number) {
  // 두 API를 병렬로 호출
  const [currentJson, forecastJson] = await Promise.all([
    getCurrentWeather(lat, lon),
    getForecast(lat, lon),
  ]);

  // 두 API 응답을 하나의 형식으로 통합
  const combinedData = {
    lat: currentJson.coord.lat,
    lon: currentJson.coord.lon,
    timezone: forecastJson.city.timezone, // 숫자로 오지만 스키마에서 union으로 허용
    locationName: currentJson.name || forecastJson.city.name, // 지역명 (Current Weather API 우선)
    current: {
      dt: currentJson.dt,
      temp: currentJson.main.temp,
      weather: currentJson.weather,
    },
    // Forecast API의 list를 daily와 hourly로 변환
    daily: groupForecastByDay(forecastJson.list),
    // Forecast API의 list를 hourly 형식으로 변환 (main.temp -> temp)
    hourly: (forecastJson.list as ForecastListItem[])
      .slice(0, 24)
      .map((item) => ({
        dt: item.dt,
        temp: item.main.temp, // main.temp를 temp로 매핑
        weather: item.weather,
      })),
  };

  return WeatherForecastSchema.parse(combinedData);
}

/**
 * Forecast API의 3시간 간격 데이터를 일별로 그룹화
 * 같은 날짜의 모든 항목에서 최저/최고 기온을 계산
 */
function groupForecastByDay(forecastList: ForecastListItem[]) {
  interface DayData {
    dt: number;
    temp: {
      min: number;
      max: number;
      day: number;
    };
    weather: ForecastListItem["weather"];
    temps: number[];
  }
  const dailyMap = new Map<string, DayData>();

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split("T")[0]; // YYYY-MM-DD

    if (!dailyMap.has(dateKey)) {
      dailyMap.set(dateKey, {
        dt: item.dt, // 해당 날짜의 첫 번째 항목 timestamp
        temp: {
          min: item.main.temp, // 초기값
          max: item.main.temp, // 초기값
          day: item.main.temp, // 낮 기온 (첫 번째 항목 사용)
        },
        weather: item.weather, // 첫 번째 항목의 날씨
        temps: [], // 모든 기온을 수집
      });
    }

    const dayData = dailyMap.get(dateKey)!;
    dayData.temps.push(item.main.temp);
    // 최저/최고 기온 업데이트
    dayData.temp.min = Math.min(dayData.temp.min, item.main.temp);
    dayData.temp.max = Math.max(dayData.temp.max, item.main.temp);

    // 낮 시간대(12시~18시)의 기온을 day로 사용 (더 정확한 낮 기온)
    const hour = date.getHours();
    if (hour >= 12 && hour <= 18) {
      dayData.temp.day = item.main.temp;
      dayData.weather = item.weather; // 낮 시간대 날씨 사용
    }
  });

  return Array.from(dailyMap.values())
    .map((day) => ({
      dt: day.dt,
      temp: {
        min: Math.round(day.temp.min),
        max: Math.round(day.temp.max),
        day: Math.round(day.temp.day),
      },
      weather: day.weather,
    }))
    .slice(0, 5); // 최대 5일
}
