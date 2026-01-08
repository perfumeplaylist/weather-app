import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Star, ChevronLeft } from "lucide-react";
import { PageLayout } from "../shared/layout/PageLayout";
import { Header } from "../shared/ui/Header";
import { CurrentWeatherHero } from "../features/weather/CurrentWeatherHero";
import { WeatherBridgeText } from "../features/weather/WeatherBridgeText";
import {
  HourlyForecastList,
  type HourlyForecast,
} from "../features/weather/HourlyForecastList";
import {
  DailyForecastSummary,
  type DailyForecast,
} from "../features/weather/DailyForecastSummary";
import { useWeather } from "../shared/context/WeatherContext";
import { useNavigate } from "react-router";

// Mock Data
const MOCK_HOURLY: HourlyForecast[] = [
  { time: "지금", temp: 25, type: "sunny" },
  { time: "13시", temp: 26, type: "sunny" },
  { time: "14시", temp: 27, type: "cloudy" },
  { time: "15시", temp: 26, type: "rainy" },
  { time: "16시", temp: 25, type: "rainy" },
  { time: "17시", temp: 24, type: "cloudy" },
  { time: "18시", temp: 23, type: "sunny" },
  { time: "19시", temp: 22, type: "sunny" },
  { time: "20시", temp: 21, type: "cloudy" },
];

const MOCK_DAILY: DailyForecast[] = [
  { day: "오늘", low: 19, high: 28, type: "sunny" },
  { day: "내일", low: 20, high: 27, type: "cloudy" },
  { day: "수", low: 18, high: 25, type: "rainy" },
  { day: "목", low: 17, high: 24, type: "sunny" },
  { day: "금", low: 18, high: 26, type: "sunny" },
  { day: "토", low: 19, high: 27, type: "cloudy" },
  { day: "일", low: 20, high: 28, type: "sunny" },
];

export const DetailPage = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useWeather();
  const [currentIsFav, setCurrentIsFav] = useState(false);

  // In a real app, fetch data based on locationId
  const locationName =
    locationId === "current"
      ? "청운동"
      : locationId === "1"
      ? "강남구"
      : "역삼동";
  const guName =
    locationId === "current"
      ? "종로구"
      : locationId === "1"
      ? "서울특별시"
      : "강남구";
  const fullTitle = `${guName} ${locationName}`;

  useEffect(() => {
    if (locationId) {
      setCurrentIsFav(isFavorite(locationId));
    }
  }, [locationId, isFavorite]);

  const toggleFavorite = () => {
    if (!locationId) return;

    if (currentIsFav) {
      removeFavorite(locationId);
    } else {
      addFavorite({
        id: locationId,
        name: fullTitle,
        temperature: 25,
        weatherType: "sunny",
      });
    }
  };

  return (
    <PageLayout>
      <Header
        showBack
        title={locationName}
        className="md:hidden"
        right={
          <button
            onClick={toggleFavorite}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Star
              className={`w-6 h-6 ${
                currentIsFav
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400"
              }`}
            />
          </button>
        }
      />

      {/* Desktop Header / Nav */}
      <div className="hidden md:flex items-center justify-between p-6 border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">뒤로가기</span>
        </button>

        <h1 className="text-xl font-bold text-gray-900">{locationName}</h1>

        <button
          onClick={toggleFavorite}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600"
        >
          <Star
            className={`w-5 h-5 ${
              currentIsFav ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
            }`}
          />
          {currentIsFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
        </button>
      </div>

      <main className="px-4 pb-10 md:p-8 md:grid md:grid-cols-2 md:gap-8 md:items-start">
        {/* Left Column: Hero & Info */}
        <div className="py-4 md:py-0">
          <CurrentWeatherHero
            locationName={fullTitle}
            temperature={25}
            weatherType="sunny"
            highTemp={28}
            lowTemp={19}
            className="mb-4 md:aspect-4/3"
          />

          <WeatherBridgeText dongName={locationName} guName={guName} />
        </div>

        {/* Right Column: Forecasts */}
        <div className="space-y-6 md:bg-gray-50/50 md:p-6 md:rounded-2xl md:border md:border-gray-100">
          <HourlyForecastList forecasts={MOCK_HOURLY} />

          <div className="md:pt-4 md:border-t md:border-gray-200">
            <DailyForecastSummary forecasts={MOCK_DAILY} />
          </div>
        </div>
      </main>
    </PageLayout>
  );
};
