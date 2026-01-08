import { Search, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface LocationSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export const LocationSearchBar = ({ value, onChange, onClear }: LocationSearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="동/리 이름으로 검색 (예: 청운동)"
          className="w-full pl-10 pr-10 py-3 bg-gray-100 border-none rounded-xl text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
        />
        {value && (
          <button 
            onClick={onClear}
            className="absolute right-3 p-1 rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-2 ml-1">
        * 날씨 정보는 시/군/구 기준으로 제공됩니다.
      </p>
    </div>
  );
};




