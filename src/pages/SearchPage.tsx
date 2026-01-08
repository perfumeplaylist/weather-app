import { useState } from "react";
import { useNavigate } from "react-router";
import { PageLayout } from "../shared/layout/PageLayout";
import { Header } from "../shared/ui/Header";
import { LocationSearchBar } from "../features/location/LocationSearchBar";
import { LocationSearchResults } from "../features/location/LocationSearchResults";

// Mock data
const MOCK_RESULTS = [
  { id: "101", dong: "청운동", gu: "종로구", city: "서울특별시" },
  { id: "102", dong: "청담동", gu: "강남구", city: "서울특별시" },
  { id: "103", dong: "청량리동", gu: "동대문구", city: "서울특별시" },
];

interface SearchResult {
  id: string;
  dong: string;
  gu: string;
  city: string;
}

export const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Simple filter simulation
  const results = query
    ? MOCK_RESULTS.filter((r) => r.dong.includes(query) || r.gu.includes(query))
    : [];

  const handleSelect = (location: SearchResult) => {
    // Navigate to detail with location ID
    navigate(`/detail/${location.id}`);
  };

  return (
    <PageLayout>
      <Header showBack title="지역 검색" />

      <div className="px-4 py-2">
        <LocationSearchBar
          value={query}
          onChange={setQuery}
          onClear={() => setQuery("")}
        />
      </div>

      <div className="flex-1 px-2 mt-2">
        <LocationSearchResults
          query={query}
          results={results}
          onSelect={handleSelect}
        />
      </div>
    </PageLayout>
  );
};
