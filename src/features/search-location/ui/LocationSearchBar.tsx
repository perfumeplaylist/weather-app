import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Input, Icon, Text, Button } from "@packages/ui";
import { useLocationSearch } from "../model/useLocationSearch";
import { LocationSearchResultsList } from "./LocationSearchResultsList";

export const LocationSearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { query, setQuery, results } = useLocationSearch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="location-search-container">
      <Input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="지역 검색 (시/도, 구, 동 등)"
        variant="outline"
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

      <Text size="xs" color="muted" className="mt-2 ml-1">
        * 날씨 정보는 시/군/구 기준으로 제공됩니다
      </Text>

      {query && <LocationSearchResultsList results={results} />}
    </div>
  );
};
