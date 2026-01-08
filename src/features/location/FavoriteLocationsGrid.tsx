import { FavoriteLocationCard } from "./FavoriteLocationCard";
import { type WeatherType } from "../weather/WeatherIcon";

export interface SavedLocation {
  id: string;
  name: string;
  temperature: number;
  weatherType: WeatherType;
}

interface FavoriteLocationsGridProps {
  locations: SavedLocation[];
  onLocationClick: (id: string) => void;
  onDeleteLocation: (id: string) => void;
}

export const FavoriteLocationsGrid = ({
  locations,
  onLocationClick,
  onDeleteLocation,
}: FavoriteLocationsGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {locations.map((location) => (
        <FavoriteLocationCard
          key={location.id}
          {...location}
          onClick={() => onLocationClick(location.id)}
          onDelete={(id, e) => {
            e.stopPropagation();
            onDeleteLocation(id);
          }}
        />
      ))}
      {locations.length === 0 && (
        <div className="col-span-2 md:col-span-3 lg:col-span-4 py-16 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center gap-2">
          <span>즐겨찾기한 지역이 없습니다.</span>
          <span className="text-xs text-gray-400 opacity-70">
            우측 상단 버튼을 눌러 추가해보세요.
          </span>
        </div>
      )}
    </div>
  );
};
