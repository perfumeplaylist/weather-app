import { Card, Text } from "@packages/ui";

interface FavoriteLocationsErrorStateProps {
  error: Error;
}

/**
 * 즐겨찾기 위치 목록 로드 실패 시 표시되는 에러 상태 컴포넌트
 */
export const FavoriteLocationsErrorState = ({
  error,
}: FavoriteLocationsErrorStateProps) => {
  return (
    <Card variant="elevated" padding="lg" className="mt-4">
      <Text color="danger" size="sm">
        즐겨찾기를 불러올 수 없습니다: {error.message}
      </Text>
    </Card>
  );
};

