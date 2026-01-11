import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input, Icon, Text, Button } from "@packages/ui";
import { useLocationSearch } from "../model/useLocationSearch";
import { LocationSearchDropdown } from "./LocationSearchDropdown";
import type { SearchLocationItem } from "../../../entities/location";

export const LocationSearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { query, setQuery, results, hasResults } = useLocationSearch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleSelect = (item: SearchLocationItem) => {
    // TODO: 선택된 location 처리 (Context 또는 navigate)
    console.log("Selected:", item);
    setQuery(item.displayName);
    setIsOpen(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".location-search-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative location-search-container">
      <Input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => query && setIsOpen(true)}
        placeholder="지역 검색 (시/도, 구, 동 등)"
        variant="filled"
        inputSize="lg"
        leftIcon={
          <Icon size="md" color="default">
            <Search />
          </Icon>
        }
        rightIcon={
          query && (
            <Button onClick={handleClear} variant="ghost" size="sm">
              <Icon size="xs">
                <X />
              </Icon>
            </Button>
          )
        }
      />

      {isOpen && hasResults && (
        <LocationSearchDropdown results={results} onSelect={handleSelect} />
      )}

      <Text size="xs" color="muted" className="mt-2 ml-1">
        * 날씨 정보는 시/군/구 기준으로 제공됩니다
      </Text>
    </div>
  );
};
