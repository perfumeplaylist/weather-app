import { Trash2 } from "lucide-react";
import { Card, Icon, Text, Flex } from "@packages/ui";
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
      clickable
      className="relative aspect-[4/5] hover:bg-gray-50 transition-colors border-gray-200"
    >
      <Flex direction="col" align="center" justify="between" className="h-full">
        <button
          onClick={(e) => onDelete(id, e)}
          className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors z-10"
        >
          <Icon size="sm">
            <Trash2 />
          </Icon>
        </button>

        <Text
          size="base"
          weight="medium"
          color="default"
          align="center"
          className="line-clamp-2 mt-2"
        >
          {name}
        </Text>

        <WeatherIcon type={weatherType} className="w-10 h-10 my-2" />

        <Text size="2xl" weight="bold" color="default">
          {temperature}°
        </Text>
      </Flex>
    </Card>
  );
};
