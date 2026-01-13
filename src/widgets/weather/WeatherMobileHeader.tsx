import { ToggleFavoriteButton } from "@/features/favorite/toggle-favorite";
import { WeatherDetailHeaderTitle } from "./WeatherDetailHeaderTitle";
import { Header } from "@/shared";

/**
 * 날씨 상세 페이지 모바일 헤더
 * Feature 컴포넌트들을 조합하여 구성
 */
export const WeatherMobileHeader = ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  return (
    <Header
      showBack
      title={
        <WeatherDetailHeaderTitle lat={lat} lon={lon} variant="mobile" />
      }
      className="md:hidden"
      right={<ToggleFavoriteButton lat={lat} lon={lon} variant="mobile" />}
    />
  );
};
