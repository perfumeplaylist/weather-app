import { useState } from "react";
import { useNavigate } from "react-router";
import { PageLayout } from "../shared/layout/PageLayout";
import { Header } from "../shared/ui/Header";
import { CurrentWeatherHero } from "../features/weather/CurrentWeatherHero";
import { FavoriteLocationsGrid } from "../features/location/FavoriteLocationsGrid";
import { EmptyLocationState } from "../features/location/EmptyLocationState";
import { Plus } from "lucide-react";
import { useWeather } from "../shared/context/WeatherContext";

export const HomePage = () => {
  const navigate = useNavigate();
  const [hasPermission, setHasPermission] = useState(true); // Toggle to test Empty State
  const { favorites, removeFavorite } = useWeather();

  const handleLocationClick = (id: string) => {
    navigate(`/detail/${id}`);
  };

  return (
    <PageLayout>
      <Header
        className="md:hidden" // Hide mobile header on desktop, or keep it if navigation is needed globally
        right={
          <button
            onClick={() => navigate("/search")}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <Plus className="w-6 h-6" />
          </button>
        }
      />

      <main className="px-4 pb-10 space-y-8 md:p-8 md:space-y-0 md:grid md:grid-cols-[350px_1fr] md:gap-8 md:h-[calc(100vh-60px)] md:items-start">
        {/* Left Column: Current Location (Sticky on Desktop) */}
        <section className="md:sticky md:top-8">
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-xl font-bold text-gray-900">나의 위치</h2>
            <button
              onClick={() => setHasPermission(!hasPermission)}
              className="text-xs text-gray-400 underline"
            >
              Toggle Perm
            </button>
          </div>

          {hasPermission ? (
            <CurrentWeatherHero
              locationName="서울특별시 종로구 청운동"
              temperature={25}
              weatherType="sunny"
              highTemp={28}
              lowTemp={19}
              onClick={() => navigate("/detail/current")}
              className="md:h-auto md:aspect-4/5 cursor-pointer hover:shadow-lg transition-shadow"
            />
          ) : (
            <EmptyLocationState onSearchClick={() => navigate("/search")} />
          )}
        </section>

        {/* Right Column: Favorites */}
        <section className="h-full">
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-xl font-bold text-gray-900">
              즐겨찾기 ({favorites.length}/6)
            </h2>
            {/* Desktop Add Button */}
            <button
              onClick={() => navigate("/search")}
              className="hidden md:flex items-center gap-1 text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              추가하기
            </button>
          </div>

          <FavoriteLocationsGrid
            locations={favorites}
            onLocationClick={handleLocationClick}
            onDeleteLocation={removeFavorite}
          />
        </section>
      </main>
    </PageLayout>
  );
};
