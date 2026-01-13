// Types
export type {
  WeatherLocation,
  DistrictKey,
  SearchLocationItem,
  LocationEntity,
} from "./types/location.types";

// API
export {
  weatherLocationsMap,
  allDistrictsArray,
  districtsByLevel,
} from "./api/locationData";

// Model
export {
  parseDistrictKey,
  parseDistrictKeyToEntity,
} from "./model/locationParser";
export {
  getAllLocations,
  getLocationById,
  searchLocations,
} from "./model/locationService";

// Lib
export { parseLocationName } from "./lib/parseLocationName";

export { LocationName } from "./ui/locationName";
