export type FavoriteLocationId = string;

export type FavoriteState = {
  ids: FavoriteLocationId[];
  aliases: Record<FavoriteLocationId, string | undefined>;
  coordinates: Record<
    FavoriteLocationId,
    { lat: number; lon: number } | undefined
  >;
};

export interface FavoriteLocation {
  id: string;
  locationLabel: string;
  lat: number;
  lon: number;
  hasValidCoordinates: boolean;
}

import type { WeatherType } from "@/entities/weather/model/iconMap";

export interface SavedLocationData {
  id: string;
  name: string;
  temperature: number | null;
  minTemp: number | null;
  maxTemp: number | null;
  weatherType: WeatherType | null;
}
