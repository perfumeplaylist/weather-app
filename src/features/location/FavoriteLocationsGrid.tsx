import { FavoriteLocationCard } from "./FavoriteLocationCard";
import { type WeatherType } from "@/entities/weather";
import { Grid } from "@packages/ui";

export interface SavedLocation {
  id: string;
  name: string;
  temperature: number | null; // null이면 날씨 정보 없음
  minTemp: number | null;
  maxTemp: number | null;
  weatherType: WeatherType | null;
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
    <Grid cols={2} gap={3} className="md:grid-cols-3 lg:grid-cols-4 pb-4">
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
    </Grid>
  );
};
