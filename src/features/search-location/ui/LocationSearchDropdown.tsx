import { MapPin, Cloud } from "lucide-react";
import { Card, Icon, Text, Badge, Button, Flex } from "@packages/ui";
import type { SearchLocationItem } from "../../../entities/location";
import { formatLocationDisplay } from "../lib/locationFormatter";

interface Props {
  results: SearchLocationItem[];
  onSelect: (item: SearchLocationItem) => void;
}

export function LocationSearchDropdown({ results, onSelect }: Props) {
  return (
    <Card
      variant="elevated"
      padding="none"
      rounded="xl"
      className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto z-50"
    >
      {results.length > 0 ? (
        results.map((item) => {
          const { primary, secondary, hasWeather } =
            formatLocationDisplay(item);

          return (
            <Button
              key={item.key}
              onClick={() => onSelect(item)}
              variant="ghost"
              size="sm"
              className="w-full text-left border-b border-gray-100 last:border-0"
            >
              <Flex direction="row" align="start" justify="start" gap={3}>
                <Icon size="sm" color="default">
                  <MapPin />
                </Icon>

                <div className="flex-1 min-w-0">
                  <Flex direction="row" align="start" justify="between" gap={2}>
                    <Text size="base" weight="medium" className="truncate">
                      {primary}
                    </Text>
                    {hasWeather && (
                      <Badge size="sm" variant="success">
                        <Icon size="xs">
                          <Cloud />
                        </Icon>
                        <Text size="xs" color="default">
                          날씨
                        </Text>
                      </Badge>
                    )}
                  </Flex>

                  {secondary && (
                    <Text size="xs" color="muted" className="truncate">
                      {secondary}
                    </Text>
                  )}
                </div>
              </Flex>
            </Button>
          );
        })
      ) : (
        <div className="px-4 py-8 text-center">
          <Text color="muted">검색 결과가 없습니다</Text>
        </div>
      )}
    </Card>
  );
}
