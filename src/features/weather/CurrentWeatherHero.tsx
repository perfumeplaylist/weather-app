import { WeatherIcon, type WeatherType } from "./WeatherIcon";
import { Card, Text, Flex } from "@packages/ui";
import { cn } from "@packages/utils/cn";

interface CurrentWeatherHeroProps {
  locationName: string;
  temperature: number;
  weatherType: WeatherType;
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
        "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none relative overflow-hidden",
        className
      )}
    >
      <Flex direction="col" align="center" className="relative z-10 py-6">
        <Text
          as="h2"
          size="xl"
          weight="medium"
          color="inverse"
          className="opacity-90 mb-2"
        >
          {locationName}
        </Text>

        <Flex direction="col" align="center" className="my-4">
          <WeatherIcon
            type={weatherType}
            className="w-20 h-20 text-white mb-2"
          />
          <Text
            size="6xl"
            weight="bold"
            color="inverse"
            className="tracking-tighter"
          >
            {temperature}°
          </Text>
        </Flex>

        <Flex gap={4} className="text-sm font-medium opacity-80 mt-2">
          <Text size="sm" weight="medium" color="inverse">
            최고 {highTemp}°
          </Text>
          <Text size="sm" weight="medium" color="inverse">
            |
          </Text>
          <Text size="sm" weight="medium" color="inverse">
            최저 {lowTemp}°
          </Text>
        </Flex>
      </Flex>

      {/* Decorative background elements */}
      <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-10%] w-40 h-40 bg-blue-400/20 rounded-full blur-2xl" />
    </Card>
  );
};
