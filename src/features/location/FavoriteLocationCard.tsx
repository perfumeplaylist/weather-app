import { Trash2 } from "lucide-react";
import { Card } from "../../shared/ui/Card";
import { WeatherIcon, type WeatherType } from "../weather/WeatherIcon";

interface FavoriteLocationCardProps {
  id: string;
  name: string;
  temperature: number;
  weatherType: WeatherType;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onClick: () => void;
}

export const FavoriteLocationCard = ({
  id,
  name,
  temperature,
  weatherType,
  onDelete,
  onClick,
}: FavoriteLocationCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="relative flex flex-col items-center justify-between p-4 aspect-[4/5] bg-white hover:bg-gray-50 transition-colors border-gray-200"
    >
      <button
        onClick={(e) => onDelete(id, e)}
        className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors z-10"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <span className="text-base font-medium text-gray-800 text-center line-clamp-2 mt-2">
        {name}
      </span>

      <WeatherIcon type={weatherType} className="w-10 h-10 my-2" />

      <span className="text-2xl font-bold text-gray-900">{temperature}°</span>
    </Card>
  );
};


