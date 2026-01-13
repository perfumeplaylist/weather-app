import { useMemo } from "react";
import { InlineEdit } from "@/shared/ui/InlineEdit";
import { useFavoriteStore } from "@/entities/favorite";
import { useEditFavoriteAlias } from "../model/useEditFavoriteAlias";

interface EditFavoriteAliasProps {
  locationId: string;
  locationName: string;
  className?: string;
}

/**
 * 즐겨찾기 별칭 편집 컴포넌트
 * InlineEdit를 사용하여 별칭을 수정할 수 있도록 함
 */
export const EditFavoriteAlias = ({
  locationId,
  locationName,
  className,
}: EditFavoriteAliasProps) => {
  const getAlias = useFavoriteStore((state) => state.getAlias);
  const { handleSave } = useEditFavoriteAlias();

  const alias = useMemo(() => {
    return getAlias(locationId) || "";
  }, [locationId, getAlias]);

  const handleAliasSave = (newAlias: string) => {
    handleSave(locationId, newAlias);
  };

  return (
    <InlineEdit
      value={alias}
      onSave={handleAliasSave}
      placeholder={locationName}
      maxLength={20}
      className={className}
    />
  );
};
