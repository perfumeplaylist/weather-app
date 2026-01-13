import { Trash2 } from "lucide-react";
import { Card, Text, Flex, Button } from "@packages/ui";
import {
  CurrentTemp,
  RangeTemp,
  WeatherIcon,
  type WeatherType,
} from "@/entities/weather";

interface FavoriteLocationCardProps {
  id: string;
  name: string;
  temperature: number | null;
  minTemp: number | null;
  maxTemp: number | null;
  weatherType: WeatherType | null;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onClick: () => void;
}

export const FavoriteLocationCard = ({
  id,
  temperature,
  minTemp,
  maxTemp,
  weatherType,
  onDelete,
  name,
  onClick,
}: FavoriteLocationCardProps) => {
  // 날씨 정보가 없는 경우
  const hasWeatherData = temperature !== null && weatherType !== null;

  return (
    <Card
      onClick={onClick}
      clickable
      className="relative aspect-4/5 hover:bg-gray-50 transition-colors border-gray-200"
    >
      <Flex align="center" justify="between">
        <Text size="base" color="default" align="center" className="px-4">
          {name}
        </Text>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => onDelete(id, e)}
          aria-label="삭제"
        >
          <Trash2 />
        </Button>
      </Flex>

      <Flex
        direction="col"
        align="center"
        justify="between"
        className="h-full pt-10 pb-4 px-2"
      >
        {hasWeatherData ? (
          <>
            {weatherType && (
              <div className="shrink-0 my-2">
                <WeatherIcon type={weatherType.type} className="w-14 h-14" />
              </div>
            )}

            <Flex direction="col" align="center" gap={1} className="shrink-0">
              <CurrentTemp value={temperature} />

              {minTemp !== null && maxTemp !== null && (
                <RangeTemp min={minTemp} max={maxTemp} />
              )}
            </Flex>
          </>
        ) : (
          <Flex
            direction="col"
            align="center"
            justify="center"
            gap={2}
            className="flex-1"
          >
            <Text size="sm" color="muted" align="center" className="px-4">
              정보 없음
            </Text>
          </Flex>
        )}
      </Flex>
    </Card>
  );
};
