import { LocationName } from "@/entities/location";
import { WeatherIcon } from "@/entities/weather/ui/WeatherIcon";
import { CurrentTemp, RangeTemp, type WeatherType } from "@/entities/weather";
import { Card, Flex } from "@packages/ui";
import { cn } from "@packages/utils/cn";

interface CurrentWeatherHeroProps {
  locationName: string;
  temperature: number;
  weatherType: WeatherType["type"];
  highTemp: number;
  lowTemp: number;
  className?: string;
  onClick?: () => void;
}

export const CurrentWeatherHero = ({
  locationName,
  temperature,
  weatherType,
  highTemp,
  lowTemp,
  className,
  onClick,
}: CurrentWeatherHeroProps) => {
  return (
    <Card
      onClick={onClick}
      clickable
      className={cn(
        "bg-gradient-to-br text-white border-none",
        "shadow-lg",
        "transition-all duration-300 hover:shadow-xl",
        "active:scale-[0.98]",
        weatherType === "sunny" && "from-orange-400 to-yellow-400",
        weatherType === "cloudy" && "from-slate-400 to-slate-600",
        weatherType === "rainy" && "from-blue-500 to-blue-700",
        weatherType === "snowy" && "from-sky-300 to-sky-500",
        weatherType === "stormy" && "from-purple-600 to-indigo-800",
        weatherType === "windy" && "from-cyan-400 to-cyan-600",
        weatherType === "drizzle" && "from-blue-400 to-blue-600",
        !weatherType && "from-slate-400 to-slate-600",
        className
      )}
    >
      <Flex direction="col" align="center" className="py-8 px-6">
        {/* 위치 이름 */}
        <div className="mb-6">
          <LocationName name={locationName} />
        </div>

        {/* 날씨 아이콘과 온도 */}
        <Flex direction="col" align="center" className="mb-6 space-y-4">
          <WeatherIcon
            type={weatherType}
            className="w-24 h-24 text-white drop-shadow-lg"
          />

          <div>
            <CurrentTemp value={temperature} />
          </div>
        </Flex>

        {/* 최고/최저 온도 */}
        <div>
          <RangeTemp min={lowTemp} max={highTemp} />
        </div>
      </Flex>
    </Card>
  );
};
