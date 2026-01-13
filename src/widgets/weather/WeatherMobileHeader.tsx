import { ToggleFavoriteButton } from "@/features/favorite/toggle-favorite";
import { WeatherDetailHeaderTitle } from "./WeatherDetailHeaderTitle";
import { Header } from "@/shared";

/**
 * 날씨 상세 페이지 모바일 헤더
 * Feature 컴포넌트들을 조합하여 구성
 */
export const WeatherMobileHeader = ({ locationId }: { locationId: string }) => {
  return (
    <Header
      showBack
      title={
        <WeatherDetailHeaderTitle locationId={locationId} variant="mobile" />
      }
      className="md:hidden"
      right={<ToggleFavoriteButton locationId={locationId} variant="mobile" />}
    />
  );
};
