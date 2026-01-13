import { useNavigate } from "react-router";
import { CurrentWeatherHero } from "@/widgets/weather/CurrentWeatherHero";
import { useGetGeoLocation } from "@/features/geolocation";
import { useCurrentWeather } from "../model/useCurrentWeather";

/**
 * 현재 위치 날씨 위젯의 컨텐츠 컴포넌트
 * useCurrentWeather 훅을 사용하여 현재 위치의 날씨 데이터를 가져옴
 */
export const CurrentLocationWeatherContent = () => {
  const { data: geoData } = useGetGeoLocation();
  const weather = useCurrentWeather(geoData.lat, geoData.lon);
  const navigate = useNavigate();

  return (
    <CurrentWeatherHero
      locationName={weather.locationName}
      temperature={weather.temperature}
      weatherType={weather.weatherType}
      highTemp={weather.highTemp}
      lowTemp={weather.lowTemp}
      onClick={() => {
        const queryParams = new URLSearchParams({
          lat: geoData.lat.toString(),
          lon: geoData.lon.toString(),
        });
        navigate(`/detail?${queryParams.toString()}`);
      }}
      className="md:h-auto md:aspect-4/5 cursor-pointer hover:shadow-lg transition-shadow"
    />
  );
};
