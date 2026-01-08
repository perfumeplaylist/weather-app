import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { type SavedLocation } from "../../features/location/FavoriteLocationsGrid";

interface WeatherContextType {
  favorites: SavedLocation[];
  addFavorite: (location: SavedLocation) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// Initial Mock Data
const INITIAL_FAVORITES: SavedLocation[] = [
  { id: "1", name: "서울특별시 강남구", temperature: 24, weatherType: "sunny" },
  {
    id: "2",
    name: "제주특별자치도 제주시",
    temperature: 28,
    weatherType: "rainy",
  },
];

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  // Load from localStorage or use initial mock
  const [favorites, setFavorites] = useState<SavedLocation[]>(() => {
    const saved = localStorage.getItem("weather-favorites");
    return saved ? JSON.parse(saved) : INITIAL_FAVORITES;
  });

  useEffect(() => {
    localStorage.setItem("weather-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (location: SavedLocation) => {
    if (favorites.length >= 6) {
      alert("즐겨찾기는 최대 6개까지만 저장할 수 있습니다.");
      return;
    }
    if (favorites.some((f) => f.id === location.id)) {
      return;
    }
    setFavorites([...favorites, location]);
  };

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some((f) => f.id === id);
  };

  return (
    <WeatherContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
