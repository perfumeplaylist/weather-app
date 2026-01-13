import { Card, Text, Flex, Badge } from "@packages/ui";
import type { SearchLocationItem } from "@/entities/location";
import { formatLocationDisplay } from "../lib/locationFormatter";
import { useNavigate } from "react-router";

interface LocationSearchResultsListProps {
  results: SearchLocationItem[];
  onSelect?: (item: SearchLocationItem) => void;
}

export function LocationSearchResultsList({
  results,
  onSelect,
}: LocationSearchResultsListProps) {
  const navigate = useNavigate();

  const handleCardClick = (item: SearchLocationItem) => {
    if (onSelect) {
      onSelect(item);
    } else {
      // item.key를 locationId로 사용하여 상세 페이지로 이동
      navigate(`/detail/${item.key}`);
    }
  };

  if (results.length === 0) {
    return (
      <Card
        variant="elevated"
        padding="lg"
        rounded="xl"
        className="mt-4 text-center"
      >
        <Text color="muted" size="base">
          검색 결과가 없습니다
        </Text>
      </Card>
    );
  }

  return (
    <div className="mt-4 space-y-2 pb-20">
      {results.map((item) => {
        const { primary, secondary, hasWeather } = formatLocationDisplay(item);

        return (
          <Card
            key={item.key}
            variant="outlined"
            padding="md"
            rounded="lg"
            clickable
            onClick={() => handleCardClick(item)}
            className="transition-colors hover:shadow-md cursor-pointer"
          >
            <Flex direction="row" align="center" justify="between" gap={3}>
              <Flex
                direction="row"
                align="center"
                gap={3}
                className="flex-1 min-w-0"
              >
                <div className="flex-1 min-w-0">
                  <Flex direction="row" align="center" gap={2} className="mb-1">
                    <Text size="base" weight="medium" className="truncate">
                      {primary}
                    </Text>
                    {hasWeather && (
                      <Badge size="sm" variant="success">
                        <Text size="xs">날씨</Text>
                      </Badge>
                    )}
                  </Flex>

                  {secondary && (
                    <Text size="sm" color="muted" className="truncate">
                      {secondary}
                    </Text>
                  )}
                </div>
              </Flex>
            </Flex>
          </Card>
        );
      })}
    </div>
  );
}
