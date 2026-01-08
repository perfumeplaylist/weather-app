import { WeatherIcon, type WeatherType } from "./WeatherIcon";
import { Card } from "../../shared/ui/Card";
import { cn } from "../../../packages/utils/cn";

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
      className={cn(
        "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none relative overflow-hidden",
        className
      )}
    >
      <div className="relative z-10 flex flex-col items-center py-6">
        <h2 className="text-xl font-medium opacity-90 mb-2">{locationName}</h2>

        <div className="flex flex-col items-center my-4">
          <WeatherIcon
            type={weatherType}
            className="w-20 h-20 text-white mb-2"
          />
          <span className="text-6xl font-bold tracking-tighter">
            {temperature}°
          </span>
        </div>

        <div className="flex gap-4 text-sm font-medium opacity-80 mt-2">
          <span>최고 {highTemp}°</span>
          <span>|</span>
          <span>최저 {lowTemp}°</span>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-10%] w-40 h-40 bg-blue-400/20 rounded-full blur-2xl" />
    </Card>
  );
};



