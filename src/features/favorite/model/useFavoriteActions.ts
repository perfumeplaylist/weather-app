import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useFavoriteStore } from "@/entities/favorite";

/**
 * 즐겨찾기 관련 액션들을 제공하는 훅
 * 모든 핸들러는 useCallback으로 메모이제이션됨
 */
export const useFavoriteActions = () => {
  const navigate = useNavigate();
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);
  const clearAllFavorites = useFavoriteStore(
    (state) => state.clearAllFavorites
  );

  const handleLocationClick = useCallback(
    (lat: number, lon: number) => {
      const queryParams = new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
      });
      navigate(`/detail?${queryParams.toString()}`);
    },
    [navigate]
  );

  const handleDeleteLocation = useCallback(
    (id: string) => {
      removeFavorite(id);
    },
    [removeFavorite]
  );

  const handleDeleteAll = useCallback(() => {
    if (window.confirm("모든 즐겨찾기를 삭제하시겠습니까?")) {
      clearAllFavorites();
    }
  }, [clearAllFavorites]);

  return {
    handleLocationClick,
    handleDeleteLocation,
    handleDeleteAll,
  };
};
