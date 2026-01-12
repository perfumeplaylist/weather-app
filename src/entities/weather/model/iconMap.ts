import {
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
  Wind,
  type LucideIcon,
} from "lucide-react";

export interface WeatherType {
  type: "sunny" | "cloudy" | "rainy" | "snowy" | "stormy" | "windy" | "drizzle";
}

const ICON_MAP = {
  sunny: { icon: Sun, className: "text-orange-500" },
  cloudy: { icon: Cloud, className: "text-gray-400" },
  rainy: { icon: CloudRain, className: "text-blue-500" },
  snowy: { icon: CloudSnow, className: "text-sky-300" },
  stormy: { icon: CloudLightning, className: "text-purple-600" },
  windy: { icon: Wind, className: "text-blue-300" },
  drizzle: { icon: CloudDrizzle, className: "text-blue-400" },
} satisfies Record<
  WeatherType["type"],
  { icon: LucideIcon; className: string }
>;

export default ICON_MAP;
