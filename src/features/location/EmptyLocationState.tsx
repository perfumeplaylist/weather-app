import { MapPinOff } from "lucide-react";
import { Card, Icon, Text, Button, Flex } from "@packages/ui";

interface EmptyLocationStateProps {
  onSearchClick: () => void;
}

export const EmptyLocationState = ({
  onSearchClick,
}: EmptyLocationStateProps) => {
  return (
    <Card
      variant="outlined"
      className="border-dashed border-2 border-gray-200 bg-gray-50/50"
    >
      <Flex
        direction="col"
        align="center"
        justify="center"
        className="py-6 px-2 text-center"
      >
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Icon size="xl" color="muted">
            <MapPinOff />
          </Icon>
        </div>

        <Text
          as="h3"
          size="lg"
          weight="semibold"
          color="default"
          className="mb-2"
        >
          현재 위치를 불러올 수 없습니다
        </Text>

        <Text size="sm" color="muted" className="mb-6 max-w-[240px]">
          위치 권한이 거부되었거나 찾을 수 없습니다.
          <br />
          원하는 지역을 직접 검색해보세요.
        </Text>

        <Button
          onClick={onSearchClick}
          variant="primary"
          size="lg"
          className="w-full max-w-xs"
        >
          지역 검색하기
        </Button>
      </Flex>
    </Card>
  );
};
