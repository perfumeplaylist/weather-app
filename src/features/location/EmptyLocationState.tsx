import { MapPinOff } from 'lucide-react';
import { Card } from '../../shared/ui/Card';

interface EmptyLocationStateProps {
  onSearchClick: () => void;
}

export const EmptyLocationState = ({ onSearchClick }: EmptyLocationStateProps) => {
  return (
    <Card className="flex flex-col items-center justify-center py-10 px-6 text-center border-dashed border-2 border-gray-200 bg-gray-50/50">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <MapPinOff className="w-8 h-8 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        현재 위치를 불러올 수 없습니다
      </h3>
      
      <p className="text-sm text-gray-500 mb-6 max-w-[240px]">
        위치 권한이 거부되었거나 찾을 수 없습니다.<br/>
        원하는 지역을 직접 검색해보세요.
      </p>
      
      <button
        onClick={onSearchClick}
        className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors active:scale-98"
      >
        지역 검색하기
      </button>
    </Card>
  );
};




