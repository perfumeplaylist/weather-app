import { DeleteAllFavoritesButton } from "@/features/favorite/ui/DeleteAllFavoritesButton";
import { useFavoriteWithWeather } from "@/features/favorite/model/useFavoriteWithWeather";
import { useFavoriteActions } from "@/features/favorite/model/useFavoriteActions";
import { useFavoriteLocations } from "@/entities/favorite";
import { Flex, Grid } from "@packages/ui";
import { FavoriteLocationCard } from "@/widgets/location/FavoriteLocationCard";

const EmptyFavoriteState = () => {
  return (
    <div className="col-span-2 md:col-span-3 lg:col-span-4 py-16 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center gap-2">
      <span>즐겨찾기한 지역이 없습니다.</span>
      <span className="text-xs text-gray-400 opacity-70">
        우측 상단 버튼을 눌러 추가해보세요.
      </span>
    </div>
  );
};

/**
 * 즐겨찾기 위치 목록을 표시하는 컨텐츠 컴포넌트
 * 비즈니스 로직 없이 UI만 담당
 */
export const FavoriteLocationsContent = () => {
  const favoriteLocations = useFavoriteWithWeather();
  const { locations } = useFavoriteLocations();
  const { handleLocationClick, handleDeleteLocation } = useFavoriteActions();

  // locationId로 좌표 매핑
  const locationMap = new Map(
    locations.map((loc) => [loc.id, { lat: loc.lat, lon: loc.lon }])
  );

  if (favoriteLocations.length === 0) {
    return <EmptyFavoriteState />;
  }

  return (
    <div className="space-y-4">
      <Flex justify="end">
        <DeleteAllFavoritesButton />
      </Flex>
      <Grid cols={2} gap={3} className="md:grid-cols-3 lg:grid-cols-4 pb-4">
        {favoriteLocations.map((location) => {
          const coords = locationMap.get(location.id);
          return (
            <FavoriteLocationCard
              key={location.id}
              {...location}
              onClick={() => {
                if (coords) {
                  handleLocationClick(coords.lat, coords.lon);
                }
              }}
              onDelete={(id, e) => {
                e.stopPropagation();
                handleDeleteLocation(id);
              }}
            />
          );
        })}
      </Grid>
    </div>
  );
};
