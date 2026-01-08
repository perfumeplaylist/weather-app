import { Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Sun, Wind } from 'lucide-react';
import { cn } from '../../../packages/utils/cn';

export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'windy' | 'drizzle';

interface WeatherIconProps {
  type: WeatherType;
  className?: string;
}

export const WeatherIcon = ({ type, className }: WeatherIconProps) => {
  const iconProps = { className: cn("w-6 h-6", className) };

  switch (type) {
    case 'sunny':
      return <Sun {...iconProps} className={cn(iconProps.className, "text-orange-500")} />;
    case 'cloudy':
      return <Cloud {...iconProps} className={cn(iconProps.className, "text-gray-400")} />;
    case 'rainy':
      return <CloudRain {...iconProps} className={cn(iconProps.className, "text-blue-500")} />;
    case 'snowy':
      return <CloudSnow {...iconProps} className={cn(iconProps.className, "text-sky-300")} />;
    case 'stormy':
      return <CloudLightning {...iconProps} className={cn(iconProps.className, "text-purple-600")} />;
    case 'windy':
      return <Wind {...iconProps} className={cn(iconProps.className, "text-blue-300")} />;
    case 'drizzle':
      return <CloudDrizzle {...iconProps} className={cn(iconProps.className, "text-blue-400")} />;
    default:
      return <Sun {...iconProps} />;
  }
};




