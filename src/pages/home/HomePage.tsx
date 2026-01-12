import { FavoriteLocationsWidget } from "../../widget/favorite-locations";
import { CurrentLocationWeatherWidget } from "../../widget/weather/CurrentLocationWeatherWidget";

export const HomePage = () => {
  return (
    <main className="px-4 pb-24 md:pb-24 space-y-6 md:p-8 md:space-y-0 md:grid md:grid-cols-[350px_1fr] md:gap-8 md:h-[calc(100vh-80px)] md:items-start">
      {/* Left Column: Current Location (Sticky on Desktop) */}
      <CurrentLocationWeatherWidget />

      {/* Right Column: Favorites */}
      <section className="h-full">
        <FavoriteLocationsWidget />
      </section>
    </main>
  );
};
