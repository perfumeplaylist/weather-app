import { CurrentWeatherHero } from "@/widgets/weather/CurrentWeatherHero";
import { HourlyForecastList } from "@/widgets/weather/HourlyForecastList";
import { DailyForecastSummary } from "@/widgets/weather/DailyForecastSummary";
import { WeatherBridgeText } from "@/widgets/weather/WeatherBridgeText";
import { useWeatherDetailByCoordinates } from "../model/useWeatherDetailByCoordinates";

interface WeatherDetailContentProps {
  lat: number;
  lon: number;
}

/**
 * 날씨 상세 페이지의 메인 컨텐츠 컴포넌트
 * useWeatherDetailByCoordinates 훅을 사용하여 데이터를 가져오고 레이아웃과 Feature 컴포넌트들을 조합
 */
export const WeatherDetailContent = ({
  lat,
  lon,
}: WeatherDetailContentProps) => {
  const { location, currentWeather, forecast, locationNames } =
    useWeatherDetailByCoordinates(lat, lon);

  return (
    <div className="px-4 pb-10 md:p-8 md:grid md:grid-cols-2 md:gap-8 md:items-start">
      {/* Left Column: Hero & Info */}
      <div className="py-4 md:py-0">
        <CurrentWeatherHero
          locationName={location.label}
          temperature={currentWeather.temperature}
          weatherType={currentWeather.weatherType}
          highTemp={currentWeather.highTemp}
          lowTemp={currentWeather.lowTemp}
          className="mb-4 md:aspect-4/3"
        />

        <WeatherBridgeText
          dongName={locationNames.dongName}
          guName={locationNames.guName}
        />
      </div>

      {/* Right Column: Forecasts */}
      <div className="space-y-6 md:bg-gray-50/50 md:p-6 md:rounded-2xl md:border md:border-gray-100">
        <HourlyForecastList forecast={forecast.hourlyForecasts} />

        <div className="md:pt-4 md:border-t md:border-gray-200">
          <DailyForecastSummary forecasts={forecast.dailyForecasts} />
        </div>
      </div>
    </div>
  );
};
