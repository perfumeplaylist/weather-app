import { useCallback } from "react";
import { toast } from "sonner";
import { useFavoriteStore } from "@/entities/favorite";

const MAX_FAVORITES = 6;

/**
 * 즐겨찾기 토글 기능을 제공하는 hook
 * 토글 로직, 최대 개수 정책, 토스트 메시지를 포함
 */
export const useToggleFavorite = () => {
  const favoriteIds = useFavoriteStore((state) => state.ids);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const isFavorite = useFavoriteStore((state) => state.isFavorite);

  const handleToggle = useCallback(
    (locationId: string) => {
      const isFav = isFavorite(locationId);

      if (isFav) {
        // 즐겨찾기 제거
        const success = toggleFavorite(locationId);
        if (success) {
          toast.success("즐겨찾기에서 제거되었습니다");
        }
      } else {
        // 즐겨찾기 추가
        if (favoriteIds.length >= MAX_FAVORITES) {
          toast.error("즐겨찾기는 최대 6개까지만 추가할 수 있습니다");
          return;
        }
        const success = toggleFavorite(locationId);
        if (success) {
          toast.success("즐겨찾기에 추가되었습니다");
        } else {
          toast.error("즐겨찾기 추가에 실패했습니다");
        }
      }
    },
    [favoriteIds.length, isFavorite, toggleFavorite]
  );

  return {
    handleToggle,
    isFavorite: (locationId: string) => isFavorite(locationId),
  };
};



