import { useCallback } from "react";
import { toast } from "sonner";
import { useFavoriteStore } from "@/entities/favorite";

/**
 * 즐겨찾기 별칭 수정 기능을 제공하는 hook
 * 별칭 수정 로직과 토스트 메시지를 포함
 */
export const useEditFavoriteAlias = () => {
  const setFavoriteAlias = useFavoriteStore((state) => state.setFavoriteAlias);

  const handleSave = useCallback(
    (locationId: string, newAlias: string) => {
      if (newAlias.trim() === "") {
        // 빈 문자열이면 alias 제거
        setFavoriteAlias(locationId, "");
        toast.success("별칭이 제거되었습니다");
      } else {
        setFavoriteAlias(locationId, newAlias);
        toast.success("별칭이 저장되었습니다");
      }
    },
    [setFavoriteAlias]
  );

  return {
    handleSave,
  };
};



