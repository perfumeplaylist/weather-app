import { Trash2 } from "lucide-react";
import { Button, Flex, Icon } from "@packages/ui";
import { useFavoriteStore } from "@/entities/favorite";

export const DeleteAllFavoritesButton = () => {
  const clearAllFavorites = useFavoriteStore(
    (state) => state.clearAllFavorites
  );

  const handleDeleteAll = () => {
    if (window.confirm("모든 즐겨찾기를 삭제하시겠습니까?")) {
      clearAllFavorites();
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDeleteAll}
      className="text-gray-500 hover:text-red-500 hover:bg-red-50"
    >
      <Flex align="center" gap={1}>
        <Icon size="xs">
          <Trash2 />
        </Icon>
        <span>전체 삭제</span>
      </Flex>
    </Button>
  );
};
