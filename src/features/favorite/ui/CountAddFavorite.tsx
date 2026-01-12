import { useFavoriteStore } from "@/entities/favorite";
import { Button, Flex, Text } from "@packages/ui";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

export const CountAddFavorite = () => {
  const favoriteIds = useFavoriteStore((state) => state.ids);
  const navigate = useNavigate();

  return (
    <Flex justify="between" align="center" className="mb-4 px-1">
      <Text as="h2" size="lg" weight="bold" color="default">
        즐겨찾기 ({favoriteIds.length}/6)
      </Text>
      <Button
        onClick={() => navigate("/search")}
        className="text-sm font-medium  text-white px-3 py-1.5 rounded-lg transition-colors"
      >
        <Flex align="center" gap={1}>
          <Plus className="w-4 h-4" />
          추가하기
        </Flex>
      </Button>
    </Flex>
  );
};
