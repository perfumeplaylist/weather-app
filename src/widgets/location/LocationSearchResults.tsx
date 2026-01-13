import { Text, Flex } from "@packages/ui";

interface LocationResult {
  id: string;
  dong: string;
  gu: string;
  city: string;
}

interface LocationSearchResultsProps {
  results: LocationResult[];
  onSelect: (location: LocationResult) => void;
  query: string;
}

export const LocationSearchResults = ({
  results,
  onSelect,
  query,
}: LocationSearchResultsProps) => {
  if (!query) return null;

  if (results.length === 0) {
    return (
      <div className="py-8 text-center">
        <Text color="muted">검색 결과가 없습니다.</Text>
      </div>
    );
  }

  return (
    <Flex direction="col">
      {results.map((result) => (
        <button
          key={result.id}
          onClick={() => onSelect(result)}
          className="w-full text-left py-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors px-2"
        >
          <Flex align="center" gap={2}>
            <Text weight="medium" color="default">
              {result.dong}
            </Text>
            <Text size="sm" color="muted">
              {result.city} {result.gu}
            </Text>
          </Flex>
        </button>
      ))}
    </Flex>
  );
};
