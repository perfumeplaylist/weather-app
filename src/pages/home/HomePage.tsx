import { useNavigate } from "react-router";
import { Plus } from "lucide-react";
import { FavoriteLocationsWidget } from "../../widget/favorite/FavoriteLocationsWidget";
import { CurrentLocationWeatherWidget } from "../../widget/weather/CurrentLocationWeatherWidget";
import { getFavoriteIds } from "../../entities/favorite";
import { Text } from "@packages/ui";

export const HomePage = () => {
  const navigate = useNavigate();
  // 해당 로직 수정
  const favoriteIds = getFavoriteIds();
  // 해당 로직 수정

  return (
    <main className="px-4 pb-24 md:pb-24 space-y-6 md:p-8 md:space-y-0 md:grid md:grid-cols-[350px_1fr] md:gap-8 md:h-[calc(100vh-80px)] md:items-start">
      {/* Left Column: Current Location (Sticky on Desktop) */}
      <CurrentLocationWeatherWidget />

      {/* Right Column: Favorites */}
      <section className="h-full">
        <div className="flex justify-between items-center mb-4 px-1">
          <Text as="h2" size="lg" weight="bold" color="default">
            즐겨찾기 ({favoriteIds.length}/6)
          </Text>
          {/* Desktop Add Button */}
          <button
            onClick={() => navigate("/search")}
            className="hidden md:flex items-center gap-1 text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            추가하기
          </button>
        </div>

        <FavoriteLocationsWidget />
      </section>
    </main>
  );
};
