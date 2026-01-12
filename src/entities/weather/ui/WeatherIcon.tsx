import { type WeatherType } from "../model/iconMap";
import { cn } from "@packages/utils/cn";
import ICON_MAP from "../model/iconMap";

interface WeatherIconProps {
  type: WeatherType["type"];
  className?: string;
}

export const WeatherIcon = ({ type, className }: WeatherIconProps) => {
  const iconProps = { className: cn("w-6 h-6", className) };

  const Icon = ICON_MAP[type];

  return <Icon.icon {...iconProps} className={Icon.className} />;
};
