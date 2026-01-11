// Types
export type {
  WeatherLocation,
  DistrictKey,
  SearchLocationItem,
} from "./types/location.types";

// API
export {
  weatherLocationsMap,
  allDistrictsArray,
  districtsByLevel,
} from "./api/locationData";

// Model
export { parseDistrictKey } from "./model/locationParser";
