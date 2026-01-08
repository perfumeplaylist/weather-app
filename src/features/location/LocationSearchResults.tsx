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

export const LocationSearchResults = ({ results, onSelect, query }: LocationSearchResultsProps) => {
  if (!query) return null;

  if (results.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <ul className="flex flex-col">
      {results.map((result) => (
        <li key={result.id}>
          <button
            onClick={() => onSelect(result)}
            className="w-full text-left py-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors px-2"
          >
            <span className="font-medium text-gray-900">{result.dong}</span>
            <span className="ml-2 text-sm text-gray-500">
              {result.city} {result.gu}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};




