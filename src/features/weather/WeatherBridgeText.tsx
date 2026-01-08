import { Info } from 'lucide-react';

interface WeatherBridgeTextProps {
  dongName: string;
  guName: string;
}

export const WeatherBridgeText = ({ dongName, guName }: WeatherBridgeTextProps) => {
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1 px-1">
      <Info className="w-3.5 h-3.5" />
      <p>
        <span className="font-medium text-gray-700">{dongName}</span>의 날씨는 
        <span className="font-medium text-blue-600 mx-1">{guName}</span> 
        관측소 기준으로 제공됩니다.
      </p>
    </div>
  );
};




