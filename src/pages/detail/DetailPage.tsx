import { useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { Star, ChevronLeft } from "lucide-react";
import { PageLayout } from "../../shared/layout/PageLayout";
import { Header } from "../../shared/ui/Header";
import { WeatherDetailWidget } from "../../widget/weather/WeatherDetailWidget";
import { useFavoriteStore } from "../../entities/favorite/model/favoriteStore";
import { getLocationById } from "../../entities/location";
import { toast } from "sonner";
import { InlineEdit } from "../../shared/ui/InlineEdit";

export const DetailPage = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();

  // 즐겨찾기 상태를 zustand store에서 가져오기 (개별 selector 사용)
  const favoriteIds = useFavoriteStore((state) => state.ids);
  const favoriteAliases = useFavoriteStore((state) => state.aliases);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const setFavoriteAlias = useFavoriteStore((state) => state.setFavoriteAlias);
  const getAlias = useFavoriteStore((state) => state.getAlias);
  const isFavorite = useFavoriteStore((state) => state.isFavorite);

  // Location 정보 조회
  const location = locationId ? getLocationById(locationId) : null;
  const locationName = location
    ? location.label.split(" ").pop() || location.label
    : "";

  // 현재 즐겨찾기 상태와 별칭 계산
  const { currentIsFav, alias } = useMemo(() => {
    if (!locationId) {
      return { currentIsFav: false, alias: "" };
    }
    const isFav = isFavorite(locationId);
    return {
      currentIsFav: isFav,
      alias: isFav ? getAlias(locationId) || "" : "",
    };
  }, [locationId, favoriteIds, favoriteAliases, isFavorite, getAlias]);

  const handleToggleFavorite = () => {
    if (!locationId) return;

    const isFav = isFavorite(locationId);

    if (isFav) {
      // 즐겨찾기 제거
      const success = toggleFavorite(locationId);
      if (success) {
        toast.success("즐겨찾기에서 제거되었습니다");
      }
    } else {
      // 즐겨찾기 추가
      if (favoriteIds.length >= 6) {
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
  };

  const handleAliasSave = (newAlias: string) => {
    if (!locationId) return;

    if (newAlias.trim() === "") {
      // 빈 문자열이면 alias 제거
      setFavoriteAlias(locationId, "");
      toast.success("별칭이 제거되었습니다");
    } else {
      setFavoriteAlias(locationId, newAlias);
      toast.success("별칭이 저장되었습니다");
    }
  };

  return (
    <PageLayout>
      <Header
        showBack
        title={
          currentIsFav ? (
            <InlineEdit
              value={alias}
              onSave={handleAliasSave}
              placeholder={locationName}
              maxLength={20}
              className="max-w-[200px]"
            />
          ) : (
            locationName
          )
        }
        className="md:hidden"
        right={
          <button
            onClick={handleToggleFavorite}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Star
              className={`w-6 h-6 ${
                currentIsFav
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400"
              }`}
            />
          </button>
        }
      />

      {/* Desktop Header / Nav */}
      <div className="hidden md:flex items-center justify-between p-6 border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">뒤로가기</span>
        </button>

        <div className="flex items-center gap-3">
          {currentIsFav ? (
            <InlineEdit
              value={alias}
              onSave={handleAliasSave}
              placeholder={locationName}
              maxLength={20}
              className="min-w-[200px]"
            />
          ) : (
            <h1 className="text-xl font-bold text-gray-900">{locationName}</h1>
          )}
        </div>

        <button
          onClick={handleToggleFavorite}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600"
        >
          <Star
            className={`w-5 h-5 ${
              currentIsFav ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
            }`}
          />
          {currentIsFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
        </button>
      </div>

      <div className="pb-24 md:pb-24">
        <WeatherDetailWidget />
      </div>
    </PageLayout>
  );
};
